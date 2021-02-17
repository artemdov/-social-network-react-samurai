import React from 'react';
import {CombineCreatorsType, StateType} from "../../redux/store";
import {SendMessageBodyAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStore} from "../../redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state: ReduxStore) => {
    return {
        dialogs: state.dialogsReducer.dialogs,
        messages: state.dialogsReducer.messages,
        newMessageBody: state.dialogsReducer.newMessageBody,
        isAuth: state.authReducer.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        SendMessageBodyAC: () => {
            dispatch(SendMessageBodyAC())
        },
        updateNewMessageBodyAC: (body:string) => {
            dispatch(updateNewMessageBodyAC(body))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;