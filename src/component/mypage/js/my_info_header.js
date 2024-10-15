import React from "react";
import "../scss/my_info_header.scss"
import { Link } from 'react-router-dom';


const My_info_header = () => {

    return (
        <>
            <div className="profile">
                <div className="profile-img">

                </div>
                <div className="my-nickname">
                    <p>soen</p>
                </div>
                <div className="myinfo-menu">
                    <Link to='/my_profile' className="profile-btn link-btn">
                    <p>내프로필</p>
                    </Link>

                    <div className="menu">
                        <p>내목록보기</p>
                        <div className="mylist-info">
                            <Link to='/my_meet_list' className="link-text">
                            <span>모임</span>
                            </Link>
                            <Link to='/my_upcycle_list' className="link-text">
                                <span>업사이클</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default My_info_header;