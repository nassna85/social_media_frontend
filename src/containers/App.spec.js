import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

const setup = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
};

describe("App", () => {
  it("displays homepage when url is /", () => {
    setup("/");

    expect(screen.queryByTestId("homepage")).toBeInTheDocument();
  });

  it("displays login when url is /login", () => {
    const { container } = setup("/login");
    const header = container.querySelector("h1");

    expect(header).toHaveTextContent("Login");
  });

  it("displays signup when url is /signup", () => {
    const { container } = setup("/signup");
    const header = container.querySelector("h1");

    expect(header).toHaveTextContent("Sign Up");
  });

  it("displays userpage when url is other than /, /login, /signup", () => {
    setup("/user1");
    expect(screen.queryByTestId("userpage")).toBeInTheDocument();
  });

  it("displays topBar when url is /", () => {
    const { container } = setup("/");
    const navigation = container.querySelector("nav");
    expect(navigation).toBeInTheDocument();
  });

  it("displays topBar when url is /login", () => {
    const { container } = setup("/login");
    const navigation = container.querySelector("nav");
    expect(navigation).toBeInTheDocument();
  });

  it("displays topBar when url is /signup", () => {
    const { container } = setup("/signup");
    const navigation = container.querySelector("nav");
    expect(navigation).toBeInTheDocument();
  });

  it("displays topBar when url is /user1", () => {
    const { container } = setup("/user1");
    const navigation = container.querySelector("nav");
    expect(navigation).toBeInTheDocument();
  });

  it("shows the signupPage when clicking signup", () => {
    const { queryByText, container } = setup("/");
    const signupLink = queryByText("Sign Up");
    fireEvent.click(signupLink);
    const header = container.querySelector("h1");
    expect(header).toHaveTextContent("Sign Up");
  });
});
