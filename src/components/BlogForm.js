import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';

const BlogForm = ({ handleBlogSubmit }) => {
  const blogFormRef = useRef();

  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleBlogInputs = (e) => {
    const { value, name } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    await handleBlogSubmit(blog);
    setBlog({
      title: '',
      author: '',
      url: '',
    });
    blogFormRef.current.toggleVisibility();
  };

  const { title, author, url } = blog;

  return (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <h3>Create Blog</h3>
      <form onSubmit={submitBlog}>
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
    </Togglable>
  );
};

BlogForm.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogInputs: PropTypes.func.isRequired,
  handleBlogSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
