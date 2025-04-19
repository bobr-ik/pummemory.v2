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
from models import Token
from fastapi.middleware.cors import CORSMiddleware

from data.models import Year
from models import *
# from config import settings



@asynccontextmanager
async def lifespan(app: FastAPI):
    while True:
            try:
                conn = await asyncmy.connect(
                    host="db",
                    user="dak",
                    password="123456789Dak",
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
async def get_points(year: Year) -> Points:
    pass
#Принимает год
#имя фамилия отчество одним полем - name, координаты - location - cтрока черех пробел , строка, путь к изображению - аве - img_url, айдишник - id

@app.get('/user_info')
async def get_user_info(id: int) -> User_info:
    #фио - name, описание - buiography, avatar - фото профиля, rewards - медали, years : [{year: enum story: images:list[str] location:}] 
    pass

@app.post('/insert_person')
async def insert_person(person: Person):
    pass




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
