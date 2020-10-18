import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const errorMessageStyle = {
    width: '100%',
    padding: 10,
    backgroundColor: '#ff9999',
    color: '#ff1a1a',
    fontSize: 16,
    textAlign: 'center',
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }

  return (
    <>
      {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
      <Login
        errorMessage={errorMessage}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default App;
