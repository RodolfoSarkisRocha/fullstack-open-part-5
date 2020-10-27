const getUserToken = () => {
  const userToken = localStorage.getItem('userToken');  
  return `Bearer ${userToken}`;
};

export default { getUserToken };
