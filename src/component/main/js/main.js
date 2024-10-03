import React, {useEffect, useState} from 'react';
import Header from "../../header/js/header";
import { useRoutes } from 'react-router-dom';
import '../scss/main.scss';
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";


const Main = () => {

    return (
        <>
            <Header/>
            <div className="main-container">
                <div className="adv-box">

                </div>
                <div className="implication-box">
                    <div className="impl-title-name">
                        <p>자원봉사</p>
                    </div>
                    <div className="implied-object">
                        <div className="left-arrow">
                            <MdArrowBackIos />
                        </div>
                        <div className="implied-map">

                        </div>
                        <div className="implied-board">
                            <div className="list">
                                <ul>
                                    <li>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right-arrow">
                            <MdArrowForwardIos />
                        </div>
                    </div>
                    <div className="add-btn">
                        <p>더보기</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Main;


