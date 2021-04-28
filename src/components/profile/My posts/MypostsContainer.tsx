import React from "react";
import MyPosts from "./Myposts";
import {connect} from "react-redux";
import {ReduxStore} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {actions} from "../../../redux/profileReducer";

    let mapStateToProps = (state: ReduxStore) => {
       return {
           posts: state.profileReducer.posts,
       }
    }
    let mapDispatchToProps = (dispatch: Dispatch) => {
        return {
            addPost: (newPostText: string) => {
                dispatch(actions.addPost(newPostText))
            }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;