import { io } from "socket.io-client";

// const SOCKET_SERVER_URL = "https://chungkhoanxyz.com";
const SOCKET_SERVER_URL = "http://localhost:3000";

export const socket = io(SOCKET_SERVER_URL);

export const EVENTS = {
  UPDATE_BUYSELL_DATA: "update_buysell_data",
  NEW_STOCK_DATA_AVAILABLE: "new_stock_data_available",
  STOCK_REQUEST: "stock_request",
  UPDATE_STOCK_DATA: "update_stock_data",
  UPDATE_FILTERED_STOCK_DATA: "update_filtered_stock_data",
  FILTERD_STOCK_REQUEST: "filterd_stock_request",
  SSI_MI_REQUEST: "ssi_mi_request",
  SSI_MI_UPDATE: "ssi_mi_update",
};
