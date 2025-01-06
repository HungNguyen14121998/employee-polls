import React from "react";
import App from "../components/App";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "../components/store";
import AuthProvider from "../components/AuthenContext";

describe("App Component", () => {
  test("App Heading", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );

    const heading = screen.getByText(/Employee Polls/i);

    expect(heading).toBeInTheDocument();
  });
});
