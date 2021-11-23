import React, { Component } from "react";
import axios from "axios";
import "./Post.css";
import Comment from "./Comment";
import CreateComment from "./CreateComment.js";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.postID}`).then((response) => {
      this.setState({
        comments: response.data,
      });
    });
  }

  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  deletePost = () => {
    axios
      .delete("/api/post", { data: { postID: this.props.postID } })
      .then((response) => {
        window.location.reload();
      });
  };

  changeStatus = (e) => {
    const tag = e.target.textContent;
    axios
      .put("/api/post/status", { data: { tag, postID: this.props.postID } })
      .then((response) => {
        console.log("post status changed");
        window.location.reload();
      });
  };

  render() {
    let delButton;
    let createComment;
    let status;
    let variant;
    if (this.props.tag === "Open") {
      variant = "success";
    } else if (this.props.tag === "Closed") {
      variant = "secondary";
    } else if (this.props.tag === "To be collected") {
      variant = "warning";
    }

    // if user logged is the same creator of the post
    if (this.props.email == this.props.correo) {
      status = (
        <div className="dropdown">
          <DropdownButton
            variant={variant}
            id="dropdown-basic-button"
            title={this.props.tag}
          >
            <Dropdown.Item href="#" onClick={this.changeStatus}>
              Abierto
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={this.changeStatus}>
              Cerrado
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={this.changeStatus}>
              Esperando recolección
            </Dropdown.Item>
          </DropdownButton>
        </div>
      );
      delButton = (
        <button
          className="pull-right social-action btn btn-danger w-auto"
          onClick={this.deletePost}
        >Borrar{" "}
        </button>
      );
    } else {
      delButton = null;
      status = (
        <div>
          <Button variant={variant} size="md" disabled>
            {this.props.tag}
          </Button>
          <br></br>
        </div>
      );
    }

    // user is logged
    if (this.props.email != "") {
      createComment = (
        <div className="social-footer">
          <CreateComment postID={this.props.postID} />
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
                    <a>{this.props.nombreUsuario}</a>
                  </div>
                </div>
                <div className="social-body">
                  <div className="tituloPost">
                    <p>{this.props.objectName}</p>
                  </div>

                  <small>
                    <a> {status}</a>
                    <a>
                      <strong>Lugar:</strong> {this.props.lugar}{" "}
                    </a>{" "}
                    <br />
                    <a>
                      <strong>Fecha encontrado:</strong>{" "}
                      {this.formatDate(this.props.fecha)}{" "}
                    </a>
                  </small>

                  <img
                    src={this.props.image}
                    className="img-responsive img-size post-img"
                  />
                </div>
                {/* {createComment} */}
                <div className="social-footer">
                  {this.state.comments.map((comment) => {
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
                  })}
                </div>
                {createComment}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}