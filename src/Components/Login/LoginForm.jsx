import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { loginMeTC } from '../../Redux/Auth-reducer'
import { Input } from '../Common/FormsControls/FormsControls'
import { required } from '../Utilits/Validators/Validators'
import style from '../Common/FormsControls/FormsControls.modul.css'
import { createField } from '../Common/FormsControls/FormsControls'
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    type="text"
                    name={'email'}
                    placeholder={'Email'}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    type="password"
                    name={'password'}
                    placeholder={'Password'}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    type={'checkbox'}
                    name={'rememberMe'}
                    component={Input}
                />{' '}
                remember me
            </div>

            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl &&
                createField(
                    'Symbols form Image',
                    'captcha',
                    [required],
                    Input,
                    {}
                )}

            {props.error && (
                <div className={style.formSummaryError}>{props.error}</div>
            )}
            <div>
                <button
                    onClick={loginMeTC(
                        props.email,
                        props.password,
                        props.rememberMe
                    )}
                >
                    Login
                </button>
                {/*<button onClick={getCaptchaTC()}>captcha</button>*/}
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
    fields: ['email', 'password', 'rememberMe'],
})(LoginForm)

export default LoginReduxForm
