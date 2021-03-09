import React from "react";
import s from './profile.module.css';
import Preloader from "../../../../universal/rename/Preloader";
import ProfileStatus from "./ProfileStatus";
import {AnyAction, Dispatch} from "redux";

type ProfileInfoType ={
    profile: null | { photos: { small: string, large: string } },
    status: string,
    updateStatus: (status: string) => (dispatch: Dispatch<AnyAction>) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if(!props.profile) //== null || undefined)
        return <Preloader />

    return (
    <div className={s.content}>
     {/*   <div>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0GZaLs7O6zEDPiY4zVVOiGmb2dxEXj4fDQ&usqp=CAU"/>
        </div>*/}
        <div className={s.profileBlock}>
            <img src={props.profile.photos.large}/>
           <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>

    </div>
    )
}
export default ProfileInfo
