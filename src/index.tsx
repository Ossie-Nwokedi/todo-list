import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reducer from "./Reducer";
import { addTodo, toggleTodo, selectTodo, removeTodo } from "./Actions";

const win = window as any;

const store = createStore(
  reducer,
  win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(addTodo("Buy Milk"));
store.dispatch(addTodo("Call mum"));
store.dispatch(addTodo("Interview prep"));
store.dispatch(selectTodo(store.getState().todos[0].id));
// store.dispatch(removeTodo(store.getState().todos[1].id));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
