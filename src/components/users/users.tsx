import React from 'react'
import {UsersPageType, UsersType} from "../../redux/store";
import s from './users.module.css'


export type UsersPagePropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users:UsersPageType) => void

}

export const Users = (props: UsersPagePropsType) => {
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                   <div>
                        <img src={u.photoUrl} className={s.userPhoto}/>
                  </div>
                    <div>
                       {u.followed
                           ? <button onClick={() => {props.unFollow(u.id)} }>Unfollow</button>
                           : <button onClick={() => {props.follow(u.id)} }>Follow</button>}
                    </div>
                </span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </div>)
        }
    </div>
}

