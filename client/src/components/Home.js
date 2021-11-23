import React, { useEffect, useContext, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";

import PostList from "./PostList";
import '../index.css'
import { AuthContext } from "../shared/context/auth-context";

const Home = () => {

  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3001/api/posts/feed'
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest]);

  const getPosts = async () => {
    try {
      const responseData = await sendRequest(
        'http://localhost:3001/api/posts/feed'
      );
      setLoadedPosts(responseData.posts);
    } catch (err) {}
  }

  // Filtering with Search bar
  const updateSearch = (event) => {
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
  const handleTag = (e) => {
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

  const searchByTag = async (tag) => {
    await getPosts();
    if(tag.target.value === 'All'){
      return
    }
    setLoadedPosts(prevPosts => 
      prevPosts.filter(post => post.tag == tag.target.value)
    );
  };

  const searchByPlace = async (place) => {
    await getPosts();
    if(place.target.value === 'All'){
      return
    }
    setLoadedPosts(prevPosts => 
      prevPosts.filter(post => post.lugar == place.target.value)
    );
  };

  //Fitering for tags
  const handlePlace = (e) => {
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

    return (
      <div  style={{ marginTop: "50px", paddingBottom: "30px" }}>
        <div className="sidebar">
          <div className="sideItemStyle">
            <p className="nameStyle"> Estado </p>
            <div className="btns">
              <button
                className="btn btnLeft"
                value="All"
                onClick={searchByTag}
                autoFocus
              >
                {" "}
                Todos{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Abierto"
                onClick={searchByTag}
              >
                {" "}
                Abierto{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Cerrado"
                onClick={searchByTag}
              >
                {" "}
                Cerrado{" "}
              </button>
              <button
                className="btn btnLeft"
                value="To be collected"
                onClick={searchByTag}
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
                onClick={searchByPlace}
              >
                {" "}
                Todos{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A1"
                onClick={searchByPlace}
              >
                {" "}
                A1{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A2"
                onClick={searchByPlace}
              >
                {" "}
                A2{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A3"
                onClick={searchByPlace}
              >
                {" "}
                A3{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A4"
                onClick={searchByPlace}
              >
                {" "}
                A4{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A6"
                onClick={searchByPlace}
              >
                {" "}
                A6{" "}
              </button>
              <button
                className="btn btnLeft"
                value="A7"
                onClick={searchByPlace}
              >
                {" "}
                A7{" "}
              </button>
              <button
                className="btn btnLeft"
                value="CIAP"
                onClick={searchByPlace}
              >
                {" "}
                CIAP{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Centrales"
                onClick={searchByPlace}
              >
                {" "}
                Centrales{" "}
              </button>
              <button
                className="btn btnLeft"
                value="La Carreta"
                onClick={searchByPlace}
              >
                {" "}
                La Carreta{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Jubileo"
                onClick={searchByPlace}
              >
                {" "}
                Jubileo{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E1"
                onClick={searchByPlace}
              >
                {" "}
                E1{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E4"
                onClick={searchByPlace}
              >
                {" "}
                E4{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E6"
                onClick={searchByPlace}
              >
                {" "}
                E6{" "}
              </button>
              <button
                className="btn btnLeft"
                value="E7"
                onClick={searchByPlace}
              >
                {" "}
                E7{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Bibliotec"
                onClick={searchByPlace}
              >
                {" "}
                Bibliotec{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Rectoria"
                onClick={searchByPlace}
              >
                {" "}
                Rectoria{" "}
              </button>
              <button
                className="btn btnLeft"
                value="CETEC"
                onClick={searchByPlace}
              >
                {" "}
                CETEC{" "}
              </button>
              <button
                className="btn btnLeft"
                value="JDC"
                onClick={searchByPlace}
              >
                {" "}
                JDC{" "}
              </button>
              <button
                className="btn btnLeft"
                value="Others"
                onClick={searchByPlace}
              >
                {" "}
                Others{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="postsMenu">
          {auth.token && (
            <h1 className="post-title">{"Bienvenido " + auth.userEmail}</h1>
          )}
          {!auth.token && (
            <h1 className="post-title">{"Bienvenido"}</h1>
          )}
          <br></br>
          <div className="barrita">
            <input
              className="search-box"
              type="text"
              icon="search"
              placeholder="Search object type"
              value="" //poner estado de busqueda
              onChange={updateSearch} //updateSearch.bind(this)
            />
            <i className="fa fa-search"></i>
          </div>
          <br />
          {!loadedPosts && (
             <h2 className="no-posts">No hay posts 🥺</h2>
          )}
          {loadedPosts && (
            <div className="postStyle">
              <PostList
                items={loadedPosts}
              />  
            </div>
          )}
        </div>
      </div>
    );
  }
export default Home