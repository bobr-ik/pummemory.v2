from sqlalchemy import Column, Table, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
# from sqlalchemy.dialects.mysql import JSON
from data.database import Base
from typing import Optional, TypedDict
from data.database import str_256
from sqlalchemy import Text, Enum
import enum
import datetime
import bcrypt


person_rewards = Table(
    "person_rewards",
    Base.metadata,
    Column("person_id", String(256), ForeignKey("person.id"), primary_key=True),
    Column("reward_id", Integer, ForeignKey("rewards.id"), primary_key=True),
)


class Year(enum.Enum):
    _1940 = "1940"
    _1941 = "1941"
    _1942 = "1942"
    _1943 = "1943"
    _1944 = "1944"
    _1945 = "1945"


class Status(enum.Enum):
    new = "new"
    pending = "pending"
    active = "approved"
    rejected = "rejected"


class Coordinates(TypedDict):
    lat: float
    lon: float


class Person(Base):
    __tablename__ = "person"
    id: Mapped[str_256] = mapped_column(primary_key=True)
    name: Mapped[str_256]
    description: Mapped[Optional[str]] = mapped_column(Text, default="")
    time_added: Mapped[datetime.datetime] = mapped_column(default=datetime.datetime.now)
    avatar: Mapped[Optional[str_256]] = mapped_column(default="")
    general_photos: Mapped[Optional[list[str_256]]] = mapped_column(JSON, default=list)
    rewards: Mapped[Optional[list["Rewards"]]] = relationship(
        "Rewards", 
        secondary=person_rewards, 
        back_populates="ppl_got",
        cascade="save-update, merge"  # не удаляет награды, только разрывает связь
    )
    info: Mapped[list['Info']] = relationship(
        back_populates="pers",
        cascade="all, delete-orphan",  # удаляет все связанные `Info` при удалении `Person`
        passive_deletes=True  # ускоряет удаление
    )
    status: Mapped[Status] = mapped_column(Enum(Status), default=Status.new)
    sender_name: Mapped[str_256] = mapped_column(default="")


class Rewards(Base):
    __tablename__ = "rewards"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str_256]
    img_url: Mapped[str_256] = mapped_column(default="")
    ppl_got: Mapped[list["Person"]] = relationship(
        "Person", 
        secondary=person_rewards, 
        back_populates="rewards",
        cascade="save-update, merge"  # не удаляет людей, только разрывает связь
    )


class Info(Base):
    __tablename__ = "info"
    id: Mapped[str_256] = mapped_column(primary_key=True)
    year: Mapped[Year] = mapped_column(Enum(Year))
    pers_id: Mapped[int] = mapped_column(ForeignKey("person.id", ondelete="CASCADE"))  # каскад на уровне БД
    pers: Mapped["Person"] = relationship(back_populates="info")
    location: Mapped[Optional[Coordinates]] = mapped_column(JSON, default=None)
    description: Mapped[Optional[str]] = mapped_column(Text, default="")
    photos: Mapped[Optional[list["Photo"]]] = relationship(
        back_populates="info",
        cascade="all, delete-orphan",  # удаляет все связанные `Photo` при удалении `Info`
        passive_deletes=True
    )


class Photo(Base):
    __tablename__ = "photos"
    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[Optional[str_256]] = mapped_column(default=None)
    info: Mapped['Info'] = relationship(back_populates="photos")
    info_id: Mapped[int] = mapped_column(ForeignKey("info.id", ondelete="CASCADE"))  # каскад на уровне БД


class Tokens(Base):
    __tablename__ = 'tokens'
    id: Mapped[int] = mapped_column(primary_key=True)
    _token: Mapped[str_256] = mapped_column(default='')
    is_active: Mapped[bool] = mapped_column(default=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    gen_time: Mapped[str_256]

    @validates('_token')
    def hash_token(self, key, value):
        hashed = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt())
        return hashed.decode('utf-8')

    def check_token(self, raw_token: str):
        print(self._token, raw_token)
        return bcrypt.checkpw(raw_token.encode('utf-8'), self._token.encode('utf-8'))


class Temporary_Person(Base):
    __tablename__ = "temporary_person"
    id: Mapped[str_256] = mapped_column(primary_key=True)
    person: Mapped[dict] = mapped_column(JSON)
    status: Mapped[Status] = mapped_column(Enum(Status), default=Status.new)
