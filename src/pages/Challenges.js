// src/pages/Challenges.js

import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaBicycle, FaRecycle, FaLeaf, FaWater, FaSeedling, FaAward } from 'react-icons/fa';
import 'react-circular-progressbar/dist/styles.css';
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';

const challengesData = [
  {
    id: 1,
    category: 'Transportation',
    icon: <FaBicycle className="text-greenLight w-8 h-8" />,
    title: 'Ride a bike to work',
    description: 'Reduce your carbon footprint by biking to work for a week.',
    progress: 50,
    image: '/images/bike-challenge.jpg',
    difficulty: 'Medium',
  },
  {
    id: 2,
    category: 'Recycling',
    icon: <FaRecycle className="text-greenLight w-8 h-8" />,
    title: 'Recycle waste',
    description: 'Separate your household waste and recycle for two weeks.',
    progress: 30,
    image: '/images/recycle-challenge.jpg',
    difficulty: 'Easy',
  },
  {
    id: 3,
    category: 'Energy',
    icon: <FaLeaf className="text-greenLight w-8 h-8" />,
    title: 'Use energy-efficient appliances',
    description: 'Switch to energy-efficient appliances to save energy.',
    progress: 70,
    image: '/images/energy-challenge.jpg',
    difficulty: 'Hard',
  },
  // Additional challenges
  {
    id: 4,
    category: 'Water Conservation',
    icon: <FaWater className="text-greenLight w-8 h-8" />,
    title: 'Reduce shower time',
    description: 'Take shorter showers to conserve water.',
    progress: 20,
    image: '/images/water-challenge.jpg',
    difficulty: 'Easy',
  },
  {
    id: 5,
    category: 'Planting',
    icon: <FaSeedling className="text-greenLight w-8 h-8" />,
    title: 'Plant a tree',
    description: 'Contribute to reforestation by planting a tree.',
    progress: 0,
    image: '/images/plant-tree.jpg',
    difficulty: 'Medium',
  },
];

function Challenges({ setUserCredits }) {
  const [challenges, setChallenges] = useState(challengesData);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);

  const handleCompleteChallenge = (id) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === id
          ? { ...challenge, progress: Math.min(challenge.progress + 20, 100) }
          : challenge
      )
    );
    setUserCredits((prevCredits) => prevCredits + 20); // Increase credits by 20
    // Check for achievement
    const completedChallenge = challenges.find((challenge) => challenge.id === id);
    if (!achievements.includes(completedChallenge.title) && completedChallenge.progress + 20 >= 100) {
      setAchievements([...achievements, completedChallenge.title]);
      alert(`Achievement Unlocked: ${completedChallenge.title}!`);
    }
  };

  const openModal = (challenge) => {
    setSelectedChallenge(challenge);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
    setModalIsOpen(false);
  };

  const animationProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <animated.h1 style={animationProps} className="text-3xl font-bold mb-5 text-center">
        Challenges
      </animated.h1>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="mb-5">
          <h2 className="text-2xl font-semibold mb-3">Achievements</h2>
          <div className="flex space-x-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center">
                <FaAward className="text-yellow-500 w-6 h-6 mr-2" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-darkLighter p-5 rounded-lg shadow-lg flex items-center cursor-pointer hover:bg-dark"
            onClick={() => openModal(challenge)}
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
              <p className="text-sm mb-2">Difficulty: {challenge.difficulty}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteChallenge(challenge.id);
                }}
                className="mt-2 px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
              >
                Complete Challenge
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Challenge Details"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-dark p-5 rounded-lg text-cream">
            <h2 className="text-2xl font-bold mb-3">{selectedChallenge.title}</h2>
            <img
              src={selectedChallenge.image}
              alt={selectedChallenge.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="mb-4">{selectedChallenge.description}</p>
            <p className="mb-4">Difficulty: {selectedChallenge.difficulty}</p>
            <button
              onClick={() => {
                handleCompleteChallenge(selectedChallenge.id);
                closeModal();
              }}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark mr-2"
            >
              Complete Challenge
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-600 text-cream rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Challenges;
