from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    token: Optional[str] = None