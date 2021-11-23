import React, { useContext } from "react";
import {Link} from "react-router-dom";
import "../index.css";

import { AuthContext } from "../shared/context/auth-context";

export const Nav = (props) => {

  const auth = useContext(AuthContext);

    return (

          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            {" "}
            <Link className="nav-link" to={"/"}>
            &ensp;TecFind.it🔎
            </Link>
            <div className="container">
    
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link hola" to={"/"}>
                Inicio&emsp;│
              </Link>
            </li>
            {!auth.isLoggedIn &&(
              <li className="nav-item">
                <Link className="nav-link hola" to={"/login"}>
                  Log in&emsp;│
                </Link>
              </li>
            )}
            {!auth.isLoggedIn &&(
              <li className="nav-item">
                <Link className="nav-link hola" to={"/signup"}>
                  Registrarse&emsp;
                </Link>
            </li>
            )}
            {auth.isLoggedIn &&(
              <li className="nav-item">
                <Link className="nav-link hola" to={"/createpost"}>
                  Crear post&emsp;│
                </Link>
              </li>
            )} 
            {auth.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link hola" to={"/myposts"}>
                  Mis Posts &emsp;│
                </Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <button class="nav-link hola navbar-btn" onClick={auth.logout}>Cerrar sesión</button>
              </li>
            )}
        
        
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