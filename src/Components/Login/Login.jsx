import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getCaptchaUrlTC, loginMeTC } from '../../Redux/Auth-reducer'
import { Navigate } from 'react-router-dom'

import LoginReduxForm from './LoginForm'

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginMeTC(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        )
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                email={props.email}
                password={props.password}
                rememberMe={props.rememberMe}
                captchaUrl={props.captchaUrl}
            />
        </div>
    )
}

const mapStateToPros = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})
export default compose(connect(mapStateToPros, { loginMeTC, getCaptchaUrlTC }))(
    Login
)
