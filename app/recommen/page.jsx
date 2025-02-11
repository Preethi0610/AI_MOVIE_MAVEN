"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar"; 
import "./page.css";

const HomePage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [unexplored, setUnexplored] = useState([]);
  const [bookRecommendations, setBookRecommendations] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [likedMovies, setLikedMovies] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const userId = localStorage.getItem("id"); 
      const response = await fetch("http://localhost:8000/recommendations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setUserRecommendations(data.refined_recommendations || []); // Set only recommendations array
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  

  const fetchMovies = async () => {
    const mockMovies = [
        { movieid: 1, title: "Guntur Kaaram", subtitle: "Drama • 2023", image: "guntur.jpeg" },
        { movieid: 2, title: "Mahanati", subtitle: "Drama • 2018", image: "mahanati.jpg" },
        { movieid: 3, title: "Arjun Reddy", subtitle: "Drama • 2017", image: "arjunreddy.jpg" },
        { movieid: 4, title: "C/o Kancharapalem", subtitle: "Drama • 2018", image: "cokancharapalem.jpg" },
        { movieid: 5, title: "Jersey", subtitle: "Drama • 2019", image: "jersey.jpg" },
        { movieid: 6, title: "Eega", subtitle: "Drama • 2012", image: "eega.jpg" },
        { movieid: 7, title: "Taare Zameen Par", subtitle: "Drama • 2007", image: "taarezameenpar.jpg" },
        { movieid: 8, title: "The Pursuit of Happyness", subtitle: "Drama • 2006", image: "pursuitofhappyness.jpg" },
        { movieid: 9, title: "Forrest Gump", subtitle: "Drama • 1994", image: "forrestgump.jpg" },
        { movieid: 10, title: "The Great Gatsby", subtitle: "Drama • 2013", image: "gatsby.jpg" },
        
        { movieid: 11, title: "Baahubali: The Beginning", subtitle: "Action • 2015", image: "baahubali.jpg" },
        { movieid: 12, title: "RRR", subtitle: "Action • 2022", image: "rrr.jpg" },
        { movieid: 13, title: "Pushpa: The Rise", subtitle: "Action • 2021", image: "pushpa.jpg" },
        { movieid: 14, title: "Saaho", subtitle: "Action • 2019", image: "saaho.jpg" },
        { movieid: 15, title: "Akhanda", subtitle: "Action • 2021", image: "akhanda.jpg" },
        { movieid: 16, title: "Saripodhaa Sanivaaram", subtitle: "Action • 2023", image: "saripodhaa.jpg" },
        { movieid: 17, title: "Shershaah", subtitle: "Action • 2021", image: "shershaah.jpg" },
        { movieid: 18, title: "Mad Max: Fury Road", subtitle: "Action • 2015", image: "madmax.jpg" },
        { movieid: 19, title: "John Wick", subtitle: "Action • 2014", image: "johnwick.jpg" },
        { movieid: 20, title: "The Dark Knight", subtitle: "Action • 2008", image: "darkknight.jpg" },
        
        { movieid: 21, title: "Titanic", subtitle: "Romance • 1997", image: "titanic.jpg" },
        { movieid: 22, title: "Geetha Govindam", subtitle: "Romance • 2018", image: "geethagovindam.jpg" },
        { movieid: 23, title: "Before Sunrise", subtitle: "Romance • 1995", image: "beforesunrise.jpg" },
        { movieid: 24, title: "Sita Ramam", subtitle: "Romance • 2022", image: "sitaramam.jpg" },
        { movieid: 25, title: "The Notebook", subtitle: "Romance • 2004", image: "notebook.jpg" },
        { movieid: 26, title: "Pride and Prejudice", subtitle: "Romance • 2005", image: "prideandprejudice.jpg" },
        { movieid: 27, title: "La La Land", subtitle: "Romance • 2016", image: "lalaland.jpg" },
        { movieid: 28, title: "Me Before You", subtitle: "Romance • 2016", image: "mebeforeyou.jpg" },
        { movieid: 29, title: "The Fault in Our Stars", subtitle: "Romance • 2014", image: "faultinourstars.jpg" },
        { movieid: 30, title: "Crazy Rich Asians", subtitle: "Romance • 2018", image: "crazyrichasians.jpg" },  
      
    ];
    const mockBookMovies = [
      
        { movieid: 31, title: "The Shawshank Redemption", subtitle: "Drama • 1994", image: "shawshank.jpg" },
        { movieid: 32, title: "The Lord of the Rings: The Fellowship of the Ring", subtitle: "Fantasy • 2001", image: "lotr.jpg" },
        { movieid: 26, title: "Pride and Prejudice", subtitle: "Romance • 2005", image: "prideandprejudice.jpg" },
        { movieid: 33, title: "Harry Potter and the Sorcerer's Stone", subtitle: "Fantasy • 2001", image: "harrypotter.jpg" },
        { movieid: 34, title: "To Kill a Mockingbird", subtitle: "Drama • 1962", image: "mockingbird.jpg" },
        { movieid: 10, title: "The Great Gatsby", subtitle: "Drama • 2013", image: "gatsby.jpg" },
        { movieid: 35, title: "Little Women", subtitle: "Drama • 2019", image: "littlewomen.jpg" },
        { movieid: 36, title: "The Hunger Games", subtitle: "Action • 2012", image: "hhungergames.jpg" },
        { movieid: 37, title: "Gone Girl", subtitle: "Thriller • 2014", image: "gonegirl.jpg" },
        { movieid: 10, title: "The Fault in Our Stars", subtitle: "Romance • 2014", image: "faultinourstars.jpg" },
        { movieid: 38, title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", subtitle: "Fantasy • 2005", image: "narnia.jpg" },
        { movieid: 39, title: "Life of Pi", subtitle: "Adventure • 2012", image: "lifeofpi.jpg" }
    
      
    ];

    setRecommendations(mockMovies.filter((movie) => movie.subtitle.includes("Drama"))); 
    setTrending(mockMovies.slice(0,10));
    setPopular(mockMovies.slice(0,10));
    setUnexplored(mockMovies); 
    setBookRecommendations(mockBookMovies);
    setActionMovies(mockMovies.filter((movie) => movie.subtitle.includes("Action")));
    setRomanceMovies(mockMovies.filter((movie) => movie.subtitle.includes("Romance")));
    setDramaMovies(mockMovies.filter((movie) => movie.subtitle.includes("Drama")));
  };
   

  useEffect(() => {
    const user=localStorage.getItem("username");
    const id=localStorage.getItem("id");
    const email=localStorage.getItem("email");
    setUsername(user);
    setId(id);
    setEmail(email);
    fetchMovies();
    fetchRecommendations();
  }, []);

  const handleLike = (movieid) => {
    setLikedMovies((prevLikes) => {
      if (prevLikes.includes(movieid)) {
        return prevLikes.filter((id) => id !== movieid); 
      } else {
        return [...prevLikes, movieid]; 
      }
    });
  };

  const handleSearch = (movies) => {
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredMovies = [
    ...handleSearch(recommendations),
    ...handleSearch(trending),
    ...handleSearch(popular),
    ...handleSearch(unexplored),
    ...handleSearch(actionMovies),
    ...handleSearch(dramaMovies),
    ...handleSearch(romanceMovies),
    ...handleSearch(bookRecommendations),

  ];

  return (
    <div className="home-page">
      <Navbar />
      <br />
      <div className="search-section">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="genre-select">
          <option>All Genres</option>
          <option>Action</option>
          <option>Drama</option>
          <option>Romance</option>
          <option>Unexplored</option>
          <option>Book recommendations</option>

        </select>
      </div>

      <br />
      <div className="welcome-section">
        <h1 className="welcome-title" >Welcome, {username}!</h1> 
      </div>
      <br />


      
      {searchQuery.trim() === "" ? (
        <>
          <div className="section" id="recommendations">
            <h2>User Recommendations</h2>
            <br />
            <div className="content-slider">
              {recommendations.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} 
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="trending">
            <h2>Trending</h2>
            <br />
            <div className="content-slider">
              {trending.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} 
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="popular">
            <h2>Popular</h2>
            <br />
            <div className="content-slider">
              {popular.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} 
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="unexploredr">
            <h2>Unexplored</h2>
            <br />
            <div className="content-slider">
              {popular.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} {/* Toggle heart icon */}
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="romanceMovies">
            <h2>Romance</h2>
            <br />
            <div className="content-slider">
              {popular.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} {/* Toggle heart icon */}
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="dramaMovies">
            <h2>Drama</h2>
            <br />
            <div className="content-slider">
              {popular.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} {/* Toggle heart icon */}
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="actionMovies">
            <h2>Action</h2>
            <br />
            <div className="content-slider">
              {popular.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} {/* Toggle heart icon */}
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />
          <div className="section" id="bookRecommendations">
            <h2>Book Recommendations</h2>
            <br />
            <div className="content-slider">
              {popular.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} {/* Toggle heart icon */}
                   </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="section" id="search-results">
          <h2>Search Results</h2>
          <br />
          <div className="content-slider">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <div key={index} className="card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">{movie.subtitle}</p>
                    <button className="like-button" onClick={() => handleLike(movie.id)} >
                    {likedMovies.includes(movie.id) ? '❤️' : '🤍'} 
                   </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;