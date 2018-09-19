import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import taskListReducer from "./../modules/Tasks/Tasks.Reducer";
const reducerCollection = combineReducers({
  taskList: taskListReducer
});

const devToolsEnhancer = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(
  reducerCollection,
  devToolsEnhancer,
);

export default store;
