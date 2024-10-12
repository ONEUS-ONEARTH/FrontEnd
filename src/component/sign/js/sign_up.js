import React from "react";
import Header from "../../header/js/header";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/sign-up.scss"


const Sign_up = () => {
    const redirection = useNavigate(); // 리다이렉트 함수를 리턴

    // 상태변수로 회원가입 입력값 관리
    const[userValue, setUserValue] = useState({
        name:'',
        nickname:'',
        email:'',
        password:'',
        adress:'',
        phoneNumber:''
    });

    // 입력값 검증 메시지를 관리할 상태변수
    const [message, setMessage] = useState({
        password: '',
        passwordCheck: '',
        email: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        password: false,
        passwordCheck: false,
        email: false
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
        setUserValue({...userValue, name:inputVal});
    }

    // 이메일 입력값을 검증하고 관리할 함수
    const emailHandler = e => {
        const inputVal = e.target.value;

        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

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
    const fetchDuplicatedCheck = async (id) => {

        // let msg = '', flag = false;
        //
        // const res = await fetch( API_BASE_URL + "/check?id=" + id);
        // const json = await res.json();
        //
        // if (json) {
        //     msg = '이메일이 중복되었습니다!';
        //     flag = false;
        // } else {
        //     msg = '사용 가능한 이메일입니다.';
        //     flag = true;
        // }
        // setUserValue({...userValue, id: id});
        // setMessage({...message, id: msg});
        // setCorrect({...correct, id: flag});
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
                            <input className="id-box low-input" type="text" name="email" onChange={emailHandler} placeholder="아이디 ex)abcdef@gmail.com"/>
                            <input className="pw-box low-input" type="password" placeholder="비밀번호"/>
                            <input className="pw-ck-box low-input" type="password" placeholder="비밀번호다시확인"/>
                            <input className="ph-box low-input" type="text" placeholder="전화번호"/>
                            <input className="ad-box low-input" type="text" placeholder="주소"/>
                        </div>
                    </div>
                    <div className="signup-btn">
                        <p>회원가입</p>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Sign_up;