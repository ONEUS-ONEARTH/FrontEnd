import React, {useEffect, useRef, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle_meet_post.scss";
import Header from "../../header/js/header";
import { Editor } from '@tinymce/tinymce-react';

const Upcycle_meet_post = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const redirection = useNavigate(); // 리다이렉트 함수를 리턴
    const imgRef = useRef();
    const editorRef = useRef(null);



    useEffect(() => {
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)
        const storedToken = localStorage.getItem('ACCESS_TOKEN');

        if (storedToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            alert('로그인을 하고 이용해주세요!');
            redirection('/sign_in');
        }


    }, []);

    const imgUploadHandler = () => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        if (!file) return;

        // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImgUrl(imageDataUrl); // 미리보기용으로만 사용

            // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);
    };

    const checkClickHandler = async (e) => {
        e.preventDefault();
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
        //
        // // 이메일과 다른 입력값들이 올바른지 확인
        // if (!correct.password || !correct.passwordCheck || !correct.email || !correct.phoneNumber) {
        //     alert('입력란을 다시 확인해주세요!');
        //     return;
        // }
        //
        // // fetchSignUpPost를 호출하기 전에 userValue가 올바르게 업데이트되었는지 확인
        // await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가
        //
        // // 회원가입 진행
        // fetchSignUpPost();
    };

    return (
        <>
            <Header/>
            <div className="upcycle-post-container">
                <div className="content-box">
                    <div className="title-box">
                        <input className="title-input" type="text" placeholder="제목"/>
                    </div>
                    <Editor
                        style="height=1000px"
                        className="editor"
                        apiKey='k31l7cbssdoqhzh6h9f1f4c01mdz9d0g3lw57c76ji4s1un8'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        // initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div className="send-box">
                    <div className="img-box" onClick={() => imgRef.current.click()}>
                        {imgUrl && (
                            <img
                                className="img"
                                src={imgUrl}
                                alt="프로필 미리보기"
                            />
                        )}
                        {/*<img/>*/}

                    </div>
                    <input type="file" className="img-input" accept="image/*"
                           name="imagePath"
                           onChange={imgUploadHandler}
                           ref={imgRef}/>

                    <div className="uppost-btn-box">
                        <button className="check" onClick={checkClickHandler}>확인</button>
                        <button className="cancel">취소</button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Upcycle_meet_post;