import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../header/js/header";
import "../scss/upcycle_meet.scss"
import { Map } from "react-kakao-maps-sdk";
import { FaHeart } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";



const Upcycle_meet = (props) => {
    // const kakaoApiKey = process.env.REACT_APP_KAKAOMAP_KEY;
    //
    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
    //     script.async = true;
    //     document.head.appendChild(script);
    //
    //     return () => {
    //         document.head.removeChild(script);
    //     };
    // }, [kakaoApiKey]);

    return (
        <>
            <Header/>
            <div className="upcycle-meet-container">
                <div className="upcycle-meet-title">
                    <p>모임</p>
                </div>
                <div className="upcycle-meet-box">
                    <div className="meetlist-box">
                        <ul className="meetlist">
                            <li className="meet-obj">
                                <img className="obj-img"
                                     src="https://cdn.newshyu.com/news/photo/202206/1006289_213259_5152.jpg"
                                     alt=""/>

                                <div className="obj-content-box">
                                    <div className="content-title">
                                        자원봉사 하실분 모집합니다.
                                    </div>
                                    <div className="content-name">
                                        사업
                                    </div>
                                </div>
                                <div className="obj-like-box">
                                    <div className="like-icon-box">
                                        <FaHeart className="like-icon"/>
                                    </div>
                                    <div className="like-num">
                                        6
                                    </div>
                                </div>
                            </li>
                            <li className="meet-obj">
                                <img className="obj-img"
                                     src="https://cdn.newshyu.com/news/photo/202206/1006289_213259_5152.jpg"
                                     alt=""/>

                                <div className="obj-content-box">
                                    <div className="content-title">
                                        공원 근처에서 자원봉사하실분 구해요
                                    </div>
                                    <div className="content-name">
                                        개인
                                    </div>
                                </div>
                                <div className="obj-like-box">
                                    <div className="like-icon-box">
                                        <FaHeart className="like-icon"/>
                                    </div>
                                    <div className="like-num">
                                        5
                                    </div>
                                </div>
                            </li>
                            <li className="meet-obj">
                                <img className="obj-img"
                                     src="https://cdn.newshyu.com/news/photo/202206/1006289_213259_5152.jpg"
                                     alt=""/>

                                <div className="obj-content-box">
                                    <div className="content-title">
                                        산책할겸 꽁초 주우러다닐분~!
                                    </div>
                                    <div className="content-name">
                                        개인
                                    </div>
                                </div>
                                <div className="obj-like-box">
                                    <div className="like-icon-box">
                                        <FaHeart className="like-icon"/>
                                    </div>
                                    <div className="like-num">
                                        5
                                    </div>
                                </div>
                            </li>
                            <li className="meet-obj">
                                <img className="obj-img"
                                     src="https://cdn.newshyu.com/news/photo/202206/1006289_213259_5152.jpg"
                                     alt=""/>

                                <div className="obj-content-box">
                                    <div className="content-title">
                                        공원 쓰레기 치우는 자원봉사
                                    </div>
                                    <div className="content-name">
                                        사업
                                    </div>
                                </div>
                                <div className="obj-like-box">
                                    <div className="like-icon-box">
                                        <FaHeart className="like-icon"/>
                                    </div>
                                    <div className="like-num">
                                        5
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="meetlist-btn">

                        </div>
                    </div>
                    <Map
                        className="map-api"
                        center={{lat: 33.450701, lng: 126.570667}}
                        level={1}>
                        <CiCirclePlus className="mpost-icon" />
                    </Map>
                </div>
            </div>
        </>
    )
}
export default Upcycle_meet;