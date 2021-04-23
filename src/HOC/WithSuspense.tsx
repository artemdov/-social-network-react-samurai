import React from 'react';



export const withSuspense = <T,>(Component: React.ComponentType<T> ) => {
    return (props:T) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </React.Suspense>
    }
}