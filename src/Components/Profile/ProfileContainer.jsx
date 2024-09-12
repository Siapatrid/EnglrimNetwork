import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import {
    getProfileTC,
    getUserStatusTC,
    savePhotoTC,
    saveProfileTC,
    setUserProfile,
    updateStatusTC,
} from '../../Redux/Profile-reducer'
import {
    Navigate,
    NavLink,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom'
import { withAuthRedirect } from '../HOC/WithAuthRedirect'
import { compose } from 'redux'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return <Component {...props} router={{ location, navigate, params }} />
    }

    return ComponentWithRouterProp
}
class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }
    render() {
        if (!this.props.isAuth) {
            return <Navigate to="/login" />
        }
        return (
            <Profile
                {...this.props}
                isOner={!this.props.router.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    profilePage: state.profilePage,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

const mapDispatchToProps = (dispatch) => {
    return {
        setUserProfile: (profile) => {
            dispatch(setUserProfile(profile))
        },
        getProfile: (userId) => {
            dispatch(getProfileTC(userId))
        },
        getUserStatus: (userId) => {
            dispatch(getUserStatusTC(userId))
        },
        updateStatus: (status) => {
            dispatch(updateStatusTC(status))
        },
        savePhoto: (photo) => {
            dispatch(savePhotoTC(photo))
        },
        saveProfile: (profile) => {
            dispatch(saveProfileTC(profile))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
