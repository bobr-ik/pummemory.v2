import json
import random
from fastapi import HTTPException
from sqlalchemy import text, insert, select, func, cast, Integer, and_, update
from data.database import async_engine, async_session_factory
from sqlalchemy.orm import aliased
from data.database import Base
from sqlalchemy.orm import joinedload, selectinload, contains_eager
from data.models import *
import jwt
from data.config import settings
import asyncio
import asyncmy
from app.models import Person as ps_model, Reward as rw_model, Photo as ph_model, Info as inf_model
import requests
import base64
from pprint import pprint

def create_token(data):
    now = datetime.datetime.now()
    secret_key = settings.secret
    token = jwt.encode(
    {"data": data, "gen_time": str(now)},
    secret_key,
    algorithm="HS256")
    return token, now


def upload_google_drive_to_imgbb(url: str, imgbb_api_key=settings.API_KEY) -> str:
    # Step 1: Скачать изображение с Google Drive
    # drive_url = url
    # response = requests.get(drive_url)
    # if response.status_code != 200:
    #     raise Exception(f"Ошибка при скачивании с Google Drive: {response.status_code}")
    
    # # Step 2: Преобразовать изображение в base64
    # image_b64 = base64.b64encode(response.content)

    # Step 3: Загрузить на ImgBB
    url = url.replace(';', '')
    upload_url = "https://api.imgbb.com/1/upload"
    payload = {
        "key": imgbb_api_key,
        "image": url
    }
    print(url)
    res = requests.post(upload_url, data=payload)
    if res.status_code != 200:
       print(f"Ошибка при загрузке на ImgBB: {res.status_code}, {res.text}")
       return
    
    data = res.json()
    return data['data']['url']  # Прямая ссылка на изображение


