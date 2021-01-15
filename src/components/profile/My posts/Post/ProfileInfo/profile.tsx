import React from "react";
import s from './profile.module.css';
import MyPostsContainer from "../../MypostsContainer";
import ProfileInfo from "./profileInfo";

type ProfilePureFunctionType = {
    profile: null
}

const Profile = (props: ProfilePureFunctionType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )

}
export default Profile
