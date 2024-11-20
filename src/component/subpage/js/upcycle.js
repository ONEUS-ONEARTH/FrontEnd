import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle.scss"
import Header from "../../header/js/header";
import Upcycle_content from "./upcycle_content";
import { CiCirclePlus } from "react-icons/ci";
import {UPCYCLE_URL} from "../../../config/host-config";
import Pagination from "react-js-pagination";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const Upcycle = () => {
    const UPCYCLE_GET_URL = UPCYCLE_URL + '/posts'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [postList, setPostList] = useState([]);
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [totalPost,setTotalPost] = useState();
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const displayedMeetList = postList.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        console.log(`Current Page: ${pageNumber}`);
    };

    const pageHandler = (e) => {
        setPage(+e.target.innerText);
    };
   

    useEffect(() => {
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)
        const storedToken = localStorage.getItem('ACCESS_TOKEN');

        if (storedToken) {
            setIsLoggedIn(true);
        }
        fetchGetUpcycle();
    }, []);

    const fetchGetUpcycle = async () => {

        try {

            const res = await fetch(UPCYCLE_GET_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json && json.boards) {
                    setPostList(json.boards);
                    setTotalPost(json.totalPost);
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
         <div className="upcycle-container">
            <div className="upcycle-title">
                <p>업사이클</p>
            </div>
            <div className="upcycle-column">
                <ul className="upcycle-row">
                    {displayedMeetList.map((boards, index) => (
                        <Upcycle_content
                            key={index}
                            id={boards.id}
                            thumbnailUrl={boards.thumbnailUrl}
                            title={boards.title}
                            content={boards.content}
                            author={boards.author}
                            likeScore={boards.likeScore}
                            tag={boards.tag}
                            createdDate={boards.createdDate}
                        />
                    ))}
                </ul>
            </div>
            {isLoggedIn &&
            <div className="upcycle-post">
                <Link to='/upcycle_post'>
                    <CiCirclePlus className="plus-icon" />
                </Link>
            </div>
            }
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
    </>
    )       
}
export default Upcycle;