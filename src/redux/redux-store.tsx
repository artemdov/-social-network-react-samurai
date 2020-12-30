import {combineReducers, createStore,} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";


let reducers = combineReducers({profileReducer: profileReducer,
                                   dialogsReducer: dialogsReducer,
                                    sideBarReducer: sidebarReducer
})

let reduxStore = createStore(reducers);
export default reduxStore