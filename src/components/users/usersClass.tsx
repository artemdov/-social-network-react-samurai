import React from 'react'
import {UsersType} from "../../redux/store";
import s from './users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

export type UsersPagePropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void

}

export const Users = (props: UsersPagePropsType) => {

let  getUsers = () => {

    if (props.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>
            props.setUsers(response.data.items)
        )
    }
}


    return <div>
        <button onClick={getUsers}></button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                   <div>
                        <img className={s.usersPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                  </div>
                    <div>
                       {u.followed
                           ? <button onClick={() => {
                               props.unFollow(u.id)
                           }}>Unfollow</button>
                           : <button onClick={() => {
                               props.follow(u.id)
                           }}>Follow</button>}
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
            </div>)
        }
    </div>
}

