from sqlalchemy import Boolean, Column, Table, Integer, String, MetaData, ForeignKey, and_, func, JSON, ARRAY, UniqueConstraint, Date, or_
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
from sqlalchemy.dialects.postgresql import JSONB
from data.database import Base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
import enum, datetime
from typing import Annotated, Optional, TypedDict
from data.database import str_256
from sqlalchemy import Text, Enum
import bcrypt

# person_rewards = Table(
#     "person_rewards",
#     Base.metadata,
#     Column("person_id", Integer, ForeignKey("person.id"), primary_key=True),
#     Column("reward_id", Integer, ForeignKey("rewards.id"), primary_key=True),
# )


# class Year(enum.Enum):
#     _1940 = "1940"
#     _1941 = "1941"
#     _1942 = "1942"
#     _1943 = "1943"
#     _1944 = "1944"
#     _1945 = "1945"
    
# class Coordinates(TypedDict):
#     lat: float
#     lon: float


# class Person(Base):
#     __tablename__ = "person"
#     id: Mapped[int] = mapped_column(primary_key=True)
#     name: Mapped[str_256]
#     desc: Mapped[Optional[Text]] = mapped_column(default = "")
#     time_added: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.now)
#     rewards: Mapped[Optional[list["Rewards"]]] = relationship("Rewards", secondary=person_rewards, back_populates="ppl_got", default = [])
#     info: Mapped[list['Info']] = relationship(back_populates="pers")


# class Rewards(Base):
#     __tablename__ = "rewards"
#     id: Mapped[int] = mapped_column(primary_key=True)
#     title: Mapped[str_256]
#     desc: Mapped[Optional[Text]] = mapped_column(default ="")
#     ppl_got: Mapped[list["Person"]] = relationship("Person", secondary=person_rewards, back_populates="rewards")
    

# class Info(Base):
#     __tablename__ = "info"
#     id: Mapped[int] = mapped_column(primary_key=True)
#     year: Mapped[Year] = mapped_column(Enum(Year))
#     pers: Mapped[list["Person"]] = relationship(back_populates="info")
#     place: Mapped[Optional[Coordinates]] = mapped_column(JSONB, default=None)
#     desc: Mapped[Optional[Text]] = mapped_column(default="")
#     photos: Mapped[Optional[list["Photo"]]] = relationship(back_populates="year")
    
# class Photo(Base):
#     __tablename__ = "photos"
#     id: Mapped[int] = mapped_column(primary_key=True)
#     year: Mapped[Year] = mapped_column(Enum(Year))  # Указан правильный тип Enum для Year
#     url: Mapped[str_256]
#     pers_id: Mapped[int] = mapped_column(ForeignKey("person.id"))
#     info: Mapped['Info'] = relationship(back_populates="photo")


class Tokens(Base):
    __tablename__ = 'tokens'

    _token: Mapped[str_256] = mapped_column("token", primary_key=True)
    is_active: Mapped[bool] = mapped_column(default=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    gen_time: Mapped[str_256]

    @property
    def token(self):
        raise AttributeError("Токен нельзя прочитать напрямую.")

    @token.setter
    def token(self, value: str):
        hashed = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt())
        self._token = hashed.decode('utf-8')  # <--- fix здесь

    def check_token(self, raw_token: str):
        return bcrypt.checkpw(raw_token.encode('utf-8'), self._token.encode('utf-8'))


    
    
    
    
    