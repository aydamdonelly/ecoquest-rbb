// src/pages/Shop.js

import React, { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';

const shopItems = [
  {
    id: 1,
    category: 'Trees',
    items: [
      { id: 101, name: 'Plant a Tree', cost: 100, image: '/images/tree.png' },
      { id: 102, name: 'Rainforest Conservation', cost: 500, image: '/images/rainforest.png' },
    ],
  },
  {
    id: 2,
    category: 'Energy',
    items: [
      { id: 201, name: 'Solar Panel Installation', cost: 1000, image: '/images/solar-panel.png' },
      { id: 202, name: 'Wind Turbine Support', cost: 1500, image: '/images/wind-turbine.png' },
    ],
  },
  {
    id: 3,
    category: 'Community',
    items: [
      { id: 301, name: 'Community Garden', cost: 200, image: '/images/garden.png' },
      { id: 302, name: 'Clean Water Project', cost: 800, image: '/images/water-project.png' },
    ],
  },
];

function Shop({ userCredits, setUserCredits }) {
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handlePurchase = (item) => {
    if (userCredits >= item.cost) {
      setUserCredits((prevCredits) => prevCredits - item.cost);
      setPurchasedItems([...purchasedItems, item]);
      alert(`You have purchased ${item.name}!`);
    } else {
      alert('Not enough credits!');
    }
  };

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">Shop</h1>
      <div className="flex items-center justify-center mb-5">
        <FaLeaf className="h-6 w-6 text-greenLight" />
        <span className="ml-2 text-xl font-bold">{userCredits} Credits</span>
      </div>
      {shopItems.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-darkLighter p-5 rounded-lg shadow-lg flex flex-col items-center"
              >
                <img src={item.image} alt={item.name} className="w-32 h-32 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <div className="flex items-center mb-4">
                  <FaLeaf className="h-5 w-5 text-greenLight" />
                  <span className="ml-2 text-lg font-bold">{item.cost} Credits</span>
                </div>
                <button
                  onClick={() => handlePurchase(item)}
                  className="px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark"
                >
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;
