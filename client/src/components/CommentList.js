import React from "react";

import Comment from "./Comment";
import './CommentList.css'

const CommentList = props => {
    if(props.items.length === 0) {
        return (
            <div>
                <h2>Ningún comentario para mostrar</h2>
            </div>
        )
    }
    return(
        <ul className="post-list">
            {props.items.map(comment =>(
                <Comment
                    key={comment.id}
                    email={comment.correo}
                    id={comment.id}
                    text={comment.texto}
                    date={comment.fecha}
                />
            ))}
        </ul>
    )

}

export default CommentList