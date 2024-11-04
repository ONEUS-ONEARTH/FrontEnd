import React, {useEffect, useState} from 'react';
import Header from "../../header/js/header";
import { useRoutes } from 'react-router-dom';
import '../scss/main.scss';
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import { Map } from "react-kakao-maps-sdk";
import { FaHeart } from "react-icons/fa";


const Main = () => {

    // useEffect(() => {
    //
    //     const res=await fetch('https://dapi.kakao.com/v2/local/search/address.${FORMAT}',
    //         {
    //             method: 'GET',
    //             Authorization: KakaoAK ${REST_API_KEY}
    //         }
    //     );
    //     if (res.status === 400) { // 가입이 안되었거나 비
    // },[])

    return (
        <>
            <Header/>
            <div className="main-container">
                    <img className="adv-box" src={process.env.PUBLIC_URL + '/assets/ad-img.jpg'} alt=""/>
                <div className="implication-box">
                    <div className="impl-title-name">
                        <p>자원봉사</p>
                    </div>
                    <div className="implied-object">
                        <div className="left-arrow">
                            <MdArrowBackIos />
                        </div>
                        <div className="implied-map">
                            <Map
                                className="map-api"
                                center={{ lat: 33.450701, lng: 126.570667 }}
                                level={5}
                            />
                        </div>
                        <div className="implied-board">
                            <ul className="list">
                                <li className="list-obj">
                                    <div className="content-box">
                                        <div className="content-title">
                                            <p>자원봉사 하실분 구해요~</p>
                                        </div>
                                        <div className="content-icon">
                                            <FaHeart className="like-icon"/>
                                            <p>5</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-obj">
                                    <div className="content-box">
                                        <div className="content-title">
                                            <p>환경팝업스토어 도와주실분 구합니다</p>
                                        </div>
                                        <div className="content-icon">
                                            <FaHeart className="like-icon"/>
                                            <p>5</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-obj">
                                    <div className="content-box">
                                        <div className="content-title">
                                            <p>산책하면서 쓰레기 주우실분 모집</p>
                                        </div>
                                        <div className="content-icon">
                                            <FaHeart className="like-icon"/>
                                            <p>5</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="right-arrow">
                            <MdArrowForwardIos/>
                        </div>
                    </div>
                    <div className="add-btn">
                        <p>더보기</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Main;


