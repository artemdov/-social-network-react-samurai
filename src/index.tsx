import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {PropsType} from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import reduxStore from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";





    ReactDOM.render(
        <BrowserRouter>
        <Provider store={reduxStore }>
            <App />
        </Provider>
        </BrowserRouter>,  document.getElementById('root')
    )









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
