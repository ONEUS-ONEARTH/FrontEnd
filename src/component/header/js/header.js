import React, {useEffect, useState} from 'react';
import '../scss/header.scss';

const Header = () => {

    return (
        <>
            <div id="header">
                <div className="logo">
                    <p>OUO</p>
                    <p className="word-E">E</p>
                </div>
                <div className="header-box">
                    <p>모임</p>
                    <p>업사이클</p>
                    <p>에코가게정보</p>
                </div>
                <div className="sign-box">
                    <div className="sign-up">
                        <p>회원가입</p>
                    </div>
                    <div className="sign-in">
                        <p>로그인</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;