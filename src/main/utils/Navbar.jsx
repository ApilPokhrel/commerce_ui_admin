import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaLayerGroup } from "react-icons/fa";
import { IoMdHome, IoIosKey, IoIosKeypad, IoIosLogIn } from "react-icons/io";

const Navbar = props => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Admin
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <IoMdHome />
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/role">
                  <IoIosKey />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/permission">
                  <IoIosKeypad />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category">
                  <FaLayerGroup />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <IoIosLogIn />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

export default Navbar;
