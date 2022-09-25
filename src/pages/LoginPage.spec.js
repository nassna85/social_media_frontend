import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  describe("Layout", () => {
    it("has header of Login", () => {
      const { container } = render(<LoginPage />);
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Login");
    });

    it("has input for username", () => {
      render(<LoginPage />);
      const usernameInput = screen.queryByPlaceholderText("Your username");
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for password", () => {
      render(<LoginPage />);
      const passwordInput = screen.queryByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<LoginPage />);
      const passwordInput = screen.queryByPlaceholderText("Your password");
      expect(passwordInput.type).toBe("password");
    });

    it("has login button", () => {
      const { container } = render(<LoginPage />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };

    let usernameInput, passwordInput, button;

    const setupForSubmit = (props) => {
      const utils = render(<LoginPage {...props} />);

      const { container } = utils;

      usernameInput = screen.queryByPlaceholderText("Your username");
      fireEvent.change(usernameInput, changeEvent("my-user-name"));

      passwordInput = screen.queryByPlaceholderText("Your password");
      fireEvent.change(passwordInput, changeEvent("P4ssword"));

      button = container.querySelector("button");

      return utils;
    };

    it("sets the username value into state", () => {
      render(<LoginPage />);
      const usernameInput = screen.queryByPlaceholderText("Your username");
      fireEvent.change(usernameInput, changeEvent("my-user-name"));
      expect(usernameInput).toHaveValue("my-user-name");
    });

    it("sets the password value into state", () => {
      render(<LoginPage />);
      const passwordInput = screen.queryByPlaceholderText("Your password");
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      expect(passwordInput).toHaveValue("P4ssword");
    });

    it("calls postLogin when actions are provided in props and input fields have value", () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);
      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });

    it("does not throw exception when clicking the button when actions not provided in props", () => {
      setupForSubmit();

      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it("calls postLogin with credentials in body", () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const expectedUserObject = {
        username: "my-user-name",
        password: "P4ssword",
      };

      expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
    });

    it("enables the button when username and password is not empty", () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });

    it("disables the button when username is empty", () => {
      setupForSubmit();
      fireEvent.change(usernameInput, changeEvent(""));
      expect(button).toBeDisabled();
    });

    it("disables the button when password is empty", () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent(""));
      expect(button).toBeDisabled();
    });

    it("displays alert when login fails", async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: "Login failed",
            },
          },
        }),
      };

      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await findByText("Login failed");
      expect(alert).toBeInTheDocument();
    });

    it("clear alert when user changes username", async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: "Login failed",
            },
          },
        }),
      };

      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await findByText("Login failed");
      fireEvent.change(usernameInput, changeEvent("updated-username"));
      expect(alert).not.toBeInTheDocument();
    });

    it("clear alert when user changes password", async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: "Login failed",
            },
          },
        }),
      };

      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await findByText("Login failed");
      fireEvent.change(passwordInput, changeEvent("updated-P4ssword"));
      expect(alert).not.toBeInTheDocument();
    });

    it("does not allow user to click the Login button when there is an ongoing api call", () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });

    it("displays spinner whern there is an ongoing api call", () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = screen.getByText(/Loading.../i);

      expect(spinner).toBeInTheDocument();
    });

    it("hide spinner after api call finished successfully", async () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = screen.getByText(/Loading.../i);

      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });

    it("hide spinner after api call finished with error", async () => {
      const actions = {
        postLogin: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({ response: { data: {} } });
            }, 300);
          });
        }),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = screen.getByText(/Loading.../i);

      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });
  });
});

// Not display error browser in test terminal
console.error = () => {};
