import React, { useState } from 'react';
import PropTypes from 'prop-types';

const blogStyle = {
  padding: 5,
  border: '1px solid black',
};

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const { author, title, url, likes, user } = blog;
  const [visibleDetails, setVisibleDetails] = useState(false);

  const toggleDetails = () => {
    setVisibleDetails(!visibleDetails);
  };

  return (
    <div style={blogStyle} className='blog'>
      <span>
        {title} {author}
      </span>
      <span>
        <button className='like-button' onClick={() => updateBlog(blog)}>
          Like!
        </button>
        <button onClick={toggleDetails}>
          {visibleDetails ? 'Hide details' : 'View details'}
        </button>
      </span>
      {visibleDetails && (
        <div>
          <div>{`Author: ${author}`}</div>
          <div>{`URL: ${url}`}</div>
          <div className='blog-likes'>{`Likes: ${likes}`}</div>
          <div>{`Created by: ${user?.name || 'Unknown'}`}</div>
          <button
            onClick={() => {
              removeBlog(blog.id);
            }}
            style={{ backgroundColor: '#1b67e0' }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
