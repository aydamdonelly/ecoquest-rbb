// src/App.js

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Impact from './pages/Impact';
import Profile from './pages/Profile';
import CO2ProgressBar from './components/CO2ProgressBar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userCredits, setUserCredits] = useState(0); // State for user's credits
  const [totalCO2Saved, setTotalCO2Saved] = useState(0); // State for total CO₂ saved

  // Simulate the total CO₂ saved increasing every other second
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCO2Saved((prevTotal) => prevTotal + Math.floor(Math.random() * 10 + 1)); // Increase by 1-10 units
    }, 2000); // every other second
    return () => clearInterval(interval);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'challenges':
        return <Challenges setUserCredits={setUserCredits} />;
      case 'impact':
        return <Impact />;
      case 'profile':
        return <Profile userCredits={userCredits} setUserCredits={setUserCredits} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} userCredits={userCredits} />
      <CO2ProgressBar totalCO2Saved={totalCO2Saved} />
      {renderPage()}
    </div>
  );
}

export default App;
