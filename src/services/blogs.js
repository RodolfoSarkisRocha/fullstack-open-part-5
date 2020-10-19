import axios from 'axios';
import utils from '../utils/utils';
const baseUrl = '/api/blogs';

const config = {
  headers: {
    Authorization: utils.getUserToken(),
  },
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    const blogs = response.data;
    if (blogs && blogs.length > 0) {
      const sortedBlogs = blogs.sort((a, b) => {
        if (a.likes > b.likes) return -1;
        return 1;
      });

      return sortedBlogs;
    }
  } catch (err) {
    if (err?.response?.data?.error) {
      throw err.response.data.error;
    }
  }
};

const postBlog = async (body) => {
  try {
    const response = await axios.post(baseUrl, body, config);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const editBlog = async ({ id, ...body }) => {
  try {
    const result = await axios.put(`${baseUrl}/${id}`, body, config);
    return result;
  } catch (err) {
    throw err;
  }
};

const removeBlog = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (err) {
    throw err;
  }
};

export default { getAll, postBlog, editBlog, removeBlog };
