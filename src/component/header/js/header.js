import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../scss/header.scss';

const Header = () => {

    return (
        <>
            <reset></reset>
            <div id="header">
                <Link to='/'className="logo">
                    <p>OUO</p>
                    <p className="word-E">E</p>
                </Link>
                <div className="header-box">
                    <p>모임</p>
                    <Link to='/upcycle' className="link-text">업사이클</Link>
                    <p>에코가게정보</p>
                </div>
                <div className="sign-box">
                    <Link to="/sign_up" className="link-text">회원가입</Link>
                    <Link to="/sign_in" className="link-text">
                        <p>로그인</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Header;