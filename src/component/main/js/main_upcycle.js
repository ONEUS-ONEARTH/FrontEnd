import React from "react";
import { FaHeart } from "react-icons/fa";
import '../scss/main_upcycle.scss';


const Main_upcycle = () => {
    
    return (
        <>
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
            </ul>
        </div>
        </>
)

}

export default Main_upcycle;