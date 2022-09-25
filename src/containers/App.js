import { Routes, Route } from "react-router-dom";

import * as apiCalls from "../api/apiCalls";

import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

const actions = {
  postLogin: apiCalls.login,
  postSignup: apiCalls.signup,
};

function App() {
  return (
    <div>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage actions={actions} />} />
          <Route path="/login" element={<LoginPage actions={actions} />} />
          <Route path="/:username" element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
