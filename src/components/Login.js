import React, { useState } from 'react';
import loginService from '../services/login';

import PropTypes from 'prop-types';

const Login = ({ setUser, setFeedback }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      loginService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setFeedback({
        message: 'Wrong username or password!',
        type: 'error',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            value={username}
            type='text'
            name='Username'
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            value={password}
            type='password'
            name='Password'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func,
  setFeedback: PropTypes.func,
};

export default Login;
