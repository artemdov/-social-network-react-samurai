import React from "react";
import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./Myposts";
import {connect} from "react-redux";
import {ReduxStore} from "../../../redux/redux-store";
import {Dispatch} from "redux";

    let mapStateToProps = (state: ReduxStore) => {
       return {
           posts: state.profileReducer.posts,
       }
    }
    let mapDispatchToProps = (dispatch: Dispatch) => {
        return {
            addPost: (newPostText: string) => {
                dispatch(addPost(newPostText))
            }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;