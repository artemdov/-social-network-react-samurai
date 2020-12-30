import {CombineCreatorsType} from "./store";

const SEND_NEW_MESSAGE = 'SEND-NEW-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Sergei'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Valera'},
        {id: 5, name: 'Tom'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Hyo'},
        {id: 4, message: 'How are you'},
        {id: 5, message: 'Hey'}
    ],
    newMessageBody: ''
}
export type InitialStateType = typeof initialState

export type DialogsActionsType = updateNewMessageBodyACType | SendMessageBodyACType

const dialogsReducer = (state: InitialStateType = initialState, action: CombineCreatorsType): InitialStateType => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {
                ...state,
                newMessageBody: action.body
            }
        case 'SEND-NEW-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    id: 6,
                    message: state.newMessageBody
                }],
                newMessageBody: ''
            }
    }
    return state
}

export type updateNewMessageBodyACType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY,
    body: string
}

export const updateNewMessageBodyAC = (newMessage: string): updateNewMessageBodyACType => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: newMessage
    } as const
}

export type SendMessageBodyACType = {
    type: typeof SEND_NEW_MESSAGE
}

export const SendMessageBodyAC = (): SendMessageBodyACType => {
    return {
        type: 'SEND-NEW-MESSAGE'
    } as const
}

export default dialogsReducer