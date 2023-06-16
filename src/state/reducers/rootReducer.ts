import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { CartReducer } from "./cartReducer";

import { AuthReducer } from "./authReducer";

import { CheckoutReducer } from "./checkoutReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  CartReducer,
  AuthReducer,
  CheckoutReducer
  
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
