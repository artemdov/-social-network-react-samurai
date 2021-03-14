import React from "react";
import s from './profile.module.css';
import MyPostsContainer from "../../MypostsContainer";
import ProfileInfo from "./profileInfo";
import {Dispatch} from "redux";

type ProfilePureFunctionType = {
    profile: null,
    status: string,
    updateStatus: (status: string) => (dispatch: Dispatch) => void
}

const Profile = (props: ProfilePureFunctionType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer  newPostText={props.status} updateNewPostText={props.updateStatus}/>
        </div>
    )

}
export default Profile
