from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    bot_token: str
    
    class Config:
        env_file = f'{os.path.join(os.path.dirname(__file__), ".env")}'