import React from "react";
import {CombineCreatorsType} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./Myposts";
import {connect} from "react-redux";
import {ReduxStore} from "../../../redux/redux-store";

    let mapStateToProps = (state: ReduxStore) => {
       return {
           posts: state.profileReducer.posts,
           newPostText: state.profileReducer.newPostText
       }
    }
    let mapDispatchToProps = (dispatch: (action: CombineCreatorsType) => void) => {
        return {
            addPost: () => {
                dispatch(addPostAC())
            },
            updateNewPostText: (text: string) => {
                let action = updateNewPostTextAC(text)
                dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;