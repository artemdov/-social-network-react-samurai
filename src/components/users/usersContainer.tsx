import React from 'react'
import {connect} from 'react-redux'
import {UsersType} from '../../redux/store'
import {
    follow,
    followSuccess, getUsers,
    setCurrentPage,
    toggleIsFollowingProgress, unfollow,
    unFollowSuccess
} from "../../redux/usersReducer";
import {ReduxStore} from '../../redux/redux-store'
import Users from './users'
import Preloader from "../universal/rename/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";

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
        /*this.props.toggleIsFetching(false)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(true)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )*/
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
       /* this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            }
        )*/
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
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    }
}
export default compose <React.ComponentType>(
    withAuthRedirect,
    connect<mapStateToPropsType, mapDispatchToPropsType, OwnProps, ReduxStore>
    (mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleIsFollowingProgress,
        getUsers
    })
)(UsersAPIContainer)

/*export default withAuthRedirect(connect<mapStateToPropsType, mapDispatchToPropsType, OwnProps, ReduxStore>(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowingProgress,
    getUsers
})(UsersAPIContainer))*/


