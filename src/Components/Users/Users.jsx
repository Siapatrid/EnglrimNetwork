import React, { Component, useEffect, useState } from 'react'
import SingleUser from './SingleUser/SingleUser'
import stile from './Users.module.css'
import Preloader from '../Common/Preloader/Preloader'
import { fieldArrayFieldsPropTypes as visiblePages } from 'redux-form'
const Users = (props) => {
    useEffect(() => {
        if (props.usersData.length === 0) {
            props.getUsers(props.currentPage, props.pageSize)
        }
    }, [])

    const [pageGroup, setPageGroup] = useState(0) // Состояние для текущей группы страниц
    const pagesPerGroup = 5 // Количество страниц в одной группе

    let visibleUsers = props.usersData.map((d) => (
        <SingleUser
            name={d.name}
            id={d.id}
            photo={d.photos}
            followed={d.followed}
            follow={props.follow}
            unfollow={props.unfollow}
            isFetching={props.isFetching}
            isFollowing={props.isFollowing}
            toggleIsFollowing={props.toggleIsFollowing}
        />
    ))

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const startPage = pageGroup * pagesPerGroup
    const endPage = Math.min(startPage + pagesPerGroup, pagesCount)
    const visiblePages = pages.slice(startPage, endPage)

    return (
        <div>
            {props.isFetching ? <Preloader /> : null}
            Users
            <div>
                {startPage > 0 && (
                    <span
                        className={stile.arrow}
                        onClick={() => setPageGroup(pageGroup - 1)}
                    >
                        &laquo;
                    </span>
                )}
                {visiblePages.map((p) => (
                    <span
                        key={p}
                        className={
                            props.currentPage === p ? stile.selectedPage : null
                        }
                        onClick={() => props.getUsers(p, props.pageSize)}
                    >
                        {p}
                    </span>
                ))}
                {endPage < pagesCount && (
                    <span
                        className={stile.arrow}
                        onClick={() => setPageGroup(pageGroup + 1)}
                    >
                        &raquo;
                    </span>
                )}
            </div>
            <div>{visibleUsers}</div>
        </div>
    )
}

export default Users
