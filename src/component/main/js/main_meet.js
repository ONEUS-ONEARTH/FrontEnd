import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../scss/main_meet.scss'
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { MEET_URL } from "../../../config/host-config";
import Main_meet_content from "./main_meet_content.js"

// import { Map, MapMarker } from "react-kakao-maps-sdk";


const Main_meet = () => {
    const [postList, setPostList] = useState([]);
    const [totalPost, setTotalPost] = useState();
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본값 서울
    const [error, setError] = useState(null);



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
    }, []);

    const fetchGetMeet = async () => {

        try {

            const res = await fetch(MEET_URL+'/map/main', {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json && json.boards) {
                    setPostList(json.boards);
                    setTotalPost(json.totalPost);
                    // console.log(json.boards.meetingLocate); // boards를 여기에서 출력
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }



    return (
        <>
        <div className="implied-map">
            <Map
                id="map"
                className="map-api"
                center={{lat: location.lat, lng: location.lng}}
                level={5}>

                {postList.map((position, index) => (
                    <MapMarker
                        key={`${position.x}_${position.y}`}
                        position={{lat: position.x, lng: position.y}}
                    />
                ))}
            </Map>
        </div>
        <div className="implied-board">
            <ul className="list">
                {postList.map((boards) => (
                    <Main_meet_content
                        key={boards.id}
                        id={boards.id}
                        title={boards.title}
                        likeScore={boards.likeScore}
                    />
                ))}
            </ul>
        </div>
        </>
)
}

export default Main_meet;