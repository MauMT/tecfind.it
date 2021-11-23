import React, { Component } from "react";
import "./Post.css";

const Comment = props => {


  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

    return (
      <div className="social-comment">
        <a className="pull-left">
          <img src="https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg" />
        </a>
        <div className="media-body">
          <a href="#">{props.email} </a>
          <small className="fecha-comment text-muted">
            {formatDate(props.date)}
          </small>
          <br />
          {props.text}
          <br />
        </div>
      </div>
    );
}

export default Comment
