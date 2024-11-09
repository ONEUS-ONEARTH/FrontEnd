import '../scss/upcycle_detail.scss'
import {UPCYCLE_URL} from "../../../config/host-config";
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from "../../header/js/header";
import Moment from 'moment';
import { BiLike } from "react-icons/bi";

const Upcycle_detail = () => {
    const redirection = useNavigate();
    const { id } = useParams();
    const [isModify, setIsModify] = useState(false);
    const [getItem,setGetItem] = useState([]);
    var moment = require('moment');
    const publish_date = moment(getItem.createdDate).format('YYYY년 MM월 DD일');
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [likeScore,setLikeScore] = useState();
    const [content, setContent] = useState('');
    const [edit, setEdit] = useState();
    const [mImgUrl, setMImgUrl] = useState();
    const imgRef = useRef();
    const [mTitleValue, setMTitleValue] = useState();
    const [mContentValue, setMContentValue] = useState();
    const [mTagValue, setMTagValue] = useState();

    useEffect(() => {
        getDetail();
        getScore();
    },[]);

    useEffect(() => {
        // getItem 값이 변경될 때마다 호출
        setEdit(getItem.editable);
        setMTitleValue(getItem.title);
        setMContentValue(content);
        setMTagValue(getItem.tag);
        // setMImgUrl(getItem.);
    }, [getItem]);


    const getDetail = async () => {
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
                    console.log(json);
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

    const getScore = async () => {
        try {
            const res = await fetch(`${UPCYCLE_URL}/posts/score/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                    setLikeScore(json);
                    console.log(json);
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
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

    const modifyClickHandler = () => {
        setIsModify(!isModify);
    }

    const [correct, setCorrect] = useState({
        title: true,
        content: true,
        img: true,
        tag: true
    });

    // img
    const changeImgHandler = (e) => {
        const inputVal = e.target.value;
        // console.log(inputVal);

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, img: flag});
        setMImgUrl(inputVal);
    }

    // title
    const titleModifyHandler = (e) => {
        const inputVal = e.target.value;
        // console.log(inputVal);

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, title: flag});
        setMTitleValue(inputVal);
    }


    // content
    const contentModifyHandler = (e) => {
        const inputVal = e.target.value;

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, content: flag});
        setMContentValue(inputVal);
    }

    // tag
    const tagModifyHandler = (e) => {
        let value = e.target.value;

        // #으로 시작하는 단어의 개수를 세기
        const hashtagWords = value.trim().split(' ').filter(word => word.startsWith('#'));

        // 단어가 5개 이상이면 추가 입력을 막기
        if (hashtagWords.length >= 5 && value.endsWith(' ')) {
            setMTagValue(value.trim()); // 공백 제거
            return;
        }

        // 백스페이스로 #태그와 공백을 제거하는 경우
        if (value.endsWith(' #')) {
            value = value.slice(0, -2); // 마지막 #태그와 공백 제거
        }
        // 스페이스바가 눌린 후 바로 #을 추가 (단, 단어가 5개 미만일 때만)
        else if (value.endsWith(' ') && hashtagWords.length < 5) {
            value = value.trim() + ' #';
        }

        let flag;
        if (!value) {
            flag = false;
        } else {
            flag = true;
        }
        // console.log(value);
        setCorrect({...correct, tag: flag});
        setMTagValue(value);
    };

    const checkClickHandler = async (e) => {
        e.preventDefault();

        if (!correct.title || !correct.content || !correct.tag || !correct.img) {
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가
        modifySendHandler();

    }

    const modifySendHandler = async () => {


        try {
            const res = await fetch(`${UPCYCLE_URL}/modify`, {

                method: 'PUT',
                headers: {
                    // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: id,
                    title: mTitleValue,
                    content: mContentValue,
                    tag: mTagValue,
                    thumbnailUrl: mImgUrl
                })
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
                console.log(mTagValue);
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
                            <img className="upd-img" src="" alt="" />
                            <div className="upd-data">
                                <div className="upd-author">
                                    {getItem.author}
                                </div>
                                <div className="upd-date">
                                    {publish_date}
                                </div>
                                <div className="upd-score">
                                    <BiLike /> {likeScore}
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
                            <img className="upd-img" src="" alt="" onClick={() => imgRef.current.click()}/>

                            <input type="file" className="img-input" accept="image/*"
                                   name="imagePath"
                                   onChange={changeImgHandler}
                                   ref={imgRef}/>
                            <div className="upd-data">
                                <div className="upd-author">
                                    {getItem.author}
                                </div>
                                <div className="upd-date">
                                    {publish_date}
                                </div>
                                <div className="upd-score">
                                    <BiLike/> {likeScore}
                                </div>
                            </div>
                            <input className="upd-tag" value={mTagValue}
                                   onChange={tagModifyHandler}/>
                        </div>
                        <div className="upd-column2">
                            <input className="upd-title"
                                   value={mTitleValue}
                                   onChange={titleModifyHandler}/>

                            <textarea className="upd-content"
                        value={mContentValue}
                        onChange={contentModifyHandler}/>
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

export default Upcycle_detail;