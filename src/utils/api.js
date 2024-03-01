import axios from "axios";

const instance = axios.create({
  baseURL: "https://chungkhoanxyz.com/backend/api/v1",
  withCredentials: true,
});

export default instance;
