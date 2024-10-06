import React from "react";
import Header from "../../header/js/header";
import { useState } from 'react-router-dom';
import "../scss/sign-up.scss"


const Sign_up = () => {

    const [userValue, setUserValue] = useState({
        name:'',
        nickname:'',
        password:''
    });

    // 입력값 검증 메시지를 관리할 상태변수
    const [message, setMessage] = useState({
        password: '',
        passwordCheck: '',
        id: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        userName: false,
        password: false,
        passwordCheck: false,
        id: false
    });


    nameHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value, // <- 변경 후
        });
        setUserValue({...userValue, userName: inputVal});
    };
    return (
        <>
            <Header/>
            <div className="signup-container">
                <div className="signup-title">
                    <p>회원가입</p>
                </div>
                <form className="signup-box" action="">
                    <div className="nn-box">
                        <div className="name-box">
                            <p>이름</p>
                            <input className="nm-input input-h" type="text" name="name" onChange={nameHandler}/>
                        </div>
                        <div className="nickname-box">
                            <p>별명</p>
                            <input className="nm-input input-h" type="text" name="nickname" onChange={nameHandler}/>
                        </div>
                    </div>
                    <div className="id-box info-box">
                        <p>&nbsp;&nbsp;&nbsp;아이디</p>
                        <input className="text-box input-h" type="text" name='email' placeholder="이메일을 적어주세요"/>
                    </div>
                    <div className="pw-box info-box">
                        <p>비밀번호</p>
                        <input className="text-box input-h" type="password" name=''/>
                    </div>
                    <div className="pwck-box info-box">
                        <p>번호확인</p>
                        <input className="text-box input-h" type="password"/>
                    </div>
                    <div className="pn-box">
                        <p>전화번호</p>
                        <div className="pn-text-box">
                            <select name="" id="pn-select">
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="012">012</option>
                            </select>
                            <p>-</p>
                            <input className="pn-input-box input-h" type="text"/>
                            <p>-</p>
                            <input className="pn-input-box input-h" type="text"/>
                        </div>
                    </div>
                    <div className="ad-box info-box">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주소</p>
                        <input className="text-box input-h" type="text" name="adress"/>
                    </div>
                    <div className="submit-box">
                        <div className="signup-btn">
                            <p>회원가입</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Sign_up;