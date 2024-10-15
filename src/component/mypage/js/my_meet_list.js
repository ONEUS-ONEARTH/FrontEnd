import React from "react";
import "../scss/my_meet_list.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";


const My_meet_list = () => {
    return (
        <>
        <Header/>
        <div className="myinfo-container">
            <div className="myinfo-text-box">
                <p>내 정보</p>
            </div>
            <div className="profile-container">
                <div className="header">
                    <My_info_header/>
                </div>
                <div className="myinfo-bg">
                    
                </div>
            </div>
        </div>
        </>
)
}

export default My_meet_list;