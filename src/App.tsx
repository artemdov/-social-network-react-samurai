import React, { Suspense } from 'react';
import './App.css';
import Navbar from "./components/navbar/navbar";
import {Route} from "react-router";
import Settings from "./components/settings/settings";
import News from "./components/news/news";
import {DialogsPageType, ProfilePageType, StoreType} from "./redux/store";
import UsersContainer from "./components/users/usersContainer";
import HeaderContainer from "./components/header/headerContainer";
import Login from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {BrowserRouter, withRouter} from 'react-router-dom';
import {initializeApp} from "./redux/app-reducer";
import store, {ReduxStore} from "./redux/redux-store";
import Preloader from "./components/universal/rename/Preloader";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/profile/My posts/Post/ProfileInfo/profileContainer'))


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
        if (!this.props.initializeApp)
            return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={() => {
                      return <React.Suspense fallback={<div>Loading...</div>}>
                        <DialogsContainer/>
                        </React.Suspense>
                    }}/>
                    <Route path='/profile/:userId?' render={() => {
                        return <React.Suspense fallback={<div>Loading...</div>}>
                            <ProfileContainer/>
                        </React.Suspense>
                    }}/>
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

export const AppContainer = compose<React.ComponentType>(connect(mapStateToProps,
    {initializeApp}),
    withRouter)(App)

export const AppMain = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}