import React, { Component, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import {
  aulasOptions,
  cafeteriasOptions,
  estacionamientosOptions,
  edificiosOptions,
  othersOptions,
  groupedOptions,
} from "../data/data";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import Input from '../shared/components/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../shared/util/validators';
import ImageUpload from "../shared/components/ImageUpload";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const customStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, .1)",
    padding: 10,
    borderRadius: "25px",
  }),

  input: (provided, state) => ({
    ...provided,
    color: "#aaa",
  }),
  options: (provided, state) => ({
    ...provided,
    color: "#aaa",
  }),

  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


const CreatePost = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      tag:{
        value: 'Abierto',
        isValid: true
      },
      objeto: {
        value: '',
        isValid: true
      },
      image: {
        value: null,
        isValid: true
      }
    },
    true
  );
  
  const [startDate, setStartDate] = useState(new Date());
  const [placeFound, setPlaceFound] = useState('A1');

  const postHandler = async event => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('correo', auth.userEmail);
      formData.append('tag', formState.inputs.tag.value);
      formData.append('objectName', formState.inputs.objeto.value);
      formData.append('lugar', placeFound.selected.value);
      formData.append('fecha', startDate);
      formData.append('image', formState.inputs.image.value);
      for (let value of formData.values()) {
        console.log(value);
      }
      
      await sendRequest(
        'http://localhost:3001/api/createpost',
        'POST',
        formData
      )
      toast.success('Post creado exitosamente!', {position: toast.POSITION.BOTTOM_CENTER})
      navigate('/');
    } catch (error) {
      console.log(error);
    }

  }

    return (
      <div className="auth-wrapper backposts">
        
        <div className="login-box">
          <div className="login-snip">
            <form onSubmit={postHandler}>
              <h3 class="tab">Crear un Post</h3>
              <p></p>
              <div className="group">
                <label class="label">Nombre del objeto</label>
                <Input
                  element="input"
                  id="objeto"
                  class="input"
                  type="objeto"
                  placeholder="Ingresa el nombre del objeto"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput ={inputHandler}
                />
              </div>
              <br />
              <div className="groupSelect">
                <label class="label">Lugar</label>
                <Select
                  id="lugar"
                  class="input"
                  type="lugar"
                  styles={customStyles}
                  defaultValue={aulasOptions[0]}
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                  onChange={(selected => setPlaceFound({selected}))}
                />
           
              </div>
              <br />
              <div className="group">
                <label class="label">Fecha encontrado</label>
                <DatePicker className="input" selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <br />
              <div className="group">
                <label class="label">Imagen</label>{" "}
                <small className="warning">
                  Espera al mensaje de subida exitosa
                </small>
                <ImageUpload
                  id="image"
                  center
                  onInput={inputHandler}
                />{" "}
              </div>
              <button
                type="submit"
                className="button"
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default CreatePost;