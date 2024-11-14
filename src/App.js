import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Impact from './pages/Impact';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'challenges':
        return <Challenges />;
      case 'impact':
        return <Impact />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
      />
      <div className="flex-grow">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
