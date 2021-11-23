import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import Input from "../shared/components/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../shared/util/validators';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom';

toast.configure();

const CreateComment = props => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      text: {
        value: '',
        isValid: true
      }
    }
  );

  const postHandler = async event => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', auth.userEmail);
      formData.append('text', formState.inputs.text.value);
      formData.append('date', formatDate(new Date()));
      formData.append('postId', props.items);
      for (let value of formData.values()) {
        console.log(value);
      }
      await sendRequest(
        'http://localhost:3001/api/comment/create',
        'POST',
        JSON.stringify({
          email: auth.userEmail,
          text: formState.inputs.text.value,
          date: formatDate(new Date()),
          postId: props.items
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      toast.success('Comentario creado exitosamente!', {position: toast.POSITION.BOTTOM_CENTER})
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }


  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const onChange = (d) => {
    this.setState({
      date: d,
    });
  };


  
    return (
      <div className="media social-comment">
        <a className="pull-left">
          <img src="https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg" />
        </a>
        <div className="media-body">
          <div className="input-group">
            <Input
              type="text"
              id='text'
              className="form-control"
              placeholder="Leave a comment!"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="button commentb"
                onClick={postHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CreateComment