import React, {useEffect, useRef, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle_meet_post.scss";
import Header from "../../header/js/header";
import {MEET_URL} from "../../../config/host-config";
import { Editor } from '@tinymce/tinymce-react';
import DaumPostcode from 'react-daum-postcode';
const {kakao} = window;

const Upcycle_meet_post = () => {
    const MEET_POST_URL = MEET_URL + '/createmeeting';
    const REST_API_KEY = '75f4e97c95a20a05b08c102f76677c36';
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [x,setX] = useState('1');
    const [imgUrl, setImgUrl] = useState();
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);
    const [titleValue,setTitleValue] = useState();
    const [contentValue,setContentValue] = useState();
    const [adressValue,SetAdressValue] = useState();
    var geocoder = new kakao.maps.services.Geocoder();

    const redirection = useNavigate(); // 리다이렉트 함수를 리턴
    const imgRef = useRef();
    const editorRef = useRef(null);





    useEffect(() => {
        if (storedToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            alert('로그인을 하고 이용해주세요!');
            redirection('/sign_in');
        }
        // console.log(selectedLabel);
    }, []);

    const [correct, setCorrect] = useState({
        title: false,
        content: false,
        adress: false
    });

    const [selectedLabel, setSelectedLabel] = useState("개인");

    const radioBtnClickHandler = (e) => {
        const value = e.target.value;
        const label = document.querySelector(`label.x${value}`);
        setSelectedLabel(label ? label.getAttribute("data-label") : "");
        setX(value);


        console.log(label);
    }
    useEffect(() => {
        console.log(selectedLabel);
    }, [selectedLabel])


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

    const imgUploadHandler = () => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        if (!file) return;

        // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImgUrl(imageDataUrl);

            // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);
    };

    const titleAddHandler = (e) => {
        const inputVal = e.target.value;
        // console.log(inputVal);

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, title: flag});
        setTitleValue(inputVal);
    }


    const contentAddHandler = (content) => {
        // const data = editorRef.current.getInstance().getHTML();
        const inputVal = content;
        // console.log(content);

        let flag;
        if (!content) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, content: flag});
        setContentValue(content);
    }

    const checkClickHandler = async (e) => {
        e.preventDefault();
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }

        // 이메일과 다른 입력값들이 올바른지 확인
        if (!correct.title || !correct.content || !correct.adress ) {
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // fetchSignUpPost를 호출하기 전에 userValue가 올바르게 업데이트되었는지 확인
        await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가

        // 회원가입 진행
        if (coordinates.longitude && coordinates.latitude) {
            await fetchMeetPost(coordinates.longitude, coordinates.latitude);
        } else {
            console.error("Coordinates are not available.");
        }
    };




    // geocoder.addressSearch(selectedAddress, function(result, status) {
    //
    //     // 정상적으로 검색이 완료됐으면
    //     if (status === kakao.maps.services.Status.OK) {
    //
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //
    //     }
    // }

    const fetchMeetPost = async (latitude, longitude) => {
        console.log("Sending to server:", { latitude, longitude });
        const formData = new FormData();

        const file = imgRef.current.files?.[0];
        if (file) {
            formData.append('thumnailImg', file);
        }

        // 텍스트 데이터 추가
        formData.append('title', titleValue);
        formData.append('content', contentValue);
        formData.append('option', selectedLabel);
        formData.append('adress', selectedAddress);
        formData.append('x', latitude);
        formData.append('y', longitude);



        // JSON 데이터는 문자열로 변환하여 추가
        const res = await fetch(MEET_POST_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${storedToken}`
            },
            body: formData,
        });

        if (res.ok) {
            const json = await res.json();
            console.log(json);
            redirection('/upcycle_meet');
            alert('성공적으로 게시물이 올라갔습니다.');
        } else {
            console.error('응답 상태 코드:', res.status);
            alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
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
            <div className="meet-post-container">
                <div className="content-box">
                    <div className="title-box">
                        <input className="title-input" type="text" placeholder="제목"
                        onChange={titleAddHandler}/>
                    </div>
                    <Editor
                        style="height=1000px"
                        className="editor"
                        apiKey='k31l7cbssdoqhzh6h9f1f4c01mdz9d0g3lw57c76ji4s1un8'
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        onEditorChange={contentAddHandler}
                        // initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div className="send-box">
                    <div className="img-box" onClick={() => imgRef.current.click()}>
                        {imgUrl && (
                            <img
                                className="img"
                                src={imgUrl}
                                alt="프로필 미리보기"
                            />
                        )}
                        {/*<img/>*/}

                    </div>
                    <input type="file" className="img-input" accept="image/*"
                           name="imagePath"
                           onChange={imgUploadHandler}
                           ref={imgRef}/>

                    <div className="radio-group">
                        <input
                            type="radio"
                            value="1"
                            checked={x === "1"}
                            onChange={radioBtnClickHandler}/>
                        <label className="x1" data-label="개인">개인</label>
                        <input
                            type="radio"
                            value="2"
                            checked={x === "2"}
                            onChange={radioBtnClickHandler}/>
                        <label className="x2" data-label="회사">회사</label>
                    </div>
                    <div className="adress-box">
                        <input type="text" className="mp-adress"
                               value={selectedAddress}
                               onChange={(e) => setSelectedAddress(e.target.value)}/>
                        <button className="adress-btn"
                                onClick={adressHandler}>주소찾기</button>
                    </div>

                    <div className="meetpost-btn-box">
                        <button className="check" onClick={checkClickHandler}>확인</button>
                        <button className="cancel">취소</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Upcycle_meet_post;