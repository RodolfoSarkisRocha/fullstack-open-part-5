import React from 'react';
import PropTypes from 'prop-types';

const errorMessageStyle = {
  width: '100%',
  padding: 10,
  backgroundColor: '#ff9999',
  color: '#ff1a1a',
  border: '2px solid #ff1a1a',
  fontSize: 24,
  borderRadius: 4,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
};

const successMessageStyle = {
  width: '100%',
  padding: 10,
  backgroundColor: '#9fdf9f',
  color: '#339933',
  border: '2px solid #339933',
  fontSize: 24,
  fontWeight: 'bold',
  borderRadius: 4,
  textAlign: 'center',
  marginBottom: 10,
};

const Feedback = ({ message, type }) => {  
  if (message === null || type === null) return null;
  if (type === 'error') {
    return <div style={errorMessageStyle}>{message}</div>;
  }
  if (type === 'success') {
    return <div style={successMessageStyle}>{message}</div>;
  }
};

Feedback.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Feedback;
