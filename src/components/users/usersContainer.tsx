import React from 'react'
import {connect} from 'react-redux'
import {UsersType} from '../../redux/store'
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress,
    unFollow
} from "../../redux/usersReducer";
import {ReduxStore} from '../../redux/redux-store'
import Users from './users'
import Preloader from "../universal/rename/Preloader";
import {usersAPI} from "../../API/api";

type mapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (followingInProgress:boolean,userId: number) => void

}

class UsersAPIContainer extends React.Component <mapStateToPropsType & mapDispatchToPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(false)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            }
        )
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users followingInProgress={this.props.followingInProgress} currentPage={this.props.currentPage}
                   users={this.props.users}
                   unFollow={this.props.unFollow}
                   follow={this.props.follow}
                   onPageChanged={this.onPageChanged}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}/>

        </>
    }
}

const mapStateToProps = (state: ReduxStore) => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    }
}

export default connect(mapStateToProps, {

    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress
})(UsersAPIContainer)


