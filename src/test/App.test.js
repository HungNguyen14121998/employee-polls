import React from "react";
import App from "../components/App";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../components/store";

describe("App Component", () => {
  test("App Heading", () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const heading = screen.getByText(/Employee Polls/i);

    expect(heading).toBeInTheDocument();
  });
});
