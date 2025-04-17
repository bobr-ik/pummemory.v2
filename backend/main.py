import os
from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.security import OAuth2PasswordBearer
import uvicorn
import asyncio
from contextlib import asynccontextmanager

from starlette.middleware.base import BaseHTTPMiddleware
from data.orm import Orm
from models import Token
from fastapi.middleware.cors import CORSMiddleware

# from config import settings



@asynccontextmanager
async def lifespan(app: FastAPI):
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
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
