import React, {ComponentType} from 'react'
import {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ReduxStore} from "../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps =(state: ReduxStore): mapStateToPropsType => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

export function withAuthRedirect  <T>(Component: ComponentType<T>)  {

    const RedirectComponent = (props:mapStateToPropsType) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to = {"/login"}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent
}