from sqlmodel import create_engine,Session,SQLModel


DATABASE_URL = "sqlite:///database.db"
connect_args = {"check_same_thread": False}
engine = create_engine(url=DATABASE_URL,connect_args=connect_args,echo=True)


def init_database():
  # SQLModel.metadata.drop_all(engine)
  SQLModel.metadata.create_all(engine)
  
def get_session():
  with Session(engine) as session:
    yield session 