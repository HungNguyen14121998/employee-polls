import NotFound from "../components/NotFound";
import { render } from "@testing-library/react";

describe("Test Snapshot", () => {
  it("NotFournd match to snapshot", () => {
    var component = render(<NotFound />);
    expect(component).toMatchSnapshot();
  });
});
