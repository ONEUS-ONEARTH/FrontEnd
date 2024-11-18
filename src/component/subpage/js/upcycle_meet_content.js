import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../scss/upcycle_meet_content.scss'
import { FaHeart } from "react-icons/fa";

const Upcycle_meet_content = ({id, title, option, content, thumbnailUrl,likeScore}) => {
    
    return (
        <>
            <li className="meet-obj">
                <Link className="mp-box" to={`/upcycle_meet_detail/${id}`}>
                    <img className="obj-img"
                         src={thumbnailUrl}
                         alt=""/>

                    <div className="obj-content-box">
                        <div className="content-title">
                            {title}
                        </div>
                        <div className="content-name">
                            {option}
                        </div>
                    </div>
                    <div className="obj-like-box">
                        <div className="like-icon-box">
                            <FaHeart className="like-icon"/>
                        </div>
                        <div className="like-num">
                            {likeScore}
                        </div>
                    </div>
                </Link>
            </li>
        </>
    )
}
export default Upcycle_meet_content;