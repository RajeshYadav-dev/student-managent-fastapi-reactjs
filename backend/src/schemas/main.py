
import datetime
from typing import Optional
from sqlmodel import Field, SQLModel
import uuid


class UserShow(SQLModel):
  std_id : uuid.UUID
  first_name : str 
  last_name : str | None 
  email : str 
  city : str 
  standard : str 
  is_active : bool  
  profile_pic_url: Optional[str] = None
  created_at: datetime.datetime
  updated_at: datetime.datetime
 
   
class UserCreate(SQLModel):
  first_name : str 
  last_name : str | None 
  email : str 
  city : str 
  standard : str 
  is_active : bool 

  
class UserUpdate(SQLModel):
  first_name : str 
  last_name : str | None 
  email : str 
  city : str 
  standard : str 
  is_active : bool  
  updated_at: datetime.datetime = Field(default=datetime.datetime.now()) 
  
  