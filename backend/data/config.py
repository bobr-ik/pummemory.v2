from pydantic import BaseSettings


class Settings(BaseSettings):
    host: str
    user: str
    password: str
    db: str
    host: str
    name: str
    
    @property
    def db_url(self):
        return f"mysql+asyncmy://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"
    

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
