import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {ReduxStore} from "../../redux/redux-store";
import {compose} from "redux";

 type mapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

 type mapDispatchToPropsType = {
    logout: () => void
}

class HeaderContainer extends React.Component <mapStateToPropsType & mapDispatchToPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state: ReduxStore) => {
    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {logout}))(HeaderContainer)
