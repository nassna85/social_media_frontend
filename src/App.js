import SignupPage from "./pages/SignupPage";
import * as apiCalls from "./api/apiCalls";
import LoginPage from "./pages/LoginPage";

const actions = {
  postLogin: apiCalls.login,
};

function App() {
  return (
    <div className="App">
      {/* <SignupPage actions={actions} /> */}
      <LoginPage actions={actions} />
    </div>
  );
}

export default App;
