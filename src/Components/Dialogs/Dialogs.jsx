import React from 'react';
import stile from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../Utilits/Validators/Validators';

const Dialogs = (props) => {
    let messageElements = props.dialogsPage.messagesData.map((d) => (
        <Message message={d.message} stile={d.stile} ava={d.ava} key={d.id} />
    ));

    let dialogsElements = props.dialogsPage.dialogsData.map((props) => (
        <DialogItem name={props.name} id={props.id} key={props.id} />
    ));

    let addNewMessage = (value) => {
        props.newMessage(value.newMessageText);
    };

    if (!props.isAuth) {
        return <Navigate to="/login" />;
    }
    return (
        <div className={stile.dialogs}>
            <div className={stile.dialogsItems}>{dialogsElements}</div>
            <div className={stile.messages}>{messageElements}</div>
            <AddMessageReduxForm onSubmit={addNewMessage} />
        </div>
    );
};

const maxLength50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={stile.userContainer}>
                <Field
                    component={Textarea}
                    validate={[required, maxLength50]}
                    name="newMessageText"
                    placeholder={'Write new message here'}
                />
                <button>send</button>
            </div>
        </form>
    );
};

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm',
})(AddMessageForm);
export default Dialogs;
