import React, { Component, Suspense } from 'react';
import './App.css';
import News from './Components/News/News';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    useParams,
    NavLink,
} from 'react-router-dom';
import { UsersContainer } from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';

import Login from './Components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeAppTC } from './Redux/App-reducer';
import { lazy } from 'react';
import {
    HomeOutlined,
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { Header } from './Components/Header/Header';
import { FriendsContainer } from './Components/Users/FriendsContainer';
import DialogsContainer from './Components/Dialogs/DialogsContainer';

const { Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    }
);

const Dialogs = lazy(() => import('./Components/Dialogs/DialogsContainer.jsx'));

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}
const App = (props) => {
    // if (!props.initialized) {
    //     return <Preloader />;
    // }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <br />
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Button
                                style={{
                                    marginLeft: '28px',
                                }}
                            >
                                <NavLink to="/profile">
                                    <HomeOutlined />
                                </NavLink>
                            </Button>
                            <SubMenu
                                key="sub1"
                                icon={<UserOutlined />}
                                title="My profile"
                            >
                                <Menu.Item key="1">
                                    <NavLink
                                        to="/profile"
                                        style={({ isActive }) => ({
                                            color: isActive ? 'blue' : 'black',
                                        })}
                                    >
                                        Profile
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <NavLink
                                        to="/dialogs/"
                                        style={({ isActive }) => ({
                                            color: isActive ? 'blue' : 'black',
                                        })}
                                    >
                                        Dialogs
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu
                                key="sub2"
                                icon={<LaptopOutlined />}
                                title="Friends"
                            >
                                <Menu.Item key="3">
                                    <NavLink
                                        to="/Friends"
                                        style={({ isActive }) => ({
                                            color: isActive ? 'blue' : 'black',
                                        })}
                                    >
                                        My Friends
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <NavLink
                                        to="/Users"
                                        style={({ isActive }) => ({
                                            color: isActive ? 'blue' : 'black',
                                        })}
                                    >
                                        Find users
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item key="5" icon={<NotificationOutlined />}>
                                <NavLink
                                    to="/News"
                                    style={({ isActive }) => ({
                                        color: isActive ? 'blue' : 'black',
                                    })}
                                >
                                    News
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route
                                path="/profile/:userId?"
                                element={
                                    <ProfileContainer store={props.store} />
                                }
                            />
                            <Route
                                path="/dialogs/*"
                                element={
                                    <DialogsContainer store={props.store} />
                                }
                            />

                            <Route
                                path="/Users"
                                element={<UsersContainer />}
                                store={props.store}
                            />
                            <Route
                                path="/Friends"
                                element={<FriendsContainer />}
                                store={props.store}
                            />
                            <Route
                                exact // точное совпадение с адресной строкой, аналог - обернуть все в <Switch></Switch>
                                path="/login"
                                element={<Login store={props.store} />}
                            />
                            <Route path="/News" element={<News />} />
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Englrim ©{new Date().getFullYear()} Created by OVA
            </Footer>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        initialized: state.app,
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeAppTC })
)(App);
