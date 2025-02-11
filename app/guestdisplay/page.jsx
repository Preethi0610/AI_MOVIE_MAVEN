"use client";

import React, { useState, useEffect } from "react";
import "./page.css";

const GuestNavbar = ({ onUnexploredClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserIconClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Hide message after 3 seconds
  };
  const handleUnexploredClick = () => {
    onUnexploredClick(); // Trigger the parent function to show the message
  };
  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-logo">AI MOVIE MAVEN</h1>
        <ul className="navbar-links desktop-only">
          <li><a href="#trending">Trending</a></li>
          <li><a href="#popular">Popular</a></li>
          <li><a href="#crime">Crime</a></li>
          <li><a href="#Unexplored" onClick={handleUnexploredClick}>Unexplored</a></li>

        </ul>
        <div className="navbar-icons">
          <span onClick={toggleSidebar} className="hamburger-icon">☰</span>
          <span hidden>🔍</span>
          <span style={{ cursor: "pointer" }} onClick={handleUserIconClick}>
            👤
          </span>
        </div>
      </nav>

      {/* Message on clicking the user icon */}
      {showMessage && (
        <div className="message" style={{fontweight:"bold", color: "red"}}>
          You need to register in order to get a personalized dashboard.
        </div>
      )}

      {/* Sidebar for mobile view */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={toggleSidebar}>&times;</span>
        <ul className="sidebar-links">
          
          <li><a href="#trending" onClick={toggleSidebar}>Trending</a></li>
          <li><a href="#popular" onClick={toggleSidebar}>Popular</a></li>
          <li><a href="#crime" onClick={toggleSidebar}>Crime</a></li>
          <li><a href="#action" onClick={toggleSidebar}>Action</a></li>
          <li><a href="#romance" onClick={toggleSidebar}>Romance</a></li>
          <li><a href="#unexplored" onClick={toggleSidebar}>UNEXPLORED</a></li>
        </ul>
      </div>

      {/* Overlay to close the sidebar when clicking outside */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

const GuestDisplay = () => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    crime: [],
  });

  const [showUnexploredMessage, setShowUnexploredMessage] = useState(false);
  
  const fetchMovies = async () => {
    const mockMovies = [
      { title: "Bahubali 2, The End", subtitle: "Drama • 2021", image: "bahu.jpeg" },
      { title: "Harry Potter", subtitle: "Sci-Fi • 2002", image: "harry.jpeg" },
      { title: "Guntur Kaaram", subtitle: "Drama • 2023", image: "guntur.jpeg" },
      { title: "Avengers", subtitle: "Action • 2022", image: "marvel.jpeg" },
      { title: "HIT3", subtitle: "Crime • 2023", image: "hit.jpeg" },
      { title: "John Wick", subtitle: "Action • 2023", image: "johnwick.jpeg" },
      { title: "kung fu Panda", subtitle: "Comedy • 2023", image: "kunfu.jpg" },
      { title: "Kalki", subtitle: "Sci-Fi • 2023", image: "kalki.jpeg" },
    ];

    setMovies({
      trending: mockMovies,
      popular: mockMovies,
      crime: mockMovies.filter(movie => movie.subtitle.includes('Crime'))
    });
  };

  const handleUnexploredClick = () => {
    setShowUnexploredMessage(true);
    setTimeout(() => {
      setShowUnexploredMessage(false);
    }, 9000); // Hide message after 3 seconds
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      {/* Render the GuestNavbar */}
      <GuestNavbar onUnexploredClick={handleUnexploredClick}/>

      {/* Message for Unexplored Section */}
      {showUnexploredMessage && (
        <div className="message" style={{ fontWeight: "bold", color: "red" }}>
          Oops! Did you register yet?
        </div>
      )}
      
      
      {/* Content of the Guest Display Page */}
      <div className="guest-display-content">
        <h2 >Welcome to AI Movie Maven!</h2>
        <p >Explore the latest trends, popular movies, and more!</p>
        <p >
        <span >Sign up</span> to get tailored recommendations and a personalized dashboard. 
        <a href="/register" style={{ color: 'blue', fontWeight: 'light' }}>Sign up now.</a>
       </p>
      </div>

      {/* Trending Movies Section */}
      <div className="section" id="trending">
        <h2 className="section-title" style={{fontweight:"bold", color: "red"}}>Trending</h2>
        <div className="content-slider">
          {movies.trending.map((movie, index) => (
            <div key={index} className="card">
              <img src={movie.image} alt={movie.title} className="card-image" />
              <div className="card-overlay">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-subtitle">{movie.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="section" id="popular">
        <h2 className="section-title" style={{fontweight:"bold", color: "red"}}>Popular</h2>
        <div className="content-slider">
          {movies.popular.map((movie, index) => (
            <div key={index} className="card">
              <img src={movie.image} alt={movie.title} className="card-image" />
              <div className="card-overlay">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-subtitle">{movie.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crime Movies Section */}
      <div className="section" id="crime">
        <h2 className="section-title" style={{fontweight:"bold", color: "red"}}>Crime</h2>
        <div className="content-slider">
          {movies.crime.map((movie, index) => (
            <div key={index} className="card">
              <img src={movie.image} alt={movie.title} className="card-image" />
              <div className="card-overlay">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-subtitle">{movie.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestDisplay;
