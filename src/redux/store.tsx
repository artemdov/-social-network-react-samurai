import profileReducer, {ProfileActionsType} from "./profileReducer";
import dialogsReducer, {DialogsActionsType} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer, {UsersActionsType} from "./usersReducer";

/* let store: StoreType = {
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
        SideBar: {},
        UsersPage:{
          users:  [
{id: 1, photoUrl:"https://go.imgsmail.ru/imgpreview?key=518724a3765b0027&mb=imgdb_preview_exp", followed: false, fullName: 'Dmitry', status: 'I am a Boss', location: {city: 'Minsk', country: 'Belarus'}},
{id: 2,  photoUrl:'https://go.imgsmail.ru/imgpreview?key=518724a3765b0027&mb=imgdb_preview_exp', followed: true, fullName: 'Tom', status: 'Hello!', location: {city: 'Moscow', country: 'Russia'}},
{id: 3,  photoUrl:'https://go.imgsmail.ru/imgpreview?key=518724a3765b0027&mb=imgdb_preview_exp', followed: true, fullName: 'Jack', status: 'Hey!', location: {city: 'Kiev', country: 'Ukraine'}}
]}


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
        this._state.UsersPage = usersReducer(this._state.UsersPage, action)
        this._RerenderTree(this._state)
    }
}*/

export type CombineCreatorsType = ProfileActionsType | DialogsActionsType | UsersActionsType
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
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
export type UsersPageType = {
     users: Array<UsersType>
 }
export type UsersType = {
    id: number
    photos: string
    followed: boolean
    name: string
    status: string
    location: locationType
}
export type locationType = {
     city: string
    country: string
}
export type StateType = {
    ProfilePage: ProfilePageType
    DialogsPage: DialogsPageType
    SideBar: SideBarType
    UsersPage: UsersPageType
}
export type  ActionsTypes = ProfileActionsType | DialogsActionsType | UsersPageType




