import React, {} from 'react';
import './App.css';
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/My posts/Post/ProfileInfo/profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Settings from "./components/settings/settings";
import News from "./components/news/news";
import {DialogsPageType, ProfilePageType, StoreType} from "./redux/store";
import {addPostAC} from "./redux/profileReducer";



export type PropsType = {
    store: StoreType
    ProfilePage: ProfilePageType
    DialogsPage: DialogsPageType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
}

const App = (props:PropsType) => {
    const state = props.store.getState()
    let posts = props.store._state.ProfilePage.posts
    let dialogs = props.store._state.DialogsPage.dialogs
    let messages = props.store._state.DialogsPage.messages
    let newPostText = props.store._state.ProfilePage.newPostText
    let dispatch = props.store.dispatch.bind(props.store)
    let messageBody = props.store._state.DialogsPage.newMessageBody
    let addPost = props.store.addPost
    let updateNewPostText = props.store.updateNewPostText
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">

                    <Route path='/dialogs' render={ () =>
                        <Dialogs
                        dialogs={dialogs}
                        messages={messages}
                        newMessageBody={messageBody}
                        dispatch={dispatch}/>}/>
                    <Route path='/profile' render={ () =>
                        <Profile
                            updateNewPostText={updateNewPostText}
                        addPost={addPost}
                        newPostText={newPostText}
                        posts={posts}
                        dispatch ={dispatch}
                        />}/>
                    <Route path='/news' render={ () => <News/>}/>
                    <Route path='/settings' render={ () => <Settings/>}/>
                </div>

            </div>
        </BrowserRouter>);
}

export default App;
