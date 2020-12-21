const dialogsReducer = (state: any, action:any) => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
           return {
               ...state,
               newMessageBody:  action.newMessage
           }
            break;
        case 'SEND-NEW-MESSAGE':
            return {
                ...state,
                messages: [...state.messages,{
                    id: 6,
                    message: action.messageBody
                }]
            }

            break;
    }

    return state
}

export const updateNewMessageBodyAC = (newMessage: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        newMessage: newMessage
    } as const
}
export const SendMessageBodyAC = (messageBody: string) => {
    return {
        type: 'SEND-NEW-MESSAGE',
        messageBody: messageBody
    } as const
}

export default dialogsReducer