import { render, screen } from "@testing-library/react";

import UserPage from "./UserPage";

describe("UserPage", () => {
  describe("Layout", () => {
    it("has root page div", () => {
      render(<UserPage />);
      const userPageDiv = screen.queryByTestId("userpage");
      expect(userPageDiv).toBeInTheDocument();
    });
  });
});
