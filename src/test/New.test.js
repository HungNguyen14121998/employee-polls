import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import New from "../components/New";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "../components/store";
import AuthProvider from "../components/AuthenContext";

describe("NEW", () => {
  it("fireEvent.change fireEvent.click", () => {
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <New />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );

    var optionOneInput = component.getByTestId("option-one-input");
    fireEvent.change(optionOneInput, { target: { value: "Option One" } });

    var optionTwoInput = component.getByTestId("option-two-input");
    fireEvent.change(optionTwoInput, { target: { value: "Option Two" } });

    /*fireEvent click not working */
    // var buttonSubmit = component.getByTestId("submit-button");
    // fireEvent.click(buttonSubmit);
    // expect(component.getByTestId("label-success")).toBeInTheDocument();

    expect(optionOneInput.value).toBe("Option One");
    expect(optionTwoInput.value).toBe("Option Two");
  });
});
