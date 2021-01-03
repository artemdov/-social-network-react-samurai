import {CombineCreatorsType, UsersType} from "./store";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export type UsersActionsType = followACType | unfollowACType | setUsersACType

let initialState = {
    users: [
        {id: 1,
        photoUrl:"https://go.imgsmail.ru/imgpreview?key=518724a3765b0027&mb=imgdb_preview_exp",  followed: false, fullName: 'Dmitry', status: 'I am a Boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2,
        photoUrl:"https://go.imgsmail.ru/imgpreview?key=518724a3765b0027&mb=imgdb_preview_exp", followed: true, fullName: 'Tom', status: 'Hello!', location: {city: 'Moscow', country: 'Russia'}},
        {id: 3,
        photoUrl:"https://go.imgsmail.ru/imgpreview?key=518724a3765b0027&mb=imgdb_preview_exp", followed: true, fullName: 'Jack', status: 'Hey!', location: {city: 'Kiev', country: 'Ukraine'}}
    ]
}
export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: CombineCreatorsType): InitialStateType => {

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
            return {...state, users: [...state.users, ...action.users]}
        }

        default:
            return state
    }
}

export type followACType = {
    type: typeof FOLLOW,
    userId: number
}
export const followAC = (userId: number): followACType => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}
export type unfollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowAC = (userId: number): unfollowACType => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const
}
export type setUsersACType = {
    type: typeof SET_USERS,
    users: UsersType
}
export const setUsersAC = (users: UsersType): setUsersACType => {
    return {
        type: SET_USERS,
        users: users
    } as const
}


export default usersReducer