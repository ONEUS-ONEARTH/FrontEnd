import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../scss/header.scss';
import { USER_URL } from "../../../config/host-config";
import cn from 'classnames';

const Header = () => {
    const API_BASE_URL = USER_URL;

    const redirection = useNavigate(); // 리다이렉트 함수를 리턴

    const nickname = localStorage.getItem('NICKNAME');
    const profileImg = localStorage.getItem('PROFILE_IMG');
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    
    useEffect(() => {
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)
        const storedToken = localStorage.getItem('ACCESS_TOKEN');

        if (storedToken) {
            setIsLoggedIn(true);
        }
        
    }, []);

    const handleLogout = () => {
        // localStorage를 비웁니다.
        localStorage.clear();

        // 로그아웃 후 리다이렉션 (예: 로그인 페이지)
        redirection('/sign_in');
    };

    return (
        <>
            <div id="header">
                <Link to='/' className="logo">
                    <p>OUO</p>
                    <p className="word-E">E</p>
                </Link>
                <div className="header-box">
                    <Link to='/upcycle_meet' className="link-text">모임</Link>
                    <Link to='/upcycle' className="link-text">업사이클</Link>
                    {/*<p>에코가게정보</p>*/}
                </div>
                <div className="sign-box">
                    {isLoggedIn ? (
                        <>
                            <img
                                className="profile-img-box"
                                src={profileImg}
                                alt="프로필이미지"
                            />
                            <div className="profile-name">
                                <p>{nickname}</p>

                                <div className="myinfo-menu">
                                    <Link to='/my_profile' className="text-deco">
                                        <span>내정보</span>
                                    </Link>
                                    <div onClick={handleLogout}>
                                        <span>로그아웃</span>
                                    </div>
                                </div>
                            </div>

                        </>
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