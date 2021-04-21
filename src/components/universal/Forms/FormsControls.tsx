import React from 'react';
import styles from './FormsControls.module.css'
import { WrappedFieldProps} from "redux-form";

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


