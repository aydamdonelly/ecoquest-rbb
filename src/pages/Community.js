// src/pages/Community.js

import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaPaperPlane, FaFire } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

const initialPosts = [
  {
    id: 1,
    author: 'Alex Müller',
    content: 'Habe gerade eine 10 km lange Fahrradtour anstelle des Autofahrens gemacht!',
    likes: 34,
    comments: [],
    avatar: '/images/avatar1.png',
  },
  {
    id: 2,
    author: 'Sophie Becker',
    content: 'Heute 20 Bäume in meinem örtlichen Park gepflanzt.',
    likes: 56,
    comments: [],
    avatar: '/images/avatar2.png',
  },
  // Additional posts...
];

const trendingTopics = [
  { id: 1, topic: '#Nachhaltigkeit' },
  { id: 2, topic: '#Umweltschutz' },
  { id: 3, topic: '#CO2Reduktion' },
  { id: 4, topic: '#ErneuerbareEnergien' },
  { id: 5, topic: '#Klimawandel' },
];

function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [filterActive, setFilterActive] = useState(false);

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
        author: 'Du',
        content: newPostContent,
        likes: 0,
        comments: [],
        avatar: '/images/your-avatar.png',
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setFilterActive(true);
  };

  const handleClearFilter = () => {
    setSelectedTopic(null);
    setFilterActive(false);
  };

  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const filteredPosts = filterActive
    ? posts.filter((post) => post.content.includes(selectedTopic))
    : posts;

  return (
    <div className="p-5 text-cream font-sans min-h-screen page-with-grid-background">
      <animated.h1 style={animationProps} className="text-4xl font-bold mb-5 text-center mt-12 page-title">
        Community
      </animated.h1>

      {/* Trending Topics */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Trendende Themen</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {trendingTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic.topic)}
              className={`px-4 py-2 rounded-full ${
                selectedTopic === topic.topic ? 'bg-greenLight text-dark' : 'bg-darkLighter'
              } hover:bg-greenLight hover:text-dark transition-colors`}
            >
              <FaFire className="inline mr-2" />
              {topic.topic}
            </button>
          ))}
        </div>
        {filterActive && (
          <div className="mt-2">
            <button
              onClick={handleClearFilter}
              className="px-2 py-1 bg-red-500 text-dark rounded hover:bg-red-400"
            >
              Filter entfernen
            </button>
          </div>
        )}
      </div>

      {/* Create Post Section */}
      <div className="bg-darkLighter p-5 rounded-lg shadow-lg mb-6">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-3 rounded bg-dark text-cream text-lg"
          placeholder="Teile deine Gedanken..."
        ></textarea>
        <button
          onClick={handleNewPost}
          className="mt-2 px-4 py-2 bg-greenLight text-dark rounded hover:bg-greenDark flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Posten
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-darkLighter p-5 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-16 h-16 rounded-full mr-4"
              />
              <h2 className="text-2xl font-bold">{post.author}</h2>
            </div>
            <p className="mb-4 text-lg">{post.content}</p>
            <div className="flex items-center mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center mr-4"
              >
                <FaThumbsUp className="text-greenLight" />
                <span className="ml-2">{post.likes}</span>
              </button>
              <button
                className="flex items-center"
                onClick={() => {
                  const comment = prompt('Gib deinen Kommentar ein:');
                  if (comment) handleComment(post.id, comment);
                }}
              >
                <FaComment className="text-greenLight" />
                <span className="ml-2">{post.comments.length}</span>
              </button>
              <button className="flex items-center ml-4">
                <FaShare className="text-greenLight" />
                <span className="ml-2">Teilen</span>
              </button>
            </div>
            {/* Display comments */}
            {post.comments.length > 0 && (
              <div className="bg-dark p-3 rounded">
                {post.comments.map((comment, index) => (
                  <p key={index} className="mb-2">
                    <strong>Du:</strong> {comment}
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
