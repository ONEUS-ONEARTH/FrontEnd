// import React from "react";
import Header from "../../header/js/header";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/sign-up.scss"
import { USER_URL } from "../../../config/host-config";


const Sign_up = () => {
    const API_BASE_URL = USER_URL;
    const SIGN_UP_URL = USER_URL + "/signup";
    const EMAIL_URL = USER_URL + "/emailcheck";
    const PN_URL = USER_URL + "/phonecheck";

    const redirection = useNavigate(); // 리다이렉트 함수를 리턴


    // 상태변수로 회원가입 입력값 관리
    const[userValue, setUserValue] = useState({
        name:'',
        nickname:'',
        email:'',
        password:'',
        phoneNumber:'',
        address:''
    });

    // 입력값 검증 메시지를 관리할 상태변수
    const [message, setMessage] = useState({
        password: '',
        passwordCheck: '',
        email: '',
        phoneNumber: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        password: false,
        passwordCheck: false,
        email: false,
        phoneNumber: false
    });


    const saveInputState = (flag, msg, inputVal, key) => {

        setCorrect({
            ...correct,
            [key]: flag
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setUserValue({
            ...userValue,
            [key]: inputVal
        });

    };



    const nameHandler = (e) => {
        const inputVal = e.target.value;
        setUserValue({...userValue, name:inputVal});
    }
    const nicknameHandler = (e) => {
        const inputVal = e.target.value;
        setUserValue({...userValue, nickname:inputVal});
    }

    // 이메일 입력값을 검증하고 관리할 함수
    const emailHandler = (e) => {
        const inputVal = e.target.value;

        const emailRegex = /^[a-zA-Z0-9\.\-_]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/;
        console.log(inputVal);


        let msg, flag;
        if (!inputVal) {
            msg = '이메일은 필수값입니다!';
            flag = false;
        } else if (!emailRegex.test(inputVal)) {
            msg = '이메일 형식이 아닙니다!';
            flag = false;
        } else {
            // 이메일 중복체크
            fetchDuplicatedCheck(inputVal);
            return;
        }

        saveInputState(flag, msg, inputVal, 'email');
    };

    // 이메일 중복체크
    const fetchDuplicatedCheck = async (email) => {

        let msg = '', flag = false;

        const res = await fetch(EMAIL_URL, {
            method: 'POST',
            body: JSON.stringify(userValue)
        })
        const json = await res.json();
        console.log(json);
        if (json) {
            msg = '이메일이 중복되었습니다!';
            flag = false;
        } else {
            msg = '사용 가능한 이메일입니다.';
            flag = true;
        }
        setUserValue({...userValue, email: email});
        setMessage({...message, email: msg});
        setCorrect({...correct, email: flag});


    };

    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHandler = e => {

        // 패스워드를 입력하면 확인란을 비우기
        document.getElementById('password-check').value = '';
        document.getElementById('check-text').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});


        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        // 검증 시작
        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = '비밀번호는 필수값입니다!';
            flag = false;
        } else if (!pwRegex.test(inputVal)) {
            msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
            flag = false;
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        saveInputState(flag, msg, inputVal, 'password');
    };

    // 패스워드 확인란을 검증할 함수
    const pwCheckHandler = e => {

        const inputVal = e.target.value;

        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = '비밀번호 확인란은 필수값입니다!';
            flag = false;
        } else if (userValue.password !== inputVal) {
            msg = '패스워드가 일치하지 않습니다.';
            flag = false;
        } else {
            msg = '패스워드가 일치합니다.';
            flag = true;
        }


        setMessage({...message, passwordCheck: msg});
        setCorrect({...correct, passwordCheck: flag});
    };


    // 폰 넘버 입력값을 검증하고 관리할 함수
    const phoneNumHandler = (e) => {
        let inputVal = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자는 제거합니다.

        // 길이에 따라 하이픈 자동 추가 (3-4-4 형식)
        inputVal = inputVal.replace(
            /^(01[016789]|0[3-9]{1}[0-9]?)(\d{3,4})(\d{4})$/,
            "$1-$2-$3"
        );

        e.target.value = inputVal; // 수정된 값을 input에 다시 할당합니다.

        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/; // 한국 전화번호 형식 정규식
        let msg, flag;

        if (!inputVal) {
            msg = '전화번호는 필수 값입니다.';
            flag = false;
        } else if (!phoneRegex.test(inputVal)) {
            msg = '형식에 맞지 않는 번호입니다.';
            flag = false;
        } else {
            // 폰넘버 중복체크 함수 호출
            fetchPhCheck(inputVal);
            return;
        }
        saveInputState(flag, msg, inputVal, 'phoneNumber');
        // 에러 메시지와 플래그를 처리하는 로직 추가
    };


    const fetchPhCheck = async (phoneNumber) => {


        let msg = '', flag = false;

        const res = await fetch(PN_URL, {
            method: 'POST',
            body: JSON.stringify(phoneNumber)
        })
        const json = await res.json();
        console.log(json);

        if (json) {
            msg = '전화번호가 중복되었습니다!';
            flag = false;
        } else {
            msg = '사용가능한 번호입니다.';
            flag = true;
        }
        setUserValue({...userValue, phoneNumber: phoneNumber});
        setMessage({...message, phoneNumber: msg});
        setCorrect({...correct, phoneNumber: flag});
    };

    // 주소 입력값을 검증하고 관리할 함수
    const addressHandler = e => {
        const inputVal = e.target.value;
        setUserValue({...userValue, address:inputVal});
    }



    // 회원가입 비동기요청을 서버로 보내는 함수
    const fetchSignUpPost = async () => {
        console.log(userValue);

        const res = await fetch(SIGN_UP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userValue)
        });

        if (res.status === 200) {
            const json = await res.json();
            console.log(json);

            // 로그인 페이지로 리다이렉션
            redirection('/sign_in');

        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    }

    // 계정 생성 버튼을 누르면 동작할 내용
    const joinClickHandler = e => {
        e.preventDefault();

        // 모든 검증이 통과했는지 확인
        if (!correct.password || !correct.passwordCheck || !correct.email || !correct.phoneNumber) {
            // 만약 어떤 검증이라도 실패하면 경고창 표시
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // 모든 검증이 통과했으면 회원가입 진행
        fetchSignUpPost();

    };

    return (
        <>
            <Header/>
            <div className="signup-container">
                <div className="signup-title">
                    <p>회원가입</p>
                </div>
                <form className="signup-box" action="">
                    <div className="profile-box">

                    </div>
                    <div className="sign-info-box">
                        <div className="nn-box">
                            <input className="name-box nn-input" type="text" name="name" onChange={nameHandler} placeholder="이름"/>
                            <input className="nickname-box nn-input" type="text" name="nickname" onChange={nicknameHandler} placeholder="별명"/>
                        </div>
                        <div className="beside-inputs">
                            <div className="id-box inputbox-css">
                                <input className="low-input" type="text" name="email"
                                       onChange={emailHandler}
                                       placeholder="아이디 ex)abcdef@gmail.com"/>
                                <span className={'message'} style={
                                    correct.email
                                        ? {color: '#61DBF0'}
                                        : {color: '#F15F5F'}}>{message.email}</span>
                            </div>
                            <div className="pw-box inputbox-css">
                                <input className="low-input" type="password"
                                       name="password"
                                       id="password"
                                       autoComplete="current-password"
                                       onChange={passwordHandler}
                                       placeholder="비밀번호"/>
                                <span className={'message'} style={
                                    correct.password
                                        ? {color: '#61DBF0'}
                                        : {color: '#F15F5F'}}>{message.password}</span>
                            </div>
                            <div className="pw-ck-box inputbox-css">
                                <input className="low-input" type="password"
                                       id="password-check"
                                       autoComplete="check-password"
                                       onChange={pwCheckHandler}
                                       placeholder="비밀번호다시확인"/>
                                <span id="check-text" className={'message'} style={
                                    correct.passwordCheck
                                        ? {color: '#61DBF0'}
                                        : {color: '#F15F5F'}}>{message.passwordCheck}</span>
                            </div>
                            <div className="ph-box inputbox-css">
                                <input className="low-input" type="text"
                                       onChange={phoneNumHandler}
                                       placeholder="전화번호"/>
                                <span className={'message'} style={
                                    correct.phoneNumber
                                        ? {color: '#61DBF0'}
                                        : {color: '#F15F5F'}}>{message.phoneNumber}</span>
                            </div>
                            <div className="ad-box inputbox-css">
                                <input className="low-input" type="text"
                                       onChange={addressHandler}
                                       placeholder="주소"/>
                            </div>
                        </div>
                    </div>
                    <div className="join-btn" onClick={joinClickHandler}>
                        <button type="submit" className="signup-btn">
                            <p>회원가입</p>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Sign_up;