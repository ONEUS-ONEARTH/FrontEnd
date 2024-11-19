import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header/js/header";
import "../scss/upcycle_meet.scss";
import { MEET_URL } from "../../../config/host-config";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { BiSolidPlusCircle } from "react-icons/bi";
import Upcycle_meet_content from "./upcycle_meet_content";
import Pagination from "react-js-pagination";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";


const Upcycle_meet = () => {
    const MEET_GET_URL = MEET_URL + "/posts";
    const MAP_GET_URL = MEET_URL + "/map";

    const [mapMarker, setMapMarker] = useState([]);
    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본값 서울
    const [error, setError] = useState(null);
    const [meetList, setMeetList] = useState([]);
    const [totalPost,setTotalPost] = useState();
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const displayedMeetList = meetList.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        console.log(`Current Page: ${pageNumber}`);
    };

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
                    setTotalPost(json.totalPost);
                    console.log(json.totalPost);
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    };

    // const pageHandler = (e) => {
    //     setPage(+e.target.innerText);
    // };
    return (
        <>
            <Header />
            <div className="upcycle-meet-container">
                <div className="upcycle-meet-box">
                    <div className="upcycle-meet-title">
                        <p>모임</p>
                    </div>
                    <div className="meetlist-box">

                        <ul className="meetlist">
                            {displayedMeetList.map((boards, index) => (
                                <Upcycle_meet_content
                                    key={index} // 고유한 키
                                    id={boards.id}
                                    title={boards.title}
                                    content={boards.content}
                                    likeScore={boards.likeScore}
                                    option={boards.option}
                                    thumbnailUrl={boards.thumbnailUrl}
                                />
                            ))}
                        </ul>
                        <Pagination
                            activePage={page} // 현재 페이지
                            itemsCountPerPage={itemsPerPage} // 한 페이지당 아이템 수
                            totalItemsCount={totalPost} // 전체 아이템 수
                            pageRangeDisplayed={5} // 페이지 번호 범위
                            onChange={handlePageChange} // 페이지 변경 핸들러
                            prevPageText={<FaAngleDoubleLeft />}
                            firstPageText={<FaAngleLeft />}
                            lastPageText={<FaAngleRight />}
                            nextPageText={<FaAngleDoubleRight />}
                        />
                    </div>
                </div>
                <div className="map-container">
                    <Map
                        id="map"
                        className="map-api"
                        center={{lat: location.lat, lng: location.lng}}
                        level={5}>

                        {mapMarker.map((position, index) => (
                            <MapMarker
                                key={`${position.x}_${position.y}`}
                                position={{lat: position.x, lng: position.y}}
                            />
                        ))}
                    </Map>
                    <Link to={"/upcycle_meet_post"}>
                        <BiSolidPlusCircle className="mpost-icon"/>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Upcycle_meet;
