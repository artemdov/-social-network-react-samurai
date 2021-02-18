import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {ReduxStore} from "../../../../../redux/redux-store";
import {PostsType} from "../../../../../redux/store";
import {addPost, getUsersProfile, updateNewPostText} from "../../../../../redux/profileReducer";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../../../../HOC/WithAuthRedirect";
import {compose} from "redux";

export type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & mapOwnType

type mapOwnType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
    profile: null

}
type mapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
    getUsersProfile: (userId: string) => void

}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUsersProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

/*let AuthRedirectComponent = (props: PropsType) => {
    if(!props.isAuth)  return <Redirect to = {"/login"} />
    return <ProfileContainer {...props} />
}*/

let mapStateToProps = (state: ReduxStore): mapStateToPropsType => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        profile: state.profileReducer.profile
    }
}

export default compose <React.ComponentType>(
    withRouter,
    connect(mapStateToProps,
        {getUsersProfile, updateNewPostText, addPost}),
    withAuthRedirect
)(ProfileContainer)
/*
let withUrlDataContainerComponent = withRouter(ProfileContainer)
export default withAuthRedirect(connect(mapStateToProps,
    {getUsersProfile, updateNewPostText, addPost})(withUrlDataContainerComponent)
)*/
