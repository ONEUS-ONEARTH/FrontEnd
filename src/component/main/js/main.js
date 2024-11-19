import React, {useEffect, useState} from 'react';
import Header from "../../header/js/header";
import { useRoutes } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../scss/main.scss';
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import Main_upcycle from "./main_upcycle";
import Main_meet from "./main_meet.js";




const Main = () => {
    let [arrow, setArrow] = useState(false);
    const redirection = useNavigate();

    const arrowClickHandler = () => {
        setArrow(!arrow);
        console.log(arrow);
    }

    const addbtnClickHandler = () => {

        if (arrow) {
            redirection('/upcycle');
        } else {
            redirection('/upcycle_meet');
        }
    }

    // useEffect(() => {
    //
    //     const res=await fetch('https://dapi.kakao.com/v2/local/search/address.${FORMAT}',
    //         {
    //             method: 'GET',
    //             Authorization: KakaoAK ${REST_API_KEY}
    //         }
    //     );
    //     if (res.status === 400) { // 가입이 안되었거나 비
    // },[])

    return (
        <>
            <Header/>
            <div className="main-container">
                <div className="adv-box">
                    <img className="ad-img" src={process.env.PUBLIC_URL + '/assets/ouoe_campaign.png'} alt=""/>
                </div>
                    <div className="implication-box">
                    <div className="impl-title-name">
                        {arrow ?(
                            <p>업사이클</p>
                        ) : (
                            <p>모임</p>
                        )}
                    </div>
                    <div className="implied-object">
                        <div className="left-arrow"  onClick={arrowClickHandler}>
                            <MdArrowBackIos />
                        </div>
                        {arrow ?(
                            <Main_upcycle/>
                        ) : (
                            <Main_meet/>
                        )}

                        <div className="right-arrow" onClick={arrowClickHandler}>
                            <MdArrowForwardIos/>
                        </div>
                    </div>
                    <button className="add-btn" onClick={addbtnClickHandler}>
                        더보기
                    </button>
                </div>
            </div>
        </>
    )
}
export default Main;


