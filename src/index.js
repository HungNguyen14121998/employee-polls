import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import "./index.css";
import { BrowserRouter as Router } from "react-router";
import { store } from "./components/store";
import AuthProvider from "./components/AuthenContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </Provider>
);
