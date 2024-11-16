// src/pages/Community.js

import React from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

const posts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Just completed a 10km bike ride instead of driving!',
    likes: 34,
    comments: 5,
    avatar: '/images/avatar1.png',
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Planted 20 trees in my local park today.',
    likes: 56,
    comments: 12,
    avatar: '/images/avatar2.png',
  },
  // ... Add more posts as needed
];

function Community() {
  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-center">Community</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-darkLighter p-5 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <h2 className="text-xl font-bold">{post.author}</h2>
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center">
              <button className="flex items-center mr-4">
                <FaThumbsUp className="text-greenLight" />
                <span className="ml-2">{post.likes}</span>
              </button>
              <button className="flex items-center">
                <FaComment className="text-greenLight" />
                <span className="ml-2">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
