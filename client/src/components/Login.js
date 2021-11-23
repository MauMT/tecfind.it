import React, { Component } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import"./login.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginEmail: "",
      loginPassword: "",
      loginStatus: "",
      success: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", this.state, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (
          response.data.message === "Wrong password" ||
          response.data.message === "User doesn't exist"
        ) {
          this.setState({ success: response.data.message });
        } else {
          console.log(response.data.message)
          window.location.reload();
          if (response.data.message) {
            this.state.loginStatus = response.data.message;
          } else {
            this.state.loginStatus = response.data[0].email;
          }
        }
      });
  };

  componentDidMount() {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.state.loginStatus = response.data.user[0].email;
      }
    });
  }

  render() {
    return (
      <div className="auth-wrapper back">
          <Link className="buttonback" to={"/"}>
          Inicio
        </Link>
      <div className="login-box">
        <div className=" login-snip">
          <form>
            <h3 class="tab">Log In</h3>
            <p></p>
            <div className="group">
              <label class="label">Email </label>
              <input
                class="input"
                type="email"
                placeholder="Ingresa tu email"
                onChange={(e) => this.setState({ loginEmail: e.target.value })}
              />
            </div>

            <br/>
            <div className="group">
              <label class="label">Contraseña</label>
              <input
                class="input"
                type="password"
                placeholder="Ingresa tu contraseña"
                onChange={(e) =>
                  this.setState({ loginPassword: e.target.value })
                }
              />
            </div>
            <br/>
            <div className="group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="check" htmlFor="customCheck1">
                &nbsp; Recuerdame
                </label>
              </div>
            </div>
            <p style={{ color: "red", paddingBottom: "5px" }}>
              {this.state.success}
            </p>

            <button
              type="submit"
              className="button"
              onClick={this.login}
            >
              Ingresar
            </button>
            <div class="hr"></div>
            <div class="foot">
            <p className="foot">
              ¿Olvidaste tu{" "}
              <a
                href="#"
                onClick={() => alert("Un email para recuperarla ha sido enviado")}
              >
                contraseña?
              </a>
            </p>
            </div>
          </form>
        </div>

        <h1>{this.loginStatus}</h1>
      </div>
      </div>

    );
  }
}