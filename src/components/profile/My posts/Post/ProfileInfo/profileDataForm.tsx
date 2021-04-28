import React from "react";
import {UserProfileContactsType, UserProfileType} from "./profileInfo";
import {Input, TextArea} from "../../../../universal/Forms/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from './profile.module.css';



export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    aboutMe: string
    lookingForAJobDescription: string
}
type PropsType = {
    profile: UserProfileType
}

export const ProfileChangeDataForm: React.FC<InjectedFormProps<ProfileFormDataType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div> <button>save</button> </div>
        {error && <div className={s.formError}>
            {error}
        </div>}
        <div>
            <b>Full name</b>: <Field placeholder={'Full name'} name={'fullName'} validate={[]} component={Input}/>
        </div>
        <div>
            <b>Looking for a job</b>:<Field name={'lookingForAJob'} validate={[]} component={Input} type ={'checkbox'}/>
        </div>
        <div>
            <b>Professional skills</b>: <Field placeholder={'Professional skills'} name={'lookingForAJobDescription'} validate={[]} component={TextArea}/>
        </div>

        <div>
            <b>About Me</b>: <Field placeholder={'About me'} name={'aboutMe'} validate={[]} component={TextArea}/>
        </div>
        <div>
             <b>Contacts</b>:{profile.contacts && Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:</b> <Field placeholder={key} name={`contacts.${key}`} validate={[]} component={Input}/>

            </div>
        })}
        </div>

    </form>
}

export const ProfileChangeDataReduxForm = reduxForm<ProfileFormDataType, PropsType>({form: 'edit-profile'})(ProfileChangeDataForm)

