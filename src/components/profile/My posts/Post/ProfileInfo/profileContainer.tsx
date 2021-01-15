import React from "react";
import Profile from "./profile";
import axios from "axios";
import {connect} from "react-redux";
import {ReduxStore} from "../../../../../redux/redux-store";
import {PostsType} from "../../../../../redux/store";
import {addPost, setUserProfile, updateNewPostText} from "../../../../../redux/profileReducer";
import { withRouter, RouteComponentProps } from "react-router-dom";

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
    setUserProfile: (profile: null) => void

}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        /*if(!userId) {
            userId = '2'
        }*/
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
                this.props.setUserProfile(response.data)

            }
        )
    }

    render() {
        return (

            <Profile {...this.props} profile={this.props.profile} />

        )
    }

}

let mapStateToProps = (state: ReduxStore): mapStateToPropsType => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        profile: state.profileReducer.profile
    }
}

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile, updateNewPostText, addPost})(withUrlDataContainerComponent)
