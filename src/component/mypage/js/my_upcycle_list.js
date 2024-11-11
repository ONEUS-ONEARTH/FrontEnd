import React, {useEffect, useState} from 'react';
import "../scss/my_upcycle_list.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";
import My_upcycle_content from "./my_upcycle_content.js";
import {USER_URL} from "../../../config/host-config";


const My_upcycle_list = () => {
    const MY_UPCYCLE_URL = USER_URL + "/myupcyclePost";
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [myPostList, setMyPostList] = useState([]);

    useEffect(() => {
        getMyUpcycle();
    }, []);

    const getMyUpcycle = async () => {
        const res = await fetch(MY_UPCYCLE_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        });
        if (res.status === 200) {
            const json = await res.json();
            setMyPostList(json.boards);
            console.log(json.boards);

        }
    }


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
                    <ul className="my-upcycle-bg">
                        {myPostList.map((boards) => (
                            <My_upcycle_content
                                key={boards.id}
                                id={boards.id}
                                title={boards.title}
                                author={boards.author}
                                likeScore={boards.likeScore}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default My_upcycle_list;