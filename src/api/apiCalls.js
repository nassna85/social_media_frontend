import axios from "axios";

export const signup = (user) => {
  return axios.post("/api/v1/users", user);
};

export const login = (user) => {
  return axios.post("/api/v1/login", {}, { auth: user });
};
