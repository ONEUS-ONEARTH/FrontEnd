import React, {useEffect, useState} from 'react';
import "../scss/my_upcycle_list.scss"
import Header from "../../header/js/header";
import My_info_header from "./my_info_header";
import My_upcycle_content from "./my_upcycle_content.js";
import {USER_URL} from "../../../config/host-config";
import Pagination from "react-js-pagination";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const My_upcycle_list = () => {
    const MY_UPCYCLE_URL = USER_URL + "/myupcyclePost";
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [myPostList, setMyPostList] = useState([]);
    const [totalPost,setTotalPost] = useState();
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const displayedMeetList = myPostList.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        // console.log(`Current Page: ${pageNumber}`);
    };

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
            setTotalPost(json.totalPost);
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
                    <div className="my-upcycle">
                        <ul className="my-upcycle-bg">
                        {displayedMeetList.map((boards, index) => (
                            <My_upcycle_content
                                key={index}
                                id={boards.id}
                                title={boards.title}
                                author={boards.author}
                                likeScore={boards.likeScore}
                                thumbnailUrl={boards.thumbnailUrl}
                            />
                        ))}
                        </ul>
                        <Pagination
                            activePage={page} // 현재 페이지
                            itemsCountPerPage={itemsPerPage} // 한 페이지당 아이템 수
                            totalItemsCount={totalPost} // 전체 아이템 수
                            pageRangeDisplayed={10} // 페이지 번호 범위
                            onChange={handlePageChange} // 페이지 변경 핸들러
                            prevPageText={<FaAngleDoubleLeft />}
                            firstPageText={<FaAngleLeft />}
                            lastPageText={<FaAngleRight />}
                            nextPageText={<FaAngleDoubleRight />}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default My_upcycle_list;