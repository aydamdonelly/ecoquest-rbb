// src/pages/Challenges.js

import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {
  FaBicycle,
  FaRecycle,
  FaLeaf,
  FaWater,
  FaSeedling,
  FaAward,
  FaPlug,
  FaTree,
  FaShoppingBag,
  FaSolarPanel,
  FaBook,
  FaGlobe,
} from 'react-icons/fa';
import 'react-circular-progressbar/dist/styles.css';
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';

const challengesData = [
  {
    id: 1,
    category: 'Transport',
    icon: <FaBicycle className="text-greenLight w-10 h-10" />,
    title: 'Fahre mit dem Fahrrad zur Arbeit',
    description:
      'Reduziere deinen CO₂-Fußabdruck, indem du eine Woche lang mit dem Fahrrad zur Arbeit fährst.',
    progress: 50,
    image: '/images/bike-challenge.jpg',
    difficulty: 'Mittel',
  },
  {
    id: 2,
    category: 'Recycling',
    icon: <FaRecycle className="text-greenLight w-10 h-10" />,
    title: 'Müll recyceln',
    description: 'Trenne deinen Haushaltsmüll und recycle zwei Wochen lang.',
    progress: 30,
    image: '/images/recycle-challenge.jpg',
    difficulty: 'Einfach',
  },
  {
    id: 3,
    category: 'Energie',
    icon: <FaPlug className="text-greenLight w-10 h-10" />,
    title: 'Geräte vom Netz trennen',
    description: 'Ziehe ungenutzte Geräte aus der Steckdose, um Energie zu sparen.',
    progress: 70,
    image: '/images/unplug-devices.jpg',
    difficulty: 'Einfach',
  },
  {
    id: 4,
    category: 'Wassereinsparung',
    icon: <FaWater className="text-greenLight w-10 h-10" />,
    title: 'Duschzeit reduzieren',
    description: 'Nimm kürzere Duschen, um Wasser zu sparen.',
    progress: 20,
    image: '/images/water-challenge.jpg',
    difficulty: 'Einfach',
  },
  {
    id: 5,
    category: 'Pflanzen',
    icon: <FaSeedling className="text-greenLight w-10 h-10" />,
    title: 'Einen Baum pflanzen',
    description: 'Trage zur Wiederaufforstung bei, indem du einen Baum pflanzt.',
    progress: 0,
    image: '/images/plant-tree.jpg',
    difficulty: 'Mittel',
  },
  {
    id: 6,
    category: 'Nachhaltiger Einkauf',
    icon: <FaShoppingBag className="text-greenLight w-10 h-10" />,
    title: 'Verwende wiederverwendbare Taschen',
    description: 'Vermeide Plastiktüten, indem du eigene Taschen zum Einkaufen mitnimmst.',
    progress: 40,
    image: '/images/reusable-bags.jpg',
    difficulty: 'Einfach',
  },
  {
    id: 7,
    category: 'Erneuerbare Energien',
    icon: <FaSolarPanel className="text-greenLight w-10 h-10" />,
    title: 'Installiere Solarpaneele',
    description: 'Nutze Solarenergie, um deinen Strombedarf zu decken.',
    progress: 10,
    image: '/images/solar-panels.jpg',
    difficulty: 'Schwer',
  },
  {
    id: 8,
    category: 'Lokale Lebensmittel',
    icon: <FaLeaf className="text-greenLight w-10 h-10" />,
    title: 'Kaufe regionale Produkte',
    description: 'Unterstütze lokale Bauern und reduziere Transportemissionen.',
    progress: 60,
    image: '/images/local-produce.jpg',
    difficulty: 'Mittel',
  },
  {
    id: 9,
    category: 'Bildung',
    icon: <FaBook className="text-greenLight w-10 h-10" />,
    title: 'COP29-Bericht lesen',
    description:
      'Informiere dich über die neuesten Klimaverhandlungen, indem du den COP29-Bericht liest.',
    progress: 0,
    image: '/images/cop-report.jpg',
    difficulty: 'Mittel',
  },
  {
    id: 10,
    category: 'Bewusstsein',
    icon: <FaGlobe className="text-greenLight w-10 h-10" />,
    title: 'An einer Klimademo teilnehmen',
    description: 'Setze ein Zeichen und nimm an einer lokalen Klimademonstration teil.',
    progress: 0,
    image: '/images/climate-demo.jpg',
    difficulty: 'Schwer',
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
    setUserCredits((prevCredits) => prevCredits + 20); // Erhöhe ecoCoins um 20
    // Erfolg freischalten
    const completedChallenge = challenges.find((challenge) => challenge.id === id);
    if (
      !achievements.includes(completedChallenge.title) &&
      completedChallenge.progress + 20 >= 100
    ) {
      setAchievements([...achievements, completedChallenge.title]);
      alert(`Erfolg freigeschaltet: ${completedChallenge.title}!`);
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
    <div className="p-5 text-cream font-sans bg-dark min-h-screen page-with-grid-background">
      <animated.h1
        style={animationProps}
        className="text-4xl font-bold mb-5 text-center mt-12 page-title"
      >
        Herausforderungen
      </animated.h1>

      {/* Erfolgsabschnitt */}
      {achievements.length > 0 && (
        <div className="mb-5">
          <h2 className="text-2xl font-semibold mb-3">Erfolge</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center bg-darkLighter p-2 rounded">
                <FaAward className="text-yellow-500 w-8 h-8 mr-2" />
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
                  textSize: '24px',
                  textColor: '#fff',
                  pathColor: '#A4C465',
                  trailColor: '#333',
                })}
              />
            </div>
            <div className="ml-5 w-3/4">
              <div className="flex items-center mb-2">
                {challenge.icon}
                <h2 className="text-2xl font-bold ml-2">{challenge.title}</h2>
              </div>
              <p className="text-lg mb-2">Schwierigkeit: {challenge.difficulty}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteChallenge(challenge.id);
                }}
                className="mt-2 px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark text-lg"
              >
                Herausforderung abschließen
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
          <div className="bg-dark p-5 rounded-lg text-cream relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-3xl text-cream focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-3">{selectedChallenge.title}</h2>
            <img
              src={selectedChallenge.image}
              alt={selectedChallenge.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="mb-4 text-lg">{selectedChallenge.description}</p>
            <p className="mb-4 text-lg">Schwierigkeit: {selectedChallenge.difficulty}</p>
            <button
              onClick={() => {
                handleCompleteChallenge(selectedChallenge.id);
                closeModal();
              }}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark mr-2 text-lg"
            >
              Herausforderung abschließen
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-600 text-cream rounded hover:bg-gray-500 text-lg"
            >
              Schließen
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Challenges;
