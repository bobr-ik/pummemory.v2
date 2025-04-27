import json
from pprint import pprint
from fastapi import Body, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
import asyncmy
from contextlib import asynccontextmanager
from data import Orm
from fastapi.middleware.cors import CORSMiddleware
from data import Year
from app import Photo, Points, User_info, Person, Info
# from config import settings
import base64
from data import settings
import requests


# async def save_images(image: Photo):
#     # image_base64 = base64.b64encode(image).decode("utf-8")
    
#     # image.img_del = resp.json().data.delete_url


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
    return JSONResponse(
        {
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


@app.get('/check_token_if_admin')
async def check_token_if_admin(token: str):
    res = await Orm.check_token_if_admin(token)
    return JSONResponse(status_code=200, content=res)


@app.get('/get_points')
async def get_points(year: Year) -> list[Points]:
    # Принимает год
    # имя фамилия отчество одним полем - name, координаты - location - cтрока черех пробел , строка, путь к изображению - аве - img_url, айдишник - id
    res = await Orm.get_points(year)
    print(res)
    return res


@app.get('/user_info')
async def get_user_info(id: str) -> User_info:
    # фио - name, описание - buiography, avatar - фото профиля, rewards - медали, years : [{year: enum story: images:list[str] location:}]
    pers = await Orm.get_person(id)
    print(pers)
    return pers


@app.post('/insert_person')
async def insert_person(person=Body(...)):
    # await Orm.insert_temporary_person(person)
    # print(person)
    person = json.loads(person)
    pprint(person)
    person = Person(
        name=person['name'],
        description=person['desc'],
        avatar=person['avatar'],
        rewards=person['awards'],
        info=[]
    )
    for year in person['info']:
        info = Info(
            year=year,
            location=person['info'][year]['cord']['Lat'] + ' ' + person['info'][year]['cord']['Lng'],
            story=person['info'][year]['description'],
            images=[Photo(image=photo) for photo in person['info'][year]['photo']]
        )
        person.info.append(info)
    await Orm.insert_person(person)
    return JSONResponse(status_code=200, content={'status': 'ok'})

    # info_list = ['1940', '1940-cord', '1940-photo', '1941', '1941-cord', '1941-photo', '1942', '1942-cord', '1942-photo', '1943', '1943-cord', '1943-photo', '1944', '1944-cord', '1944-photo', '1945', '1945-cord', '1945-photo']
    # true_info = []
    # pprint(person['info'])
    # for i in range(0, len(info_list), 3):
    #     year_keys = info_list[i:i + 3]
    #     year_info = {}
    #     for key in year_keys:
    # # print()
    # pprint('true_info', true_info)
    # print()
    # # true_rewards = await Orm.get_rewards_from_list(person['awards'])
    # true_person = Person(
    #     avatar=person['avatar'],
    #     name=person['name'],
    #     description=person['description'] if 'description' in person else '',
    #     rewards=person['info']['awards'] if 'awards' in person['info'] else [],
    #     info=true_info
    # )
    # # avatar = await save_images(true_person.avatar)
    # # true_person.avatar = avatar
    # # for year in true_person.info:
    # #     year.images = [await save_images(image) for image in year.images]
    # # print(true_person)
    # await Orm.insert_person(true_person)


@app.get('/get_rewards')
async def get_rewards():
    res = await Orm.get_rewards()
    # print(res)
    return res


@app.get('/new_ppl')
async def get_new_ppl():
    res = await Orm.get_new_ppl()
    print(res)
    return res


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
