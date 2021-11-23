import React, { useEffect, useContext, useState } from "react";
import "./login.css";
import Post from "./Post";
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import axios from "axios";

const UserPosts = () => {

    const auth = useContext(AuthContext);
    const [loadedPosts, setLoadedPosts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => { 
      const fetchPosts = async () => {
        try {
          const responseData = await sendRequest(
            'http://localhost:3001/api/posts/user',
            'POST',
            JSON.stringify({
              email: auth.userEmail,
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          setLoadedPosts(responseData.posts);
          console.log(responseData.posts);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPosts();
    }, [sendRequest]);
  
    return (
      <div>
        <h1 className="post-title2">Mis posts</h1>
          <h2 className="no-posts">No tienes posts aún 😖</h2>
      </div>
    );

}


export default UserPosts;

/*
<div className="postStyle">
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
          </div>


*/