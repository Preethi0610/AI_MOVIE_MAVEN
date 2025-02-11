from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import pandas as pd

server = 'localhost'
database = 'recom'
username = 'SA'
password = 'Pree2002'

DATABASE_URL = f'mssql+pymssql://{username}:{password}@{server}/{database}'
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def fetch_data(query):
    """
    Executes a raw SQL query and returns the result as a pandas DataFrame.
    """
    with engine.connect() as conn:
        
        result = conn.execute(text(query))
        
        rows = result.fetchall()
        
        df = pd.DataFrame(rows, columns=result.keys())
        return df

def get_db():
    """
    Yields a database session for use in FastAPI endpoints.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Example usage
if __name__ == "__main__":
    query = "SELECT * FROM moviess"
    movies_df = fetch_data(query)
    print(movies_df.head())

