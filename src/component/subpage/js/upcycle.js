import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle.scss"
import Header from "../../header/js/header";
import { CiCirclePlus } from "react-icons/ci";
import {UPCYCLE_URL} from "../../../config/host-config";

const Upcycle = () => {
    const UPCYCLE_GET_URL = UPCYCLE_URL + '/posts'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [postList, setPostList] = useState([]);
    const storedToken = localStorage.getItem('ACCESS_TOKEN');

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
                    // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json && json.boards) {
                    setPostList(json.boards);
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
                    <div className="upcycle-row">
                        <ul>
                            <li>
                                <div className="post-box">
                                    {/*{shortList.map((shorts) => (*/}
                                    {/*    <Shorts_content*/}
                                    {/*        id={shorts.shortsId}*/}
                                    {/*        item={shorts}*/}
                                    {/*        upVote={shorts.upCount}*/}
                                    {/*        isError={error}*/}
                                    {/*        anymore={anymore}*/}

                                    {/*    />*/}
                                    <div className="image-box">

                                    </div>
                                    <div className="post-text-box">
                                        <div className="post-title">
                                            asdfas
                                        </div>
                                        <div className="post-row">
                                            <div className="post-name">
                                                sdfsdfsdfa
                                            </div>
                                            <div className="post-like">
                                                good
                                            </div>
                                        </div>
                                        <div className="post-date">
                                                sdfsd
                                        </div>
                                        <div className="post-keyword">
                                            #dfdfd #dfdff
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {isLoggedIn &&
                <div className="upcycle-post">
                    <Link to='/upcycle_post'>
                        <CiCirclePlus className="plus-icon" />
                    </Link>
                </div>
                }
            </div>
        </>
    )       
}
export default Upcycle;