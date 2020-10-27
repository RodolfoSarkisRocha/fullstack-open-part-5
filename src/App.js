import React, { useState, useEffect } from 'react';
import Blog from './components/Blog/Blog';
import BlogForm from './components/BlogForm/BlogForm';
import Header from './components/BlogHeader';
import Feedback from './components/Feedback';
import LoggedUser from './components/LoggedUser';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState({
    message: null,
    type: null,
  });

  const getBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (err) {
      const message = err?.response?.data?.error;
      setFeedback({
        message,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    setBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      localStorage.setItem('userToken', user.token);      
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFeedback({
        message: null,
        type: null,
      });
    }, 5000);
  }, [feedback]);

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const handleBlogSubmit = async (blog) => {
    try {
      const createdBlog = await blogService.postBlog(blog);

      setFeedback({
        message: `A new blog ${createdBlog.title} by ${createdBlog.author} was created!`,
        type: 'success',
      });
      getBlogs();
    } catch (err) {
      const message = err?.response?.data?.error;
      setFeedback({
        message,
        type: 'error',
      });
    }
  };

  const updateBlog = async (blog) => {
    const updatedLikesBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      await blogService.editBlog(updatedLikesBlog);
      setFeedback({
        message: 'Blog was successfully edited',
        type: 'success',
      });
      getBlogs();
    } catch (err) {
      const message = err?.response?.data?.error;
      setFeedback({
        message,
        type: 'error',
      });
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.removeBlog(id);
      setFeedback({
        message: 'Blog was successfully deleted',
        type: 'success',
      });
      getBlogs();
    } catch (err) {
      const message = err?.response?.data?.error;
      setFeedback({
        message,
        type: 'error',
      });
    }
  };

  if (user !== null) {
    return (
      <>
        <Header text='Blogs' />
        <Feedback message={feedback.message} type={feedback.type} />
        <LoggedUser user={user} handleLogout={handleLogout} />
        <BlogForm handleBlogSubmit={handleBlogSubmit} />
        <div>
          <h2>Blogs</h2>
          {blogs?.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Header text='Blogs Login' />
      <Feedback message={feedback.message} type={feedback.type} />
      <Login setUser={setUser} setFeedback={setFeedback} />
    </>
  );
};

export default App;
