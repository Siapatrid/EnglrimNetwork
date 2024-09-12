import React, { Component } from 'react'
import style from './Header.module.css'
import { Navigate, NavLink } from 'react-router-dom'

const Header = (props) => {
    const handleClick = () => {
        props.logoutMeTC()
        return <NavLink to={'/login'} />
    }

    return (
        <header className={style.header}>
            <img src="https://www.logodesignlove.com/wp-content/uploads/2022/01/logo-wave-symbol-01.jpg" />
            <a className={style.item}>ENGLDOM UNIVERSE</a>
            <div className={style.loginBlock}>
                {props.isAuth ? (
                    <div>
                        <div>{props.login}</div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                ) : (
                    <NavLink to={'/login'}>Login</NavLink>
                )}
            </div>
        </header>
    )
}

export default Header
