import React from "react";
import {StateType, StoreType} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./Myposts";
import {connect} from "react-redux";

/*export type MyPostsContainerType = {
    store: StoreType
}
const MyPostsContainer = (props: MyPostsContainerType) => {

    return (
        <StoreContext.Consumer>
            {
                store => {
                    let state = props.store.getState()

                    const addPost = () => {
                        store.dispatch(addPostAC())
                    }
                    let onPostChange = (text: string) => {
                        let action = updateNewPostTextAC(text)
                        store.dispatch(action)
                    }

                    return <MyPosts newPostText={state.ProfilePage.newPostText}
                                    updateNewPostText={onPostChange}
                                    addPost={addPost}
                                    posts={state.ProfilePage.posts}/>
                }
            }
        </StoreContext.Consumer>
    )

}*/

    let mapStateToProps = (state: StateType) => {
        debugger
       return {

           posts: state.ProfilePage.posts,
           newPostText: state.ProfilePage.newPostText
       }
    }
    let mapDispatchToProps = (dispatch: any) => {
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