import {CombineCreatorsType} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../API/api";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

let initialState = {

    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 10},
        {id: 2, message: 'Hello!', likesCount: 20},
        {id: 3, message: 'Hey!', likesCount: 20}
    ],
    newPostText: '',
    profile: null,
    status: ''
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
export type setStatusACType = {
    type: typeof SET_STATUS
    status: string
}
export type ProfileActionsType = addPostACType | updateNewPostTextACType | setUserProfileACType | setStatusACType


const profileReducer = (state = initialState, action: CombineCreatorsType): InitialStateType => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state, posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
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
export const setStatus = (status: string): setStatusACType => {
    return {
        type: SET_STATUS,
        status: status
    } as const
}
export const getUsersProfile = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        }
    )
}
export const getStatus = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        }
    )
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
    )
}

export default profileReducer