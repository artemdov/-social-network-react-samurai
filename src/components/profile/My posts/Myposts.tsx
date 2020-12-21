import React, {ChangeEvent} from "react";
import s from './Myposts.module.css';
import Post from "./Post/Post";
import { MyPostsType} from "../../../redux/state";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";



const MyPosts = (props: MyPostsType) => {
    let post = props.posts
    let postsElements = post.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>)


    const addPost = () => {
       // props.addPost(props.newPostText)
       // props.dispatch({ type: 'ADD-POST', postText: props.newPostText})
        props.dispatch(addPostAC(props.newPostText))
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        //props.updateNewPostText(e.currentTarget.value)
       // props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: e.currentTarget.value})
        props.dispatch(updateNewPostTextAC(e.currentTarget.value))

    }


    return <div className={s.content}>

        <div className={s.postBlock}>
            My posts
        </div>
        <div>
            <textarea onChange={onPostChange} value={props.newPostText}/>
        </div>
        <div>
            <button onClick={addPost}>Add post</button>
        </div>

        <div className={s.posts}>
            {postsElements}
        </div>
    </div>

}
export default MyPosts;