import {CombineCreatorsType} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {

    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 10},
        {id: 2, message: 'Hello!', likesCount: 20},
        {id: 3, message: 'Hey!', likesCount: 20}
    ],
    newPostText: ''
}
export type InitialStateType = typeof initialState

export type ProfileActionsType = addPostACType | updateNewPostTextACType


const profileReducer = (state = initialState, action: CombineCreatorsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST': {
            let newPost = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost],
            newPostText: ''
            }
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText}
        }
        default:
            return state
    }
}

    export type addPostACType = {
        type: typeof ADD_POST
    }
    export const addPostAC = (): addPostACType => {
        return {
            type: 'ADD-POST'
        } as const
    }
    export type updateNewPostTextACType = {
        type: typeof UPDATE_NEW_POST_TEXT
        newText: string
    }
    export const updateNewPostTextAC = (newText: string): updateNewPostTextACType => {
        return {
            type: 'UPDATE-NEW-POST-TEXT',
            newText: newText
        } as const
    }

    export default profileReducer