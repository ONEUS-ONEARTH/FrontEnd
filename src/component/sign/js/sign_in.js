import React from "react";
import Header from "../../header/js/header";
import { Link } from 'react-router-dom';
import "../scss/sign-in.scss"


const Sign_in = () => {

    return (
        <>
            <Header/>
            <div className="signin-container">
                <div className="signin-title">
                    <p>로그인</p>
                </div>
                <div className="sign-boxes">
                    <div className="signin-box">
                        <div className="login-info-box">
                            <div className="id-box">
                                <div className="id-text">
                                    <p>아이디</p>
                                </div>
                                <input className="input-box" type="text"/>
                            </div>
                            <div className="pw-box">
                                <div className="pw-text">
                                    <p>비밀번호</p>
                                </div>
                                <input className="input-box" type="text"/>
                            </div>
                        </div>
                        <div className="login-btn">
                            <p>로그인</p>
                        </div>
                    </div>
                    <div className="signup-box">
                        <div className="signup-text">
                            <p>아직 계정이 없으신가요?</p>
                        </div>
                        <Link to='/sign_up' className="signup-btn">
                            <p>회원가입</p>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Sign_in;