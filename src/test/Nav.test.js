import Nav from "../components/Nav";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "../components/store";
import AuthProvider from "../components/AuthenContext";

describe("Nav matching text", () => {
  it("sould render all links", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <Nav />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );

    const homeLink = screen.getByText(/home/i);
    const leaderboardLink = screen.getByText(/leaderboard/i);
    const newLink = screen.getByText(/new/i);

    expect(homeLink).toBeInTheDocument();
    expect(leaderboardLink).toBeInTheDocument();
    expect(newLink).toBeInTheDocument();
  });

  it("Nav match to snapshot", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <Nav />
          </AuthProvider>
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
