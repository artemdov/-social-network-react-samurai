import React, {ChangeEvent} from "react";
import s from './Myposts.module.css';
import Post from "./Post/Post";
import { MyPostsType} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./Myposts";



const MyPostsContainer = (props: MyPostsType) => {


    const addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }
    let onPostChange = (text: string) => {
       let action = updateNewPostTextAC(text)
        props.dispatch(action)
    }

    return (
        <MyPosts newPostText={props.newPostText}
                 dispatch={props.dispatch}
                 updateNewPostText ={onPostChange}
                 addPost={addPost}
                 posts={props.posts} />
    )

}
export default MyPostsContainer;