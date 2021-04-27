import {CombineCreatorsType} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../API/api";
import {UserProfileType} from "../components/profile/My posts/Post/ProfileInfo/profileInfo";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO = 'SAVE-PHOTO'

let initialState = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 10},
        {id: 2, message: 'Hello!', likesCount: 20},
        {id: 3, message: 'Hey!', likesCount: 20}
    ],
    newPostText: '',
    profile: null as UserProfileType | null,
    status: ''
}
export type photoUserType = {
    photos: photoType
}
export type photoType = {
    large: string
    small: string
}
export type InitialStateType = typeof initialState
export type addPostACType = {
    type: typeof ADD_POST
    newPostText: string
}
export type deletePostACType = {
    type: typeof DELETE_POST
    postId: number
}
export type setUserProfileACType = {
    type: typeof SET_USER_PROFILE
    profile: null | photoUserType
}
export type setStatusACType = {
    type: typeof SET_STATUS
    status: string
}
export type savePhotoType = {
    type: typeof SAVE_PHOTO
    photos: photoUserType
}
export type ProfileActionsType = savePhotoType | addPostACType | deletePostACType | setUserProfileACType | setStatusACType


const profileReducer = (state= initialState, action: CombineCreatorsType): InitialStateType => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state, posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile} as unknown as InitialStateType
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos}} as unknown as InitialStateType
        }
        default:
            return state
    }
}


export const addPost = (newPostText: string): addPostACType => {
    return {
        type: ADD_POST,
        newPostText
    } as const
}
export const deletePost = (postId: number): deletePostACType => {
    return {
        type: DELETE_POST,
        postId
    } as const
}
export const setUserProfile = (profile: null): setUserProfileACType => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setStatus = (status: string): setStatusACType => {
    return {
        type: SET_STATUS,
        status
    } as const
}
export const savePhotoSuccess = (photos: photoUserType): savePhotoType => {
    return {
        type: SAVE_PHOTO,
        photos
    } as const
}

export const getUsersProfile = (userId: string) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
            dispatch(setUserProfile(response.data))
        }
export const getStatus = (userId: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export default profileReducer