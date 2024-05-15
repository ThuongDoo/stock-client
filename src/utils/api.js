import axios from "axios";

const instance = axios.create({
  // baseURL: "https://chungkhoanxyz.com/backend/api/v1",
  baseURL: "http://localhost:3000/api/v1",

  withCredentials: true,
});

export const endpoints = {
  LOGOUT: "/auth/logout",
  LOGIN: "/auth/login",

  STOCK_GET_ALL: "/stock",
  STOCK_GET_SAN: "/stock/san",
  STOCK_GET_STOCK_BY_NAME: "/stock/getStockByName",

  BUYSELL: "/buysell",

  USER: "/user",
  USER_UPDATE: "/user/updateUser",
  USER_REQUEST: "/user/userRequest",
};

export default instance;
