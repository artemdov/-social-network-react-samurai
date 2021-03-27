import React from 'react';
import {ReduxStore} from "./redux-store";
import {createSelector} from "reselect";


export const getUser = (state: ReduxStore) => {
    return state.usersReducer.users
}
export const getUsersSuperSelector = createSelector(getUser,(users) => {
    return users
        //reselect-for create more difficult logic than simple selector
})
export const getPageSize = (state: ReduxStore) => {
    return state.usersReducer.pageSize
}
export const getTotalUsersCount = (state: ReduxStore) => {
    return state.usersReducer.totalUsersCount
}
export const getCurrentPage = (state: ReduxStore) => {
    return state.usersReducer.currentPage
}
export const getFollowingInProgress = (state: ReduxStore) => {
    return state.usersReducer.followingInProgress
}
export const getIsFetching = (state: ReduxStore) => {
    return state.usersReducer.isFetching
}





