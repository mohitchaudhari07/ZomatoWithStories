import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PartnerRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;

    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          fullName,
          email,
          password,
          phone
        },
        {
          withCredentials: true
        }
      );
      console.log(response.data);
      navigate("/create-food");

    } catch (error) {
      console.error("Registration error:", error);
    }
  }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Partner sign up</h1>
          <p className="auth-sub">
            Create your food-partner account to start receiving orders.
          </p>
          <Link className="partnernavigate" to="/user/register">Click for User Registration</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Restaurant / Partner name</label>
            <input name="fullName" type="text" placeholder="Business name" />
          </div>
          <div>
            <label>Contact email</label>
            <input name="email" type="email" placeholder="contact@business.com" />
          </div>
          <div className="row two">
            <div className="col">
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" />
            </div>
            <div className="col">
              <label>Phone</label>
              <input name="phone" type="text" placeholder="Phone number" />
            </div>
          </div>
          <button type="submit" className="btn">Create partner account</button>
        </form>
        <p className="muted">
          Already registered? <Link to="/food-partner/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
