"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import "./page.css"; // You can define your styles in page.css or a separate file

const ProfileDashboard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [interactionData, setInteractionData] = useState({
    totalViews: 0,
    likes: 0,
    dislikes: 0,
    comments: 0,
  });

  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  
  useEffect(() => {
    const user = localStorage.getItem("username");
    const userEmail = localStorage.getItem("email");

    const mockInteractionData = {
      totalViews: 250,
      likes: 150,
      dislikes: 50,
      comments: 30,
    };

    setUsername(user);
    setEmail(userEmail);
    setInteractionData(mockInteractionData);

    
    const mockRecommendedMovies = [
      { id: 1, title: "Movie 1", genre: "Action" },
      { id: 2, title: "Movie 2", genre: "Drama" },
      { id: 3, title: "Movie 3", genre: "Comedy" },
    ];

    setRecommendedMovies(mockRecommendedMovies);
  }, []);

  
  const handleLike = (movieId) => {
    setLikedMovies((prevLikes) => {
      if (prevLikes.includes(movieId)) {
        return prevLikes.filter((id) => id !== movieId); 
      } else {
        return [...prevLikes, movieId];
      }
    });
  };

  return (
    <div className="profile-dashboard">
      <Navbar />
      <div className="profile-header">
        <h1>Welcome, {username}</h1>
        <p>Email: {email}</p>
      </div>

      <div className="interaction-stats">
        <h2>Your Interaction Data</h2>
        <ul>
          <li>Total Views: {interactionData.totalViews}</li>
          <li>Total Likes: {interactionData.likes}</li>
          <li>Total Dislikes: {interactionData.dislikes}</li>
          <li>Total Comments: {interactionData.comments}</li>
        </ul>
      </div>

      <div className="recommended-movies">
        <h2>Recommended Movies</h2>
        <div className="movies-list">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <h3>{movie.title}</h3>
              <p>Genre: {movie.genre}</p>
              <button onClick={() => handleLike(movie.id)}>
                {likedMovies.includes(movie.id) ? "Unlike" : "Like"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="user-preferences">
        <h2>Your Preferences</h2>
        <div className="buttons">
          <button className="more-like-this">More Like This</button>
          <button className="less-like-this">Less Like This</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
