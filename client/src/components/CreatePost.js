import React, { Component, useContext } from "react";
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


const CreatePost =()=> {

  /*constructor(props) {
    super(props);
    let temp = this.formatDate(new Date());
    this.state = {
      objName: "",
      place: "A1",
      date: new Date(),
      image: "",
      fDate: temp,
      name: "",
      email: "",
      ok: false,
      imgLoaded: "",
    };
    

  }*/

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      objeto: {
        value: '',
        isValid: true
      },
      lugar: {
        value: "A1",
        isValid: true
      },
      fecha: {
        value: new Date(),
        isValid: true
      },
      imagen: {
        value: '',
        isValid: true
      },
      imgLoaded: {
        value: '',
        isValid: true
      },
    },
    true
  );
  
  const postHandler = async event => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        'http://localhost:3001/api/createpost',
        'POST',
        JSON.stringify({
          objeto: formState.inputs.objeto.value,
          lugar: formState.inputs.lugar.value,
          fecha: formState.inputs.fecha.value,
          imagen: formState.inputs.imagen.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      console.log(responseData);
      auth.login(responseData.userId, responseData.token, responseData.email);
    } catch (error) {
      console.log(error);
    }

  }

 /* upd = () => {
    axios.get("/api/login").then((response) => {
      // console.log("response: " + response.data);
      // console.log(response.data);
      if (response.data.loggedIn === true) {
        // console.log("im in");
        this.setState({
          email: response.data.user[0].correo,
          name: response.data.user[0].nombreUsuario,
        });
      } else {
        this.setState({
          email: "",
          name: "",
        });
      }
    });
  };*/

  /*componentDidMount() {
    this.upd();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      this.upd();
    }
  }*/

 /* formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  onChange = (d) => {
    let temp = this.formatDate(d);
    this.setState({
      fDate: temp,
      date: d,
    });
  };

  createpost = (e) => {
    e.preventDefault();
    axios
      .post("/api/createpost", this.state, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          window.location.href = "/";
        }
      });
  };

  

  getImageURL = (e) => {
    this.setState({
      imgLoaded: "",
    });
    const id = `Client-ID ${process.env.REACT_APP_CLIENT_ID}`;
    const data = new FormData();
    data.append("image", e.target.files[0]);
    const config = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: id,
      },
    };
    axios.post("https://api.imgur.com/3/image", data, config).then((resp) => {
      this.setState({
        image: resp.data.data.link,
        imgLoaded: "¡Tu imagen se ha subido!",
                          selected={this.state.date}
                  onChange={this.onChange}
      });
    });
  };*/


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
                  element="input"
                  id="lugar"
                  class="input"
                  type="lugar"
                  styles={customStyles}
                  defaultValue={aulasOptions[0]}
                  options={groupedOptions}
                  formatGroupLabel={formatGroupLabel}
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                />
           
              </div>
              <br />
              <div className="group">
                <label class="label">Fecha encontrado</label>
                <DatePicker
                  className="input"
                  element="input"
                  id="fecha"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}

                />
              </div>
              <br />
              <div className="group">
                <label class="label">Imagen</label>{" "}
                <small className="warning">
                  Espera al mensaje de subida exitosa
                </small>
                <Input
                  type="file"
                  className="input"
                  element="input"
                  id="imagen"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                />{" "}
                <p style={{ color: "green" }}>{useForm['imgLoaded']}</p>
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