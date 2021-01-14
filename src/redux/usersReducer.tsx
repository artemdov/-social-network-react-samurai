import {CombineCreatorsType, UsersPageType, UsersType} from "./store";



const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

export type UsersActionsType = followACType | unfollowACType
    | setUsersACType | setCurrentPageACType | setTotalUsersCountACType
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
    users: Array<UsersType>
}
export type setCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export type setTotalUsersCountACType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}

let initialState: UsersPageType  = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,


}

const usersReducer = (state = initialState, action: CombineCreatorsType): UsersPageType => {

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
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {

            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {

            return {...state, totalUsersCount: action.totalUsersCount}
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
export const setUsersAC = (users: Array<UsersType>): setUsersACType => {
    return {
        type: SET_USERS,
        users: users
    } as const
}
export const setCurrentPageAC = (currentPage:number): setCurrentPageACType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    } as const
}
export const setTotalUsersCountAC = (totalUsersCount:number): setTotalUsersCountACType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalUsersCount
    } as const
}


export default usersReducer