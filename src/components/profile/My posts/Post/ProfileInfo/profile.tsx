import React from "react";
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
            <MyPostsContainer  />
        </div>
    )

}
export default Profile
