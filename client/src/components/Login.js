import React, { Component, useContext } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import"./login.css";
import { Link } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../shared/util/validators';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import Input from '../shared/components/Input';


const Login = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
      {
        email: {
          value: '',
          isValid: true
        },
        password: {
          value: '',
          isValid: true
        }
      },
      true
    );

    const loginHandler = async event => {
      event.preventDefault();

      try {
        const responseData = await sendRequest(
          'http://localhost:3001/api/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        console.log(responseData);
        auth.login(responseData.userId, responseData.email, responseData.token);
      } catch (error) {
        console.log(error);
      }

    }

    return (
      <div className="auth-wrapper back">
          <Link className="buttonback" to={"/"}>
          Inicio
        </Link>
      <div className="login-box">
        <div className=" login-snip">
          <form onSubmit={loginHandler}>
            <h3 class="tab">Log In</h3>
            <p></p>
            <div className="group">
              <label class="label">Email </label>
              <Input
                element="input"
                id="email"
                class="input"
                type="email"
                placeholder="Ingresa tu email"
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputHandler}
              />
            </div>

            <br/>
            <div className="group">
              <label class="label">Contraseña</label>
              <Input
                element="input"
                id="password"
                class="input"
                type="password"
                placeholder="Ingresa tu contraseña"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
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


            <button
              type="submit"
              className="button"
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
      </div>
      </div>

    );
  };

export default Login