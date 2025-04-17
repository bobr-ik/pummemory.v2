import random
from fastapi import HTTPException
from sqlalchemy import text, insert, select, func, cast, Integer, and_, update
from data.database import async_engine, async_session_factory
from sqlalchemy.orm import aliased
from data.database import Base
from sqlalchemy.orm import joinedload, selectinload, contains_eager
from data.models import *
import jwt
from config import settings

def create_token(data):
    now = datetime.datetime.now()
    secret_key = settings.RANDOM_SECRET
    token = jwt.encode(
    {"data": data, "gen_time": str(now)},
    secret_key,
    algorithm="HS256")
    return token, now

class Orm(Base):
    @staticmethod
    async def create_all(cls):
        async with async_engine.begin() as conn:
            print('create_all')
            await conn.run_sync(Base.metadata.create_all)
            
            
    @staticmethod
    async def create_token(data: str = ''.join([str(random.randint(0, 100)) for _ in range(30)])):
        
        token, now = create_token(data)
        async with async_session_factory() as session:
            query = insert(Tokens).values(token=token, is_active=True, gen_time=str(now))
            await session.execute(query)
            await session.commit()
        return token
    
    @staticmethod
    async def check_token_validity(token: str):
        async with async_session_factory() as session:
            query = select(Tokens).filter(Tokens.check_password(token))
            res = await session.execute(query)
            res = res.scalars().first()
            if not res:
                return False
            return True
