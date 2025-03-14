from typing import Optional
import uuid
from sqlmodel import SQLModel,Field
from datetime import datetime



class Student(SQLModel, table=True):
    std_id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    first_name: str = Field(default=None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    email: str = Field(default=None, min_length=1, max_length=100)
    city: str = Field(default=None, min_length=1, max_length=100)
    standard: str = Field(default=None, min_length=1, max_length=100)
    is_active: bool = Field(default=False)
    profile_pic_url: Optional[str] = Field(default=None)
    created_at: datetime = Field(default=datetime.now())
    updated_at: datetime = Field(default=datetime.now())
  