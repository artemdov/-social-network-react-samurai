import {CombineCreatorsType} from "./store";
import {getAuthUserData, setUserData} from "./auth-reducer";
import {Simulate} from "react-dom/test-utils";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type appInitializedSuccessACType = ReturnType<typeof initializedSuccess>
export type SetInitializedPropsType = ReturnType<typeof appReducer>
type AppReducerType = typeof initialState

let initialState = {
    initialized: false,
    globalError: null
}


const appReducer = (state = initialState, action: CombineCreatorsType): AppReducerType => {
    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer