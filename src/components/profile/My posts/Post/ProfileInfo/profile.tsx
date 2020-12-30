import React from "react";
import s from './profile.module.css';
import MyPostsContainer from "../../MypostsContainer";


const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0GZaLs7O6zEDPiY4zVVOiGmb2dxEXj4fDQ&usqp=CAU"/>
        </div>
        <div className={s.profileBlock}>
            Ava
        </div>
        <MyPostsContainer />
    </div>

}
export default Profile
