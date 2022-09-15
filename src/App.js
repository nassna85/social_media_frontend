import SignupPage from "./pages/SignupPage";
import * as apiCalls from "./api/apiCalls";

const actions = {
  postSignup: apiCalls.signup,
};

function App() {
  return (
    <div className="App">
      <SignupPage actions={actions} />
    </div>
  );
}

export default App;
