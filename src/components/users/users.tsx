import React from 'react'
import s from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UsersType} from "../../redux/store"
import {NavLink} from "react-router-dom";
import {Paginator} from "../universal/Paginator/paginator";

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
            props.users.map(u =>
                <div key={u.id}>
                <span>
                   <div>
                       <NavLink to={'/profile/' + u.id}>
                           <img className={s.usersPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                        </NavLink>
                  </div>
                    <div>
                       {u.followed
                           ? <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {props.unFollow(u.id)}}>
                               Unfollow</button>
                           : <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {props.follow(u.id)}}>
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
                </div>)
        }
    </div>


}


export default Users

