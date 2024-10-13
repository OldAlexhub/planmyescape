import { Outlet, Link } from "react-router-dom";
import Logo from "../images/logo.webp";
import { useState, useEffect } from "react";
import axios from "axios";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check for an existing login session on mount
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);
      if (response.status === 200) {
        const { token, userId, name } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);

        setUserName(name);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={Logo}
              alt="logo"
              style={{
                borderRadius: "50%",
                width: "40px",
                marginRight: "10px",
              }}
            />
            <span>PlanMyEscape</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/plan" className="nav-link">
                      Start Planning
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/budget" className="nav-link">
                      Budget Planning
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/full" className="nav-link">
                      Full Plan
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/bookkeeping" className="nav-link">
                      Bookkeeping
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex align-items-center">
              {!isLoggedIn ? (
                <form
                  className="d-flex align-items-center"
                  onSubmit={handleLogin}
                >
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control me-2"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ maxWidth: "150px" }}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control me-2"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ maxWidth: "150px" }}
                  />
                  <button className="btn btn-primary me-2">Login</button>
                  <Link to="/signup" className="nav-link">
                    Signup here
                  </Link>
                </form>
              ) : (
                <div className="d-flex align-items-center">
                  <span className="me-3">Welcome, {userName}!</span>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
