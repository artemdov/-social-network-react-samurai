import {CombineCreatorsType} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

let initialState = {

    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 10},
        {id: 2, message: 'Hello!', likesCount: 20},
        {id: 3, message: 'Hey!', likesCount: 20}
    ],
    newPostText: '',
    profile: null
}
export type InitialStateType = typeof initialState
export type addPostACType = {
    type: typeof ADD_POST
}
export type updateNewPostTextACType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export type setUserProfileACType = {
    type: typeof SET_USER_PROFILE
    profile: null
}
export type ProfileActionsType = addPostACType | updateNewPostTextACType | setUserProfileACType


const profileReducer = (state = initialState, action: CombineCreatorsType): InitialStateType => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost],
            newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}


    export const addPost = (): addPostACType => {
        return {
            type: ADD_POST
        } as const
    }
    export const updateNewPostText = (newText: string): updateNewPostTextACType => {
        return {
            type: UPDATE_NEW_POST_TEXT,
            newText: newText
        } as const
    }
    export const setUserProfile = (profile: null): setUserProfileACType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    } as const
}

    export default profileReducer