import React, {useEffect, useState} from "react";
import { BiLike } from "react-icons/bi";
import '../scss/main_upcycle.scss';
import {UPCYCLE_URL} from "../../../config/host-config";
import Main_upcycle_content from "./main_upcycle_content.js"

const Main_upcycle = () => {
    const [postList, setPostList] = useState([]);
    const [totalPost, setTotalPost] = useState();
    useEffect(() => {
        fetchGetUpcycle();
    }, []);

    const fetchGetUpcycle = async () => {

        try {

            const res = await fetch(UPCYCLE_URL+'/posts/main', {
                method: 'GET',
                // headers: {
                //     // 'Authorization': `Bearer ${storedToken}`, // 인증 헤더 추가
                //     'Content-Type': 'application/json',
                // },
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
        <div className="implied-board">
            <ul className="list">
                {postList.map((boards) => (
                    <Main_upcycle_content
                        key={boards.id}
                        id={boards.id}
                        title={boards.title}
                        likeScore={boards.likeScore}
                    />
                ))}
                
            </ul>
        </div>
        </>
)

}

export default Main_upcycle;