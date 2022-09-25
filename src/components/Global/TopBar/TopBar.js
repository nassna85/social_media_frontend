import { Link } from "react-router-dom";

import logo from "../../../assets/hoaxify-logo.png";

const TopBar = () => {
  return (
    <div className="bg-white shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="60" alt="Hoaxify" /> Social Media
          </Link>
          <ul className="nav navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
