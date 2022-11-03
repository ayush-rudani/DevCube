import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AuthReducer from "./reducers/AuthReducer";
import PostReducer from "./reducers/PostReducer";

const rootReducer = combineReducers({ AuthReducer, PostReducer });
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;


