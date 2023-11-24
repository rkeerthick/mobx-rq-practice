import axios from "axios";

export const fetchPosts = () => {
  const response = axios.get("http://localhost:3939/posts");
  return response;
};

export const addPost = (data: {}) => {
  const response = axios.post("http://localhost:3939/posts", data);
  return response;
};

export const deletePost = (id: string) => {
  const response = axios.delete(`http://localhost:3939/posts/${id}`);
  return response;
};

export const updatePost = async(ID: number, data: {}) => {
  const response = await axios.put(`http://localhost:3939/posts/${ID}`, data);
  return response;
};

export const fetchPostByID = (id: number) => {
  const response = axios.get(`http://localhost:3939/posts/${id}`);
  return response;
};
