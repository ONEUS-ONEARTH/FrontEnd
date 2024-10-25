import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle.scss"
import Header from "../../header/js/header";
import { CiCirclePlus } from "react-icons/ci";

const Upcycle = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)
        const storedToken = localStorage.getItem('ACCESS_TOKEN');

        if (storedToken) {
            setIsLoggedIn(true);
        }

    }, []);
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