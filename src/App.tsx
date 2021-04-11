import React from 'react';
import './App.css';
import Navbar from "./components/navbar/navbar";
import {Route} from "react-router";
import Settings from "./components/settings/settings";
import News from "./components/news/news";
import {DialogsPageType, ProfilePageType, StoreType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/users/usersContainer";
import ProfileContainer from "./components/profile/My posts/Post/ProfileInfo/profileContainer";
import HeaderContainer from "./components/header/headerContainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import { withRouter } from 'react-router-dom';
import {initializeApp} from "./redux/app-reducer";
import {ReduxStore} from "./redux/redux-store";
import Preloader from "./components/universal/rename/Preloader";


export type PropsType = {
    store: StoreType
    ProfilePage: ProfilePageType
    DialogsPage: DialogsPageType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
}

 type mapDispatchToPropsType = {
     initializeApp: () => void
     initialized: boolean

}
class App extends React.Component<mapDispatchToPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initializeApp)
            return <Preloader />

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() =>
                        <ProfileContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state: ReduxStore) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(connect(mapStateToProps,
    {initializeApp}),
    withRouter)(App)
