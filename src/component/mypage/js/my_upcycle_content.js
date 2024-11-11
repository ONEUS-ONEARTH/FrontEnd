import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../scss/my_upcycle_content.scss'
import { BiLike } from "react-icons/bi";

const My_upcycle_content = ({id, title, author, likeScore}) => {
    return(
        <>
            <li className="obj-container" id={id}>
                <Link className="link-box" to={`/upcycle_detail/${id}`}>
                    <div className="img-box">

                    </div>
                    <div className="content-box">
                        <div className="title">
                            {title}
                        </div>
                        <div className="name">
                            {author}
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
export default My_upcycle_content;