import {Action, applyMiddleware, combineReducers, createStore,} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let rootReducer = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer,
    sideBarReducer: sidebarReducer,
    usersReducer: usersReducer,
    authReducer: authReducer,
    form: formReducer,
    app: appReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export type ReduxStore = ReturnType<typeof rootReducer>
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType <A extends Action, R = Promise<void>> = ThunkAction<R, ReduxStore, unknown, A>

export default store