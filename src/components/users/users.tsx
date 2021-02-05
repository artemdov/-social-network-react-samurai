import React from 'react'
import s from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UsersType} from "../../redux/store"
import {NavLink} from "react-router-dom";
import axios from "axios";

type  UsersPureFunctionType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleIsFollowingProgress: (followingInProgress: boolean,userId: number) => void
    followingInProgress: Array<number>
}

let Users = (props: UsersPureFunctionType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : ''} onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p}</span>
            })}

        </div>

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
                           ? <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {
                               props.toggleIsFollowingProgress(true, u.id)
                               axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,   {
                                   withCredentials: true, //authorization
                                   headers:{
                                       'API-KEY':'6621fc0e-be07-42d9-b090-d92a4129df07'
                                   }

                               }).then(response => {
                                       if (response.data.resultCode === 0) {
                                           props.unFollow(u.id)
                                       }
                                   props.toggleIsFollowingProgress(false, u.id)
                                   }
                               )
                           }}>Unfollow</button>
                           : <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {
                               props.toggleIsFollowingProgress(true, u.id)
                               axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},  {
                                   withCredentials: true, //authorization
                                   headers:{
                                       'API-KEY':'6621fc0e-be07-42d9-b090-d92a4129df07'
                                   }
                               }).then(response => {
                                       if (response.data.resultCode === 0) {
                                           props.follow(u.id)
                                       }
                                   props.toggleIsFollowingProgress(false, u.id)
                                   }
                               )

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


export default Users

