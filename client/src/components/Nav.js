import React from "react";
import {Link} from "react-router-dom";
import "../pages/App.css";




export const Nav = (props) => {

    return (
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            {" "}
            <Link className="nav-link" to={"/"}>
              tecfind.it🔎
            </Link>
            <div className="container">
    
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link hola" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <Link className="nav-link hola" to={"/login"}>
            Log in
          </Link>
                  <Link className="nav-link hola" to={"/signup"}>
            Sign up
          </Link>
                  <li className="nav-item">
          <Link className="nav-link hola" to={"/createpost"}>
            Create post
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link hola" to={"/myposts"}>
            My Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link hola" to={"/"}>
          </Link>
        </li>
                </ul>
              </div>
            </div>
          </nav>
    );
  }