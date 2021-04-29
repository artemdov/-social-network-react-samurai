import React from 'react'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../universal/Forms/FormsControls";
import {required} from "../../utilits/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import {ReduxStore} from "../../redux/redux-store";
import s from '../universal/Forms/FormsControls.module.css'

type LoginType = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: null | string) => void
    captchaUrl: string | null
}
type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captchaUrl: string | null
}
type CaptchaType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, CaptchaType> & CaptchaType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} validate={[required]} component={Input}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>
                remember me
            </div>

            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && <Field placeholder={'Symbols'} name={'captcha'} validate={[required]} component={Input}/>
            }

            {error && <div className={s.formError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )

}

const LoginReduxForm = reduxForm<FormDataType, CaptchaType >({form: 'login'})(LoginForm)
const Login = (props: LoginType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)

    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}  captchaUrl={props.captchaUrl}/>
        </div>

    )

}
const MapStateToProps = (state: ReduxStore) => ({
    captchaUrl: state.authReducer.captchaUrl,
    isAuth: state.authReducer.isAuth
})

export default connect(MapStateToProps, {login})(Login)






