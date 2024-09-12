import React, { Component } from 'react'
import stile from './Post.module.css'

const Post = (props) => {
    return (
        <div className={stile.item}>
            <img src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png" />
            {props.message}
            <div>{props.counter}</div>
        </div>
    )
}

export default Post
