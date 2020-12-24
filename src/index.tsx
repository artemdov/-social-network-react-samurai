import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./redux/redux-store";
import {StoreType} from "./redux/store";


export let RerenderTree = (state: StoreType) => {
    ReactDOM.render(<App store={state.}
                         ProfilePage={store.ProfilePage}
                         DialogsPage={store._state.DialogsPage}
                         addPost={store.addPost}
                         updateNewPostText={store.updateNewPostText}/>,  document.getElementById('root'));
}


store.subscribe(() => {
    let state = store.getState()
    RerenderTree(state)
})







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
