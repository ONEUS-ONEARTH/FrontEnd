import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../scss/my_meet_content.scss'
import { BiLike } from "react-icons/bi";

const My_meet_content = ({index, id, title, option, likeScore, thumbnailUrl}) => {
    return(
        <>
            <li className="obj-container" id={id} key={index}>
                <Link className="link-box" to={`/upcycle_meet_detail/${id}`}>
                    <img className="img-box" src={thumbnailUrl}/>
                    <div className="content-box">
                        <div className="title">
                            {title}
                        </div>
                        <div className="option">
                            {option}
                        </div>
                    </div>
                    <div className="like-count">
                        <BiLike /> {likeScore}
                    </div>
                </Link>
            </li>
        </>
    )
}
export default My_meet_content;