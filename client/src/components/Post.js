import React, { Component, useContext } from "react";
import axios from "axios";
import "./Post.css";
import Comment from "./Comment";
import CreateComment from "./CreateComment.js";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../shared/context/auth-context";



const Post = props => {

  const auth = useContext(AuthContext);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const deletePost = () => {
    console.log('Intento borrar');
  }


    let delButton;
    let createComment;
    let status;
    let variant;
    if (props.tag === "Open") {
      variant = "success";
    } else if (props.tag === "Closed") {
      variant = "secondary";
    } else if (props.tag === "To be collected") {
      variant = "warning";
    }

    const changeStatus = () => {
      console.log("Entré");
    };

    // if user logged is the same creator of the post
    if (props.email == auth.userEmail) {
      status = (
        <div className="dropdown">
          <DropdownButton
            variant={variant}
            id="dropdown-basic-button"
            title={props.tag}
          >
            <Dropdown.Item href="#" onClick={changeStatus}>
              Abierto
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={changeStatus}>
              Cerrado
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={changeStatus}>
              Esperando recolección
            </Dropdown.Item>
          </DropdownButton>
        </div>
      );
      delButton = (
        <button
          className="pull-right social-action btn btn-danger w-auto"
          onClick={deletePost}
        >Borrar{" "}
        </button>
      );
    } else {
      delButton = null;
      status = (
        <div>
          <Button variant={variant} size="md" disabled>
            {props.tag}
          </Button>
          <br></br>
        </div>
      );
    }

    // user is logged
    if (auth.token) {
      createComment = (
        <div className="social-footer">
          <CreateComment postID={props.id} />
        </div>
      );
    } else {
      createComment = null;
    }

    return (
      <div>
        <div className="container">
          <div className="col-md-7">
            <div className="social-feed-separated">
              <div className="social-avatar">
                <a>
                  <img
                    className="avatar-img"
                    alt="image"
                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  />
                </a>
              </div>

              <div className="social-feed-box" style={{ width: "650px" }}>
                {delButton}
                <div className="social-avatar">
                  <div className="usuarioPost">
                    <a>{auth.userEmail}</a>
                  </div>
                </div>
                <div className="social-body">
                  <div className="tituloPost">
                    <p>{props.name}</p>
                  </div>

                  <small>
                    <a> {status}</a>
                    <a>
                      <strong>Lugar:</strong> {props.place}{" "}
                    </a>{" "}
                    <br />
                    <a>
                      <strong>Fecha encontrado:</strong>{" "}
                      {formatDate(props.date)}{" "}
                    </a>
                  </small>

                  <img
                    src={`http://localhost:3001/${props.image}`}
                    className="img-responsive img-size post-img"
                  />
                </div>
                
                <div className="social-footer">
                  {/*this.state.comments.map((comment) => {
                    return (
                      <Comment
                        nombreUsuario={comment.nombreUsuario}
                        key={comment.commentid}
                        commentid={comment.commentid}
                        correo={comment.correo}
                        postid={comment.postid}
                        fecha={comment.fecha}
                        texto={comment.texto}
                        tag={comment.tag}
                      />
                    );
                  })*/}
                </div>
                {/* {createComment} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Post