class Orm:   
    @staticmethod
    async def create_all():
        async with async_engine.begin() as conn:
            print('create_all')
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)
            await Orm.insert_or_upd_rewards()
            await Orm.create_old_table()
            await Orm.insert_old_ppl()
            
            
    # @staticmethod
    # async def create_token(data: str = ''.join([str(random.randint(0, 100)) for _ in range(30)])):
    #     token, now = create_token(data)
    #     print(token)
    #     async with async_session_factory() as session:
    #         session.add(Tokens(_token=token, is_active=True, gen_time=str(now)))
    #         await session.commit()
    #     return token
    
    @staticmethod
    async def create_token(data: str = ''.join([str(random.randint(0, 100)) for _ in range(30)])):
        token_str, now = create_token(data)
        token_obj = Tokens()
        token_obj.token = token_str  # вот тут сработает хеширование через setter
        token_obj.is_active = True
        token_obj.gen_time = str(now)
        async with async_session_factory() as session:
            session.add(token_obj)
            await session.commit()
        return token_str
    
    
    @staticmethod
    async def check_token_validity(token: str):
        async with async_session_factory() as session:
            res = await session.execute(select(Tokens).where(Tokens.check_token(token)))
            res = res.scalars().first()
            return True if res else False
        
        
    @staticmethod
    async def get_or_insert_reward(reward: rw_model):
        async with async_session_factory() as session:
            res = await session.execute(select(Rewards).where(Rewards.title == reward.title))
            res = res.scalars().first()
            if res:
                return res
            else:
                query = insert(Rewards).values(title=reward.title)
                await session.execute(query)
                await session.flush()
                res = await session.execute(select(Rewards).where(Rewards.title == reward.title))
                res = res.scalars().first()
                return res
    
    
    @staticmethod
    async def insert_person(person: ps_model):
        async with async_session_factory() as session:
            us_id = str(uuid.uuid4())
            rew = [await Orm.get_or_insert_reward(reward) for reward in person.rewards]
            info_list = []
            for info in person.info:
                info.id = us_id + str(info.year)
                info.images = [Photo(url=photo.url, url_delete=photo.img_del, info_id=info.id) for photo in info.images]
                info_list.append(Info(id=info.id, year=info.year, place=info.place, description=info.story, pers_id=us_id, photos=info.images))
            await session.add(Person(id=us_id, name=person.name, description=person.desc, time_added=datetime.datetime.now(), rewards=rew, info=info_list))
            await session.commit()
            return us_id
    
    
    @staticmethod
    async def get_person(id: str):
        async with async_session_factory() as session:
            query = (select(Person).where(
                Person.id == id
                ).options(
                    selectinload(Person.rewards),
                    selectinload(Person.info).options(
                        selectinload(Info.photos)
                        )
                    )
                )
            res = await session.execute(query)
            res = res.scalars().first()
            ans = {
                'name': res.name,
                'biography': res.description,
                'avatar': res.avatar,
                'rewards': [reward.title for reward in res.rewards],
                'years': [{'id': res.id, 'year': info.year, 'location': info.place.split(), 'story': info.description, 'images': [photo.url for photo in info.photos]} for info in res.info]
            }
            return ans
        
        
    @staticmethod
    async def get_points(year: Year):
        async with async_session_factory() as session:
            query = (
                select(Info).where(
                    Info.year == year
                    ).options(
                        selectinload(Info.pers)
                        )
                    )
            res = await session.execute(query)
            res = res.scalars().all()
            for info in res:
                print(info.place)
            ans = [{
                "name": (info.pers.name.split())[0],
                "surname": (info.pers.name.split())[1],
                "patronymic": (info.pers.name.split())[2],
                "location": info.place,
                "img_url": info.pers.avatar[0] if info.pers.avatar is not None else None,
                "id": info.pers.id
                } for info in res
                ]
            return ans
        
        
    @staticmethod
    async def insert_or_upd_rewards():
        async with async_session_factory() as session:
            rew = await session.execute(select(Rewards))
            rew = rew.scalars().all()
            if rew:
                return
            with open('data/models_data/medals.txt', encoding='utf-8') as f:
                for line in f.readlines():
                    line = line.split('-')
                    line[1] = line[1].replace('\n', '')
                    print(line)
                    
                    session.add(Rewards(title=line[1], img_url=line[0]))
            await session.commit()
            
    @staticmethod
    async def create_old_table():
        async with async_session_factory() as session:
            with open('data/models_data/pummemory_persons.sql', encoding='utf-8') as f:
                query = f.read()
                await session.execute(text(query))
                await session.commit()
            
    
    @staticmethod
    async def get_rewards():
        async with async_session_factory() as session:
            rew = await session.execute(select(Rewards))
            rew = rew.scalars().all()
            return rew
        
    @staticmethod
    async def insert_old_ppl():
        #это пиздец.
        async with async_session_factory() as session:
            data = await session.execute(text("SELECT * FROM `table 11`"))
            data = data.all()
            ppl = {}
            for row in data:
                ppl[row[4]] = {
                    'rewards': [row[5]],
                    'desc': row[6],
                    'photos': [el for el in row[7:11] if el != ''],
                    'years': {
                        '1940': {
                            'place': row[36],
                            'desc': row[12],
                            'photos': [el for el in row[13:16] if el != '']
                        },
                        '1941': {
                            'place': row[37],
                            'desc': row[17],
                            'photos': [el for el in row[18:21] if el != '']
                        },
                        '1942': {
                            'place': row[38],
                            'desc': row[22],
                            'photos': [el for el in row[23:25] if el != '']
                        },
                        '1943': {
                            'place': row[39],
                            'desc': row[26],
                            'photos': [row[27] if row[27] != '' else None]
                        },
                        '1944': {
                            'place': row[40],
                            'desc': row[29],
                            'photos': [row[30] if row[30] != '' else None]
                        },
                        '1945': {
                            'place': row[2],
                            'desc': row[32],
                            'photos': [row[33] if row[33] != '' else None]
                        }   
                    }  
                }
            
            # with open('backend/data/models_data/years.json', 'r', encoding='utf-8') as f:
            #     data = json.load(f)
            # for person in data:
            #     dop = []
            #     for photo in data[person]['photos']:
            #         if photo:
            #             dop.append(upload_google_drive_to_imgbb(photo))
            #     data[person]['photos'] = dop
            #     for year in data[person]['years']:
            #         for photo in data[person]['years'][year]['photos']:
            #             if photo:
            #                 extra = upload_google_drive_to_imgbb(photo)
            #                 data[person]['years'][year]['photos'] = extra
            
            # with open('backend/data/models_data/years.json', 'w', encoding='utf-8') as f:
            #     json.dump(data, f, ensure_ascii=False, indent=4)
            #наконец-то, когда готов json на две тысячи строк можно вставлять этот кал в базу.
            with open('data/models_data/years.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            async with async_session_factory() as session:
                all_rew = await session.execute(select(Rewards))
                all_rew = all_rew.scalars().all()
                for person in data:
                    us_id = str(uuid.uuid4())
                    u_rew = []
                    print(data[person]['rewards'])
                    for rew in data[person]['rewards'][0].split(', '):
                        for r in all_rew:
                            if rew == r.img_url or rew == r.id:
                                u_rew.append(r)
                                break
                    data[person]['rewards'] = u_rew
                    # rew = [await Orm.get_or_insert_reward(reward) for reward in person.rewards]
                    info_list = []
                    for year in data[person]['years']:
                        year_id = str(uuid.uuid4())
                        print(data[person]['years'][year]['photos'])
                        if type(data[person]['years'][year]['photos']) == str:
                            if data[person]['years'][year]['photos'] != None:
                                photos = [Photo(url=data[person]['years'][year]['photos'], info_id=year_id)]
                        elif type(data[person]['years'][year]['photos']) == list:
                            photos = [Photo(url=photo, info_id=year_id) for photo in data[person]['years'][year]['photos'] if photo is not None]
                        else:
                            photos = []
                        if data[person]['years'][year]['desc'] or data[person]['years'][year]['place'] or photos:
                            info_list.append(Info(id=year_id, year=Year(year), place=data[person]['years'][year]['place'], description=data[person]['years'][year]['desc'], pers_id=us_id, photos=photos))
                    pers = Person(id=us_id, name=person, description=data[person]['desc'], avatar=list(data[person]['photos']) if data[person]['photos'] else None, time_added=datetime.datetime.now(), rewards=u_rew, info=info_list)
                    pprint(pers)
                    session.add(pers)
                await session.commit()
                return us_id
            
    @staticmethod
    async def get_new_ppl():
        async with async_session_factory() as session:
            new_ppl = await session.execute(select(Temporary_Person).where(Temporary_Person.status == Status.new))
                    
                    
                    
                
                
        