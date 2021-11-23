import React, { Component, useContext, useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const SignUp = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
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
        },
        userName: {
          value: '',
          isValid: true
        }
      },
      true
    );


  const signUpHandler = async event => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        'http://localhost:3001/api/signup',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          userName: formState.inputs.userName.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.userId, responseData.email, responseData.token);
      toast.success('Registered successfully!', {position: toast.POSITION.BOTTOM_CENTER})
      navigate('/');
    } catch (error) {
      toast.error(error.message, {position: toast.POSITION.BOTTOM_CENTER})
      console.log(Object.keys(error))
    }
  };

  return (
    <div className="auth-wrapper backregister">
      
      <div className="login-box">
        <div className="login-snip">
          <form onSubmit={signUpHandler}>
            <h3 class="tab">Registrarse</h3>
            <p></p>
            <div className="group">
              <label class="label">Nombre completo</label>
              <Input
                element="input"
                id="userName"
                type="text"
                placeholder="Nombre completo"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <br/>
            <div className="group">
              <label class="label">Email</label>
              <Input
                element="input"
                id="email"
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
                type="password"
                placeholder="Ingresa contraseña"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
            <button
              type="submit"
              className="button btnReg">
              Registrarse
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
};

export default SignUp;