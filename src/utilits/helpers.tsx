import React from 'react'
import {UsersType} from "../redux/store";

export const updateObjectInArray = (items:  UsersType[] , itemId: number, objPropName: 'name'| 'id' | 'photos' | 'followed' | 'status' | 'location', newObjProps: any): UsersType[] => {
   return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}