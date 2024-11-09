import '../scss/upcycle_detail.scss'
import {UPCYCLE_URL} from "../../../config/host-config";
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from "../../header/js/header";
import Moment from 'moment';

const Upcycle_detail = () => {
    const DETAIL_GET_UEL = UPCYCLE_URL;
    const redirection = useNavigate();
    const { id } = useParams();
    const [isModify, setIsModify] = useState(false);
    const [getItem,setGetItem] = useState([]);
    const [content, setContent] = useState();
    const [edit, setEdit] = useState();
    var moment = require('moment');
    const publish_date = moment(getItem.createdDate).format('YYYY년 MM월 DD일')
    const storedToken = localStorage.getItem('ACCESS_TOKEN');

    useEffect(() => {
        getDetailIsLogin();


    },[]);

    const getDetailIsLogin = async () => {
        try {
            const res = await fetch(`${UPCYCLE_URL}/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                    setGetItem(json);
                    // console.log(json);
                    if (json.content) {
                        setContent(json.content.replace(/<\/?p>/g, ''));
                    } else {
                        setContent('내용을 불러오지 못했습니다ㅠㅠ'); // content가 없을 때 빈 문자열로 설정
                    }

                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }

    }

    useEffect(() => {
        // getItem 값이 변경될 때마다 호출
        setEdit(getItem.editable);
    }, [getItem]);


    const modifyClickHandler = () => {
        setIsModify(!isModify);
    }

    const changeImgHandler = () => {
        // const file = imgRef.current.files?.[0]; // 파일을 가져옴
        // if (!file) return;
        //
        // // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        // const reader = new FileReader();
        // reader.onload = () => {
        //     const imageDataUrl = reader.result;
        //     setImgUrl(imageDataUrl); // 미리보기용으로만 사용
        //
        //     // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        // };
        // reader.readAsDataURL(file);
    }

    const deleteClickHandler = async () =>{
        try {
            const res = await fetch(`${UPCYCLE_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                  redirection('/upcycle');
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }

    return (
        <>
            <Header/>
            <div className="upd-container">
                {!isModify ? (
                    <>
                        <div className="upd-column1">
                            <img className="upd-img" src="" alt=""/>
                            <div className="upd-data">
                                <div className="upd-author">
                                    {getItem.author}
                                </div>
                                <div className="upd-date">
                                    {publish_date}
                                </div>
                            </div>
                            <div className="upd-tag">
                                {getItem.tag}
                            </div>
                        </div>
                        <div className="upd-column2">
                            <div className="upd-title">
                                {getItem.title}
                            </div>
                            <div className="upd-content">
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
                    <div className="upd-column1">
                        <img className="upd-img" src="" alt="" onClick={changeImgHandler}/>
                        <div className="upd-data">
                            <div className="upd-author">
                                {getItem.author}
                            </div>
                            <div className="upd-date">
                                {publish_date}
                            </div>
                        </div>
                        <input className="upd-tag" placeholder={getItem.tag}/>
                    </div>
                    <div className="upd-column2">
                        <input className="upd-title" placeholder={getItem.title}/>
                        <input className="upd-content" placeholder={getItem.content}/>
                        <div className="btn-box">
                            <button className="btn-modify" onClick={modifyClickHandler}>확인</button>
                        </div>
                    </div>
    </>
                    )}
            </div>
        </>
    )
}

export default Upcycle_detail;