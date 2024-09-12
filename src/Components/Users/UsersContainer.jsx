import React, { Component } from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {
    followAC,
    setCurrentPageAC,
    unfollowAC,
    toggleIsFollowingAC,
    getUsersTC,
} from '../../Redux/Users-reducer'
import { getUsersSuper } from '../../Redux/User-selectors'

const mapStateToProps = (state) => {
    return {
        usersData: getUsersSuper(state),
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing: state.usersPage.isFollowing,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        toggleIsFollowing: (isFollowing, id) => {
            dispatch(toggleIsFollowingAC(isFollowing, id))
        },
        getUsers: (pageNumber, pageSize) => {
            dispatch(getUsersTC(pageNumber, pageSize))
        },
    }
}
export const UsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)
