import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../scss/upcycle_meet_detail.scss'
import Header from "../../header/js/header";
import cn from "classnames";
import Moment from 'moment';
import { BiLike } from "react-icons/bi";

const Upcycle_meet_detail = () => {
    const redirection = useNavigate();
    const { id } = useParams();
    const [isModify, setIsModify] = useState(false); // 수정버튼눌렀을때 input들로 변환
    const [getItem,setGetItem] = useState([]); // list getItem
    var moment = require('moment');
    const publish_date = moment(getItem.createdDate).format('YYYY년 MM월 DD일'); //날짜 변환
    const storedToken = localStorage.getItem('ACCESS_TOKEN'); //토큰
    const [likeScore,setLikeScore] = useState(); //좋아요 수
    const [content, setContent] = useState(''); //내용
    const [edit, setEdit] = useState(); // 글쓴이 인지 확인
    const [mImgUrl, setMImgUrl] = useState(); // 이미지 변수
    const imgRef = useRef();
    const [mTitleValue, setMTitleValue] = useState(); // 타이틀 수정 변수
    const [mContentValue, setMContentValue] = useState(); // 내용 수정 변수
    const [mOptionValue, setMOptionValue] = useState(); // 옵션 수정 변수


    return (
        <>
            <Header/>
            {/*<div className="umd-container">*/}
            {/*    {!isModify ? (*/}
            {/*        <>*/}
            {/*            <div className="umd-column1">*/}
            {/*                <img className="umd-img" src="" alt="" />*/}
            {/*                <div className="umd-data">*/}
            {/*                    <div className="umd-author">*/}
            {/*                        /!*{getItem.author}*!/*/}
            {/*                    </div>*/}
            {/*                    <div className="umd-date">*/}
            {/*                        /!*{publish_date}*!/*/}
            {/*                    </div>*/}
            {/*                    <div className="umd-score">*/}
            {/*                        <BiLike className={cn({"like-btn" : likeScore})} onClick={scoreClickHandler}/>*/}
            {/*                        /!*{getItem.likeScore}*!/*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="umd-column2">*/}
            {/*                <div className="umd-title">*/}
            {/*                    /!*{getItem.title}*!/*/}
            {/*                </div>*/}
            {/*                <div className="umd-content">*/}
            {/*                    /!*{content}*!/*/}
            {/*                </div>*/}
            {/*                <div className="btn-box">*/}
            {/*                    {!edit ? (*/}
            {/*                        <>*/}

            {/*                        </>*/}
            {/*                    ) : (*/}
            {/*                        <>*/}
            {/*                            <button className="btn-modify" onClick={modifyClickHandler}>수정</button>*/}
            {/*                            <button className="btn-delete" onClick={deleteClickHandler}>삭제</button>*/}
            {/*                        </>*/}

            {/*                    )}*/}

            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <div className="umd-column1">*/}
            {/*                <img className="umd-img" src="" alt="" onClick={() => imgRef.current.click()}/>*/}

            {/*                <input type="file" className="img-input" accept="image/*"*/}
            {/*                       name="imagePath"*/}
            {/*                       onChange={changeImgHandler}*/}
            {/*                       ref={imgRef}/>*/}
            {/*                <div className="umd-data">*/}
            {/*                    <div className="umd-author">*/}
            {/*                        /!*{getItem.author}*!/*/}
            {/*                    </div>*/}
            {/*                    <div className="umd-date">*/}
            {/*                        /!*{publish_date}*!/*/}
            {/*                    </div>*/}
            {/*                    <div className="umd-score">*/}
            {/*                        <BiLike/>*/}
            {/*                        /!*{getItem.likeScore}*!/*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="umd-column2">*/}
            {/*                <input className="umd-title"*/}
            {/*                       value={mTitleValue}*/}
            {/*                       onChange={titleModifyHandler}/>*/}

            {/*                <textarea className="umd-content"*/}
            {/*                          value={mContentValue}*/}
            {/*                          onChange={contentModifyHandler}/>*/}
            {/*                <div className="btn-box">*/}
            {/*                    <button className="btn-modify" onClick={checkClickHandler}>확인</button>*/}
            {/*                    <button className="btn-cancle" onClick={modifyClickHandler}>취소</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    )
}
export default Upcycle_meet_detail;