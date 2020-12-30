import React, {ChangeEvent} from "react";
import s from './Myposts.module.css';
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";
import {addPostAC} from "../../../redux/profileReducer";

type MyPostPropsType = {
    posts: Array<PostsType>
    newPostText: string
    updateNewPostText: (newText: string) => void
    addPost: () => void
}


const MyPosts = (props: MyPostPropsType) => {
    let post = props.posts
    let postsElements = post.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>)

    const OnAddPost = () => {
        //props.addPost(props.newPostText)
        // props.dispatch({ type: 'ADD-POST', postText: props.newPostText})
        props.addPost()
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
        // props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: e.currentTarget.value})
        // props.dispatch(updateNewPostTextAC(text))
    }

    return <div className={s.content}>
        <div className={s.postBlock}>
            My posts
        </div>
        <div>
            <textarea onChange={onPostChange} value={props.newPostText}/>
        </div>
        <div>
            <button onClick={OnAddPost}>Add post</button>
        </div>

        <div className={s.posts}>
            {postsElements}
        </div>
    </div>

}
export default MyPosts;