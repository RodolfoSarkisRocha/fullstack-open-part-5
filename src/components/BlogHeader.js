import React from 'react';
import PropTypes from 'prop-types';

const headerStyle = {
  width: '100%',
  padding: 10,
  textAlign: 'center',
  border: '1px solid #000',
  borderRadius: 4,
  marginBottom: 10,
  fontSize: '1.5em',
  fontWeight: '600',
};

const Header = ({ text }) => {
  return <div style={headerStyle}>{text}</div>;
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
