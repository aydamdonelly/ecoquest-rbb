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
  const [totalCO2Saved, setTotalCO2Saved] = useState(325590); // State for total CO₂ saved

  // Simulate the total CO₂ saved increasing slowly towards 1,000,000
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCO2Saved((prevTotal) => {
        if (prevTotal >= 1000000) {
          clearInterval(interval);
          return 1000000;
        }
        // Increase by a small amount proportional to the remaining amount
        const remaining = 1000000 - prevTotal;
        const increment = Math.max(1, Math.floor(remaining * 0.0005)); // Adjust factor as needed
        return prevTotal + increment;
      });
    }, 1000); // every second
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
