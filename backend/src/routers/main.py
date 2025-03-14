import os
import shutil
from uuid import uuid4
import uuid
from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlmodel import Session
from src.services.main import StudentServices
from src.database.main import get_session
from src.schemas.main import UserCreate, UserUpdate, UserShow
from typing import List

# Ensure uploads directory exists
UPLOAD_DIR = "static/uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

student_router = APIRouter()
services = StudentServices()

@student_router.get("/", response_model=List[UserShow])
async def get_all_students(session: Session = Depends(get_session), offset: int = 0, limit:int = Query(default=100,lte=100)):
    students = await services.get_all_students_ser(session, offset, limit)
    if not students:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No students found.")
    return students

@student_router.get("/{std_id}", response_model=UserShow)
async def get_a_student(std_id: str, session: Session = Depends(get_session)):
    student = await services.get_a_students_ser(std_id, session)
    return student

@student_router.post("/", response_model=UserShow)
async def create_a_student(std_data: UserCreate, session: Session = Depends(get_session)):
    student = await services.create_a_students_ser(std_data, session)
    return student

@student_router.put("/{std_id}", response_model=UserShow)
async def update_a_student(std_id: str, std_data: UserUpdate, session: Session = Depends(get_session)):
    student = await services.update_a_students_ser(std_id, std_data, session)
    return student

@student_router.delete("/{std_id}", response_model=dict)
async def delete_a_student(std_id: str, session: Session = Depends(get_session)):
    await services.delete_a_students_ser(std_id, session)
    return {"message": "Student deleted"}

@student_router.post("/{std_id}/upload", include_in_schema=False)
async def upload_profile_pic(std_id: str, file: UploadFile = File(...),session: Session = Depends(get_session)):
    file_ext = file.filename.split(".")[-1]
    file_name = f"{std_id}_{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    await services.update_student_picture(std_id, file_name, session)
    file_url = f"/static/uploads/{file_name}"
    return {"profile_pic_url": file_url}
