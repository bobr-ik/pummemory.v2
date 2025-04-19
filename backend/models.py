from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Optional
from data.models import Year, Coordinates

class Token(BaseModel):
    token: Optional[str] = None

    
class Person(BaseModel):
    name: str = Field(..., min_length = 3, max_length=60, example = "Иванов Иван Иванович")
    desc: Optional[str] = Field(..., max_length=500, example = "Описание")
    rewards: Optional[list['Reward']]
    info: Optional[list['Info']]
    
class Reward(BaseModel):
    title: str = Field(..., min_length = 3, max_length=60, example = "Медаль")
    desc: Optional[str] = Field(..., max_length=500, example = "Описание подвига")

class Info(BaseModel):
    year: Year
    place: Coordinates
    story: Optional[str] = Field(..., max_length=500, example = "История")
    images: Optional[list['Photo']]
    
class Photo(BaseModel):
    url: bytes


class Points(BaseModel):
     name: str = Field(..., min_length = 3, max_length=60, example = "Иванов Иван Иванович")
     location: str
     img_url: HttpUrl
     id: int
     
     @field_validator("location")
     def location_must_split_to_2_parts(cls, value: str) -> str:
        assert len(value.split()) == 2, "location must split to 2 parts"
        return value
    
class User_info(BaseModel):
     name: str = Field(..., min_length = 3, max_length=60, example = "Иванов Иван Иванович")
     biography: Optional[str] = Field(..., max_length=500, example = "Описание")
     avatar: Optional[str] = Field(..., max_length=500, example = "https://example.com/avatar.jpg")
     rewards: Optional[list['Reward']]
     years: Optional[list['Info']]