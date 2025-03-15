import uuid
from sqlmodel import SQLModel,Field
from datetime import datetime



class Student(SQLModel, table=True):
    std_id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    first_name: str = Field(max_length=50)
    last_name: str = Field(max_length=50)
    email: str = Field(unique=True, max_length=100)
    password_hash :str = Field(min_length=4,max_length=15)
    phone_number: str = Field(max_length=15, nullable=True)
    date_of_birth: datetime = Field(nullable=True)
    gender: str = Field(max_length=20, nullable=True)
    address: str = Field(max_length=200, nullable=True)
    city: str = Field(max_length=50)
    state: str = Field(max_length=50)
    postal_code: str = Field(max_length=20, nullable=True)
    standard: str = Field(max_length=20)
    section: str = Field(max_length=5, nullable=True)
    roll_number: str = Field(max_length=20, nullable=True)
    enrollment_date: datetime = Field(default_factory=datetime.utcnow)
    gpa: float = Field(default=0.0, nullable=True)
    profile_pic_url: str = Field(max_length=300, nullable=True)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    guardian_name: str = Field(max_length=100, nullable=True)
    guardian_contact: str = Field(max_length=15, nullable=True)
    relationship: str = Field(max_length=50, nullable=True)

    def update_timestamp(self):
        self.updated_at = datetime.utcnow()
  