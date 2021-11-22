import React from "react";
import {Link} from "react-router-dom";
import "../index.css";


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
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link hola" to={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <Link className="nav-link hola" to={"/login"}>
            Log in
          </Link>
                  <Link className="nav-link hola" to={"/signup"}>
            Registrarse
          </Link>
                  <li className="nav-item">
          <Link className="nav-link hola" to={"/createpost"}>
            Crear post
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link hola" to={"/myposts"}>
            Mis Posts
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