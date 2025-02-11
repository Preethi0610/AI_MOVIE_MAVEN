"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import * as React from "react";

export default function Home() {
  const handleGuestClick = () => {
    window.location.href = "/guestdisplay";
  };

  const handleRegisteredUserClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className="background">
      <div className="container">
        <div className="titleposition">
          <h1 className="title">AI Movie Maven</h1>
          <button className="button">Get Started</button>
        </div>

        <div className="user-options" style={{ marginLeft: "40px"
        }}>
          {/* Registered User */}
          <div
            className="user-option registered-user"
            onClick={handleRegisteredUserClick}
          >
            <div className="icon-container">
              <img
                src="/registered.png"
                alt="Registered User"
                className="user-icon"
              />
            </div>
            <p className="user-text" style={{fontFamily: "times new roman", color:"white", fontWeight:"bolder"}}>Registered/New User</p>
          </div>

          {/* Guest User */}
          <div className="user-option guest-user" onClick={handleGuestClick}>
            <div className="icon-container">
                <FontAwesomeIcon icon={faUser} style={{fontSize:"30px" }} />
              {/* <img
                src="/gue.png"
                alt="Guest User"
                className="user-icon"
              /> */}
            </div>
            <p className="user-text" style={{fontFamily: "times new roman", color:"white", fontWeight:"bolder"}}>Guest User</p>
          </div>
        </div>
      </div>
    </div>
  );
}
