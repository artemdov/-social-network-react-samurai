import {combineReducers, createStore,} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";


let reducers = combineReducers({profileReducer: profileReducer,
                                   dialogsReducer: dialogsReducer,
                                    sideBarReducer: sidebarReducer,
                                    usersReducer: usersReducer
})

let reduxStore = createStore(reducers);

export type ReduxStore = ReturnType<typeof reducers>

export default reduxStore