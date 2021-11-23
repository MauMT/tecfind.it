import React, { Component } from "react";
import axios from "axios";

export default class CreateComment extends Component {
  constructor(props) {
    super(props);
    let temp = this.formatDate(new Date());
    this.state = {
      name: "",
      email: "",
      postID: 0,
      date: temp,
      comment: "",
    };
  }

  upd = () => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        this.setState({
          email: response.data.user[0].correo,
          name: response.data.user[0].nombreUsuario,
          postID: this.props.postID,
        });
      }
    });
  };

  componentDidMount() {
    this.upd();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      this.upd();
    }
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

  onChange = (d) => {
    this.setState({
      date: d,
    });
  };

  createcomment = (e) => {
    e.preventDefault();
    axios
      .post("/api/createcomment", this.state, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          window.location.href = "/";
        }
      });
  };

  render() {
    return (
      <div className="media social-comment">
        <a className="pull-left">
          <img src="https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg" />
        </a>
        <div className="media-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Leave a comment!"
              onChange={(e) => {
                this.setState({
                  comment: e.target.value,
                });
              }}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.createcomment}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}