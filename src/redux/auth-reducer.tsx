import {CombineCreatorsType} from "./store";



const SET_USER_DATA = 'SET_USER_DATA'
debugger

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

let initialState: SetUserPropsType  = {
    id: 6 ,
    email: '',
    login: '',
    isAuth: false


}

const authReducer = (state = initialState, action: CombineCreatorsType): SetUserPropsType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {...state,
                ...action.data,
                isAuth: true

            }

        default:
            return state
    }
}

export const setUserData = (id: number, email: string, login:string): setUserDataACType => {
    return {
        type: SET_USER_DATA,
        data: {
            id: id,
            email: email,
            login: login
        }

    } as const
}


export default authReducer