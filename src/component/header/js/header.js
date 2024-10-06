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
                    <p>업사이클</p>
                    <p>에코가게정보</p>
                </div>
                <div className="sign-box">
                    <Link to="/sign_up" className="sign-up">회원가입</Link>
                    <Link to="/sign_in" className="sign-in">
                        <p>로그인</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Header;