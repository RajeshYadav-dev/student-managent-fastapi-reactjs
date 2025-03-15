import datetime
from typing import Optional
from sqlmodel import Field, SQLModel

class UserShow(SQLModel):
    std_id: str  # Store UUID as a string
    first_name: str
    last_name: Optional[str] = None
    email: str
    phone_number: Optional[str] = None
    date_of_birth: Optional[datetime.datetime] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: str
    state: str
    postal_code: Optional[str] = None
    standard: str
    section: Optional[str] = None
    roll_number: Optional[str] = None
    enrollment_date: datetime.datetime
    gpa: Optional[float] = None
    profile_pic_url: Optional[str] = None
    is_active: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime
    guardian_name: Optional[str] = None
    guardian_contact: Optional[str] = None
    relationship: Optional[str] = None

class UserCreate(SQLModel):
    # std_id: str = Field(default_factory=lambda: str(uuid.uuid4()))  # Generate UUID as a string
    first_name: str = Field(..., max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)
    email: str = Field(..., max_length=100, regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    password:str = Field(min_length=4,max_length=15,nullable=True)
    phone_number: Optional[str] = Field(None, max_length=15)
    date_of_birth: Optional[datetime.datetime] = Field(None)
    gender: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = Field(None, max_length=200)
    city: str = Field(..., max_length=50)
    state: str = Field(..., max_length=50)
    postal_code: Optional[str] = Field(None, max_length=20)
    standard: str = Field(..., max_length=20)
    section: Optional[str] = Field(None, max_length=5)
    roll_number: Optional[str] = Field(None, max_length=20)
    enrollment_date: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    gpa: Optional[float] = Field(default=0.0)
    profile_pic_url: Optional[str] = Field(None, max_length=300)
    is_active: bool = Field(default=True)
    guardian_name: Optional[str] = Field(None, max_length=100)
    guardian_contact: Optional[str] = Field(None, max_length=15)
    relationship: Optional[str] = Field(None, max_length=50)

class UserUpdate(SQLModel):
    first_name: Optional[str] = Field(None, max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)
    email: Optional[str] = Field(None, max_length=100, regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    phone_number: Optional[str] = Field(None, max_length=15)
    date_of_birth: Optional[datetime.datetime] = Field(None)
    gender: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = Field(None, max_length=200)
    city: Optional[str] = Field(None, max_length=50)
    state: Optional[str] = Field(None, max_length=50)
    postal_code: Optional[str] = Field(None, max_length=20)
    standard: Optional[str] = Field(None, max_length=20)
    section: Optional[str] = Field(None, max_length=5)
    roll_number: Optional[str] = Field(None, max_length=20)
    enrollment_date: Optional[datetime.datetime] = Field(None)
    gpa: Optional[float] = Field(None)
    profile_pic_url: Optional[str] = Field(None, max_length=300)
    is_active: Optional[bool] = None
    guardian_name: Optional[str] = Field(None, max_length=100)
    guardian_contact: Optional[str] = Field(None, max_length=15)
    relationship: Optional[str] = Field(None, max_length=50)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    
class UserLogin(SQLModel):
    email: str = Field(..., max_length=100, regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    password:str = Field(min_length=4,max_length=15,nullable=True)   
