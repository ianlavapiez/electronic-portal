import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./products/products.reducer";
import transactionsReducer from "./transactions/transactions.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  transactions: transactionsReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
