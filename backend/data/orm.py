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
            
            
    @staticmethod
    async def create_token(data: str = ''.join([str(random.randint(0, 100)) for _ in range(30)])):
        token, now = create_token(data)
        print(token)
        async with async_session_factory() as session:
            session.add(Tokens(_token=token, is_active=True, gen_time=str(now)))
            await session.commit()
        return token
    
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
    async def insert_person():
        async with async_session_factory() as session:
            pass
            
