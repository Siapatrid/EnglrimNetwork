import React from 'react';
import stile from './../Users.module.css';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../../Api/Api';
import { Button } from 'antd';
const SingleUser = (props) => {
    return (
        <div className={stile[props.stile]} key={props.id}>
            {props.photo.small ? (
                <div>{props.photo.small}</div>
            ) : (
                <div>
                    <img
                        className={stile.ava}
                        src="https://planetsains.com/wp-content/uploads/2022/09/anonymous-avatar-icon-25.png"
                        alt="no avatar"
                    />
                </div>
            )}
            <NavLink to={'/profile/' + props.id}>
                <h2>{props.name}</h2>
            </NavLink>
            {/*<img src={props.ava} className={stile.ava} alt={'ava'}/>*/}
            {/*{props.info}*/}
            <div>
                {props.followed ? (
                    <Button
                        disabled={props.isFollowing.some(
                            (id) => id === props.id
                        )}
                        onClick={() => {
                            props.toggleIsFollowing(true, props.id);
                            usersAPI.unfollowUser(props.id).then((data) => {
                                if (data.resultCode == 0) {
                                    props.unfollow(props.id);
                                }
                                props.toggleIsFollowing(false, props.id);
                            });
                        }}
                    >
                        Unfollow
                    </Button>
                ) : (
                    <Button
                        disabled={props.isFollowing.some(
                            (id) => id === props.id
                        )}
                        onClick={() => {
                            props.toggleIsFollowing(true, props.id);
                            usersAPI.followUser(props.id).then((data) => {
                                if (data.resultCode == 0) {
                                    props.follow(props.id);
                                }
                                props.toggleIsFollowing(false, props.id);
                            });
                        }}
                    >
                        Follow
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SingleUser;
