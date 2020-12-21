import React from "react";
import s from './Post.module.css';
import {PostsType} from "../../../../redux/state";


const Post = (props:PostsType) => {
    return (
        <div className={s.content}>


            <div className={s.item}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2xelLeqMTHcuWQB_yWkhobPK0TRHu547Y6A&usqp=CAU'/>
                {props.message}
                <div>
                    <span>like</span> {props.likesCount}
                </div>
            </div>
        </div>


    )
}
export default Post;