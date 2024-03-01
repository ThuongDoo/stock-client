import axios from "axios";

const instance = axios.create({
  baseURL: "http://103.110.84.191:3001/api/v1",
  withCredentials: true,
});

export default instance;
