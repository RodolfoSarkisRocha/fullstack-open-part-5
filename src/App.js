import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
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
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const getBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (err) {
      setFeedback({
        message: err,
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
      loginService.setToken(user.token);
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

  const handleBlogInputs = (e) => {
    const { value, name } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.post(blog);

      setFeedback({
        message: `A new blog ${createdBlog.title} by ${createdBlog.author} was created!`,
        type: 'success',
      });
      getBlogs();
      setBlog({
        title: '',
        author: '',
        url: '',
      });
    } catch (err) {
      setFeedback({
        message: err,
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
        <BlogForm
          blog={blog}
          handleBlogInputs={handleBlogInputs}
          handleBlogSubmit={handleBlogSubmit}
        />
        <div>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
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
