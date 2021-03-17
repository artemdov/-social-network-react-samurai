import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsType, MessagesType} from "../../redux/store";
import {Field, reduxForm} from "redux-form";
import {AddMessageFormRedux} from "./AddMessageForm";


/*const MessageItem = (props: { message: string }) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}*/

export type DialogsPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
    SendMessageBodyAC: (values:any) => void
    updateNewMessageBodyAC: (newMessage: string) => void
    isAuth: boolean
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.messages.map(m => <Message id={m.id} key={m.id} message={m.message}/>);
   /* let newMessageBody = props.newMessageBody
    let onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBodyAC(e.currentTarget.value)
    }*/
    let addNewMessage =  (values: any) => {
        props.SendMessageBodyAC(values.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>

            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    )
}

export default Dialogs;