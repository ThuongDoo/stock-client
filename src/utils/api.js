import axios from "axios";

const instance = axios.create({
  baseURL: "https://chungkhoanxyz.com/backend/api/v1",
  // baseURL: "http://localhost:3000/api/v1",

  withCredentials: true,
});

export const endpoints = {
  LOGOUT: "/auth/logout",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  VERIFY_CHANGE_PASSWORD: "/auth/verify-change-password",
  VERIFY: "auth/verify-email",

  STOCK_GET_ALL: "/stock",
  STOCK_GET_SAN: "/stock/san",
  STOCK_GET_STOCK_BY_NAME: "/stock/getStockByName",
  STOCK_FILTER: "/stock/filter",
  ROC: "/ohlc/roc",

  BUYSELL: "/buysell",
  BUYSELL_IMPORT: "/buysell/import",

  OHLC_DAILY: "/ohlc/daily",
  OHLC_DAILY_IMPORT: "/ohlc/daily/import",
  OHLC_INTRADAY: "/ohlc/intraday",
  OHLC_INTRADAY_IMPORT: "/ohlc/intraday/import",

  USER: "/user",
  USER_UPDATE: "/user/updateUser",
  USER_DELETE: "/user/deleteUser",
  USER_REQUEST: "/user/userRequest",
  USER_SHOW_ME: "/user/showMe",
  USER_SECURITY: "/user/security",

  MARKET_IMPORT: "/market/import",

  SSI_SECURITY: "/ssi/security",

  CATEGORY_UPDATE: "category/update",
  CATEGORY: "category",

  ARTICLE_CATEGORY: "article/category",
};

export default instance;
