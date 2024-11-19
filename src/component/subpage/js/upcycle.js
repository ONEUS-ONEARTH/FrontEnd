import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import "../scss/upcycle.scss"
import Header from "../../header/js/header";
import Upcycle_content from "./upcycle_content";
import { CiCirclePlus } from "react-icons/ci";
import {UPCYCLE_URL} from "../../../config/host-config";

const Upcycle = () => {
    const UPCYCLE_GET_URL = UPCYCLE_URL + '/posts'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [postList, setPostList] = useState([]);
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [page, setPage] = useState(1);
    const [totalPost,setTotalPost] = useState();

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
                    {postList.map((boards) => (
                        <Upcycle_content
                            key={boards.id}
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
                 activePage={page}
                 totalItemsCount={totalPost}
                 itemsCountPerPage={20}
                 pageRangeDisplayed={10}
                 onChange={pageHandler}
                 variant="outlined"
                 color="primary"
             />
         </div>
    </>
    )       
}
export default Upcycle;