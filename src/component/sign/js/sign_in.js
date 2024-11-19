import React from "react";
import Header from "../../header/js/header";
import {Link, useNavigate} from 'react-router-dom';
import "../scss/sign_in.scss"
import {USER_URL,KAKAO_URL,REST_API_KEY,REDIRECT_URI} from "../../../config/host-config";
import { FcGoogle } from "react-icons/fc";
import {GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import { useSearchParams } from 'react-router-dom';
import  { useEffect } from 'react';
import { SiKakaotalk } from "react-icons/si";


const Sign_in = () => {
    const API_BASE_URL = USER_URL;
    const SIGN_IN_URL = USER_URL + "/login";
    const redirection = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const authorizationCode = searchParams.get('code'); // 쿼리에서 `code` 추출
        if (authorizationCode) {
            console.log('Authorization Code:', authorizationCode);
            kakaoLoginToken(authorizationCode);
            // 이후 백엔드에 `authorizationCode`를 보내 토큰 요청
        }
    }, [searchParams]);

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
        if (res.status === 400) { // 가입이 안되었거나 비번이 틀린 경우
            // 서버에서 온 텍스트를 추출
            // const text = await res.text();
            // alert(text);
            alert("아이디나 비밀번호가 잘못되었습니다.");
            return;
        } else if (res.status === 500) {
            alert("서버에 문제가 발생하였습니다.");
            return;
        }
        if (res.status === 200) {
            const {token, nickname, profileImg} = await res.json();
            localStorage.setItem('GRANT_TYPE', token.grantType);
            localStorage.setItem('ACCESS_TOKEN', token.accessToken);
            localStorage.setItem('REFRESH_TOKEN', token.refreshToken);
            localStorage.setItem('NICKNAME', nickname);
            localStorage.setItem('PROFILE_IMG', profileImg);

            redirection('/');
        }
    }

    const googleLogin =  useGoogleLogin({
        onSuccess: codeResponse =>AuthGoogle(codeResponse),
        flow: 'implicit',
    });

    const kakaoLogin= async ()=>{

        window.Kakao.Auth.authorize({
            redirectUri: `${REDIRECT_URI}` // 리다이렉트 URI 입력
        });


    }

    const kakaoLoginToken= async (code)=>{
        const res = await fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
            body:  new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: `${REST_API_KEY}`, // REST API 키
                redirect_uri: 'http://localhost:3000/sign_in', // Redirect URI
                code: code, // 카카오 인증 코드
            }),
        });
        if (res.ok) {
            const data = await res.json();
            const res2=await  fetch('http://localhost:8080/api/user/login/oauth2/code/kakao',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    accessToken: data.access_token,
                    expiresIn:data.expires_in,
                    tokenType:data.token_type,
                    scope:data.scope,
                    refreshToken:data.refresh_token
                })
            });

            if (res2.status === 200) {
                const {token, nickname, profileImg} = await res2.json();
                localStorage.setItem('GRANT_TYPE', token.grantType);
                localStorage.setItem('ACCESS_TOKEN', token.accessToken);
                localStorage.setItem('REFRESH_TOKEN', token.refreshToken);
                localStorage.setItem('NICKNAME', nickname);
                localStorage.setItem('PROFILE_IMG', profileImg);

                redirection('/');
            }



            redirection('/');
        }


    }

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
            alert('서버 연결에 오류가 생겼습니다!');
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
                                       onKeyDown={keyDownHandler}/>
                            </div>
                        </div>
                        <div className="social-login">
                            <button className="google-btn" onClick={() => googleLogin()}>
                                <FcGoogle className="google"/>
                            </button>
                            <button className="kakao-btn" onClick={() => kakaoLogin()}>
                                <SiKakaotalk className="kakao"/>
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
            <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </>
    )
}
export default Sign_in;