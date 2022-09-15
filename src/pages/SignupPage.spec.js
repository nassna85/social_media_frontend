import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SignupPage from "./SignupPage";

describe("UserSignupPage", () => {
  describe("Layout", () => {
    it("has header of Sign Up", () => {
      render(<SignupPage />);
      const header = screen.getByTestId("main-title-signup");
      expect(header).toHaveTextContent("Sign Up");
    });

    it("has input for display name", () => {
      render(<SignupPage />);
      const displayNameInput =
        screen.queryByPlaceholderText("Your display name");
      expect(displayNameInput).toBeInTheDocument();
    });

    it("has input for username", () => {
      render(<SignupPage />);
      const usernameInput = screen.queryByPlaceholderText("Your username");
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for password", () => {
      render(<SignupPage />);
      const passwordInput = screen.queryByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<SignupPage />);
      const passwordInput = screen.queryByPlaceholderText("Your password");
      expect(passwordInput.type).toBe("password");
    });

    it("has input for password repeat", () => {
      render(<SignupPage />);
      const passwordRepeatInput = screen.queryByPlaceholderText(
        "Repeat your password"
      );
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it("has password type for password repeat input", () => {
      render(<SignupPage />);
      const passwordRepeatInput = screen.queryByPlaceholderText(
        "Repeat your password"
      );
      expect(passwordRepeatInput.type).toBe("password");
    });

    it("has submit button", () => {
      render(<SignupPage />);
      const button = screen.queryByText("Create account");
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

    let button,
      displayNameInput,
      usernameInput,
      passwordInput,
      repeatPasswordInput;

    const setupForSubmit = (props) => {
      const utils = render(<SignupPage {...props} />);

      displayNameInput = screen.getByPlaceholderText(/Your display name/i);
      usernameInput = screen.getByPlaceholderText(/Your username/i);
      passwordInput = screen.getAllByPlaceholderText(/Your password/i)[0];
      repeatPasswordInput =
        screen.getByPlaceholderText(/Repeat your password/i);

      fireEvent.change(displayNameInput, changeEvent("my-display-name"));
      fireEvent.change(usernameInput, changeEvent("my-username"));
      fireEvent.change(passwordInput, changeEvent("my-password"));
      fireEvent.change(repeatPasswordInput, changeEvent("my-password"));

      button = screen.getByText(/Create account/i);

      return utils;
    };

    it("set the displayName value into state", () => {
      render(<SignupPage />);
      const displayNameInput =
        screen.queryByPlaceholderText("Your display name");
      fireEvent.change(displayNameInput, changeEvent("my-display-name"));

      expect(displayNameInput).toHaveValue("my-display-name");
    });

    it("set the username value into state", () => {
      render(<SignupPage />);
      const userNameInput = screen.queryByPlaceholderText("Your username");
      fireEvent.change(userNameInput, changeEvent("my-username"));

      expect(userNameInput).toHaveValue("my-username");
    });

    it("set the password value into state", () => {
      render(<SignupPage />);
      const passwordInput = screen.queryByPlaceholderText("Your password");
      fireEvent.change(passwordInput, changeEvent("my-password"));

      expect(passwordInput).toHaveValue("my-password");
    });

    it("set the repeatPassword value into state", () => {
      render(<SignupPage />);
      const repeatPasswordInput = screen.queryByPlaceholderText(
        "Repeat your password"
      );
      fireEvent.change(repeatPasswordInput, changeEvent("my-password"));

      expect(repeatPasswordInput).toHaveValue("my-password");
    });

    it("calls postSignup when the field are valid and the actions are provided in props", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("does not throw exception when clicking the button when actions not provided in props", () => {
      setupForSubmit();

      fireEvent.click(button);

      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it("calls post with user body when the fiels are valid", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);
      const expectedUserObject = {
        username: "my-username",
        displayName: "my-display-name",
        password: "my-password",
      };

      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });

    it("does not allow user to click the Sign Up button when there is an ongoing api call", () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("displays spinner when there is an ongoing api call", () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = screen.getByText(/Loading.../i);

      expect(spinner).toBeInTheDocument();
    });

    it("hide spinner after api call finished successfully", async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = screen.getByText(/Loading.../i);

      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });

    it("hide spinner after api call finished with error", async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
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

    it("displays message validation error for dislayName when error is received for the field", async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName:
                  "The displayName must have minimum 2 and maximum 60 characters",
              },
            },
          },
        }),
      };

      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const errorMessage = await findByText(
        "The displayName must have minimum 2 and maximum 60 characters"
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it("enables the signup button when password and repeat password have same value", () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });

    it("disables the signup button when password repeat does not match to password", () => {
      setupForSubmit();
      fireEvent.change(repeatPasswordInput, changeEvent("new-pass"));
      expect(button).toBeDisabled();
    });

    it("disables the signup button when password does not match to password repeat", () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent("new-pass"));
      expect(button).toBeDisabled();
    });

    it("displays error style for password repeat input when password repeat mismatch", () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(repeatPasswordInput, changeEvent("new-pass"));
      const mismatchWarning = queryByText("Does not match to password");
      expect(mismatchWarning).toBeInTheDocument();
    });

    it("displays error style for password repeat input when password input mismatch", () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordInput, changeEvent("new-pass"));
      const mismatchWarning = queryByText("Does not match to password");
      expect(mismatchWarning).toBeInTheDocument();
    });

    it("hides the validation error when user changes the content of displayName", async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName:
                  "The displayName must have minimum 2 and maximum 60 characters",
              },
            },
          },
        }),
      };

      const { findByText, queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await findByText(
        "The displayName must have minimum 2 and maximum 60 characters"
      );

      fireEvent.change(displayNameInput, changeEvent("name updated"));

      const errorMessage = queryByText(
        "The displayName must have minimum 2 and maximum 60 characters"
      );

      expect(errorMessage).not.toBeInTheDocument();
    });

    it("hides the validation error when user changes the content of username", async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                username:
                  "The username must have minimum 2 and maximum 60 characters",
              },
            },
          },
        }),
      };

      const { findByText, queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await findByText(
        "The username must have minimum 2 and maximum 60 characters"
      );

      fireEvent.change(usernameInput, changeEvent("username updated"));

      const errorMessage = queryByText(
        "The username must have minimum 2 and maximum 60 characters"
      );

      expect(errorMessage).not.toBeInTheDocument();
    });

    it("hides the validation error when user changes the content of password", async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                password:
                  "The password must have minimum 8 and maximum 255 characters",
              },
            },
          },
        }),
      };

      const { findByText, queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await findByText(
        "The password must have minimum 8 and maximum 255 characters"
      );

      fireEvent.change(passwordInput, changeEvent("password updated"));

      const errorMessage = queryByText(
        "The password must have minimum 8 and maximum 255 characters"
      );

      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});

// Skip error on the console
console.error = () => {};
