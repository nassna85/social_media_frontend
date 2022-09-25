import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import TopBar from "./TopBar";

const setup = () => {
  return render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>
  );
};

describe("TopBar", () => {
  describe("Layout", () => {
    it("has application logo", () => {
      const { container } = setup();
      const logo = container.querySelector("img");
      expect(logo.src).toContain("hoaxify-logo.png");
    });

    it("has link to home from logo", () => {
      const { container } = setup();
      const logo = container.querySelector("img");
      expect(logo.parentElement.getAttribute("href")).toBe("/");
    });

    it("has link to signup", () => {
      const { queryByText } = setup();
      const signupLink = queryByText("Sign Up");
      expect(signupLink.getAttribute("href")).toBe("/signup");
    });

    it("has link to login", () => {
      const { queryByText } = setup();
      const loginLink = queryByText("Login");
      expect(loginLink.getAttribute("href")).toBe("/login");
    });
  });
});
