import React, { useState, useEffect } from "react";
import { loginStudent } from "../services/StudentServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLogin = ({ setIsAuthenticated }) => {
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/student-list");
    }
  }, [navigate]);

  const handleOnChange = (event) => {
    setLoginDetail({ ...loginDetail, [event.target.name]: event.target.value });
  };

  const handleOnFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginStudent(loginDetail);
      localStorage.setItem("token", "your-auth-token"); // Assuming API sends a token
      setIsAuthenticated(true); // Update authentication state
      toast.success("Login successful!");
      navigate("/student-list");
    } catch (error) {
      setError(error.response?.data?.detail || "Invalid email or password");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  console.log("loginDetail", loginDetail);
  return (
    <div className="container mt-5 col-md-6 offset-3">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center">
              Welcome To Student Management System
            </h1>
            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleOnFormSubmit}>
                  <div className="form-group">
                    <label className="mb-2">Email</label>
                    <input
                      type="email"
                      className="form-control mb-2"
                      placeholder="Enter email"
                      name="email"
                      value={loginDetail.email}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-2">Password</label>
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Password"
                      name="password"
                      value={loginDetail.password}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-2"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center mt-5">
              <Link to="/add-student" className="navbar-brand text-center">
                Don't have an account? Click here to sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;
