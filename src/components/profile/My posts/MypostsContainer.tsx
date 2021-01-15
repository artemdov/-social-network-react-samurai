import React from "react";
import {CombineCreatorsType} from "../../../redux/store";
import {addPost, updateNewPostText} from "../../../redux/profileReducer";
import MyPosts from "./Myposts";
import {connect} from "react-redux";
import {ReduxStore} from "../../../redux/redux-store";
import {Dispatch} from "redux";

    let mapStateToProps = (state: ReduxStore) => {
       return {
           posts: state.profileReducer.posts,
           newPostText: state.profileReducer.newPostText
       }
    }
    let mapDispatchToProps = (dispatch: Dispatch) => {
        return {
            addPost: () => {
                dispatch(addPost())
            },
            updateNewPostText: (text: string) => {
                let action = updateNewPostText(text)
                dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;