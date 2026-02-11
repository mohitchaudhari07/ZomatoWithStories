import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName= e.target.fullName.value;
    const email= e.target.email.value;
    const password= e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName,
        email,
        password
      }, {
        withCredentials: true
      });
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">
            Join as a user to discover great food nearby.
          </p>
          <Link className="partnernavigate" to="/food-partner/register">Click for Partner Registration</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="fullName" placeholder="Full name" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Choose a password" />
          </div>
          <button type="submit" className="btn">Create account</button>
        </form>
        <p className="muted">
          Already have an account? <Link to="/user/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
