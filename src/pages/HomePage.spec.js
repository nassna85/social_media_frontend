import { render, screen } from "@testing-library/react";

import HomePage from "./HomePage";

describe("HomePage", () => {
  describe("Layout", () => {
    it("has root page div", () => {
      render(<HomePage />);
      const homePageDiv = screen.queryByTestId("homepage");
      expect(homePageDiv).toBeInTheDocument();
    });
  });
});
