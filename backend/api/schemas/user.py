from pydantic import BaseModel, Field
from typing import Optional
from tortoise.contrib.pydantic import pydantic_model_creator
from api.models.user import User

GetUser = pydantic_model_creator(User, name="User")

class PostUser(BaseModel):
    username: str = Field(..., max_length=50)
    email: str = Field(..., max_length=100)
    password: str = Field(..., min_length=8)

class PutUser(BaseModel):
    username: Optional[str] = Field(None, max_length=50)
    email: Optional[str] = Field(None, max_length=100)
    password: Optional[str] = Field(None, min_length=8)


