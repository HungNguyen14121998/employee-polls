import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import New from "../components/New";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../index";

describe("NEW", () => {
  it("fireEvent.change fireEvent.click", () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <New />
        </Router>
      </Provider>
    );

    var optionOneInput = component.getByTestId("option-one-input");
    fireEvent.change(optionOneInput, { target: { value: "Option One" } });

    var optionTwoInput = component.getByTestId("option-two-input");
    fireEvent.change(optionTwoInput, { target: { value: "Option One" } });

    var buttonSubmit = component.getByTestId("submit-button");
    fireEvent.click(buttonSubmit);

    expect(component.getByTestId("label-success")).toBeInTheDocument();
  });
});
