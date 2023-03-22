import { combineReducers } from "redux";
import configRedux from "./configRedux";
import configureStore from "./store";

export const reducers = combineReducers({
  config: configRedux,
});

let store = configureStore(reducers);
export default store;
