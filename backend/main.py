import os
from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.security import OAuth2PasswordBearer
import uvicorn
import asyncio, asyncmy
from contextlib import asynccontextmanager

from starlette.middleware.base import BaseHTTPMiddleware
from data.orm import Orm
from fastapi.middleware.cors import CORSMiddleware

from data.models import Year
from app.models import *
# from config import settings

import base64
from data.config import settings
import requests


async def save_images(image: Photo):
    image_base64 = base64.b64encode(image).decode("utf-8")
    url = "https://api.imgbb.com/1/upload"
    payload = {
        'key': api_key,
        'image': image_base64,
    }
    resp = requests.post(url, data=payload)
    image.url = resp.json().data.url
    image.img_del = resp.json().data.delete_url


@asynccontextmanager
async def lifespan(app: FastAPI):
    while True:
            try:
                conn = await asyncmy.connect(
                    host="db",
                    user="dak",
                    password="200209318Dak()",
                    database="pummemory_test",
                    port=3306
                )
                await conn.ensure_closed()
                print("MySQL is ready!")
                break
            except Exception as e:
                print("Waiting for MySQL to be ready...", str(e))
                await asyncio.sleep(1)
    await Orm.create_all()
    yield    


api_key = settings.API_KEY
app = FastAPI(lifespan=lifespan, root_path='/api')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешает все домены, можно указать список доменов, например: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Разрешены все методы HTTP
    allow_headers=["*"],  # Разрешены все заголовки
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(exc)
    return JSONResponse({
  "status": "error",
  "message": "Ошибка в данных запроса."
}, status_code=400)


@app.post('/create_token')
async def create_token():
    res = await Orm.create_token()
    return res


@app.get('/check_token')
async def check_token(token: str):
    res = await Orm.check_token_validity(token)
    return JSONResponse(status_code=200, content=res)


@app.get('/get_points')
async def get_points(year: Year) -> list[Points]:
    #Принимает год
    #имя фамилия отчество одним полем - name, координаты - location - cтрока черех пробел , строка, путь к изображению - аве - img_url, айдишник - id
    
    res = await Orm.get_points(year)
    print(res)
    return res


@app.get('/user_info')
async def get_user_info(id: int) -> User_info:
    #фио - name, описание - buiography, avatar - фото профиля, rewards - медали, years : [{year: enum story: images:list[str] location:}] 
    pers = await Orm.get_person(id)
    return pers


@app.post('/insert_person')
async def insert_person(person):
    # await Orm.insert_temporary_person(person)
    print(person)
    
    avatar = await save_images(person.avatar)
    person.avatar = avatar
    for year in person.info:
        year.images = [await save_images(image) for image in year.images]
    await Orm.insert_person(person)
    
@app.get('/get_rewards')
async def get_rewards():
    res = await Orm.get_rewards()
    print(res)
    return res

@app.get('/new_ppl')
async def get_new_ppl():
    res = await Orm.get_new_ppl()
    print(res)
    return res


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
