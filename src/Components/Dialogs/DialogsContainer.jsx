import React from 'react'
import { sendMesActionCreator } from '../../Redux/Dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../HOC/WithAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
})
let mapDispatchToProps = (dispatch) => {
    return {
        newMessage: (newMessageText) => {
            dispatch(sendMesActionCreator(newMessageText))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
