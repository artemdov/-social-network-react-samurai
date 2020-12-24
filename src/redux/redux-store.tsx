import {
    Action,
    combineReducers,
    createStore,
    Store
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";


let reducers = combineReducers({profileReducer: profileReducer,
                                   dialogsReducer: dialogsReducer,
                                    sideBarReducer: sidebarReducer
})


export let store: Store<unknown, Action>;
store = createStore(reducers);