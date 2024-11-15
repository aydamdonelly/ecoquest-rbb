// src/pages/Challenges.js

import React from 'react';

function Challenges({ setUserCredits }) {
  const handleCompleteChallenge = () => {
    setUserCredits((prevCredits) => prevCredits + 10); // Increase credits by 10
  };

  return (
    <div className="p-5 text-cream font-sans">
      <h1 className="text-3xl font-bold mb-5">Challenges</h1>
      <p>Complete challenges to earn credits!</p>
      <button
        onClick={handleCompleteChallenge}
        className="mt-4 px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
      >
        Complete Challenge
      </button>
    </div>
  );
}

export default Challenges;
