import React, {useState} from 'react'
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
    const portionPages = 15
    const portionCount = Math.ceil(pagesCount / portionPages)
    const [currentNumber, setCurrentNumber] = useState(1)
    const leftSide = (currentNumber - 1) * portionPages
    const rightSide = currentNumber * portionPages


    return <div>
        {currentNumber > 1 &&
        <button onClick={()=>{setCurrentNumber(currentNumber - 1)}}>Prev</button>
        }

        {pages
            .filter(p => p >= leftSide && p<=rightSide)
            .map(p => {
            return <span className={props.currentPage === p ? s.selectedPage : ''} onClick={(e) => {
                props.onPageChanged(p)
            }}>{p}</span>
        })}
            {portionCount > currentNumber &&
        <button onClick={()=>{setCurrentNumber(currentNumber + 1)}}>Next</button>
        }

    </div>
}


