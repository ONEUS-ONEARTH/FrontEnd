import React, {useEffect, useState} from 'react';
import { useRoutes } from 'react-router-dom';
import '../scss/main.scss';


const Main = () => {

    return (
        <>
            <div className="main-container">
                <div className="adv-box">

                </div>
                <div className="implication-box">
                    <div className="impl-title-name">
                        <p>자원봉사</p>
                    </div>
                    <div className="implied-object">
                        <div className="left-arrow">

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


