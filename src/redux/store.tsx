import profileReducer, {
    addPostAC,
    addPostACType,
    ProfileActionsType,
    updateNewPostTextAC,
    updateNewPostTextACType
} from "./profileReducer";
import dialogsReducer, {
    DialogsActionsType,
    SendMessageBodyAC,
    SendMessageBodyACType,
    updateNewMessageBodyAC, updateNewMessageBodyACType
} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

 let store: StoreType = {
    _state: {
        ProfilePage: {
            posts: [
                {id: 1, message: 'Hi,how are you?', likesCount: 10},
                {id: 2, message: 'Hello!', likesCount: 20},
                {id: 3, message: 'Hey!', likesCount: 20}
            ],
            newPostText: ''
        },
        DialogsPage: {
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

        },
        SideBar: {}
    },
    addPost() {
        let newPost = {
            id: new Date().getTime(),
            message: this._state.ProfilePage.newPostText,
            likesCount: 0
        }
        this._state.ProfilePage.newPostText = ''
        this._state.ProfilePage.posts.push(newPost)
        this._RerenderTree(this._state)
    },
    _RerenderTree() {
        console.log('State changed')
    },
    updateNewPostText(newText: string) {
        this._state.ProfilePage.newPostText = newText
        this._RerenderTree(this._state)
    },
    updateNewMessageBodyAC(newMessage: string ) {
        this._state.DialogsPage.newMessageBody = newMessage
        this._RerenderTree(this._state)
    },
    SendMessageBodyAC() {
        this._state.DialogsPage.messages.push({
            id: 6,
            message: this._state.DialogsPage.newMessageBody
        })
        this._state.DialogsPage.newMessageBody = ''
        this._RerenderTree(this._state)
    },
    subscribe(observer) {
        this._RerenderTree = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {

        this._state.ProfilePage = profileReducer(this._state.ProfilePage,action)
        this._state.DialogsPage= dialogsReducer(this._state.DialogsPage, action)
        this._state.SideBar = sidebarReducer(this._state.SideBar, action)
        this._RerenderTree(this._state)


        /*if (action.type === 'ADD-POST') {
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            this._state.ProfilePage.posts.push(newPost)
            this._RerenderTree(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.ProfilePage.newPostText = action.newText
            this._RerenderTree(this._state)
        } else if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
            this._state.DialogsPage.newMessageBody = action.newMessage
            this._RerenderTree(this._state)
        } else if (action.type === 'SEND-NEW-MESSAGE') {
            this._state.DialogsPage.messages.push({
                id: 6,
                message: action.messageBody
            })
            this._RerenderTree(this._state)
        }*/
    }
}
// export type SendMessageACType = ReturnType<typeof SendMessageBodyAC>
// export type AddPostActionType = ReturnType<typeof addPostAC>
// export type updateNewMessageBodyACActionType = ReturnType<typeof updateNewMessageBodyAC>
// export type updateNewPostTextACActionType = ReturnType<typeof updateNewPostTextAC>

export type CombineCreatorsType = ProfileActionsType | DialogsActionsType

export type StoreType = {
    _state: StateType
    addPost: () => void
    _RerenderTree: (_state: StateType) => void
    subscribe: (observer: () => void) => void
    getState: () => StateType
    updateNewPostText: (newText: string) => void
    SendMessageBodyAC: () => void
    updateNewMessageBodyAC: (newMessage: string ) => void
    dispatch: (action: CombineCreatorsType)  => void

}
export type SideBarType = {}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}


// export type MyPostsType = {
//     posts: Array<PostsType>
//     newPostText: string
//     dispatch: (action: ActionsTypes) => void
//     updateNewPostText: (newText: string) => void
//     addPost: () => void
// }
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string

}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
// export type DialogsActionType = {
//     dialogs: Array<DialogsType>
//     messages: Array<MessagesType>
//     newMessageBody: string
//     SendMessageBodyAC: () => void
//     updateNewMessageBodyAC: (newMessage: string ) => void
//     dispatch: (action: ActionsTypes) => void
//
// }
export type StateType = {
    ProfilePage: ProfilePageType
    DialogsPage: DialogsPageType
    SideBar: SideBarType
}
export type  ActionsTypes = ProfileActionsType | DialogsActionsType

export default store

/*export const addPostAC = (postText: string) => {
    return {
        type: 'ADD-POST',
        postText: postText
    } as const
}
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}*/
/*export const updateNewMessageBodyAC = (newMessage: string) => {
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
}*/


