import axios from "axios";
import * as apiCalls from "./apiCalls";

describe("apiCalls", () => {
  describe("signup", () => {
    it("calls /api/v1/users", () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;
      apiCalls.signup();
      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe("/api/v1/users");
    });
  });

  describe("login", () => {
    it("calls /api/v1/login", () => {
      const mockLogin = jest.fn();
      axios.post = mockLogin;
      apiCalls.login({ username: "test-user", password: "P4ssword" });
      const path = mockLogin.mock.calls[0][0];
      expect(path).toBe("/api/v1/login");
    });
  });
});
