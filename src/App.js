// src/App.js

import React, { useState, useCallback } from 'react';
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

  const memoizedSetCurrentPage = useCallback(setCurrentPage, []);

  return (
    <div className="App">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={memoizedSetCurrentPage}
        userCredits={userCredits}
      />
      <TransitionGroup className="page-transition">
        <CSSTransition key={currentPage} timeout={300} classNames="fade">
          {currentPage === 'home' && <Home />}
          {currentPage === 'challenges' && (
            <Challenges setUserCredits={setUserCredits} />
          )}
          {currentPage === 'impact' && <Impact />}
          {currentPage === 'profile' && (
            <Profile userCredits={userCredits} setUserCredits={setUserCredits} />
          )}
          {currentPage === 'shop' && (
            <Shop userCredits={userCredits} setUserCredits={setUserCredits} />
          )}
          {currentPage === 'community' && <Community />}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default React.memo(App);
