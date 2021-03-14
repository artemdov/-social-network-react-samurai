import {CombineCreatorsType} from "./store";

const SEND_NEW_MESSAGE = 'SEND-NEW-MESSAGE'

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
    ]
}
export type InitialStateType = typeof initialState

export type DialogsActionsType = SendMessageBodyACType

const dialogsReducer = (state: InitialStateType = initialState, action: CombineCreatorsType): InitialStateType => {

    switch (action.type) {

        case 'SEND-NEW-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    id: 6,
                    message: action.newMessageBody
                }]
            }
    }
    return state
}

export type SendMessageBodyACType = {
    type: typeof SEND_NEW_MESSAGE,
    newMessageBody: string
}

export const SendMessageBodyAC = (newMessageBody: string): SendMessageBodyACType => {
    return {
        type: 'SEND-NEW-MESSAGE',
        newMessageBody
    } as const
}

export default dialogsReducer