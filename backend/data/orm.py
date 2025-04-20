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

def create_token(data):
    now = datetime.datetime.now()
    secret_key = settings.secret
    token = jwt.encode(
    {"data": data, "gen_time": str(now)},
    secret_key,
    algorithm="HS256")
    return token, now

class Orm:   
    @staticmethod
    async def create_all():
        async with async_engine.begin() as conn:
            print('create_all')
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)
            
            
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
                query = insert(Rewards).values(title=reward.title, desc=reward.desc)
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
                info.id = str(uuid.uuid4()) + str(info.year)
                info.images = [Photo(url=photo.url, url_delete=photo.img_del, info_id=info.id) for photo in info.images]
                info_list.append(Info(id=info.id, year=info.year, place=info.place, desc=info.story, pers_id=us_id, photos=info.images))
            await session.add(Person(id=us_id, name=person.name, desc=person.desc, time_added=datetime.datetime.now(), rewards=rew, info=info_list))
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
                'biography': res.desc,
                'avatar': res.avatar,
                'rewards': [reward.title for reward in res.rewards],
                'years': [{'year': info.year, 'place': info.place, 'story': info.desc, 'images': [photo.url for photo in info.photos]} for info in res.info]
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
            ans = [{
                'name': info.pers.name,
                'location': info.place,
                'img_url': info.pers.avatar,
                'id': info.pers.id
                } for info in res
                ]
            return ans