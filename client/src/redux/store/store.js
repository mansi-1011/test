import { combineReducers } from "@reduxjs/toolkit";
import ToastReducer from "../slices/ToastSlice";
import AdminUserReducer from "../slices/AdminUserSlice";
import productSlice from "../slices/ProductsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";
import UserAuthSlice from "../slices/UserAuthSlice";
import MenuSlice from "../slices/MenuSlice";

const reducers = combineReducers({
  menu: MenuSlice,
  toast: ToastReducer,
  adminUser: AdminUserReducer,
  product: productSlice,
  user: UserAuthSlice,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);
export { store, persistor };
export default store;
