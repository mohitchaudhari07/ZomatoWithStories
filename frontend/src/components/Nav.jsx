import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";


const Nav = () => {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          <Link className="zmt" to="/">
            Zomato!
          </Link>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
           <div className="brand">
          <Link className="zmt" to="/user/register">
            Register
          </Link>
          
        </div>
        <div className="brand">
          <Link className="zmt" to="/food-partner/register">
            Register as Partner
          </Link>
        </div>
        </div>
       
      </header>
    </>
  );
};

export default Nav;
