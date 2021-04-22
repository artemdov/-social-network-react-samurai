import React from 'react'
import s from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UsersType} from "../../redux/store"
import {NavLink} from "react-router-dom";
import {Paginator} from "../universal/Paginator/paginator";
import {User} from "./user";
import {follow, toggleIsFollowingProgress, unfollow} from "../../redux/usersReducer";

type  UsersPureFunctionType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
}

export const Users = (props: UsersPureFunctionType) => {

    return <div>
       <Paginator pageSize={props.pageSize}
                  totalUsersCount={props.totalUsersCount}
                  currentPage={props.currentPage}
                  onPageChanged={props.onPageChanged} />

        {
            props.users.map(u => <User key={u.id}
                                       user={u}
                                       follow={props.follow}
                                       unFollow={props.unFollow}
                                       followingInProgress={props.followingInProgress}/>)
        }
                </div>
}


export default Users

