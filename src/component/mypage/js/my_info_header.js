import React from "react";
import "../scss/my_info_header.scss"


const My_info_header = () => {

    return (
        <>
            <div className="profile">
                <div className="profile-img">

                </div>
                <div className="my-nickname">
                    <p>seon</p>
                </div>
                <div className="myinfo-menu">
                    <p>내프로필</p>
                    <p>내목록보기</p>
                    <div className="mylist-info">

                    </div>
                </div>
            </div>
        </>
    )
}
export default My_info_header;