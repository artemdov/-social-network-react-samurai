import React from 'react';
import {SendMessageBodyAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import Dialogs, {DialogsPropsType} from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStore} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";

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
        updateNewMessageBodyAC: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        }
    }

}




/*
const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))
*/

export default compose <React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)