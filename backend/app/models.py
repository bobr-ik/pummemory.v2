from pydantic import BaseModel, Field, HttpUrl, model_validator
from typing import Optional
from data import Year
import requests
from data import settings

API_KEY = settings.API_KEY


class Token(BaseModel):
    token: Optional[str] = None


class Person(BaseModel):
    name: str = Field(..., min_length=3, max_length=60, example="Иванов Иван Иванович")
    desc: str | None = Field(max_length=5000, example="Описание", default="")
    avatar: bytes | HttpUrl | None = Field(default=None)
    rewards: list['Reward'] | None | list['str'] = Field(default=None)
    info: list['Info'] | None = Field(default=None)


class Reward(BaseModel):
    name: str = Field(..., min_length=3, max_length=60, example="Медаль")
    # desc: Optional[str] = Field(..., max_length=5000, example="Описание подвига")


class Info(BaseModel):
    id: Optional[str]
    year: Year
    location: str
    story: Optional[str] = Field(..., max_length=5000, example="История")
    images: Optional[list['Photo']] = Field(default=[])


class Info_sending(BaseModel):
    id: Optional[str] = None
    year: Year
    location: Optional[str] = ''
    story: Optional[str] = Field(default='', max_length=5000, example="История")
    images: list[Optional[str]] = Field(default=[])

# class Photo(BaseModel):
#     def __init__(self, image):
#         self.image = image
#         self.url = self.send_to_imgbb()

#     def send_to_imgbb(self):
#         url = "https://api.imgbb.com/1/upload"
#         payload = {
#             'key': API_KEY,
#             'image': self.image,
#         }
#         resp = requests.post(url, data=payload)
#         resp = resp.json()
#         if resp['status_code'] != 200:
#             return None
#         return resp['data']['url']


class Photo(BaseModel):
    image: str
    url: str = Field(default=None)

    @model_validator(mode="after")
    def upload_image(self):
        if self.image.startswith('data:'):
            self.image = self.image.split(',', 1)[1]
        response = requests.post(
            "https://api.imgbb.com/1/upload",
            data={'key': API_KEY, 'image': self.image}
        )
        # response.raise_for_status()
        data = response.json()
        print()
        print(data)
        print()
        if data.get('success'):
            self.url = data['data']['url']
        else:
            raise ValueError(f"Upload failed: {data.get('error', {}).get('message', 'Unknown error')}")
        return self


class Points(BaseModel):
    name: str = Field(..., max_length=60, example="Иванов")
    surname: Optional[str] = Field(default="", max_length=60, example="Иван")
    patronymic: Optional[str] = Field(default="", max_length=60, example="Иванович")
    location: Optional[str]
    img_url: Optional[str] = Field(default="", max_length=500, example="https://example.com/avatar.jpg")
    id: str


class User_info(BaseModel):
    name: str = Field(..., max_length=60, example="Иванов Иван Иванович")
    biography: Optional[str] = Field(default="", max_length=5000, example="Описание")
    avatar: Optional[str] = Field(default="", max_length=500, example="https://example.com/avatar.jpg")
    rewards: Optional[list['Reward']] = Field(default=None)
    years: Optional[list['Info_sending']] = Field(default=None)
