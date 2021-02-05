import axios from "axios";


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
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)

    }
}


/*
export const getUsers2 = (currentPage: number, pageSize: number) => {
    return instance.get(`follow?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
}*/
