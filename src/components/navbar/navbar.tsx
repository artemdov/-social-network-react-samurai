import React from "react";
import s from './navbar.module.css';
import {NavLink} from "react-router-dom";

const NavbarItem = (props: { title: string; id: string }) => {
    return (
        <div className={`${s.item} ${s.active}`}>
            <NavLink to={props.id} activeClassName={s.active}>{props.title}</NavLink>
        </div>
    )
}

const Navbar = () => {
    return <nav className={s.nav}>
        <NavbarItem title='Profile' id='/profile'/>
        <NavbarItem title='Message' id='dialogs'/>
        <NavbarItem title='News' id='news'/>
        <NavbarItem title='Settings' id='settings'/>

    </nav>
}
export default Navbar