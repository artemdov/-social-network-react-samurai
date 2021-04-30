import {PostsType} from "./store";
import {profileAPI, usersAPI} from "../API/api";
import {UserProfileType} from "../components/profile/My posts/Post/ProfileInfo/profileInfo";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {rejects} from "assert";

const ADD_POST = 'PROFILE/ADD-POST'
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE'
const SET_STATUS = 'PROFILE/SET-STATUS'
const DELETE_POST = 'PROFILE/DELETE-POST'
const SAVE_PHOTO = 'PROFILE/SAVE-PHOTO'
const SAVE_PROFILE = 'PROFILE/SAVE-PROFILE'

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
export type ProfilePageTypeForm = {
    posts: Array<PostsType>
    userProfile: UserProfileType
    status: string

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
export type saveProfileType = {
    type: typeof SAVE_PROFILE
    profile: UserProfileType
}
export type ProfileActionsType =
    saveProfileType
    | savePhotoType
    | addPostACType
    | deletePostACType
    | setUserProfileACType
    | setStatusACType
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

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

export const actions = {
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    setUserProfile: (profile: null) => ({type: SET_USER_PROFILE, profile} as const),
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    savePhotoSuccess: (photos: photoUserType) => ({type: SAVE_PHOTO, photos} as const),
    saveProfileSuccess: (profile: UserProfileType) => ({type: SAVE_PROFILE, profile} as const)
}

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))
}
export const getStatus = (userId: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try{
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    }catch(error){
        alert('error')
    }


}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: UserProfileType): ThunkType => async (dispatch, getState) => {
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        const userId = getState().authReducer.userId
        if (userId != null) {
            return dispatch(getUsersProfile(userId))
        }
    } else {
        let message = response.data.messages[0]
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)


    }

}
export default profileReducer