import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/Global/Form/InputField/InputField";
import ButtonWithProgress from "../components/Global/Buttons/ButtonWithProgress";

const SignupPage = ({ actions }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    displayName: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [passwordRepeatConfirmed, setPasswordRepeatConfirmed] = useState(true);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let passwordRepeatMatched = true;
    const validationErrors = { ...errors };

    if (e.target.name === "repeatPassword") {
      passwordRepeatMatched = e.target.value === user.password;
      setPasswordRepeatConfirmed(passwordRepeatMatched);
      validationErrors.repeatPassword = passwordRepeatMatched
        ? ""
        : "Does not match to password";
      setErrors(validationErrors);
    }

    if (e.target.name === "password") {
      passwordRepeatMatched = e.target.value === user.repeatPassword;
      setPasswordRepeatConfirmed(passwordRepeatMatched);
      delete validationErrors.password;
      validationErrors.repeatPassword = passwordRepeatMatched
        ? ""
        : "Does not match to password";
      setErrors(validationErrors);
    }

    if (e.target.name === "displayName") {
      delete validationErrors.displayName;
      setErrors(validationErrors);
    }

    if (e.target.name === "username") {
      delete validationErrors.username;
      setErrors(validationErrors);
    }

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    delete user.repeatPassword;
    setLoading(true);
    actions
      .postSignup(user)
      .then((response) => {
        setLoading(false);
        navigate("/login", { replace: true });
      })
      .catch((e) => {
        setLoading(false);
        if (e?.response?.data?.validationErrors) {
          setErrors(e.response.data.validationErrors);
        }
      });
  };

  return (
    <div className="container mt-5">
      <h1 data-testid="main-title-signup" className="text-center">
        Sign Up
      </h1>
      <div className="mb-3">
        <InputField
          label="Your display Name"
          placeholder="Your display name"
          value={user.displayName}
          onChange={handleInputChange}
          hasError={errors.displayName && true}
          errorMessage={errors.displayName}
          name="displayName"
        />
      </div>
      <div className="mb-3">
        <InputField
          label="Your username"
          placeholder="Your username"
          value={user.username}
          onChange={handleInputChange}
          hasError={errors.username && true}
          errorMessage={errors.username}
          name="username"
        />
      </div>
      <div className="mb-3">
        <InputField
          label="Your password"
          placeholder="Your password"
          type="password"
          value={user.password}
          onChange={handleInputChange}
          hasError={errors.password && true}
          errorMessage={errors.password}
          name="password"
        />
      </div>
      <div className="mb-3">
        <InputField
          label="Repeat your password"
          placeholder="Repeat your password"
          type="password"
          value={user.repeatPassword}
          onChange={handleInputChange}
          hasError={errors.repeatPassword && true}
          errorMessage={errors.repeatPassword}
          name="repeatPassword"
        />
      </div>
      <div className="text-center">
        <ButtonWithProgress
          text="Create account"
          onClick={handleSignupSubmit}
          disabled={loading || !passwordRepeatConfirmed}
          loading={loading}
        />
      </div>
    </div>
  );
};

SignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
};

export default SignupPage;
