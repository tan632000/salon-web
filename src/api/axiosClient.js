import axios from "axios";
import cookie from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8600/api/v1",
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = cookie.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
