import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../header/js/header";
import "../scss/upcycle_meet.scss"
import {MEET_URL} from "../../../config/host-config";
import { Map } from "react-kakao-maps-sdk";
import { BiSolidPlusCircle } from "react-icons/bi";
import Upcycle_meet_content from "./upcycle_meet_content";



const Upcycle_meet = (props) => {
    const MEET_GET_URL = MEET_URL + '/posts';
    const MAP_GET_URL = MEET_URL + '/map'

    const [meetList, setMeetList] = useState([]);
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
    useEffect(() => {
        fetchGetMeet();
        fetchGetMap();
    },[])


    const fetchGetMap = async () => {

        try {
            const res = await fetch(MAP_GET_URL, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                console.log(json);
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }

    const fetchGetMeet = async () => {

        try {
            const res = await fetch(MEET_GET_URL, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json && json.boards) {
                    setMeetList(json.boards);
                    // console.log(json.boards); // boards를 여기에서 출력
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }

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
                            {meetList.map((boards) => (
                                <Upcycle_meet_content
                                    key={boards.id}
                                    id={boards.id}
                                    title={boards.title}
                                    content={boards.content}
                                    option={boards.option}
                                    // thumbnailUrl={boards.thumbnailUrl}
                                />
                            ))}
                        </ul>
                        <div className="meetlist-btn">

                        </div>
                    </div>
                    <div className="map-container">
                    <Map
                        className="map-api"
                        center={{lat: 33.450701, lng: 126.570667}}
                        level={3}>
                    </Map>
                        <Link to={'/upcycle_meet_post'}>
                        <BiSolidPlusCircle className="mpost-icon">

                        </BiSolidPlusCircle>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Upcycle_meet;