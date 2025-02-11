from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

# User model representing the 'users' table
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)  # Primary key
    name = Column(String)  # User's name
    email = Column(String, unique=True, index=True)  # User's email, unique
    password = Column(String)  # User's password

    # Relationships
    ratings = relationship("MovieRating", back_populates="user")
    interactions = relationship("UserInteraction", back_populates="user")


# Movie model representing the 'moviess' table
class Movie(Base):
    __tablename__ = 'moviess'
    
    movie_id = Column(Integer, primary_key=True, index=True)  # Movie primary key
    title = Column(String)  # Movie title
    genre = Column(String)  # Movie genre
    description = Column(String)  # Movie description (used as 'overview')
    release_year = Column(Integer)  # Movie release year
    image = Column(String)  # Movie image URL or path

    # Relationships
    ratings = relationship("MovieRating", back_populates="movie")
    interactions = relationship("UserInteraction", back_populates="movie")


# MovieRating model representing the 'movie_ratings' table
class MovieRating(Base):
    __tablename__ = 'movie_ratings'
    
    rating_id = Column(Integer, primary_key=True, index=True)  # Rating ID
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))  # User's ID, cascade delete
    movie_id = Column(Integer, ForeignKey('moviess.movie_id', ondelete='CASCADE'))  # Movie's ID, cascade delete
    rating = Column(Float)  # Rating value

    # Relationships
    user = relationship("User", back_populates="ratings")
    movie = relationship("Movie", back_populates="ratings")


# UserInteraction model representing the 'user_interactions' table
class UserInteraction(Base):
    __tablename__ = 'user_interactions'
    
    interaction_id = Column(Integer, primary_key=True, index=True)  # Interaction ID
    user_id = Column(Integer, ForeignKey('users.id'))  # User's ID
    movie_id = Column(Integer, ForeignKey('moviess.movie_id'))  # Movie's ID
    interaction_type = Column(String)  # Interaction type (e.g., like, click)
    timestamp = Column(DateTime)  # Interaction timestamp

    # Relationships
    user = relationship("User", back_populates="interactions")
    movie = relationship("Movie", back_populates="interactions")
