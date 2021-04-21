import React from 'react'
import s from '../../users/users.module.css'

type  PaginatorFunctionType = {
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = (props: PaginatorFunctionType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : ''} onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p}</span>
            })}

        </div>
}


