import React from 'react';

import Post from './Post';
import './PostList.css';

const PostList = props => {
    if(props.items.length === 0) {
        return (
            <div className='noPostList'>
                <h2>Ningún post para mostrar</h2>
            </div>
        )
    }

    return(
        <ul className="post-list">
            {props.items.map(post =>(
                <Post
                    key={post.id}
                    email={post.correo}
                    id={post.id}
                    postId={post._id}
                    image={post.image}
                    tag={post.tag}
                    name={post.objectName}
                    place={post.lugar}
                    date={post.fecha}
                    comments={post.comments}
                />
            ))}
        </ul>
    )

}

export default PostList