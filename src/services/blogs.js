import axios from 'axios';
import utils from '../utils/utils';
const baseUrl = '/api/blogs';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    if (err?.response?.data?.error) {
      throw err.response.data.error;
    }
  }
};

const post = async (body) => {
  try {
    const response = await axios.post(baseUrl, body, {
      headers: {
        Authorization: utils.getUserToken(),
      },
    });
    return response.data;
  } catch (err) {
    if (err?.response?.data?.error) {
      throw err.response.data.error;
    }
  }
};

export default { getAll, post };
