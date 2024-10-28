import React from "react";
import Header from "../../header/js/header";
import {Link, useNavigate} from 'react-router-dom';
// import react, {  } from 'react';
import "../scss/sign_in.scss"
import {USER_URL} from "../../../config/host-config";
import { FcGoogle } from "react-icons/fc";
import {GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';


const Sign_in = () => {
    const API_BASE_URL = USER_URL;
    const SIGN_IN_URL = USER_URL + "/login";
    const redirection = useNavigate();

    const AuthGoogle=async (auth)=>{
        const res=await fetch('http://localhost:8080/api/user/login/oauth2/code/google',
            {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    accessToken: auth.access_token,
                    expiresIn:auth.expires_in,
                    tokenType:auth.token_type,
                    scope:auth.scope,
                    refreshToken:auth.refresh_token
                })
            }
            );
    }

    const googleLogin =  useGoogleLogin({
        onSuccess: codeResponse =>AuthGoogle(codeResponse),
        flow: 'implicit',
    });

    const signinHandler = e => {
        e.preventDefault();
        fetchSignInProcess();
    }
    

    const keyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            fetchSignInProcess(); // 작성한 댓글 post 요청하는 함수
        }
    };
    const fetchSignInProcess = async () => {
        const res = await fetch(SIGN_IN_URL, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        });

        if (res.status === 400) { // 가입이 안되었거나 비번이 틀린 경우
            // 서버에서 온 텍스트를 추출
            // const text = await res.text();
            // alert(text);
            alert("아이디나 비밀번호가 잘못되었습니다.");
            return;
        } else if (res.status === 500) {
            alert("아이디나 비밀번호가 잘못되었습니다.");
        }
        if (res.status === 200) {
            const {token, nickname, profileImg} = await res.json();
            // const responseData = await res.json();
            // 클라이언트에서 로그인을 했다는 사실을 알게 해야함
            // 서버에서 받은 토큰을 브라우저에 저장할것.
            // 1. 로컬 스토리지 - 데이터를 브라우저가 종료되어도 계속 보관
            // 2. 세션 스토리지 - 데이터를 브라우저가 종료되는 순간 삭제함
            localStorage.setItem('GRANT_TYPE', token.grantType);
            localStorage.setItem('ACCESS_TOKEN', token.accessToken);
            localStorage.setItem('REFRESH_TOKEN', token.refreshToken);
            localStorage.setItem('NICKNAME', nickname);
            localStorage.setItem('PROFILE_IMG', profileImg);

            redirection('/');
        }

    }
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
                                <input className="input-box" id={'email'} type="email" placeholder={'email'}/>
                            </div>
                            <div className="pw-box">
                                <div className="pw-text">
                                    <p>비밀번호</p>
                                </div>
                                <input className="input-box" id={'password'} type="password" placeholder={'password'}
                                       onKeyDown={keyDownHandler} />
                            </div>
                        </div>
                        <div className="social-login">
                            <button onClick={()=>googleLogin()}>
                            <FcGoogle className="google"/>
                            </button>

                        </div>
                        <button onClick={signinHandler} className="login-btn">
                            <p>로그인</p>
                        </button>
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