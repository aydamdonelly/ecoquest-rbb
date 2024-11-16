// src/pages/Shop.js

import React, { useState } from 'react';
import { FaLeaf, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

const shopItems = [
  {
    id: 1,
    category: 'Trees',
    items: [
      { id: 101, name: 'Plant a Tree', cost: 100, image: '/images/tree.png', description: 'Plant a tree to help reforestation efforts.' },
      { id: 102, name: 'Rainforest Conservation', cost: 500, image: '/images/rainforest.png', description: 'Support the conservation of rainforests.' },
    ],
  },
  // ... other categories
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
      alert(`You have purchased ${item.name}!`);
      closeModal();
    } else {
      alert('Not enough credits!');
    }
  };

  const addToWishlist = (item) => {
    if (!wishlist.includes(item)) {
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
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <animated.h1 style={animationProps} className="text-3xl font-bold mb-5 text-center">
        Shop
      </animated.h1>
      <div className="flex items-center justify-center mb-5">
        <FaLeaf className="h-6 w-6 text-greenLight" />
        <span className="ml-2 text-xl font-bold">{userCredits} Credits</span>
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
                  <span className="ml-2 text-lg font-bold">{item.cost} Credits</span>
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
          contentLabel="Item Details"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-dark p-5 rounded-lg text-cream">
            <h2 className="text-2xl font-bold mb-3">{selectedItem.name}</h2>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="mb-4">{selectedItem.description}</p>
            <div className="flex items-center mb-4">
              <FaLeaf className="h-5 w-5 text-greenLight" />
              <span className="ml-2 text-lg font-bold">{selectedItem.cost} Credits</span>
            </div>
            <button
              onClick={() => handlePurchase(selectedItem)}
              className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark mr-2"
            >
              Purchase
            </button>
            <button
              onClick={() => addToWishlist(selectedItem)}
              className="px-4 py-2 bg-red-500 text-dark rounded hover:bg-red-400 mr-2"
            >
              Add to Wishlist
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

export default Shop;
