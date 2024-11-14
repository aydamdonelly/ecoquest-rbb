import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">EcoQuest</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Challenges</a></li>
        <li><a href="#">Impact</a></li>
        <li><a href="#">Community</a></li>
      </ul>
      <button className="login-button">Anmelden</button>
    </nav>
  );
}

export default Navbar;
