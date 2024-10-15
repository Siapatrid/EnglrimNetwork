import React, { Component } from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink
                    to="/profile"
                    style={({ isActive }) => ({
                        color: isActive ? 'gold' : 'white',
                    })}
                >
                    Profile
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink
                    to="/dialogs"
                    style={({ isActive }) => ({
                        color: isActive ? 'gold' : 'white',
                    })}
                >
                    Dialogs
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink
                    to="/News"
                    style={({ isActive }) => ({
                        color: isActive ? 'gold' : 'white',
                    })}
                >
                    News
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink
                    to="/Users"
                    className={(navData) =>
                        navData.isActive ? style.active : style.item
                    }
                >
                    Find users
                </NavLink>
            </div>
            <div className={style.item}>
                <NavLink
                    to="/Settings"
                    className={(navData) =>
                        navData.isActive ? style.active : style.item
                    }
                >
                    Settings
                </NavLink>
            </div>
            <div>Friend</div>
        </nav>
    );
};
export default Navbar;
