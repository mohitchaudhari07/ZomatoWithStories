import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function PartnerLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      navigate("/create-food");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-sub">
            Sign in to manage your restaurant and orders.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="contact@business.com"
            />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <button className="btn">Sign in</button>
        </form>
        <p className="muted">
          Don't have an account?{" "}
          <Link to="/food-partner/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
