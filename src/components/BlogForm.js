import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ blog, handleBlogInputs, handleBlogSubmit }) => {
  const { title, author, url } = blog;
  return (
    <div>
      <h3>Create Blog</h3>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input name='title' value={title} onChange={handleBlogInputs} />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input name='author' value={author} onChange={handleBlogInputs} />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input name='url' value={url} onChange={handleBlogInputs} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  blog: PropTypes.object,
  handleBlogInputs: PropTypes.func,
  handleBlogSubmit: PropTypes.func,
};

export default BlogForm;
