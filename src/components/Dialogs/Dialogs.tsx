import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsType, MessagesType, StoreType} from "../../redux/store";


/*const MessageItem = (props: { message: string }) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}*/

type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
    SendMessageBodyAC: () => void
    updateNewMessageBodyAC: (newMessage: string ) => void
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.messages.map(m => <Message id={m.id} key={m.id} message={m.message}/>);
    let newMessageBody = props.newMessageBody

    let onSendMessageClick = () => {
        props.SendMessageBodyAC()
    }
    let onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       let body = e.currentTarget.value
       // props.updateNewMessageBodyAC(e.currentTarget.value)
        props.updateNewMessageBodyAC(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
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