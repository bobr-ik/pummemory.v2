import json
from pprint import pprint
from fastapi import Body, FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
import asyncmy
from contextlib import asynccontextmanager
from data import Orm
from fastapi.middleware.cors import CORSMiddleware
from data import Year
from app.models import Photo, Points, User_info, Person, Info
# from config import settings
from data import settings
from app.bot import send_to_moderation, bot, dp
from pydantic import BaseModel
# async def save_images(image: Photo):
#     # image_base64 = base64.b64encode(image).decode("utf-8")
#     # image.img_del = resp.json().data.delete_url


class MyException(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message


@asynccontextmanager
async def lifespan(app: FastAPI):
    while True:
        try:
            conn = await asyncmy.connect(
                host=settings.host,
                user=settings.user,
                password=settings.password,
                database=settings.db,
                port=int(settings.port)
            )
            await conn.ensure_closed()
            print("MySQL is ready!")
            break
        except Exception as e:
            print("Waiting for MySQL to be ready...", str(e))
            await asyncio.sleep(1)
    await Orm.create_all()
    asyncio.create_task(dp.start_polling(bot))
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


@app.exception_handler(MyException)
async def validation_exception_handler(request, exc: MyException):
    return JSONResponse(
        {
            "status": "error",
            "message": f"{exc.message}"
        }, status_code=exc.status_code)


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
    print(token)
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
    pprint(pers)
    return pers


@app.post('/insert_person')
async def insert_person(person=Body(...)):
    # await Orm.insert_temporary_person(person)
    # print(person)
    data = json.loads(person)
    token = data['token']
    if data['name'] == '':
        raise MyException(status_code=400, message='Необходимо указать имя человека.')
    # pprint(person)
    avatar = ''
    if data['avatar'] != '':
        avatar = Photo(image=data['avatar']).url
    person_general_photos = []
    if data['photo'] != '':
        for elem in data['photo']:
            img = Photo(image=elem).url
            person_general_photos.append(img)
    person = Person(
        name=data['name'],
        desc=data['desc'],
        avatar=avatar,
        rewards=data['awards'],
        general_photos=person_general_photos,
        info=[],
        sender_name=data['sender_name']
    )
    pprint(data['info'])
    for year in data['info']:
        print(data['info'][year])
        if type(data['info'][year]) is not bool:
            info = Info(
                year=year,
                location=(data['info'][year]['cord']['Lat'] + ' ' + data['info'][year]['cord']['Lng']) if data['info'][year]['cord'] != '' else '',
                story=data['info'][year]['description'],
                images=[]
            )
            for img in data['info'][year]['photo']:
                if img:
                    print(img)
                    img = Photo(image=img).url
                    info.images.append(img)
            person.info.append(info)
    print(person)
    pers_id = await Orm.insert_person(person)
    await Orm.invalidate_token(token)
    person = await Orm.get_person(pers_id)
    await send_to_moderation(person)
    return JSONResponse(status_code=200, content={'status': 'ok'})


@app.get('/get_rewards')
async def get_rewards():
    res = await Orm.get_rewards()
    # print(res)
    return res


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
