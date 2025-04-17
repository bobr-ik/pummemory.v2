from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    host: str
    user: str
    password: str
    db: str
    port: str
    secret: str
    
    @property
    def db_url(self):
        return f"mysql+asyncmy://{self.user}:{self.password}@{self.host}:{self.port}/{self.db}"
    

    class Config:
        env_file = f'{os.path.join(os.path.dirname(__file__), ".env")}'


settings = Settings()
