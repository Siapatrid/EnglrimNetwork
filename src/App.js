import React, { Component, Suspense } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import News from './Components/News/News'
import Settings from './Components/Settings/Settings'
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom'
import { UsersContainer } from './Components/Users/UsersContainer'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import Login from './Components/Login/Login'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeAppTC } from './Redux/App-reducer'
import Preloader from './Components/Common/Preloader/Preloader'
import { lazy } from 'react'

const Dialogs = lazy(() => import('./Components/Dialogs/DialogsContainer.jsx'))

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return <Component {...props} router={{ location, navigate, params }} />
    }

    return ComponentWithRouterProp
}
class App extends Component {
    catchAllUnhandledErrors = (reason, promise) => {
        // alert(promiseRejectionEvent) вообще тут лучше вызвать санку(санккреатор)
    }
    componentDidMount() {
        this.props.initializeAppTC()
        window.addEventListener(
            'unhandledrejection',
            this.catchAllUnhandledErrors
        )
    }
    componentWillUnmount() {
        window.removeEventListener(
            'unhandledrejection',
            this.catchAllUnhandledErrors
        )
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer store={this.props.store} />
                <Navbar />
                <div className="app-wrapper-content">
                    <React.Suspense
                        fallback={
                            <div>
                                <Preloader />
                            </div>
                        }
                    >
                        <Routes>
                            <Route
                                path="/profile/:userId?"
                                element={
                                    <ProfileContainer
                                        store={this.props.store}
                                    />
                                }
                            />
                            <Route
                                path="/dialogs"
                                element=<Dialogs store={this.props.store} />
                            />
                            <Route path="/News" element={<News />} />
                            <Route
                                path="/Users"
                                element={<UsersContainer />}
                                store={this.props.store}
                            />
                            <Route path="/Settings" element={<Settings />} />
                            <Route
                                exact // точное совпадение с адресной строкой, аналог - обернуть все в <Switch></Switch>
                                path="/login"
                                element={<Login store={this.props.store} />}
                            />
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app,
})
export default compose(
    withRouter,
    connect(mapStateToProps, { initializeAppTC })
)(App)
