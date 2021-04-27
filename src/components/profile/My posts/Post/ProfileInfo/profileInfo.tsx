import React, {ChangeEvent} from "react";
import s from './profile.module.css';
import Preloader from "../../../../universal/rename/Preloader";
import {AnyAction, Dispatch} from "redux";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../../../assets/images/user.png";
import {photoType, photoUserType} from "../../../../../redux/profileReducer";


export type UserProfileContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type UserProfileType = {
    aboutMe?: string
    contacts?: UserProfileContactsType
    fullName?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    photos?: photoType
    userId?: string
}
type ProfileInfoType = {
    profile: UserProfileType | null,
    status: string,
    updateStatus: (status: string) => (dispatch: Dispatch<AnyAction>) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) //== null || undefined)
        return <Preloader/>

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.content}>
            <div className={s.profileBlock}>
                <img alt='' src={props.profile.photos?.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={changeHandler}/>}

                <div>
                    <div>
                        <b>Full name</b>:{props.profile.fullName ? 'yes' : 'no'}
                    </div>
                    <div>
                        <b>Looking for a job</b>:{props.profile.lookingForAJob ? 'yes' : 'no'}
                    </div>
                    {props.profile.lookingForAJob &&
                    <div>
                        <b>Professional skills</b>.:{props.profile.lookingForAJobDescription}
                    </div>
                    }
                    <div>
                        <b>About Me</b>.:{props.profile.aboutMe ? 'yes' : 'no'}
                    </div>

                    <ProfileStatusWithHooks status={props.status}
                                            updateStatus={props.updateStatus}/>
                </div>

            </div>
        </div>
    )
}
export default ProfileInfo
