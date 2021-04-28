import React from "react";
import MyPostsContainer from "../../MypostsContainer";
import ProfileInfo, {UserProfileType} from "./profileInfo";
import {Dispatch} from "redux";

type ProfilePureFunctionType = {
    isOwner: boolean
    profile: UserProfileType | null
    status: string
    updateStatus: (status: string) => (dispatch: Dispatch) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: UserProfileType) => void


}

const Profile = (props: ProfilePureFunctionType) => {
    return (
        <div>
            <ProfileInfo saveProfile={props.saveProfile}
                         savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer  />
        </div>
    )

}
export default Profile
