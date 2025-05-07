import json
import random
import uuid
from sqlalchemy import and_, text, select, update
from data.database import async_engine, async_session_factory
from data.database import Base
from sqlalchemy.orm import selectinload
from data.models import Person, Rewards, Info, Status, Tokens, Year, Photo
import jwt
from data.config import settings
from app.models import Person as ps_model
import requests
from pprint import pprint
import os
import datetime


# функция для создания токена для отправки формы
def create_token(data):
    now = datetime.datetime.now()
    secret_key = settings.secret
    token = jwt.encode(
        {"data": data, "gen_time": str(now)},
        secret_key,
        algorithm="HS256"
    )
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
            await conn.run_sync(Base.metadata.drop_all)  # сброс всех данных в бд
            await conn.run_sync(Base.metadata.create_all)  # создание всех таблиц
            await Orm.insert_or_upd_rewards()  # вставка списка наград
            await Orm.create_old_table()  # создание таблицы со старыми данными
            await Orm.insert_old_ppl()  # добавление старых данных в новые таблицы
            await Orm.add_admin_token()  # вставка админского токена

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
        token_obj._token = token_str
        token_obj.is_active = True
        token_obj.gen_time = str(now)
        async with async_session_factory() as session:
            session.add(token_obj)
            await session.commit()
        return token_str

    @staticmethod
    async def check_token_if_admin(oth: str):
        # print(oth, 'admin_token')
        # получение всех объектов админских токенов и проверка на соответвтвие переданному токену
        async with async_session_factory() as session:
            res = await session.execute(select(Tokens).where(Tokens.is_admin))
            res = res.scalars().all()
            for tk in res:
                if tk.check_token(oth):
                    return True
        return False

    @staticmethod
    async def check_token_validity(token: str):
        # print(token, 'random_token')
        # получение всех объектов токенов и проверка на существование и валидность
        async with async_session_factory() as session:
            res = await session.execute(select(Tokens).where(Tokens.is_active))
            res = res.scalars().all()
            for tk in res:
                if tk.check_token(token):
                    return True
        return False

    @staticmethod
    async def add_admin_token():
        # вставка админского токена
        token = settings.ADMIN_TOKEN
        async with async_session_factory() as session:
            session.add(Tokens(_token=token, is_active=True, is_admin=True, gen_time=str(datetime.datetime.now())))
            await session.commit()

    @staticmethod
    async def get_or_insert_reward(reward: str):
        async with async_session_factory() as session:
            # получение объекта награды соответствующего переданному названию
            res = await session.execute(select(Rewards).where(Rewards.title == reward))
            res = res.scalars().first()
            # if res:
            #     return res
            # else:
            #     # если награда не найдена, вставляем новую
            #     # в данный момент не используется, на фротненде нет возможности внести не существующую награду
            #     query = insert(Rewards).values(title=reward.title)
            #     await session.execute(query)
            #     await session.flush()
            #     res = await session.execute(select(Rewards).where(Rewards.title == reward.title))
            #     res = res.scalars().all()
            #     return res
            print()
            print(res)
            print()
            return res

    @staticmethod
    async def insert_person(person: ps_model):
        async with async_session_factory() as session:
            us_id = str(uuid.uuid4())
            # список объектов наград переданного человека
            # rew=person.rewards
            # print(person.rewards)
            rew = [await Orm.get_or_insert_reward(reward) for reward in person.rewards]
            info_list = []
            # генерация списка информации о персоне по годам
            # print()
            # print(person.info)
            # print()
            for info in person.info:
                # print('banger')
                info.id = us_id + str(info.year)
                print()
                print('info', info)
                print()
                info_list.append(
                    Info(
                        id=info.id,
                        year=info.year,
                        location=info.location,
                        description=info.story,
                        pers_id=us_id,
                        photos=list(Photo(url=img) for img in info.images)
                    )
                )
            session.add(
                Person(
                    id=us_id,
                    avatar=person.avatar,
                    general_photos=person.general_photos,
                    name=person.name,
                    description=person.desc,
                    time_added=datetime.datetime.now(),
                    rewards=rew,
                    info=info_list,
                    sender_name=person.sender_name
                )
            )
            await session.commit()
            return us_id

    @staticmethod
    async def get_person(id: str):
        async with async_session_factory() as session:
            query = (
                select(Person).where(
                    Person.id == id
                ).options(
                    selectinload(Person.rewards),
                    selectinload(Person.info).options(
                        selectinload(Info.photos)
                    )
                )
            )
            res = await session.execute(query)
            res: Person = res.scalars().first()
            # for info in res.info:
            #     print(info.photos)
            #     print()
            print(res.avatar)
            dop = [res.avatar]
            for el in res.general_photos:
                dop.append(el)
            print(dop)
            ans = {
                'id': res.id,
                'sender_name': res.sender_name,
                'name': res.name,
                'biography': res.description,
                'avatar': dop,
                'rewards': [{'name': reward.title, 'image': reward.img_url} for reward in res.rewards],
                'years': [
                    {'id': res.id,
                     'year': info.year,
                     'location': info.location,
                     'story': info.description,
                     'images': [photo.url for photo in info.photos if photo.url is not None]} for info in res.info if any(
                         [info.photos != [] and all([photo.url is not None for photo in info.photos]), info.location != '', info.description != '']
                    )
                ],
            }
            return ans

    @staticmethod
    async def get_points(year: Year):
        async with async_session_factory() as session:
            query = select(Info).join(Info.pers).where(and_(Info.year == year, Person.status == Status.active)).options(selectinload(Info.pers))
            res = await session.execute(query)
            res: list[Info] = res.scalars().all()
            for info in res:
                print(info.location)
            ans = [
                {
                    "name": (info.pers.name.split())[0] if len(info.pers.name.split()) > 0 else '',
                    "surname": (info.pers.name.split())[1] if len(info.pers.name.split()) > 1 else '',
                    "patronymic": (info.pers.name.split())[2] if len(info.pers.name.split()) > 2 else '',
                    "location": info.location,
                    "img_url": info.pers.avatar if info.pers.avatar is not None else None,
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
            with open(os.path.join(os.path.dirname(__file__), 'models_data/medals.txt'), encoding='utf-8') as f:
                for line in f.readlines():
                    line = line.split('~')
                    line[1] = line[1].replace('\n', '')
                    print(line)
                    session.add(Rewards(title=line[1], img_url=line[0]))
            await session.commit()

    @staticmethod
    async def create_old_table():
        async with async_session_factory() as session:
            with open(os.path.join(os.path.dirname(__file__), 'models_data/pummemory_persons.sql'), encoding='utf-8') as f:
                query = f.read()
                await session.execute(text(query))
                await session.commit()

    @staticmethod
    async def get_rewards():
        async with async_session_factory() as session:
            rew = await session.execute(select(Rewards))
            rew = rew.scalars().all()
            return [elem.title for elem in rew]

    @staticmethod
    async def get_rewards_from_list(rewards: list[str]):
        async with async_session_factory() as session:
            rew: list[Rewards] = await session.execute(select(Rewards).where(Rewards.title.in_(rewards)))
            rew = rew.scalars().all()
            return [elem.img_url for elem in rew]

    @staticmethod
    async def confirm_person(id: str):
        async with async_session_factory() as session:
            await session.execute(update(Person).where(Person.id == id).values(status=Status.active))
            print('yep')
            await session.commit()

    @staticmethod
    async def invalidate_token(token: str):
        async with async_session_factory() as session:
            res = await session.execute(select(Tokens).where(Tokens.is_active))
            res = res.scalars().all()
            for tk in res:
                if tk.check_token(token) and not tk.is_admin:
                    tk.is_active = False
            await session.commit()

    @staticmethod
    async def reject_person(id: str):
        async with async_session_factory() as session:
            await session.execute(update(Person).where(Person.id == id).values(status=Status.rejected))
            await session.commit()

    @staticmethod
    async def insert_old_ppl():
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
                            'location': row[36],
                            'desc': row[12],
                            'photos': [el for el in row[13:16] if el != '']
                        },
                        '1941': {
                            'location': row[37],
                            'desc': row[17],
                            'photos': [el for el in row[18:21] if el != '']
                        },
                        '1942': {
                            'location': row[38],
                            'desc': row[22],
                            'photos': [el for el in row[23:25] if el != '']
                        },
                        '1943': {
                            'location': row[39],
                            'desc': row[26],
                            'photos': [row[27] if row[27] != '' else None]
                        },
                        '1944': {
                            'location': row[40],
                            'desc': row[29],
                            'photos': [row[30] if row[30] != '' else None]
                        },
                        '1945': {
                            'location': row[2],
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
            # наконец-то, когда готов json на две тысячи строк можно вставлять этот кал в базу.
            # with open(os.path.join(os.path.dirname(__file__), 'models_data\years.json'), 'r', encoding='utf-8') as f:
            #     data = json.load(f)
            # for pers in data:
            #     data[pers]['years']['1940']['location'], data[pers]['years']['1941']['location'], data[pers]['years']['1942']['location'], data[pers]['years']['1943']['location'], data[pers]['years']['1944']['location'], data[pers]['years']['1945']['location'] = data[pers]['years']['1945']['location'], data[pers]['years']['1940']['location'], data[pers]['years']['1941']['location'], data[pers]['years']['1942']['location'], data[pers]['years']['1943']['location'], data[pers]['years']['1944']['location']
            # with open(os.path.join(os.path.dirname(__file__), 'models_data\years.json'), 'w', encoding='utf-8') as f:
            #     json.dump(data, f, ensure_ascii=False, indent=4)
            with open(os.path.join(os.path.dirname(__file__), 'models_data/years.json'), 'r', encoding='utf-8') as f:
                data = json.load(f)
            async with async_session_factory() as session:
                all_rew = await session.execute(select(Rewards))
                all_rew = all_rew.scalars().all()
                for person in data:
                    us_id = str(uuid.uuid4())
                    u_rew = []
                    print(data[person]['rewards'])
                    extra = data[person]['rewards'][0].split(',')
                    for rew in extra:
                        for r in all_rew:
                            # print(r.id, rew)
                            if str(rew) == str(r.id):
                                u_rew.append(r)
                                break
                    # print('награды' , u_rew)
                    # rew = [await Orm.get_or_insert_reward(reward) for reward in u_rew]
                    info_list = []
                    for year in data[person]['years']:
                        year_id = str(uuid.uuid4())
                        # print(data[person]['years'][year]['photos'])
                        if type(data[person]['years'][year]['photos']) is str:
                            if data[person]['years'][year]['photos'] != '':
                                photos = [Photo(url=data[person]['years'][year]['photos'], info_id=year_id)]
                        elif type(data[person]['years'][year]['photos']) is list:
                            photos = [Photo(url=photo, info_id=year_id) for photo in data[person]['years'][year]['photos'] if photo != '']
                        else:
                            photos = []
                        if data[person]['years'][year]['desc'] or data[person]['years'][year]['location'] or photos:
                            info_list.append(Info(id=year_id, year=Year(year), location=data[person]['years'][year]['location'], description=data[person]['years'][year]['desc'], pers_id=us_id, photos=photos))
                    print()
                    print(data[person]['photos'])
                    print()
                    pers = Person(id=us_id, name=person, description=data[person]['desc'], avatar=list(data[person]['photos'])[0] if data[person]['photos'] else None, time_added=datetime.datetime.now(), rewards=u_rew, info=info_list, status=Status.active)
                    pprint(pers)
                    session.add(pers)
                await session.commit()
                return us_id

    # @staticmethod
    # async def get_new_ppl():
    #     async with async_session_factory() as session:
    #         new_ppl = await session.execute(select(Temporary_Person).where(Temporary_Person.status == Status.new))
