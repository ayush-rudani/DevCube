import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({ AuthReducer });
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;


