from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models import Base

DATABASE_URL = "postgresql://admin:admin123@postgres:5432/worldops"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base.metadata.create_all(bind=engine)