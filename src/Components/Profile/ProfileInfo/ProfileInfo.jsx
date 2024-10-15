import React, { Component, useState } from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './PtofileStatusWithHooks';
import ProfileReduxForm from './ProfileInfoForm';
const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    const onSubmit = (formData) => {
        props.saveProfile(formData);
        setEditMode(false);
    };

    if (!props.profile) {
        return <Preloader />;
    }

    const photoIsChosen = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };
    return (
        <div className={style.full_profile}>
            <div>
                <img
                    src={
                        props.profile.photos.large ||
                        'https://planetsains.com/wp-content/uploads/2022/09/anonymous-avatar-icon-25.png'
                    }
                    className={style.mainPhoto}
                    alt="Изображение профиля"
                />
                {props.isOner && (
                    <input type={'file'} onChange={photoIsChosen} />
                )}
            </div>

            <div className={style.description_info}>
                <div className={style.name}>{props.profile.fullName}</div>
                <b>Status</b>:
                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
                <br />
                {editMode ? (
                    <ProfileReduxForm
                        initialValues={props.profile}
                        profile={props.profile}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <ProfileInfoData
                        goToEditMode={() => {
                            setEditMode(true);
                        }}
                        profile={props.profile}
                        isOwner={props.isOner}
                    />
                )}
            </div>
        </div>
    );
};

const ProfileInfoData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            <div>
                <b>Looking for a job</b>:{profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob && (
                <div>
                    <b>Looking for a job description</b>:
                    {profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me</b>:{profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        profile.contacts[key] && (
                            <Contact
                                key={key}
                                contactTitle={key}
                                contactValue={profile.contacts[key]}
                            />
                        )
                    );
                })}
            </div>
            {isOwner && (
                <div>
                    <button onClick={goToEditMode}>Edit profile</button>
                </div>
            )}
        </div>
    );
};

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default ProfileInfo;
