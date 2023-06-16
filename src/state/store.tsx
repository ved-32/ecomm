import { createStore } from "redux";
import { persistStore } from "redux-persist";

import { persistedReducer } from "./reducers/rootReducer";

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
