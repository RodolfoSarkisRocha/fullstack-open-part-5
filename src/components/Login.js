import React, { useState } from 'react';
import loginService from '../services/login';

import PropTypes from 'prop-types';

const Login = ({ setUser, setErrorMessage }) => {
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
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Invalid username or password!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input
          value={username}
          type='text'
          name='Username'
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          type='password'
          name='Password'
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func,
};

export default Login;
