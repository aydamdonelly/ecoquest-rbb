// src/App.js

import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Impact from './pages/Impact';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import Community from './pages/Community';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userCredits, setUserCredits] = useState(0);

  const memoizedSetCurrentPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Memoize the current page component to prevent unnecessary re-renders
  const currentPageComponent = useMemo(() => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'challenges':
        return <Challenges setUserCredits={setUserCredits} />;
      case 'impact':
        return <Impact />;
      case 'profile':
        return <Profile userCredits={userCredits} setUserCredits={setUserCredits} />;
      case 'shop':
        return <Shop userCredits={userCredits} setUserCredits={setUserCredits} />;
      case 'community':
        return <Community />;
      default:
        return <Home />;
    }
  }, [currentPage, userCredits, setUserCredits]);

  return (
    <div className="App">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={memoizedSetCurrentPage}
        userCredits={userCredits}
      />
      <TransitionGroup className="page-transition">
        <CSSTransition key={currentPage} timeout={300} classNames="fade">
          {/* Ensure CSSTransition receives exactly one child */}
          <div className="page-content">{currentPageComponent}</div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default React.memo(App);
