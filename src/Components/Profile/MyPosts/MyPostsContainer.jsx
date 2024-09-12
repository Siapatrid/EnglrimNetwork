import React, { Component } from 'react'
import {
    addPostActionCreator,
    updateNewPostTextActionCreator,
} from '../../../Redux/Profile-reducer'
import { connect } from 'react-redux'
import myPosts from './MyPosts'

const mapStateToProps = (state) => ({ profilePage: state.profilePage })

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        },
        onPostChange: (text) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(myPosts)
export default MyPostsContainer
