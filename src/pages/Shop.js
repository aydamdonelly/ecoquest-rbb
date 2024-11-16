// src/pages/Shop.js

import React, { useState } from 'react';
import { FaLeaf, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

const shopItems = [
  {
    id: 1,
    category: 'Bäume',
    items: [
      {
        id: 101,
        name: 'Einen Baum pflanzen',
        cost: 100,
        image: '/images/tree.png',
        description: 'Pflanze einen Baum, um Aufforstungsbemühungen zu unterstützen.',
      },
      {
        id: 102,
        name: 'Regenwaldschutz',
        cost: 500,
        image: '/images/rainforest.png',
        description: 'Unterstütze den Schutz der Regenwälder.',
      },
    ],
  },
  {
    id: 2,
    category: 'Energie',
    items: [
      {
        id: 201,
        name: 'Solarpanel-Spende',
        cost: 1000,
        image: '/images/solar-panel.png',
        description: 'Hilf bei der Installation von Solarpaneelen in Gemeinden.',
      },
      {
        id: 202,
        name: 'Windkraft-Unterstützung',
        cost: 1500,
        image: '/images/wind-turbine.png',
        description: 'Unterstütze Projekte für Windenergie.',
      },
    ],
  },
  {
    id: 3,
    category: 'Gemeinschaft',
    items: [
      {
        id: 301,
        name: 'Gemeinschaftsgarten',
        cost: 200,
        image: '/images/garden.png',
        description: 'Trage zur Schaffung eines Gemeinschaftsgartens bei.',
      },
      {
        id: 302,
        name: 'Sauberes Wasser Projekt',
        cost: 800,
        image: '/images/water-project.png',
        description: 'Unterstütze den Zugang zu sauberem Wasser.',
      },
    ],
  },
  {
    id: 4,
    category: 'Bildung',
    items: [
      {
        id: 401,
        name: 'Umweltbildungsprogramm',
        cost: 600,
        image: '/images/education.png',
        description: 'Finanziere Bildungsprogramme zum Umweltschutz.',
      },
      {
        id: 402,
        name: 'Workshops für Nachhaltigkeit',
        cost: 400,
        image: '/images/workshop.png',
        description: 'Unterstütze Workshops zur Förderung nachhaltiger Praktiken.',
      },
    ],
  },
];

function Shop({ userCredits, setUserCredits }) {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlePurchase = (item) => {
    if (userCredits >= item.cost) {
      setUserCredits((prevCredits) => prevCredits - item.cost);
      setPurchasedItems([...purchasedItems, item]);
      alert(`Du hast ${item.name} gekauft!`);
      closeModal();
    } else {
      alert('Nicht genug ecoCoins!');
    }
  };

  const addToWishlist = (item) => {
    if (!wishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen page-with-grid-background">
      <animated.h1
        style={animationProps}
        className="text-3xl font-bold mb-5 text-center mt-12"
      >
        Shop
      </animated.h1>
      <div className="flex items-center justify-center mb-5">
        <FaLeaf className="h-6 w-6 text-greenLight" />
        <span className="ml-2 text-xl font-bold">{userCredits} ecoCoins</span>
        <FaShoppingCart className="h-6 w-6 text-greenLight ml-4" />
        <span className="ml-2 text-xl font-bold">{purchasedItems.length}</span>
        <FaHeart className="h-6 w-6 text-red-500 ml-4" />
        <span className="ml-2 text-xl font-bold">{wishlist.length}</span>
      </div>
      {shopItems.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-darkLighter p-5 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-dark"
                onClick={() => openModal(item)}
              >
                <img src={item.image} alt={item.name} className="w-32 h-32 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <div className="flex items-center mb-4">
                  <FaLeaf className="h-5 w-5 text-greenLight" />
                  <span className="ml-2 text-lg font-bold">{item.cost} ecoCoins</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Artikeldetails"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-dark p-5 rounded-lg text-cream relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-cream focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-3">{selectedItem.name}</h2>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="mb-4">{selectedItem.description}</p>
            <div className="flex items-center mb-4">
              <FaLeaf className="h-5 w-5 text-greenLight" />
              <span className="ml-2 text-lg font-bold">{selectedItem.cost} ecoCoins</span>
            </div>
            <button
              onClick={() => handlePurchase(selectedItem)}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark mr-2"
            >
              Kaufen
            </button>
            <button
              onClick={() => addToWishlist(selectedItem)}
              className="px-4 py-2 bg-red-500 text-dark rounded hover:bg-red-400 mr-2"
            >
              Zur Wunschliste hinzufügen
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-600 text-cream rounded hover:bg-gray-500"
            >
              Schließen
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Shop;
