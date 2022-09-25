import { useState } from "react";
import InputField from "../components/Global/Form/InputField/InputField";
import ButtonWithProgress from "../components/Global/Buttons/ButtonWithProgress";

const LoginPage = ({ actions }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setApiError(undefined);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setApiError(undefined);
  };

  const handleLogin = () => {
    const body = { username, password };
    setLoading(true);
    actions
      .postLogin(body)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response) {
          setApiError(error.response?.data?.message);
        }
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login</h1>
      <InputField
        label="Username"
        placeholder="Your username"
        value={username}
        onChange={handleChangeUsername}
      />
      <InputField
        label="Password"
        placeholder="Your password"
        type="password"
        value={password}
        onChange={handleChangePassword}
      />
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      <div className="text-center">
        <ButtonWithProgress
          text="Login"
          onClick={handleLogin}
          disabled={loading || username === "" || password === ""}
          loading={loading}
        />
      </div>
    </div>
  );
};

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
};

export default LoginPage;
