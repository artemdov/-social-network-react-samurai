import React from 'react';
import styles from './FormsControls.module.css'


export const FormControl = (props: any) => {
    const {input, meta, child,element, ...restProps} = props
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: '')}>
            <div>
                {props.children}
            </div>

            {hasError && < span > {meta.error}</span>}
        </div>
    )
}

export const TextArea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
