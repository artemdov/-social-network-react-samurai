import React from 'react'
import {connect} from 'react-redux'
import {UsersType} from '../../redux/store'
import {
    follow,
     getUsers,
    setCurrentPage,
    toggleIsFollowingProgress, unfollow,
} from "../../redux/usersReducer";
import {ReduxStore} from '../../redux/redux-store'
import Users from './users'
import Preloader from "../universal/rename/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUser
} from "../../redux/users-selectors";

type mapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (followingInProgress:boolean,userId: number) => void

}

type OwnProps = {
}

class UsersAPIContainer extends React.Component <mapStateToPropsType & mapDispatchToPropsType & OwnProps> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)

    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users followingInProgress={this.props.followingInProgress}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   unFollow={this.props.unfollow}
                   follow={this.props.follow}
                   onPageChanged={this.onPageChanged}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   />

        </>
    }
}

const mapStateToProps = (state: ReduxStore): mapStateToPropsType => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
export default compose <React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, OwnProps, ReduxStore>
    (mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers
    })
)(UsersAPIContainer)




