import axios from "axios";
import {setUserProfile} from "../redux/profileReducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)

    },
    getProfile (userId: string) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile (userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus (userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put(`profile/status`,{status})
    }
}
export const authAPI = {
    me() {
       return instance.get(`auth/me`)
    }
}



