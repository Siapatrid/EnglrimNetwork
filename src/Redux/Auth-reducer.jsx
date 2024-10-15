import { authAPI, securityAPI } from '../Api/Api';
import { Navigate, NavLink } from 'react-router-dom';
import React from 'react';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'my-app/auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'my-app/auth/GET-CAPTCHA-URL-SUCCESS';

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null, //if null, then captcha isn't required
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const setAuthUserDataAC = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: { id, login, email, isAuth },
});

export const setCaptchaUrlAC = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

export const getAuthDataTC = () => {
    return (dispatch) => {
        authAPI.authUser().then((data) => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthUserDataAC(id, login, email, true));
            }
        });
    };
};

export const loginMeTC =
    (email, password, rememberMe, captcha) => async (dispatch) => {
        let response = await authAPI.loginMe(
            email,
            password,
            rememberMe,
            captcha
        );
        if (response.data.resultCode === 0) {
            dispatch(getAuthDataTC());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrlTC());
            }
            let message =
                response.data.messages.length > 0
                    ? response.data.messages[0]
                    : 'Some error';
            stopSubmit('login', { _error: message });
        }
    };

export const logoutMeTC = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI
            .logoutMe()
            .then((response) => {
                if (response.resultCode === 0) {
                    dispatch(setAuthUserDataAC(null, null, null, false));
                }
            })
            .then(<NavLink to={'/login'} />);
    };
};

export const getCaptchaUrlTC = () => {
    return (dispatch) => {
        securityAPI.getCaptchaUrl().then((response) => {
            const url = response.data.url;
            dispatch(setCaptchaUrlAC(url));
        });
    };
};

export default authReducer;
