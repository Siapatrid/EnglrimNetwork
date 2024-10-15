import React, { Component } from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Avatar, Button, Layout } from 'antd';
import { logoutMeTC } from '../../Redux/Auth-reducer';

export const Header = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const login = useSelector((state) => state.auth.login);

    const items1 = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    const handleClick = () => {
        logoutMeTC();
        return <NavLink to={'/login'} />;
    };

    const { Header } = Layout;

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            <div className="demo-logo" />
            <div
                style={{
                    color: 'white',
                    fontSize: '2vw',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 'auto',
                }}
            >
                <h1>ENGLRIM UNIVERSE</h1>
            </div>
            <div
                style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Avatar size={50} icon={<UserOutlined />} />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                    }}
                >
                    //{' '}
                    {isAuth ? (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'right',
                            }}
                        >
                            <div className={style.text}>{login}</div>
                            // <Button onClick={handleClick}>Log out</Button>
                        </div>
                    ) : (
                        <NavLink to={'/login'}>Login</NavLink>
                    )}
                </div>
            </div>
        </Header>
    );
};
