import React from "react";
import "../scss/my_profile.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";

const My_profile = () => {

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
                        <div className="myinfo-box">
                            <div className="myname-box">
                                <div className="myinfo-img">

                                </div>
                                <p className="myinfo-name">장선경</p>
                            </div>
                            <div className="myinfo-data">

                            </div>
                        </div>
                        <div className="myadd-box">
                            <p>거주지 주소</p>
                            <div className="detail-myadd">
                                <p className="ar-ad">
                                    ddddd
                                </p>
                                <p className="j-ad">
                                    ddddddddddd
                                </p>
                            </div>
                        </div>
                        <div className="info-modify-btn">
                            <p>정보수정</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default My_profile;