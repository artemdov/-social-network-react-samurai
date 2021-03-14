import React from 'react';
import {SendMessageBodyAC} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStore} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";

let mapStateToProps = (state: ReduxStore) => {
    return {
        dialogs: state.dialogsReducer.dialogs,
        messages: state.dialogsReducer.messages,
        isAuth: state.authReducer.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        SendMessageBodyAC: (newMessageBody: string) => {
            dispatch(SendMessageBodyAC(newMessageBody))
        }
    }

}


export default compose <React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)