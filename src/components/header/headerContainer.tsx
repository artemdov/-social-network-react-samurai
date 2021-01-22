import React from "react";
import Header from "./header";
import axios from "axios";
import {connect} from "react-redux";
import {setUserData} from "../../redux/auth-reducer";
import store, {ReduxStore} from "../../redux/redux-store";

export type mapStateToPropsType = {
    isAuth: boolean,
    login: string
}

export type mapDispatchToPropsType = {
    setUserData: (id: number, email: string, login: string) => void
}

class HeaderContainer extends React.Component <mapStateToPropsType & mapDispatchToPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true //authorization
        }).then(response => {
                if (response.data.resultCode === 0) {
                    const {id, email, login} = response.data.data
                    this.props.setUserData(id, email, login)
                }
            }
        )
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} {...this.props}/>
    }
}

const mapStateToProps = (state: ReduxStore) => {
    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login
    }
}
export default connect(mapStateToProps, {setUserData})(HeaderContainer)