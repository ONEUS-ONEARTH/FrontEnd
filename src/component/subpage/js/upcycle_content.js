import React from "react";
import "../scss/upcycle_content.scss"
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import { BiLike } from "react-icons/bi";
import {UPCYCLE_URL} from "../../../config/host-config";

const Upcycle_content = ({id,thumbnailUrl, title, content, tag, createdDate,author,likeScore}) => {
    const DETAIL_GET_UEL = UPCYCLE_URL + '/{id}'


    var moment = require('moment');
    const publish_date = moment(createdDate).format('YYYY년 MM월 DD일')
    return (
        <li>
            <Link className="post-box" to={`/upcycle_detail/${id}`}>
                <div className="image-box">
                    <img src={thumbnailUrl} alt=""/>
                </div>
                <div className="post-text-box">
                    <div className="post-title">
                        {title}
                    </div>
                    <div className="post-row">
                        <div className="post-name">
                            {author}
                        </div>
                        <div className="post-like">
                            <BiLike /> {likeScore}
                        </div>
                    </div>
                    <div className="post-date">
                        {publish_date}
                    </div>
                    <div className="post-keyword">
                        {tag}
                    </div>
                </div>
            </Link>
        </li>
    )
}
export default Upcycle_content;