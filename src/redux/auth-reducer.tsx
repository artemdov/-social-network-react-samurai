import {CombineCreatorsType} from "./store";
import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'SET_USER_DATA'

export type setUserDataACType = ReturnType<typeof setUserData>
export type SetUserPropsType = ReturnType<typeof authReducer>
export type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    data: { userId: number | null, email: string | null, login: string | null, isAuth: boolean }
}
export type AuthReducerType = typeof initialState

export type AuthAllActionsType = setUserDataACType | SetUserPropsType
    | SetUserDataActionType | AuthReducerType
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}


const authReducer = (state = initialState, action: CombineCreatorsType): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
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
export const getAuthUserData = () => async (dispatch: (action: SetUserDataActionType) => void) => {
    let response = await authAPI.me()

    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setUserData(id, email, login, true))
    }


}

export const login = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch: any/*(action: AuthAllActionsType) => void*/) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }

}
export const logout = () => async (dispatch: (action: AuthAllActionsType) => void) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }

}


export default authReducer