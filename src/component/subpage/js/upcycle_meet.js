import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../header/js/header";
import "../scss/upcycle_meet.scss"
import { FaHeart } from "react-icons/fa";


const Upcycle_meet = () => {

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
                                <div className="obj-img">

                                </div>
                                <div className="obj-content-box">
                                    <div className="content-title">
                                        대박
                                    </div>
                                    <div className="content-name">
                                        쩔어용
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
                    <div id="map" className="map-api">

                    </div>
                </div>
            </div>
        </>
    )
}
export default Upcycle_meet;