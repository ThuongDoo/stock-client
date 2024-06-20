import { io } from "socket.io-client";

// const SOCKET_SERVER_URL = "https://chungkhoanxyz.com";
const SOCKET_SERVER_URL = "http://localhost:3000";

export const socket = io(SOCKET_SERVER_URL);

export const EVENTS = {
  UPDATE_BUYSELL_DATA: "update_buysell_data",
  NEW_STOCK_DATA_AVAILABLE: "new_stock_data_available",
  STOCK_REQUEST: "stock_request",
  STOCK_UPDATE: "stock_update",
  UPDATE_STOCK_DATA: "update_stock_data",
  UPDATE_FILTERED_STOCK_DATA: "update_filtered_stock_data",
  FILTERD_STOCK_REQUEST: "filterd_stock_request",
  SSI_MI_REQUEST: "ssi_mi_request",
  SSI_MI_UPDATE: "ssi_mi_update",
  SSI_TRADE_REQUEST: "ssi_trade_request",
  SSI_TRADE_UPDATE: "ssi_trade_update",
  SSI_FAVORITE_REQUEST: "ssi_favorite_request",
  SSI_FAVORITE_UPDATE: "ssi_favorite_update",
  SSI_X_REQUEST: "ssi_x_request",
  SSI_X_UPDATE: "ssi_x_update",
  SSI_R_REQUEST: "ssi_r_request",
  SSI_R_UPDATE: "ssi_r_update",
  SSI_ORDER_BOOK_REQUEST: "ssi_order_book_request",
  SSI_ORDER_BOOK_UPDATE: "ssi_order_book_update",
};
