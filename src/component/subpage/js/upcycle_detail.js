import '../scss/upcycle_detail.scss'
import {UPCYCLE_URL} from "../../../config/host-config";
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from "../../header/js/header";

const Upcycle_detail = () => {
    const DETAIL_GET_UEL = UPCYCLE_URL;
    const { id } = useParams();
    const [getItem,setGetItem] = useState([]);

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        try {
            const res = await fetch(`${UPCYCLE_URL}/posts/${id}`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json && json.boards) {
                    setGetItem(json.boards);
                    console.log(json.boards); // boards를 여기에서 출력
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }

    return (
        <>
            <Header/>
            <div className="upd-container">
                <div className="upd-column1">
                    <img className="upd-img" src="" alt=""/>
                    <div className="upd-data">
                        {getItem.name}
                        {getItem.createdDate}
                    </div>
                    <div className="upd-tag">
                        {getItem.tag}
                    </div>
                </div>
                <div className="upd-column2">
                    <div className="upd-title">
                        {getItem.title}
                    </div>
                    <div className="upd-content">
                        {getItem.content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upcycle_detail;