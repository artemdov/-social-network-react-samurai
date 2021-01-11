import {CombineCreatorsType, UsersPageType, UsersType} from "./store";



const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export type UsersActionsType = followACType | unfollowACType | setUsersACType
export type followACType = {
    type: typeof FOLLOW,
    userId: number
}
export type unfollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}
export type setUsersACType = {
    type: typeof SET_USERS,
    users: UsersType
}

let initialState: UsersPageType  = {
    users: []
}

const usersReducer = (state:UsersPageType = initialState, action: CombineCreatorsType): UsersPageType => {

    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:{
            return {...state, users: [...state.users, action.users]}
        }

        default:
            return state
    }
}

export const followAC = (userId: number): followACType => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}
export const unfollowAC = (userId: number): unfollowACType => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const
}
export const setUsersAC = (users: UsersType): setUsersACType => {
    return {
        type: SET_USERS,
        users: users
    } as const
}


export default usersReducer