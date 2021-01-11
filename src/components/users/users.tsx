import React from 'react'
import s from './users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'
import {UsersPageType, UsersType} from "../../redux/store";


class Users extends React.Component<UsersPageType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>
            this.props.setUsers(response.data.items)
        )
    }


    render() {
        return <div>
            {
                this.props.users.map(u =>
                    <div key={u.id}>
                <span>
                   <div>
                        <img className={s.usersPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}/>
                  </div>
                    <div>
                       {u.followed
                           ? <button onClick={() => {
                               this.props.unFollow(u.id)
                           }}>Unfollow</button>
                           : <button onClick={() => {
                               this.props.follow(u.id)
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
}

export default Users

