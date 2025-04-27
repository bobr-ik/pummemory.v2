from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    host: str
    user: str
    password: str
    db: str  # имя базы данных
    port: str
    secret: str
    API_KEY: str  # ключ для ImgBB
    TOKEN: str  # токен для тг бота
    ADMIN_CHAT_ID: str  # id чата админа
    ADMIN_TOKEN: str  # токен админа

    @property
    def db_url(self):
        return f"mysql+asyncmy://{self.user}:{self.password}@{self.host}:{self.port}/{self.db}"

    class Config:
        env_file = f'{os.path.join(os.path.dirname(__file__), ".env")}'


settings = Settings()
