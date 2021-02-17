import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {getAuthUserData, setUserData} from "../../redux/auth-reducer";
import store, {ReduxStore} from "../../redux/redux-store";

export type mapStateToPropsType = {
    isAuth: boolean,
    login: string
}

export type mapDispatchToPropsType = {
    getAuthUserData: () => void
}

class HeaderContainer extends React.Component <mapStateToPropsType & mapDispatchToPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
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
export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)