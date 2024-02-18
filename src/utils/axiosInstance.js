import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://milankatira.vercel.app/api",
});

export default axiosInstance;
