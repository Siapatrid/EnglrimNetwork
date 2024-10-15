import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    followAC,
    setCurrentPageAC,
    unfollowAC,
    toggleIsFollowingAC,
    getFriendsTC,
} from '../../Redux/Users-reducer';
import { getUsersSuper } from '../../Redux/User-selectors';
import Friends from './Friends';

const mapStateToProps = (state) => {
    return {
        usersData: getUsersSuper(state),
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing: state.usersPage.isFollowing,
        friend: state.usersPage.friend,
        friendsData: state.usersPage.friendsData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID));
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        toggleIsFollowing: (isFollowing, id) => {
            dispatch(toggleIsFollowingAC(isFollowing, id));
        },
        getFriends: (pageNumber, pageSize, term, friend) => {
            dispatch(getFriendsTC(pageNumber, pageSize, term, friend));
        },
    };
};
export const FriendsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Friends);
