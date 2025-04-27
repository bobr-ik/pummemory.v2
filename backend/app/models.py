from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Optional
from data.models import Year, Coordinates

class Token(BaseModel):
    token: Optional[str] = None

    
class Person(BaseModel):
    name: str = Field(..., min_length = 3, max_length=60, example = "Иванов Иван Иванович")
    desc: Optional[str] = Field(..., max_length=5000, example = "Описание")
    avatar: bytes|HttpUrl
    rewards: Optional[list['Reward']]
    info: Optional[list['Info']]
    
class Reward(BaseModel):
    title: str = Field(..., min_length = 3, max_length=60, example = "Медаль")
    desc: Optional[str] = Field(..., max_length=5000, example = "Описание подвига")

class Info(BaseModel):
    id: Optional[str]
    year: Year
    location: str
    story: Optional[str] = Field(..., max_length=5000, example = "История")
    images: Optional[list['Photo']]
    
class Photo(BaseModel):
    url: bytes|HttpUrl
    img_del: Optional[HttpUrl]


class Points(BaseModel):
     name: str = Field(..., min_length = 3, max_length=60, example = "Иванов")
     surname: Optional[str] = Field(..., min_length = 3, max_length=60, example = "Иван")
     patronymic: Optional[str] = Field(..., min_length = 3, max_length=60, example = "Иванович")
     location: Optional[str]
     img_url: Optional[HttpUrl] = Field(..., max_length=500, example = "https://example.com/avatar.jpg")
     id: str

    
class User_info(BaseModel):
     name: str = Field(..., min_length = 3, max_length=60, example = "Иванов Иван Иванович")
     biography: Optional[str] = Field(..., max_length=5000, example = "Описание")
     avatar: Optional[list[HttpUrl]] = Field(..., max_length=500, example = "https://example.com/avatar.jpg")
     rewards: Optional[list['Reward']]
     years: Optional[list['Info']]