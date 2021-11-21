import React, { Component } from "react";
import axios from "axios";

export default class Logout extends Component {
  logOut = () => {
    axios.get("/api/logout").then((response) => {
      // alert(response.data);
      window.location.reload();
    });
  };

  render() {
    return <div onClick={this.logOut}>Log out</div>;
  }
}