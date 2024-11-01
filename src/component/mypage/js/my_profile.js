import React, {useEffect, useState} from 'react';
import "../scss/my_profile.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";
import {USER_URL} from "../../../config/host-config";

const My_profile = () => {
    const PROFILE_URL = USER_URL + "/myprofile";
    const MODIFY_URL = USER_URL + "/modify";
    const [userProfile, setUserProfile] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        phoneNumber: '',
        adress: '',
        imagePath: ''
    });

    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    useEffect(() => {
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)

        userProfileFetch();
    },[]);

    const userProfileFetch = async () =>{
        const url = PROFILE_URL
        const res = await fetch({
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        });
        if (res.status === 200) {
           
        }

    }

    return (
        <>
            <Header/>
            <div className="myinfo-container">
                <div className="myinfo-text-box">
                    <p>내 정보</p>
                </div>
                <div className="profile-container">
                    <div className="header">
                        <My_info_header/>
                    </div>
                    <div className="myinfo-bg">
                        <div className="myinfo-box">
                            <div className="myname-box">
                                <div className="myinfo-img">

                                </div>
                                <p className="myinfo-name">장선경</p>
                            </div>
                            <div className="myinfo-data">
                                <div className="pn-box">
                                    <p>전화번호: </p>
                                </div>
                                <div className="email-box">
                                    <p>이메일: </p>
                                </div>
                                <div className="pw-box">
                                    <p>비밀번호: </p>
                                </div>
                            </div>
                        </div>
                        <div className="myadd-box">
                            <p className="ad-title">거주지 주소</p>
                            <div className="detail-myadd">
                                <p className="ar-ad">
                                    ddddd
                                </p>
                                <p className="j-ad">
                                    ddddddddddd
                                </p>
                            </div>
                        </div>
                        <div className="info-modify-btn">
                            <p>정보수정</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default My_profile;