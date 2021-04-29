import React, {useState} from "react";
import s from './profile.module.css';
import Preloader from "../../../../universal/rename/Preloader";
import {AnyAction, Dispatch} from "redux";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "../../../../../assets/images/user.png";
import {photoType, saveProfile} from "../../../../../redux/profileReducer";
import {ProfileChangeDataForm, ProfileChangeDataReduxForm, ProfileFormDataType} from "./profileDataForm";

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
export type ContactType = {
    contactTitle: string
    contactValue: string | null
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
    saveProfile: any//(profile: UserProfileType) => void
}


const ProfileInfo = (props: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false)


    if (!props.profile) //= null || undefined)
        return <Preloader/>

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileFormDataType) => {
        props.saveProfile(formData).then(
            ()=>{
                setEditMode(false)
            }
        )

    }

    return (
        <div className={s.content}>
            <div className={s.profileBlock}>
                <img alt='' src={props.profile.photos?.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={changeHandler}/>}

                {editMode
                    ? <ProfileChangeDataReduxForm onSubmit={onSubmit}
                                                  profile={props.profile}
                                                  initialValues={props.profile}/>

                    : <ProfileData goToEditMode={() => setEditMode(true)}
                                   profile={props.profile}
                                   isOwner={props.isOwner}/>}


                <ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus}/>

            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}: { profile: UserProfileType, isOwner: boolean, goToEditMode: () => void }) => {

    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>:{profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>:{profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>Professional skills</b>:{profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About Me</b>:{profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:{profile.contacts && Object.keys(profile.contacts).map(key => {
            const contactsKey = profile?.contacts ? profile.contacts[key as keyof UserProfileContactsType] : ''
            return < Contact key={key}
                             contactTitle={key}
                             contactValue={contactsKey}
            />
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}: ContactType) => {
    return <div className={s.contacts}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}
export default ProfileInfo
