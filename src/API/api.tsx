import axios from "axios";


const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}


export const getUsers2 = (currentPage: number, pageSize: number) => {
    return instanse.get(`follow?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
}