import { profileAPI, usersAPI } from '../Api/Api'
import { setAuthUserDataAC } from './Auth-reducer'
import { get } from 'axios'
import { stopSubmit } from 'redux-form'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SAVE_PHOTO = 'SAVE-PHOTO'

const initialState = {
    postsData: [
        { id: 1, message: 'Hi, how is your english?', counter: 10 },
        { id: 2, message: 'Good luck, Buddy!', counter: 10 },
    ],
    newPostText: 'Write new post here',
    profile: null,
    status: '',
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let addPost = {
                id: 5,
                message: action.newPostText,
                counter: 0,
            }
            return {
                ...state,
                newPostText: '',
                postsData: [...state.postsData, addPost],
            }
        }
        case UPDATE_NEW_POST_TEXT:
            return { ...state, newPostText: action.newPostText }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }
        case SAVE_PHOTO:
            debugger
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText: newPostText,
})
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text,
})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const setStatus = (status) => ({ type: SET_STATUS, status })

export const savePhoto = (photos) => ({ type: SAVE_PHOTO, photos })

export const getProfileTC = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId).then((response) => {
            dispatch(setUserProfile(response.data))
        })
    }
}

export const getUserStatusTC = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then((response) => {
            dispatch(setStatus(response.data))
        })
    }
}
export const updateStatusTC = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}

export const savePhotoTC = (photo) => {
    return (dispatch) => {
        profileAPI.savePhoto(photo).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(savePhoto(response.data.data.photos))
            }
        })
    }
}

// export const saveProfileTC = (profile) => async (dispatch) => {
//     let response = await profileAPI.saveProfile(profile)
//     debugger
//     if (response.data.resultCode === 0) {
//         dispatch(setUserProfile(response.data.data))
//     }
// }

export const saveProfileTC = (profile) => {
    return (dispatch, getState) => {
        const userId = getState().auth.id
        profileAPI.saveProfile(profile).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getProfileTC(userId))
            } else {
                dispatch(
                    stopSubmit('edit-profile', {
                        _error: response.data.messages[0],
                    })
                )
                return Promise.reject(response.data.messages[0])
            }
        })
    }
}

export default profileReducer
