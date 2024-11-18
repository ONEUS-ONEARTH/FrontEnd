import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header/js/header";
import "../scss/upcycle_meet.scss";
import { MEET_URL } from "../../../config/host-config";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { BiSolidPlusCircle } from "react-icons/bi";
import Upcycle_meet_content from "./upcycle_meet_content";

const Upcycle_meet = () => {
    const MEET_GET_URL = MEET_URL + "/posts";
    const MAP_GET_URL = MEET_URL + "/map";

    const [mapMarker, setMapMarker] = useState([]);
    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본값 서울
    const [error, setError] = useState(null);
    const [meetList, setMeetList] = useState([]);

    useEffect(() => {
        // 현재 위치 가져오기
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setError(null);
                },
                (err) => {
                    console.error("위치 가져오기 실패:", err.message);
                    setError("위치를 가져올 수 없습니다. 기본 위치로 설정합니다.");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            setError("Geolocation이 지원되지 않는 브라우저입니다.");
        }

        fetchGetMeet();
        fetchGetMap();
    }, []);

    const fetchGetMap = async () => {
        try {
            const res = await fetch(MAP_GET_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                console.log("마커들:", json.maps);
                setMapMarker(json.maps);
            }
        } catch (error) {
            console.error("Error fetching map markers:", error);
        }
    };

    const fetchGetMeet = async () => {
        try {
            const res = await fetch(MEET_GET_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json && json.boards) {
                    setMeetList(json.boards);
                    console.log(json.boards);
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    };

    return (
        <>
            <Header />
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
                                    thumbnailUrl={boards.thumbnailUrl}
                                />
                            ))}
                        </ul>
                        <div className="meetlist-btn"></div>
                    </div>
                    <div className="map-container">
                        <Map
                            id="map"
                            className="map-api"
                            center={{ lat: location.lat, lng: location.lng }}
                            level={5}
                        >
                            {mapMarker.map((position, index) => (
                                <MapMarker
                                    key={`${position.x}_${position.y}`}
                                    position={{ lat: position.x, lng: position.y }}
                                />
                            ))}
                        </Map>
                        <Link to={"/upcycle_meet_post"}>
                            <BiSolidPlusCircle className="mpost-icon" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upcycle_meet;
