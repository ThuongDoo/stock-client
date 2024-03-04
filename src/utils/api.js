import axios from "axios";

const instance = axios.create({
  baseURL: "https://chungkhoanxyz.com/backend/api/v1",
  // baseURL: "http://localhost:3000/api/v1",

  withCredentials: true,
});

export default instance;
