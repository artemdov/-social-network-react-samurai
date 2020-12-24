import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsActionType} from "../../redux/store";
import {SendMessageBodyAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";


/*const MessageItem = (props: { message: string }) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}*/

const Dialogs = (props: DialogsActionType) => {

    let dialogs = props.dialogs
    let messages = props.messages

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = messages.map(m => <Message id={m.id} message={m.message}/>);
    let onSendMessageClick = () => {
        props.dispatch(SendMessageBodyAC(props.newMessageBody))

    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

        props.dispatch(updateNewMessageBodyAC(e.currentTarget.value))
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={props.newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder='Enter message'/></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dialogs;