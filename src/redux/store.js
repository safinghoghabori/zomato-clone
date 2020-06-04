import { createStore } from "redux";
import { resReducer } from "./restaurant/resReducers";

const store = createStore(resReducer);

export default store;
