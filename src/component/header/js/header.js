import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../scss/header.scss';
import { USER_URL } from "../../../config/host-config";

const Header = () => {
    const API_BASE_URL = USER_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const nickname = localStorage.getItem('NICKNAME')
    useEffect(() => {
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)
        const storedToken = localStorage.getItem('ACCESS_TOKEN');

        if (storedToken) {
            setIsLoggedIn(true);
        }
        
    }, []);

    return (
        <>
            <div id="header">
                <Link to='/' className="logo">
                    <p>OUO</p>
                    <p className="word-E">E</p>
                </Link>
                <div className="header-box">
                    <p>모임</p>
                    <Link to='/upcycle' className="link-text">업사이클</Link>
                    <p>에코가게정보</p>
                </div>
                <div className="sign-box">
                    {isLoggedIn ? (
                        <div>
                            {/*<img*/}
                            {/*    className="profile-img-box"*/}
                            {/*    src={profileImg}*/}
                            {/*    alt="프로필이미지"*/}
                            {/*/>*/}
                            <p className="profile-name">{nickname}</p>
                        </div>
                    ) : (
                        <>
                            <Link to="/sign_up" className="link-text">회원가입</Link>
                            <Link to="/sign_in" className="link-text">로그인</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Header;