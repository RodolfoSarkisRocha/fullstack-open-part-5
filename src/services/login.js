import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);  
  localStorage.setItem('userToken', response.data.token);
  localStorage.setItem('loggedBlogappUser', JSON.stringify(response.data));
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

export default { login, logout };
