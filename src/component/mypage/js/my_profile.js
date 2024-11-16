import React, {useEffect, useState} from 'react';
import "../scss/my_profile.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";
import {USER_URL} from "../../../config/host-config";
import DaumPostcode from 'react-daum-postcode';

const My_profile = () => {
    const PROFILE_URL = USER_URL + "/myprofile";
    const MODIFY_URL = USER_URL + "/modify";

    const [name, setName] = useState();
    const [isModify,setIsModify] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);

    const [userValue,setUserValue] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        phoneNumber: '',
        adress: '',
        imagePath: ''
    });
   
    
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
        userProfileFetch();
    },[]);

    const userProfileFetch = async () => {
        const url = PROFILE_URL
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        });
        if (res.status === 200) {
            const json = await res.json();
            setUserProfile({
                ...userProfile,
                name: json.name,
                nickname: json.nickname,
                email: json.email,
                password: json.password,
                phoneNumber: json.phoneNumber,
                adress: json.adress,
                imagePath: json.profileImg,
            });
            setSelectedAddress(userProfile.adress);

            console.log(userProfile.imagePath);

        }
    }

    const pnChangeHandler = (e) => {
        const inputVal = e.target.value;
        console.log(inputVal);
    }

    const emailChangeHandler = (e) => {
        const inputVal = e.target.value;
        console.log(inputVal);
        setUserValue({...userValue,})
    }

    const pwChangeHandler = (e) => {

    }

    const cpwChangeHandler = (e) => {
        const inputVal = e.target.value;
        console.log(inputVal);
        // setUserValue({...userValue,})
    }


    const adressHandler = (e) => {
        e.preventDefault(); // Prevent any default behavior that might cause the form to submit
        setIsPostcodeVisible(true);
    };
    const selectAddress = (data) => {
        // Update the selected address and hide the Daum Postcode popup
        setSelectedAddress(data.address);
        setIsPostcodeVisible(false); // This should only hide the popup, not cause other re-renders
        setUserValue({...userValue, adress: data.address});
    };

    const infoModifyHandler = () => {
        setIsModify(!isModify);
    }

    const fetchModifyHandler = () => {

    }


    return (
        <>
            <Header/>
            {isPostcodeVisible && (
                <div className="modal-background" onClick={() => setIsPostcodeVisible(false)}>
                    <div className="modal-meet-content">
                        <DaumPostcode
                            className="daumpostcode"
                            visible={isPostcodeVisible}
                            autoClose={false}
                            onComplete={selectAddress}
                        />
                    </div>
                </div>
            )}
            <div className="myinfo-container">
                <div className="myinfo-text-box">
                    <p>내 정보</p>
                </div>
                <div className="profile-container">
                    <div className="header">
                        <My_info_header/>
                    </div>
                    {!isModify ? (
                        <div className="myinfo-bg">
                            <div className="myinfo-box">
                                <div className="myname-box">
                                    <img className="myinfo-img" src={userProfile.imagePath} alt=""/>
                                    <p className="myinfo-name">{userProfile.name}</p>
                                </div>
                                <div className="myinfo-data">
                                    <div className="pn-box">
                                        <p>전화번호: {userProfile.phoneNumber}</p>
                                    </div>
                                    <div className="email-box">
                                        <p>이메일: {userProfile.email}</p>
                                    </div>
                                    <div className="pw-box">
                                        <p>비밀번호: **********</p>
                                    </div>
                                </div>
                            </div>
                            <div className="myadd-box">
                                <p className="ad-title">거주지 주소</p>
                                <div className="detail-myadd">
                                    <p className="ar-ad">
                                        {userProfile.adress}
                                    </p>
                                    {/*<p className="j-ad">*/}
                                    {/*    ddddddddddd*/}
                                    {/*</p>*/}
                                </div>
                            </div>
                            <div className="info-modify-btn" onClick={infoModifyHandler}>
                                <p>정보수정</p>
                            </div>
                        </div>
                    ) : (
                        <div className="myinfo-bg">
                            <div className="myinfo-box">
                                <div className="myname-box">
                                    <img className="myinfo-img" src={userProfile.imagePath} alt=""/>
                                    <p className="myinfo-name">{userProfile.name}</p>
                                </div>
                                <div className="myinfo-data">
                                    <div className="pn-box">
                                        <p>전화번호: </p>
                                        <input type="text"
                                               className="pn-input"
                                               value={userProfile.phoneNumber}
                                               onChange={pnChangeHandler}/>
                                    </div>
                                    <div className="email-box">
                                        <p>이메일: </p>
                                        <input type="text"
                                               className="email-input"
                                               value={userProfile.email}
                                               onChange={emailChangeHandler}/>
                                    </div>
                                    <div className="pw-box">
                                        <p>현재 비밀번호: </p>
                                        <input type="password"
                                               className="pw-input"
                                               onChange={pwChangeHandler}/>
                                    </div>
                                    <div className="pw-box">
                                        <p>변경할 비밀번호: </p>
                                        <input type="password"
                                               className="pw-input"
                                               onChange={cpwChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                            <div className="myadd-box">
                                <p className="ad-title">거주지 주소</p>
                                <div className="detail-myadd">
                                    <input type="text" className="ar-ad"
                                           value={selectedAddress}
                                           onChange={(e) => setSelectedAddress(e.target.value)}/>
                                    <button className="adress-btn"
                                            onClick={adressHandler}>주소찾기
                                    </button>
                                    <p >
                                        {userProfile.adress}
                                    </p>
                                </div>
                            </div>
                            <div onClick={infoModifyHandler}>
                                <p>취소</p>
                            </div>
                            <div className="info-modify-btn" onClick={fetchModifyHandler}>
                                <p>확인</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
export default My_profile;