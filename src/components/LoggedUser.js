import React from 'react';
import PropTypes from 'prop-types';

const LoggedUser = ({ user, handleLogout }) => {
  return (
    <div>
      <div>{`Logged in as ${user.name}`}</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

LoggedUser.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default LoggedUser;
