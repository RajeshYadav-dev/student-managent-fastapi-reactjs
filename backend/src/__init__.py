from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.routers.main import student_router
from contextlib import asynccontextmanager
from src.database.main import init_database
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def life_span(app: FastAPI):
    print("Server Started..")
    init_database()
    yield
    print("Server Stopped..")

version = "v1"
app = FastAPI(
    version=version,
    lifespan=life_span,
    title="Student API",
    description="API for Students",
    contact={
        "name": "Rajesh Yadav",
        "url": "https://github.com/RajeshYadav-dev",
        "email": "rajeshyadav0565@gmail.com"
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ Allow only your React app
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods
    allow_headers=["*"],  # ✅ Allow all headers
)

# Proper string interpolation for the prefix
app.include_router(student_router, prefix=f"/api/{version}/students", tags=["student"])

app.mount("/static", StaticFiles(directory="static"), name="static")