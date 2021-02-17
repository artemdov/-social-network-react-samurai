import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {ReduxStore} from "../../../../../redux/redux-store";
import {PostsType} from "../../../../../redux/store";
import {addPost, getUsersProfile, updateNewPostText} from "../../../../../redux/profileReducer";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";

export type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & mapOwnType

type mapOwnType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
    profile: null
    isAuth: boolean
}
type mapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
    getUsersProfile: (userId: string) => void

}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '2'
        }
       this.props.getUsersProfile(userId)
    }

    render() {
        if(!this.props.isAuth)  return <Redirect to = {"/login"} />
        return (

            <Profile {...this.props} profile={this.props.profile} />

        )
    }

}

let mapStateToProps = (state: ReduxStore): mapStateToPropsType => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        profile: state.profileReducer.profile,
        isAuth: state.authReducer.isAuth
    }
}

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUsersProfile, updateNewPostText, addPost})(withUrlDataContainerComponent)
