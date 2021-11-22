import React, { Component } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      loginEmail: "",
      loginPassword: "",
      success: "",
    };
  }

  signUp = (e) => {
    this.setState({ success: "" });
    e.preventDefault();
    axios
      .post("/api/signup", this.state, { withCredentials: true })
      .then((response) => {
        this.setState({ success: response.data });
        if (this.state.success === "User succesfully registered") {
          this.setState({ loginEmail: this.state.registerEmail });
          this.setState({ loginPassword: this.state.registerPassword });
          axios
            .post("/api/login", this.state, { withCredentials: true })
            .then((response) => {
              console.log(response.data);
              window.location.reload();
            });
        }
      });
  };

  render() {
    let successColor;
    if (this.state.success === "User succesfully registered") {
      successColor = "green";
    } else {
      successColor = "red";
    }
    return (
      <div className="auth-wrapper backregister">
          <Link className="buttonback" to={"/"}>
          Inicio
        </Link>
        <div className="login-box">
          <div className="login-snip">
            <form>
              <h3 class="tab">Registrate</h3>
              <p></p>
              <div className="group">
                <label class="label">Nombre completo</label>
                <input
                  type="text"
                  class="input"
                  placeholder="Nombre completo"
                  onChange={(e) =>
                    this.setState({ registerName: e.target.value, success: "" })
                  }
                />
              </div>
              <br/>
              <div className="group">
                <label class="label">Email</label>
                <input
                  type="email"
                  class="input"
                  placeholder="Ingresa tu email"
                  onChange={(e) =>
                    this.setState({ registerEmail: e.target.value, success: "" })
                  }
                />
              </div>
              <br/>
              <div className="group">
                <label class="label">Contraseña</label>
                <input
                  type="password"
                  class="input"
                  placeholder="Ingresa contraseña"
                  onChange={(e) =>
                    this.setState({
                      registerPassword: e.target.value,
                      success: "",
                    })
                  }
                />
              </div>
              <p style={{ color: successColor, paddingBottom: "5px" }}>
                {this.state.success}
              </p>
              <button
                type="submit"
                className="button"
                onClick={this.signUp}
              >
                Registrar
              </button>
              <div class="hr"></div>
              <p className="foot">
                ¿Ya estás registrado? <a href="/login">Inicia sesión</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}