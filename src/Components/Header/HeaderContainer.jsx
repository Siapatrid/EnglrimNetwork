import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { logoutMeTC, getAuthDataTC } from '../../Redux/Auth-reducer'
import { compose } from 'redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return <Component {...props} router={{ location, navigate, params }} />
    }

    return ComponentWithRouterProp
}
class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthDataTC()
        // axios
        //     .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //         withCredentials: true,
        //     })
        //     .then((response) => {
        //         if (response.data.resultCode === 0) {
        //             let { id, login, email } = response.data.data
        //             this.props.setAuthUserData(id, login, email)
        //         }
        //     })
    }
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default compose(
    withRouter,
    connect(mapStateToProps, { getAuthDataTC, logoutMeTC })
)(HeaderContainer)
