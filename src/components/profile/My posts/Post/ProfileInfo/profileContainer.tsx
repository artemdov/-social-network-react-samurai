import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {ReduxStore} from "../../../../../redux/redux-store";
import {PostsType} from "../../../../../redux/store";
import {
    addPost,
    getStatus,
    getUsersProfile,
    updateStatus
} from "../../../../../redux/profileReducer";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../../../../HOC/WithAuthRedirect";
import {compose, Dispatch} from "redux";

export type PathParamsType = {
    userId:  any
}
type PropsType = RouteComponentProps<PathParamsType> & mapOwnType

type mapOwnType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
    profile: null
    status: string
    authorizedUserId: number | null
    isAuth: boolean

}
type mapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
    getUsersProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => (dispatch: Dispatch) => void


}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status = {this.props.status} updateStatus = {this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state: ReduxStore): mapStateToPropsType => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        authorizedUserId: state.authReducer.userId,
        isAuth: state.authReducer.isAuth
    }
}

export default compose <React.ComponentType>(
    withRouter,
    connect(mapStateToProps,
        {getUsersProfile, addPost, getStatus, updateStatus}),
    withAuthRedirect
)(ProfileContainer)

