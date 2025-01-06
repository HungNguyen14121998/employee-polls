import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./components/store";
import AuthProvider from "./components/AuthenContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router
      future={{
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </Provider>
);
