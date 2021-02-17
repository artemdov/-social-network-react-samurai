import {CombineCreatorsType} from "./store";
import {Dispatch} from "redux";
import {authAPI} from "../API/api";


const SET_USER_DATA = 'SET_USER_DATA'


export type SetUserActionsType = setUserDataACType

export type setUserDataACType = {
    type: typeof SET_USER_DATA,
    data: {
        id: number,
        email: string,
        login: string,
    }
}
export type SetUserPropsType = {
    id: number,
    email: string,
    login: string,
    isAuth: boolean
}

let initialState: SetUserPropsType = {
    id: 6,
    email: '',
    login: '',
    isAuth: false


}

const authReducer = (state = initialState, action: CombineCreatorsType): SetUserPropsType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true

            }

        default:
            return state
    }
}

export const setUserData = (id: number, email: string, login: string): setUserDataACType => {
    return {
        type: SET_USER_DATA,
        data: {
            id: id,
            email: email,
            login: login
        }

    } as const
}
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
                if (response.data.resultCode === 0) {
                    const {id, email, login} = response.data.data
                    dispatch(setUserData(id, email, login))
                }
            }
        )
}



export default authReducer