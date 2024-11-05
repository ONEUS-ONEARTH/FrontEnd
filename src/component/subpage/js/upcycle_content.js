import React from "react";
import "../scss/upcycle_content.scss"
import Moment from 'moment';
import { BiLike } from "react-icons/bi";

const Upcycle_content = ({id, title, content, tag, createdDate,author}) => {

    var moment = require('moment');
    const publish_date = moment(createdDate).format('YYYY년 MM월 DD일')
    return (
        <li>
            <div className="post-box">
                <div className="image-box">

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
                            <BiLike /> 0
                        </div>
                    </div>
                    <div className="post-date">
                        {publish_date}
                    </div>
                    <div className="post-keyword">
                        {tag}
                    </div>
                </div>
            </div>
        </li>
    )
}
export default Upcycle_content;