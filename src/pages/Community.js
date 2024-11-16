// src/pages/Community.js

import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaPaperPlane } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

const initialPosts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Just completed a 10km bike ride instead of driving!',
    likes: 34,
    comments: [],
    avatar: '/images/avatar1.png',
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Planted 20 trees in my local park today.',
    likes: 56,
    comments: [],
    avatar: '/images/avatar2.png',
  },
  // ... Add more posts as needed
];

function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const handleNewPost = () => {
    if (newPostContent.trim() !== '') {
      const newPost = {
        id: posts.length + 1,
        author: 'You',
        content: newPostContent,
        likes: 0,
        comments: [],
        avatar: '/images/your-avatar.png',
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="p-5 text-cream font-sans bg-dark min-h-screen">
      <animated.h1 style={animationProps} className="text-3xl font-bold mb-5 text-center">
        Community
      </animated.h1>

      {/* Create Post Section */}
      <div className="bg-darkLighter p-5 rounded-lg shadow-lg mb-6">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-3 rounded bg-dark text-cream"
          placeholder="Share your thoughts..."
        ></textarea>
        <button
          onClick={handleNewPost}
          className="mt-2 px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Post
        </button>
      </div>

      {/* Posts */}
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
            <div className="flex items-center mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center mr-4"
              >
                <FaThumbsUp className="text-greenLight" />
                <span className="ml-2">{post.likes}</span>
              </button>
              {/* Implement comment functionality */}
              <button
                className="flex items-center"
                onClick={() => {
                  const comment = prompt('Enter your comment:');
                  if (comment) handleComment(post.id, comment);
                }}
              >
                <FaComment className="text-greenLight" />
                <span className="ml-2">{post.comments.length}</span>
              </button>
              <button className="flex items-center ml-4">
                <FaShare className="text-greenLight" />
                <span className="ml-2">Share</span>
              </button>
            </div>
            {/* Display comments */}
            {post.comments.length > 0 && (
              <div className="bg-dark p-3 rounded">
                {post.comments.map((comment, index) => (
                  <p key={index} className="mb-2">
                    <strong>You:</strong> {comment}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
