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

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {
                ...state,
                newMessageBody: action.newMessage
            }
            break;
        case 'SEND-NEW-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    id: 6,
                    message: action.messageBody
                }]
            }
            break;
    }
    return state
}

type updateNewMessageBodyACType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY,
    newMessage: string
}

export const updateNewMessageBodyAC = (newMessage: string): updateNewMessageBodyACType => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        newMessage: newMessage
    } as const
}

type SendMessageBodyACType = {
    type: typeof SEND_NEW_MESSAGE
    messageBody: string
}

export const SendMessageBodyAC = (messageBody: string): SendMessageBodyACType => {
    return {
        type: 'SEND-NEW-MESSAGE',
        messageBody: messageBody
    } as const
}

export default dialogsReducer