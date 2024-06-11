import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeSlice from "../slices/themeSlice";
import userSlice from "../slices/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  theme: themeSlice,
  user: userSlice,
  category: categorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
