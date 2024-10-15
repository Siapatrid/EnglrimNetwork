import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../Common/Preloader/Preloader';
import style from './Profile.module.css';

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />;
    }
    return (
        <div className={style.page}>
            <ProfileInfo
                isOner={props.isOner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            {props.isOner ? (
                <MyPostsContainer store={props.store} />
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Profile;
