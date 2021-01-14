import React from 'react'
import s from './users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'
    ;
import {Dispatch} from "redux";
import {UsersType} from "../../redux/store";

type mapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage:(currentPage:number) => void
    setTotalUsersCount:(totalUsersCount:number) => void

}

class Users extends React.Component <mapStateToPropsType & mapDispatchToPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
                this.props.setUsers(response.data.items)
            }
        )
    }


    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for(let i = 1; i<= pagesCount; i++){
            pages.push(i)
        }


        return <div>
            <div>
                {pages.map(p => {
                   return <span className={this.props.currentPage === p ? s.selectedPage: ''} onClick={(e) => {this.onPageChanged(p)}}>{p}</span>
                })}

            </div>

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

