import React from 'react';

import Post from './Post';
import './PostList.css';

const PostList = props => {
    if(props.items.length === 0) {
        return (
            <div className='noPostList'>
                <p>¿Quieres crear un post?</p>
            </div>
        )
    }

    return(
        <ul className="post-list">
            {props.items.map(post =>(
                <Post
                    key={post.id}
                    id={post.id}
                    image={post.image}
                    tag={post.tag}
                    name={post.objectName}
                    place={post.lugar}
                    date={post.fecha}
                />
            ))}
        </ul>
    )

}

export default PostList