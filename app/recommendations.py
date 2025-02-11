import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session
from app.models import Movie, MovieRating, User  # Assuming User model exists

def hybrid_filtering(db: Session, user_id: int):
    """
    Hybrid Filtering: Combines Collaborative Filtering and Content-Based Filtering
    to recommend movies to the user.
    """
    # Collaborative Filtering
    def collaborative_filtering():
        # Fetch user ratings matrix
        ratings_query = db.query(MovieRating).all()
        users = list(set([r.user_id for r in ratings_query]))
        movies = list(set([r.movie_id for r in ratings_query]))
        user_idx_map = {user: idx for idx, user in enumerate(users)}
        movie_idx_map = {movie: idx for idx, movie in enumerate(movies)}

        # Build User-Movie Matrix
        user_movie_matrix = np.zeros((len(users), len(movies)))
        for r in ratings_query:
            user_movie_matrix[user_idx_map[r.user_id], movie_idx_map[r.movie_id]] = r.rating

        # Similarity (User-User Collaborative Filtering)
        user_sim = cosine_similarity(user_movie_matrix)
        target_idx = user_idx_map.get(user_id, None)

        if target_idx is None:
            return []  # User not found

        similar_users = user_sim[target_idx]
        recommendations = np.argsort(-similar_users)

        # Recommend top movies from similar users
        recommended_movies = set()
        for sim_user in recommendations[1:11]:  # Skip the user itself
            user_rated_movies = user_movie_matrix[sim_user]
            movie_indices = np.where(user_rated_movies > 0)[0]
            for idx in movie_indices:
                recommended_movies.add(movies[idx])

        return recommended_movies

    # Content-Based Filtering
    def content_based_filtering():
        # Fetch user rated movies
        rated_movies = db.query(MovieRating).filter(MovieRating.user_id == user_id).all()
        if not rated_movies:
            return []  # No ratings found

        # Fetch all movies metadata
        movies_query = db.query(Movie).all()
        movie_data = {movie.movie_id: (movie.title, movie.genre, movie.description) for movie in movies_query}

        # Compute similarities based on genres
        rated_movie_ids = [r.movie_id for r in rated_movies]
        rated_movie_genres = [movie_data[movie_id][1] for movie_id in rated_movie_ids]
        all_movie_genres = [movie_data[movie.movie_id][1] for movie in movies_query]

        genre_matrix = []
        for genre in rated_movie_genres:
            genre_vector = [1 if g in genre.split(", ") else 0 for g in all_movie_genres]
            genre_matrix.append(genre_vector)

        # Using cosine similarity for simplicity
        genre_matrix = np.array(genre_matrix)
        similarity = cosine_similarity(genre_matrix)

        recommendations = set()  # Use set to avoid duplicates
        for idx in range(len(similarity)):
            if rated_movie_ids[idx] not in recommendations:
                recommendations.add(rated_movie_ids[idx])

        return recommendations

    # Combine recommendations
    collaborative_recs = collaborative_filtering()
    content_based_recs = content_based_filtering()

    # Combine and prioritize (e.g., union with weighting)
    combined_recommendations = list(collaborative_recs.union(content_based_recs))

    # Fetch movie details (titles, genre, etc.)
    recommended_movies = []
    for movie_id in combined_recommendations:
        movie = db.query(Movie).filter(Movie.movie_id == movie_id).first()
        if movie:
            recommended_movies.append({
                "title": movie.title,
                "genre": movie.genre,
                "description": movie.description
            })

    return recommended_movies
