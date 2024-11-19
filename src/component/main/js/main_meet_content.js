import React from "react";
import '../scss/main_upcycle_content.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiLike } from "react-icons/bi";



const Main_meet_content = ({id,title, likeScore}) => {

    return (
        <>
            <li className="list-obj">
                <Link className="main-postlist" to={`/upcycle_meet_detail/${id}`}>
                    <div className="content-box">
                        <div className="content-title">
                            <p>{title}</p>
                        </div>
                        <div className="content-icon">
                            <BiLike />
                            <p>{likeScore}</p>
                        </div>
                    </div>
                </Link>
            </li>
        </>
    )
}
export default Main_meet_content;