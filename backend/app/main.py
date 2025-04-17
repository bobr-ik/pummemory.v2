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
from app.models import Token 

# from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await Orm.create_all()
    yield    

app = FastAPI(lifespan=lifespan, root_path='/api')

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(exc)
    return JSONResponse({
  "status": "error",
  "message": "Ошибка в данных запроса."
}, status_code=400)

@app.post('/create_token')
async def create_token(data: Token):
    res = await Orm.create_token()

@app.get('/check_token')
async def check_token(token: str):
    res = await Orm.check_token_validity(token)
    return JSONResponse(status_code=200, content=res)
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
