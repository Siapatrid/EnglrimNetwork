import React, { Component } from 'react'
import style from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, formPropTypes as meta, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../Utilits/Validators/Validators'
import { Textarea } from '../../Common/FormsControls/FormsControls'

const maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props) => {
    let postsElements = props.profilePage.postsData.map((d) => (
        <Post message={d.message} counter={d.counter} key={d.id} />
    ))
    let addNewPost = (value) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={style.postsBlock}>
            <h1>My posts</h1>
            <div>
                <NewPostReduxForm onSubmit={addNewPost} />
            </div>
            <div className={style.posts}>{postsElements}</div>
        </div>
    )
})

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div className={style.formControl}>
                    <Field
                        component={Textarea}
                        name="newPostText"
                        placeholder={'Write new post here'}
                        validate={[required, maxLength10]}
                    />
                </div>
                {meta.touched && meta.error && (
                    <span className={style.formControl.error}>
                        'Some error'
                    </span>
                )}
                <button>New post</button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm({
    form: 'newPostForm',
    fields: ['newPostText'],
})(NewPostForm)
export default MyPosts
