import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../scss/upcycle_meet_detail.scss'
import Header from "../../header/js/header";
import cn from "classnames";
import moment from 'moment';
import { MEET_URL } from "../../../config/host-config";
import { BiLike } from "react-icons/bi";
import DaumPostcode from 'react-daum-postcode';

const Upcycle_meet_detail = () => {
    const redirection = useNavigate();
    const { id } = useParams();
    const REST_API_KEY = '75f4e97c95a20a05b08c102f76677c36';
    const [isModify, setIsModify] = useState(false); // 수정버튼눌렀을때 input들로 변환
    const [getItem,setGetItem] = useState([]); // list getItem
    const publish_date = moment(getItem.createdDate).format('YYYY년 MM월 DD일'); //날짜 변환
    const storedToken = localStorage.getItem('ACCESS_TOKEN'); //토큰
    const [likeValue, setLikeValue] = useState(); //좋아요 true, false값 반환
    const [x,setX] = useState('1');
    const [content, setContent] = useState(''); //내용
    const [edit, setEdit] = useState(); // 글쓴이 인지 확인
    const [mImgUrl, setMImgUrl] = useState(); // 이미지 변수
    const imgRef = useRef();
    const [mTitleValue, setMTitleValue] = useState(); // 타이틀 수정 변수
    const [mContentValue, setMContentValue] = useState(); // 내용 수정 변수
    const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    // const [mOptionValue, setMOptionValue] = useState(); // 옵션 수정 변수

    const [correct, setCorrect] = useState({
        title: true,
        content: true,
        adress:true,
        img: true,
    });


    useEffect(() => {
        getDetail();
    },[])

    const getDetail = async () => {
        try {
            const res = await fetch(MEET_URL + `/posts/${id}`,{
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const json = await res.json();
                setGetItem(json);
                setEdit(json.editable);
                setContent(json.content.replace(/<\/?p>/g, ''));
                setMTitleValue(json.title);
                setMContentValue(json.content.replace(/<\/?p>/g, ''));
                setMImgUrl(json.thumbnailUrl);
                setLikeValue(json.cilcked);
                console.log(json);
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }
    
    const modifyClickHandler = () => {
        setIsModify(!isModify);
    }

    const deleteClickHandler = async () => {

        try {
            const res = await fetch(`${MEET_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                    redirection('/upcycle_meet');
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }

    const changeImgHandler = (e) => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        
        let flag;
        if (!file) {
            flag = false;
            return;
        } else {
            flag = true;
        }

        // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setMImgUrl(imageDataUrl); // 미리보기용으로만 사용

            // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);
        setCorrect({...correct, img: flag});

    }

    const titleModifyHandler = (e) => {
        const inputVal = e.target.value;

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setMTitleValue(inputVal);
        setCorrect({...correct, content: flag})
    }
    
    const contentModifyHandler = (e) => {
        const inputVal = e.target.value;

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setMContentValue(inputVal);
        setCorrect({...correct, content: flag})
        const adressHandler = (e) => {
            e.preventDefault(); // Prevent any default behavior that might cause the form to submit
            setIsPostcodeVisible(true);
        }
    }


    const adressHandler = (e) => {
        e.preventDefault(); // Prevent any default behavior that might cause the form to submit
        setIsPostcodeVisible(true);
    };


    const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });

    const selectAddress = async (data) => {
        // Update the selected address and hide the Daum Postcode popup
        let flag = data ? true : false;
        setCorrect({ ...correct, adress: flag });
        setSelectedAddress(data.address);

        setIsPostcodeVisible(false);
        const position = await getPosition(data.address);
        if (position) {
            setCoordinates(position); // 좌표를 상태에 저장
        } else {
            console.error("Position is undefined. Could not get coordinates.");
        }
    };



    const getPosition = async (address) => {
        const url = `https://dapi.kakao.com/v2/local/search/address?query=${address}`;
        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `KakaoAK ${REST_API_KEY}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                if (data.documents.length > 0) { // 데이터가 있을 때만 처리
                    const { x, y } = data.documents[0];
                    // 숫자형으로 변환하여 반환
                    const latitude = Number(x);
                    const longitude = Number(y);
                    return { longitude, latitude };
                } else {
                    console.error("No coordinates found for this address.");
                    return null; // 좌표를 찾지 못한 경우 null 반환
                }
            }
            throw new Error("Something went wrong with the API request.");
        } catch (error) {
            console.log("Error in getPosition:", error);
            return null;
        }
    };

    const scoreClickHandler = async () => {
        try {
            const res = await fetch(`${MEET_URL}/posts/score/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                    // console.log(json);
                    getDetail();
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }

    const checkClickHandler = async (e) => {

        e.preventDefault();

        // 이메일과 다른 입력값들이 올바른지 확인
        if (!correct.title || !correct.content || !correct.img) {
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // fetchSignUpPost를 호출하기 전에 userValue가 올바르게 업데이트되었는지 확인
        await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가

        // 수정 진행
        if (coordinates.longitude && coordinates.latitude) {
            await fetchMeetModify(coordinates.longitude, coordinates.latitude);
        } else {
            console.error("Coordinates are not available.");
        }
    }

    const fetchMeetModify = async (latitude, longitude) => {
        const formData = new FormData();
        console.log("Sending to server:", { latitude, longitude });
        // console.log(userValue);

        // 이미지 파일이 있는 경우에만 추가
        const file = imgRef.current.files?.[0];

        if(file) {
            formData.append('thumbnailUrl', file); // 파일 객체를 직접 추가
        }
        // userValue의 각 필드를 FormData에 추가
        formData.append('meetingPostId', id);
        formData.append('title', mTitleValue);
        formData.append('content', mContentValue);
        formData.append('adress', selectedAddress);
        formData.append('x', latitude);
        formData.append('y', longitude);
        
        try {
            const res = await fetch(`${MEET_URL}/modify`,{
                method: 'PUT',
                headers:{

                },
                body: formData
            });
            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                    setIsModify(!isModify);
                    getDetail();
                }
            } else {
                console.log(id);
                console.log(mImgUrl);
                console.log(mTitleValue);
                console.log(mContentValue);
                console.log(selectedAddress);
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }

    }

    return (
        <>
            <Header/>
            <div className="umd-container">
                {!isModify ? (
                    <>
                        <div className="umd-column1">
                            <img className="umd-img" src={getItem.thumbnailUrl} alt="" />
                            <div className="umd-data">
                                <div className="umd-author">
                                    {getItem.author}
                                </div>
                                <div className="umd-option">
                                    {getItem.option}
                                </div>
                                <div className="umd-date">
                                    {publish_date}
                                </div>
                                <div className="umd-score">
                                    <BiLike
                                        className={cn({"like-btn" : likeValue})}
                                        onClick={scoreClickHandler}
                                    />
                                    {getItem.likeScore}
                                </div>
                            </div>
                        </div>
                        <div className="umd-column2">
                            <div className="umd-title">
                                {getItem.title}
                            </div>
                            <div className="umd-content">
                                {content}
                            </div>
                            <div className="btn-box">
                                {!edit ? (
                                    <>

                                    </>
                                ) : (
                                    <>
                                        <button className="btn-modify" onClick={modifyClickHandler}>수정</button>
                                        <button className="btn-delete" onClick={deleteClickHandler}>삭제</button>
                                    </>

                                )}

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="umd-column1">
                            {isPostcodeVisible && (
                                <div className="modal-background" onClick={() => setIsPostcodeVisible(false)}>
                                    <div className="modal-content">
                                        <DaumPostcode
                                            className="daumpostcode"
                                            visible={isPostcodeVisible}
                                            autoClose={false}
                                            onComplete={selectAddress}
                                        />
                                    </div>
                                </div>
                            )}
                            <img className="umd-img" src={mImgUrl} alt=""
                                 onClick={() => imgRef.current.click()}/>
                            <input type="file" className="img-input" accept="image/*"
                                   name="imagePath"
                                   onChange={changeImgHandler}
                                   ref={imgRef}/>
                            <div className="umd-data">
                                <div className="umd-author">
                                    {getItem.author}
                                </div>
                                <div className="umd-option">
                                    {getItem.option}
                                </div>
                                <div className="umd-date">
                                    {publish_date}
                                </div>
                                <div className="umd-score">
                                    <BiLike/>
                                    {getItem.likeScore}
                                </div>
                            </div>
                        </div>
                        <div className="umd-column2">
                            <input className="umd-title"
                                   value={mTitleValue}
                                   onChange={titleModifyHandler}/>

                            <textarea className="umd-content"
                                      value={mContentValue}
                                      onChange={contentModifyHandler}/>
                            <input className="add-input" type="text"
                                   value={selectedAddress}
                                   onChange={(e) => setSelectedAddress(e.target.value)}
                                   placeholder="주소"/>
                            <div className="add-box">
                                <button className="add-btn"
                                        onClick={adressHandler}>주소찾기
                                </button>
                            </div>
                            <div className="btn-box">
                                <button className="btn-modify" onClick={checkClickHandler}>확인</button>
                                <button className="btn-cancle" onClick={modifyClickHandler}>취소</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default Upcycle_meet_detail;