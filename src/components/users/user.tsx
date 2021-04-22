import React from 'react'
import s from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UsersType} from "../../redux/store"
import {NavLink} from "react-router-dom";

type  UserFunctionType = {
    user: UsersType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
}

export const User = (props: UserFunctionType) => {
    let u = props.user

    return <div>
                <span>
                   <div>
                       <NavLink to={'/profile/' + u.id}>
                           <img className={s.usersPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                        </NavLink>
                  </div>
                    <div>
                       {u.followed
                           ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.unFollow(u.id)
                           }}>
                               Unfollow</button>
                           : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.follow(u.id)
                           }}>
                               Follow</button>
                       }
                    </div>
                </span>
        <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
        <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
    </div>
}




