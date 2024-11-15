// src/pages/Challenges.js

import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaBicycle, FaRecycle, FaLeaf } from 'react-icons/fa';
import 'react-circular-progressbar/dist/styles.css';

const challengesData = [
  {
    id: 1,
    category: 'Transportation',
    icon: <FaBicycle className="text-greenLight w-8 h-8" />,
    title: 'Ride a bike to work',
    progress: 50,
  },
  {
    id: 2,
    category: 'Recycling',
    icon: <FaRecycle className="text-greenLight w-8 h-8" />,
    title: 'Recycle waste',
    progress: 30,
  },
  {
    id: 3,
    category: 'Energy',
    icon: <FaLeaf className="text-greenLight w-8 h-8" />,
    title: 'Use energy-efficient appliances',
    progress: 70,
  },
  // ... Add more challenges as needed
];

function Challenges({ setUserCredits }) {
  const [challenges, setChallenges] = useState(challengesData);

  const handleCompleteChallenge = (id) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === id
          ? { ...challenge, progress: Math.min(challenge.progress + 10, 100) }
          : challenge
      )
    );
    setUserCredits((prevCredits) => prevCredits + 10); // Increase credits by 10
  };

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-darkLighter p-5 rounded-lg shadow-lg flex items-center"
          >
            <div className="w-1/4">
              <CircularProgressbar
                value={challenge.progress}
                text={`${challenge.progress}%`}
                styles={buildStyles({
                  textSize: '16px',
                  textColor: '#fff',
                  pathColor: '#A4C465',
                  trailColor: '#333',
                })}
              />
            </div>
            <div className="ml-5 w-3/4">
              <div className="flex items-center mb-2">
                {challenge.icon}
                <h2 className="text-xl font-bold ml-2">{challenge.title}</h2>
              </div>
              <button
                onClick={() => handleCompleteChallenge(challenge.id)}
                className="mt-2 px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
              >
                Complete Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
