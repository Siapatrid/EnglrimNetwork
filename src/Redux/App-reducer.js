import { authAPI } from '../Api/Api'
import { Navigate } from 'react-router-dom'
import React from 'react'
import { stopSubmit } from 'redux-form'
import { getAuthDataTC } from './Auth-reducer'

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

let initialState = {
    initialized: false,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}
export const initializedAC = () => ({
    type: INITIALIZED_SUCCESS,
})

export const initializeAppTC = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthDataTC())
        Promise.all([promise]).then(() => {
            dispatch(initializedAC())
        })
    }
}

export default authReducer
