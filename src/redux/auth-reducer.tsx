import {CombineCreatorsType} from "./store";
import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'

export type setUserDataACType = ReturnType<typeof setUserData>
export type SetUserPropsType = ReturnType<typeof authReducer>
export type CaptchaUrlACType = ReturnType<typeof getCaptchaUrl>
export type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    data: { userId: number | null, email: string | null, login: string | null, isAuth: boolean }
}
export type CaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    data: { captchaUrl: null | string }
}
export type AuthReducerType = typeof initialState

export type AuthAllActionsType = setUserDataACType | SetUserPropsType
    | SetUserDataActionType | AuthReducerType | CaptchaUrlActionType
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}


const authReducer = (state = initialState, action: CombineCreatorsType): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state,
                    ...action.data}
        default:
            return state
    }
}

export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth}
    } as const
}
export const getCaptchaUrl = (captchaUrl: null | string): CaptchaUrlActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        data: {captchaUrl}
    } as const
}


export const getAuthUserData = () => async (dispatch: (action: SetUserDataActionType) => void) => {
    let response = await authAPI.me()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) =>

    async (dispatch: any/*(action: AuthAllActionsType) => void*/) => {
   debugger
    let response = await authAPI.login(email, password, rememberMe, captchaUrl)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if(response.data.resultCode === 10){
            dispatch(getCaptcha())
        }
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logout = () => async (dispatch: (action: AuthAllActionsType) => void) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}
export const getCaptcha = () => async (dispatch: (action: AuthAllActionsType) => void) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
        dispatch(getCaptchaUrl(captchaUrl))
}


export default authReducer