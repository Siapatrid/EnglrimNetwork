import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutMeTC, getAuthDataTC } from '../../Redux/Auth-reducer';
import { compose } from 'redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}
class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthDataTC();
    }
    render() {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { getAuthDataTC, logoutMeTC })
)(HeaderContainer);
