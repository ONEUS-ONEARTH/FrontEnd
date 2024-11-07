import React from "react";
import '../scss/main_upcycle_content.scss'
import { BiLike } from "react-icons/bi";



const Main_upcycle_content = () => {

    return (
        <>
            <li className="list-obj">
                <div className="content-box">
                    <div className="content-title">
                        <p>자원봉사 하실분 구해요~</p>
                    </div>
                    <div className="content-icon">
                        <BiLike />
                        <p>5</p>
                    </div>
                </div>
            </li>
        </>
    )
}
export default Main_upcycle_content;