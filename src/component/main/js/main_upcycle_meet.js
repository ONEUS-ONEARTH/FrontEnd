import React from "react";
import '../scss/main_upcycle_meet.scss'
import { Map } from "react-kakao-maps-sdk";
import { FaHeart } from "react-icons/fa";


const Main_upcycle_meet = () => {

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
        </>
)
}

export default Main_upcycle_meet;