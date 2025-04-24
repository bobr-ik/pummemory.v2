from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    host: str
    user: str
    password: str
    db: str
    port: str
    secret: str
    API_KEY: str
    TOKEN: str
    ADMIN_CHAT_ID: str
    ADMIN_TOKEN: str
    
    @property
    def db_url(self):
        # f"postgresql+asyncpg://{self.POSTGRES_USERNAME}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DATABASE}"
        return f"mysql+asyncmy://{self.user}:{self.password}@{self.host}:{self.port}/{self.db}"
    class Config:
        env_file = f'{os.path.join(os.path.dirname(__file__), ".env")}'


settings = Settings()


