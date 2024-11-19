import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../scss/main_meet.scss'
import { Map } from "react-kakao-maps-sdk";
import { MEET_URL } from "../../../config/host-config";
import Main_meet_content from "./main_meet_content.js"

// import { Map, MapMarker } from "react-kakao-maps-sdk";


const Main_meet = () => {
    const [postList, setPostList] = useState([]);
    const [totalPost, setTotalPost] = useState();
    const storedToken = localStorage.getItem('ACCESS_TOKEN');


    useEffect(() => {
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
                className="map-api"
                center={{lat: 33.450701, lng: 126.570667}}
                level={5}
            />
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