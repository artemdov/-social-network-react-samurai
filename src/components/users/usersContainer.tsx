import React from 'react'
import {connect} from "react-redux";
import Users from "./users";
import {UsersType} from "../../redux/store";
import {followAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import {ReduxStore} from "../../redux/redux-store";
import {Dispatch} from "redux";

const mapStateToProps = (state:ReduxStore) => {
    return {
        users: state.usersReducer.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsersAC(users))
        },
    }
}

const UsersContainer =  connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
