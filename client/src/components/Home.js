import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import '../index.css'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      email: "",
      name: "",
      search: "",
      searchTag: false,
      Tag: "",
      filteredPosts: [],
    };
  }

  upd = () => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
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
  };

  componentDidMount() {
    this.upd();
    axios.get("/api/").then((response) => {
      this.setState({
        posts: response.data,
        filteredPosts: response.data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email) {
      this.upd();
    }
  }

  // Filtering with Search bar
  updateSearch(event) {
    this.setState({ search: event.target.value });

    this.setState({
      filteredPosts: this.state.filteredPosts.filter((post) => {
        return (
          post.objectName
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      }),
    });

    if (event.target.value === "") {
      this.setState({ filteredPosts: this.state.posts });
    }
  }

  //Fitering for tags
  handleTag = (e) => {
    console.log(e.target.value);
    this.state.searchTag = true;
    this.state.Tag = e.target.value;

    this.setState({ search: "" });

    if (e.target.value === "All") {
      this.setState({ filteredPosts: this.state.posts });
    } else {
      this.setState({
        filteredPosts: this.state.posts.filter(
          (item) => item.tag === e.target.value
        ),
      });
    }
  };

  //Fitering for tags
  handlePlace = (e) => {
    console.log(e.target.value);

    this.setState({ search: "" });

    if (e.target.value === "All") {
      this.setState({ filteredPosts: this.state.posts });
    } else {
      this.setState({
        filteredPosts: this.state.posts.filter(
          (item) => item.lugar === e.target.value
        ),
      });
    }
  };

  render() {
    return (
      <div  style={{ marginTop: "50px", paddingBottom: "30px" }}>
        <div className="sidebar">
          <div className="sideItemStyle">
            <p className="nameStyle"> Estado </p>
            <div className="btns">
              <button
                className="btn btnLeft"
                value="All"
                onClick={this.handleTag}
                autoFocus
              >
                {" "}
                Todos{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Open"
                onClick={this.handleTag}
              >
                {" "}
                Abierto{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Closed"
                onClick={this.handleTag}
              >
                {" "}
                Cerrado{" "}
              </button>
              <button
                className="btn btnLeft"
                value="To be collected"
                onClick={this.handleTag}
              >
                {" "}
               Esperando recolección{" "}
              </button>
            </div>
          </div>
          <div className="sideItemStyle">
            <p className="nameStyle"> Lugar </p>
            <div className="btns2 btns">
              <button
                className="btn btnLeft"
                value="All"
                onClick={this.handlePlace}
              >
                {" "}
                Todos{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A1"
                onClick={this.handlePlace}
              >
                {" "}
                A1{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A2"
                onClick={this.handlePlace}
              >
                {" "}
                A2{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A3"
                onClick={this.handlePlace}
              >
                {" "}
                A3{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A4"
                onClick={this.handlePlace}
              >
                {" "}
                A4{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A6"
                onClick={this.handlePlace}
              >
                {" "}
                A6{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A7"
                onClick={this.handlePlace}
              >
                {" "}
                A7{" "}
              </button>
              <button
                className="btn btnLeft"
                value="CIAP"
                onClick={this.handlePlace}
              >
                {" "}
                CIAP{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Centrales"
                onClick={this.handlePlace}
              >
                {" "}
                Centrales{" "}
              </button>
              <button
                className="btn btnLeft"
                value="La Carreta"
                onClick={this.handlePlace}
              >
                {" "}
                La Carreta{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Jubileo"
                onClick={this.handlePlace}
              >
                {" "}
                Jubileo{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E1"
                onClick={this.handlePlace}
              >
                {" "}
                E1{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E4"
                onClick={this.handlePlace}
              >
                {" "}
                E4{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E6"
                onClick={this.handlePlace}
              >
                {" "}
                E6{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E7"
                onClick={this.handlePlace}
              >
                {" "}
                E7{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Bibliotec"
                onClick={this.handlePlace}
              >
                {" "}
                Bibliotec{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Rectoria"
                onClick={this.handlePlace}
              >
                {" "}
                Rectoria{" "}
              </button>
              <button
                className="btn btnLeft"
                value="CETEC"
                onClick={this.handlePlace}
              >
                {" "}
                CETEC{" "}
              </button>
              <button
                className="btn btnLeft"
                value="JDC"
                onClick={this.handlePlace}
              >
                {" "}
                JDC{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Others"
                onClick={this.handlePlace}
              >
                {" "}
                Others{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="postsMenu">
          <h1 className="post-title">{"Bienvenido " + this.state.name}</h1>
          <br></br>
          <div className="barrita">
            <input
              className="search-box"
              type="text"
              icon="search"
              placeholder="Search object type"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
            <i className="fa fa-search"></i>
          </div>
          <br />
          {this.state.posts && this.state.posts.length > 0 ? (
            <div className="postStyle">
              {this.state.filteredPosts.map((post) => {
                return (
                  <Post
                    key={post.postID}
                    postID={post.postID}
                    correo={post.correo}
                    tag={post.tag}
                    objectName={post.objectName}
                    lugar={post.lugar}
                    fecha={post.fecha}
                    image={post.image}
                    nombreUsuario={post.nombreUsuario}
                    email={this.state.email}
                  />
                );
              })}
            </div>
          ) : (
            <h2 className="no-posts">No hay posts 🥺</h2>
          )}
        </div>
      </div>
    );
  }
}