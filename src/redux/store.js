/* eslint-disable import/no-anonymous-default-export */
import { createStore } from "redux";

export default (rootReducer) => {
  const store = createStore(rootReducer);
  return store;
};
