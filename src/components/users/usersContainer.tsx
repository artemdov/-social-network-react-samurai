import React from 'react'
import {connect} from "react-redux";
import {Users} from "./users";
import {StateType,UsersType} from "../../redux/store";
import {followAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";

const mapStateToProps = (state:StateType) => {
    return {
        users: state.UsersPage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsersAC(users))
        },
    }
}

const UsersContainer =  connect (mapStateToProps, mapDispatchToProps) (Users)

export default UsersContainer
