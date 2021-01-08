import React from 'react';
import './App.css';
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/My posts/Post/ProfileInfo/profile";
import {Route} from "react-router";
import Settings from "./components/settings/settings";
import News from "./components/news/news";
import {DialogsPageType, ProfilePageType, StoreType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/users/usersContainer";


export type PropsType = {
    store: StoreType
    ProfilePage: ProfilePageType
    DialogsPage: DialogsPageType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
}
const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path='/dialogs' render={() =>
                    <DialogsContainer/>}/>
                <Route path='/profile' render={() =>
                    <Profile/>}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
            </div>
        </div>

    )
}

export default App;
