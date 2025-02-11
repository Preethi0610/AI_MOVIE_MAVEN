import torch
import torch.nn as nn
import numpy as np
from sqlalchemy.orm import Session
from app.models import Movie, MovieRating

# Neural Collaborative Filtering using PyTorch
class NeuralCollaborativeFiltering(nn.Module):
    def __init__(self, num_users, num_movies, embedding_dim=50):
        super(NeuralCollaborativeFiltering, self).__init__()
        self.user_embedding = nn.Embedding(num_users, embedding_dim)
        self.movie_embedding = nn.Embedding(num_movies, embedding_dim)
        self.fc1 = nn.Linear(embedding_dim * 2, 128)
        self.fc2 = nn.Linear(128, 1)

    def forward(self, user_id, movie_id):
        user_emb = self.user_embedding(user_id)
        movie_emb = self.movie_embedding(movie_id)
        x = torch.cat([user_emb, movie_emb], dim=-1)  # Concatenate user and movie embeddings
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Refine recommendations with neural model using PyTorch
def refine_with_neural_model(db: Session, user_id: int):
    """
    Refine recommendations using Neural Collaborative Filtering (PyTorch).
    """
    # Fetch data
    ratings_query = db.query(MovieRating).all()
    users = list(set([r.user_id for r in ratings_query]))  # User IDs from MovieRating table
    movies = list(set([r.movie_id for r in ratings_query]))  # Movie IDs from MovieRating table

    # Initialize movie_to_index mapping
    movie_to_index = {movie: idx for idx, movie in enumerate(movies)}
    index_to_movie = {idx: movie for movie, idx in movie_to_index.items()}  # Reverse mapping

    # Normalize user and movie IDs
    user_to_index = {user: idx for idx, user in enumerate(users)}
    index_to_user = {idx: user for user, idx in user_to_index.items()}  # Reverse mapping

    user_movie_pairs = [(r.user_id, r.movie_id) for r in ratings_query]
    ratings = [r.rating for r in ratings_query]

    # Convert to tensors
    user_tensor = torch.tensor([user_to_index[pair[0]] for pair in user_movie_pairs], dtype=torch.long)
    movie_tensor = torch.tensor([movie_to_index[pair[1]] for pair in user_movie_pairs], dtype=torch.long)
    ratings_tensor = torch.tensor(ratings, dtype=torch.float32)

    # Instantiate model
    model = NeuralCollaborativeFiltering(len(users), len(movies), embedding_dim=50)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    # Train model (you might want to add validation and more epochs)
    model.train()
    for epoch in range(10):  # Training for 10 epochs
        optimizer.zero_grad()
        predictions = model(user_tensor, movie_tensor).squeeze()
        loss = criterion(predictions, ratings_tensor)
        loss.backward()
        optimizer.step()

        print(f"Epoch {epoch + 1}, Loss: {loss.item():.4f}")

    # Generate recommendations
    model.eval()
    user_index = user_to_index.get(user_id)  # Use user_id instead of the previous variable name
    if user_index is None:
        return []  # If the user_id is not found, return an empty list

    recommended_movies = []  # List to hold recommended movie IDs

    user_tensor_test = torch.tensor([user_index] * len(movies), dtype=torch.long)
    movie_tensor_test = torch.tensor(list(movie_to_index.values()), dtype=torch.long)
    predictions = model(user_tensor_test, movie_tensor_test).squeeze()
    predicted_ratings = predictions.detach().cpu().numpy()

    for i, predicted_rating in enumerate(predicted_ratings):
        if predicted_rating > 4.0:  # Recommend movies with predicted rating > 4.0
            movie_id = index_to_movie[i]
            recommended_movies.append(movie_id)  # Only append movie ID

    return recommended_movies
