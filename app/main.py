from sqlalchemy.orm import Session
from app.recommendations import hybrid_filtering  # Import hybrid_filtering function
from app.hybrid import refine_with_neural_model  # Import neural refinement function
from app.database import get_db  # Get the database session generator

def get_initial_recommendations(db: Session, user_id: int):
    """Get initial recommendations using hybrid filtering."""
    recommendations = hybrid_filtering(db, user_id)
    return recommendations

def get_refined_recommendations(db: Session, user_id: int, initial_recommendations: list):
    """Refine recommendations using neural collaborative filtering."""
    refined_recs = refine_with_neural_model(db, user_id)
    refined_recs = [rec for rec in refined_recs if rec in initial_recommendations]
    return refined_recs

def main(user_id: int):
    """Main function to generate and refine recommendations."""
    # Get the database session
    db = next(get_db())

    try:
        # Get initial recommendations using hybrid filtering
        initial_recs = get_initial_recommendations(db, user_id)
        print(f"\nInitial Recommendations for User {user_id}:")
        for rec in initial_recs:
            print(f"- Movie ID: {rec}")

        # Refine recommendations using neural collaborative filtering
        refined_recs = get_refined_recommendations(db, user_id, initial_recs)
        print(f"\nRefined Recommendations for User {user_id}:")
        for rec in refined_recs:
            print(f"- Movie ID: {rec}")

    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        db.close()

