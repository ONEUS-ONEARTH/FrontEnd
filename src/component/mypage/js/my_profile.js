import React, {useEffect, useRef, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../scss/my_profile.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";
import {USER_URL} from "../../../config/host-config";
import DaumPostcode from 'react-daum-postcode';

const My_profile = () => {
    const PROFILE_URL = USER_URL + "/myprofile";
    const MODIFY_URL = USER_URL + "/modify";
    const PW_CHECK_URL = USER_URL + "/modify/checkpassword";
    const redirection = useNavigate();

    const [nickname, setNickname] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();
    const [img, setImg] = useState();
    const imgRef = useRef(null);
    const [adress, setAdress] = useState();
    const [isModify,setIsModify] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);
    const [pwCheck,setPwCheck] = useState();


   
    
    const [userProfile, setUserProfile] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        phoneNumber: '',
        adress: '',
        imagePath: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        nickname: true,
        phone:true,
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
            setSelectedAddress(json.adress);
            setAdress(json.adress);
            setPhoneNumber(json.phoneNumber);
            setImg(json.profileImg);
            setNickname(json.nickname);

            console.log(userProfile.imagePath);

        }
    }

    const imgChangeHandler = () => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        if (!file) return;

        // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImg(imageDataUrl); // 미리보기용으로만 사용

            // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);
    }

    const nicknameChangeHandler = (e) => {
        const inputVal = e.target.value;
        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, nickname: flag});
        setNickname(inputVal);
    }

    const pnChangeHandler = (e) => {
        const inputVal = e.target.value;
        // console.log(inputVal);
        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, phone: flag});
        setPhoneNumber(inputVal);
    }

    // const emailChangeHandler = (e) => {
    //     const inputVal = e.target.value;
    //     console.log(inputVal);
    //     let flag;
    //     if (!inputVal) {
    //         flag = false;
    //     } else {
    //         flag = true;
    //     }
    //     setCorrect({...correct, email: flag});
    //     setEmail(inputVal);
    // }

    // const pwChangeHandler = async (e) => {
    //     const inputVal = e.target.value
    //     let flag;
    //     if (!inputVal) {
    //         flag = false;
    //     } else {
    //         flag = true;
    //     }
    //
    //
    //     try{
    //         const res = await fetch(PW_CHECK_URL, {
    //             method: 'PUT',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({
    //                 email: userProfile.email,
    //                 rawPassword: inputVal
    //             }),
    //         });
    //         if (res.ok) {
    //             const json = await res.json();
    //             setPwCheck(json);
    //             // console.log(json);
    //         }
    //
    //
    //     } catch (error) {
    //         console.log("Error in getPosition:", error);
    //     }
    //     setCorrect({...correct, passwordCheck: flag});
    // }
    //
    // const cpwChangeHandler = (e) => {
    //     const inputVal = e.target.value;
    //     console.log(inputVal);
    //     let flag;
    //     if (!inputVal) {
    //         flag = false;
    //     } else {
    //         flag = true;
    //     }
    //     setCorrect({...correct, password: flag});
    //     setPassword(inputVal);
    // }


    const adressHandler = (e) => {
        e.preventDefault(); // Prevent any default behavior that might cause the form to submit
        setIsPostcodeVisible(true);
    };
    const selectAddress = (data) => {
        // Update the selected address and hide the Daum Postcode popup
        setSelectedAddress(data.address);
        setIsPostcodeVisible(false); // This should only hide the popup, not cause other re-renders
        setAdress(data.address);
    };

    const infoModifyHandler = () => {
        setIsModify(!isModify);
    }

    // 수정 확인 버튼 날리기
    const fetchModifyHandler = async (e) => {
        e.preventDefault();

        // 이메일과 다른 입력값들이 올바른지 확인
        if (!correct.nickname || !correct.phone) {
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // fetchSignUpPost를 호출하기 전에 userValue가 올바르게 업데이트되었는지 확인
        await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가

        fetchModifyProfile();

    }

    const fetchModifyProfile = async () => {
        const formData = new FormData();
        // 이미지 파일이 있는 경우에만 추가
        const file = imgRef.current.files?.[0];
        if (file) {
            // console.log(file); // 파일 객체 확인
            formData.append('image', file); // 파일 추가
        } else {
            console.log('No file selected');
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value); // 파일 객체와 다른 값 출력
        }
        // userValue의 각 필드를 FormData에 추가
        formData.append('nickname', nickname);
        formData.append('phone', phoneNumber);
        formData.append('adress', adress);
        try {
            const res = await fetch(`${USER_URL}/modify`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${storedToken}`, // Content-Type은 설정하지 않음
                },
                body: formData,
            });

            if (res.status === 200) {
                const json = await res.json();
                console.log('Profile updated:', json);

                localStorage.setItem('NICKNAME', json.nickname);
                localStorage.setItem('PROFILE_IMG', json.imagePath);

                setIsModify(!isModify);
                userProfileFetch();
            }
        } catch (error) {

            console.error("Error fetching upcycle posts:", error);
        }
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
                        {/*<My_info_header/>*/}
                    </div>
                    {!isModify ? (
                        <div className="myinfo-bg">
                            <div className="myinfo-box">
                                <div className="myname-box">
                                    <img className="myinfo-img" src={userProfile.imagePath} alt=""/>
                                    <p className="myinfo-name">{userProfile.nickname}</p>
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
                                    <img className="myinfo-img" src={img} alt=""
                                         onClick={() => imgRef.current.click()}/>
                                    <input type="file" className="img-input" accept="image/*"
                                           name="imagePath"
                                           onChange={imgChangeHandler}
                                           ref={imgRef}/>
                                    <input type="text" className="myinfo-name" value={nickname}
                                           onChange={nicknameChangeHandler}/>
                                </div>
                                <div className="myinfo-data">
                                    <div className="pn-box">
                                        <p>전화번호: </p>
                                        <input type="text"
                                               className="pn-input"
                                               value={phoneNumber}
                                               onChange={pnChangeHandler}/>
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
                                    <input type="text" className="ar-ad"
                                           value={selectedAddress}
                                           onChange={(e) => setSelectedAddress(e.target.value)}/>
                                    <button className="adress-btn"
                                            onClick={adressHandler}>주소찾기
                                    </button>
                                    {/*<p >*/}
                                    {/*    {userProfile.adress}*/}
                                    {/*</p>*/}
                                </div>
                            </div>
                            <div className="row-btn-box">
                                <div className="cancle-btn" onClick={infoModifyHandler}>
                                    <p>취소</p>
                                </div>
                                <div className="info-modify-btn" onClick={fetchModifyHandler}>
                                    <p>확인</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
export default My_profile;