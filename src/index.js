import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";

export const store = configureStore({
  reducer: reducers,
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
