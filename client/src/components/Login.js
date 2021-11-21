import React, { Component } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

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
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Log In</h3>

            <div className="form-group">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                placeholder="Ingresa tu email"
                onChange={(e) => this.setState({ loginEmail: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                onChange={(e) =>
                  this.setState({ loginPassword: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Recuerdame
                </label>
              </div>
            </div>
            <p style={{ color: "red", paddingBottom: "5px" }}>
              {this.state.success}
            </p>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.login}
            >
              Ingresar
            </button>
            <p className="forgot-password text-right">
              ¿Olvidaste tu{" "}
              <a
                href="#"
                onClick={() => alert("Un email para recuperarla ha sido enviado")}
              >
                contraseña?
              </a>
            </p>
          </form>
        </div>

        <h1>{this.loginStatus}</h1>
      </div>
    );
  }
}