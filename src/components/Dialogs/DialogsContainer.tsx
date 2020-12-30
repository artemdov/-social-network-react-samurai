import React from 'react';
import {StateType} from "../../redux/store";
import {SendMessageBodyAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


/*
const MessageItem = (props: { message: string }) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
 let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
 let messagesElements = state.messages.map(m => <Message id={m.id} message={m.message}/>);
 let onSendMessageClick = () => {
     props.store.dispatch(SendMessageBodyAC(state.newMessageBody))
 }
type DialogsContainerType = {
    store: StoreType
}
const DialogsContainer = (props: DialogsContainerType) => {
    return <StoreContext.Consumer>
        {
            store => {
                let state = props.store.getState().DialogsPage

                let onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyAC(body))
                }
                let onSendMessageClick = () => {
                    store.dispatch(SendMessageBodyAC())
                }


                return <Dialogs
                    newMessageBody={store._state.DialogsPage.newMessageBody}
                    updateNewMessageBodyAC={onNewMessageChange}
                    messages={props.store._state.DialogsPage.messages}
                    SendMessageBodyAC={onSendMessageClick}
                    dialogs={props.store._state.DialogsPage.dialogs}/>
            }
        }
    </StoreContext.Consumer>
}
*/

let mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.DialogsPage
    }
}
let mapDispatchToProps = (dispatch: any) => {
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