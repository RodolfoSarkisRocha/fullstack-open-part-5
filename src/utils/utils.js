const getUserToken = () => {
  const userToken = window.localStorage.getItem('userToken');
  return `Bearer ${userToken}`;
};

export default { getUserToken };
