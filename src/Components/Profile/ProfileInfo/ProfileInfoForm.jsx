import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls';
import { createField } from '../../Common/FormsControls/FormsControls';
import { connect } from 'react-redux';
import style from '../../Common/FormsControls/FormsControls.modul.css';

const ProfileInfoForm = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <b>Change name</b>:
                {createField('Full Name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField('', 'LookingForAJob', [], Input, {
                    type: 'checkbox',
                })}
            </div>
            <div>
                <b>Looking for a job description</b>:
                {createField(
                    'lookingForAJobDescription',
                    'lookingForAJobDescription',
                    [],
                    Textarea
                )}
            </div>
            <div>
                <b>About me</b>:
                {createField('aboutMe', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div>
                            {key}:
                            {createField('', 'contacts.' + key, [], Input)}
                        </div>
                    );
                })}
            </div>
            <button>Save</button>
            <div>
                {error && <div className={style.formSummaryError}>{error}</div>}
            </div>
        </form>
    );
};

const ProfileReduxForm = reduxForm({
    form: 'edit-profile',
    fields: [
        'fullName',
        'LookingForAJob',
        'lookingForAJobDescription',
        'aboutMe',
    ],
})(ProfileInfoForm);
export default ProfileReduxForm;
