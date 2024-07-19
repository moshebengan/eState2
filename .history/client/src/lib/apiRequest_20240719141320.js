import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default apiRequest;