import React from 'react';
import styles from './FormsControls.module.css'
import {WrappedFieldProps} from "redux-form";


// export const FormControl = (props: any) => {
//     const {input, meta, child,element, ...restProps} = props
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
//             <div>
//                 {props.children}
//             </div>
//
//             {hasError && < span > {meta.error}</span>}
//         </div>
//     )
// }

export const TextArea: React.FC<WrappedFieldProps & {placeholder: string}> = (props) => {
    const { input, meta, ...restProps } = props
    return <div className={styles.formControl+ ' '+ ((meta.touched && meta.error) ? styles.error: ' ')}>
        <textarea {...restProps} {...input} />
        {meta.touched && meta.error &&<span>{meta.error}</span>}
    </div>
}

export const Input: React.FC<WrappedFieldProps & {placeholder: string, type: string}> = (props) => {
    const { input, meta, ...restProps } = props
    return <div className={styles.formControl+ ' '+ ((meta.touched && meta.error) ? styles.error: ' ')}>
        <input {...restProps} {...input}/>
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
}

