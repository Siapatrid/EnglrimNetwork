import React, { Component } from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../Common/Preloader/Preloader'

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <ProfileInfo
                isOner={props.isOner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer store={props.store} />
            <div>
                <a href="mailto:creator@creator.edu">Написать создателю</a>
            </div>
            <div>
                <a href="tel:+79999999999">
                    Позвонить создателю (999) 999-9999
                </a>
            </div>
        </div>
    )
}

export default Profile
