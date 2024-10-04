import React from "react";
import Header from "../../header/js/header";
import "../scss/sign-up.scss"


const Sign_up = () => {

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
                            <input type="text"/>
                        </div>
                        <div className="nickname-box">
                            <p>별명</p>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="id-box info-box">
                        <p>&nbsp;&nbsp;&nbsp;아이디</p>
                        <input className="text-box" type="text"/>
                    </div>
                    <div className="pw-box info-box">
                        <p>비밀번호</p>
                        <input className="text-box" type="text"/>
                    </div>
                    <div className="pwck-box info-box">
                        <p>번호확인</p>
                        <input className="text-box" type="text"/>
                    </div>
                    <div className="pn-box">
                        <p>전화번호</p>
                        <div className="pn-text-box">
                            <select name="" id="">
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="012">012</option>
                            </select>
                            <p>-</p>
                            <input className="pn-input-box" type="text"/>
                            <p>-</p>
                            <input className="pn-input-box" type="text"/>
                        </div>
                    </div>
                    <div className="em-box info-box">
                        <p>&nbsp;&nbsp;&nbsp;이메일</p>
                        <input className="text-box" type="text"/>
                    </div>
                    <div className="ad-box info-box">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주소</p>
                        <input className="text-box" type="text"/>
                    </div>
                    <div className="submit-box">
                        <div className="signup-btn">
                            <p>정보수정</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Sign_up;