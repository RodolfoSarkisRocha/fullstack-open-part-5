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

      setUser(user);
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
            id='username'
            value={username}
            type='text'
            name='Username'
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            value={password}
            type='password'
            name='Password'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button id='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setFeedback: PropTypes.func.isRequired,
};

export default Login;
