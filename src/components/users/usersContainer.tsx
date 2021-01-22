import React from 'react'
import {connect} from 'react-redux'
import {UsersType} from '../../redux/store'
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollow
} from "../../redux/usersReducer";
import {ReduxStore} from '../../redux/redux-store'
import axios from 'axios'
import Users from './users'
import Preloader from "../universal/rename/Preloader";

type mapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage:(currentPage:number) => void
    setTotalUsersCount:(totalUsersCount:number) => void
    toggleIsFetching:(isFetching:boolean) => void

}

class UsersAPIContainer extends React.Component <mapStateToPropsType & mapDispatchToPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(false)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,{
            withCredentials: true
        }).then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }
    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,{
            withCredentials: true
        }).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
            }
        )
    }
    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users currentPage={this.props.currentPage} users={this.props.users}
                      unFollow={this.props.unFollow} follow={this.props.follow}
                      onPageChanged={this.onPageChanged} pageSize={this.props.pageSize}
                      totalUsersCount={this.props.totalUsersCount}/>
              </>
    }
}

const mapStateToProps = (state:ReduxStore) => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching
    }
}

export default connect(mapStateToProps, {

        follow,
         unFollow,
         setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching
    })(UsersAPIContainer)


