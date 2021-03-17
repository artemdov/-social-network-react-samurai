import React from 'react';
import styles from './FormsControls.module.css'
import {WrappedFieldProps} from "redux-form";


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

export const TextArea: React.FC<WrappedFieldProps & {placeholder: string}> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...restProps} {...input} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps & {placeholder: string, type: string}> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...restProps} {...input} /></FormControl>
}

