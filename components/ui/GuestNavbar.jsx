import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
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

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-logo">AI MOVIE MAVEN</h1>
        <ul className="navbar-links desktop-only">
          <li><a href="#trending">Trending</a></li> 
          <li><a href="#popular">Popular</a></li>
          <li><a href="#crime">Crime</a></li>
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
        <div className="message">
          You need to register in order to get a personalized dashboard.
        </div>
      )}

      {/* Sidebar for mobile view */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={toggleSidebar}>&times;</span>
        <ul className="sidebar-links">
          <li><a href="#trending" onClick={toggleSidebar}>Trending</a></li>
          <li><a href="#popular" onClick={toggleSidebar}>Popular</a></li>
          <li><a href="#popular" onClick={toggleSidebar}>Crime</a></li>
        </ul>
      </div>

      {/* Overlay to close the sidebar when clicking outside */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
