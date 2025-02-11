from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from sqlalchemy.exc import NoResultFound
from app.database import get_db  
from app.main import get_initial_recommendations, get_refined_recommendations  
from app.models import User  # Assuming you have a User model in your database

app = FastAPI()

class UserRequest(BaseModel):
    id: int  # Updated to use 'id'

# API endpoint to get recommendations for a user
@app.post("/recommendations/")
async def get_recommendations(request: UserRequest, db: Session = Depends(get_db)):
    try:
        user_id = request.id  # Use 'id' instead of 'user_id'

        # Check if the user exists in the database
        user = db.query(User).filter(User.id == user_id).first()  # Updated field to 'id'
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Get initial recommendations based on collaborative and content-based filtering
        initial_recommended_movies = get_initial_recommendations(db, user_id)

        # Refine recommendations using neural collaborative filtering
        refined_recommended_movies = get_refined_recommendations(db, user_id, initial_recommendations=initial_recommended_movies)

        # Limit the recommendations to 10 movies
        refined_recommended_movies = refined_recommended_movies[:10]

        # Return the recommendations
        return {
            "user_id": user_id,
            "initial_recommendations": initial_recommended_movies[:10],  # Limiting to 10 initial recommendations
            "refined_recommendations": refined_recommended_movies
        }

    except NoResultFound:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        # Properly raise an HTTP exception with a detailed error message
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
