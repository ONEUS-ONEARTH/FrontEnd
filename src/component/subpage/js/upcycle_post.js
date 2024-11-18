import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle_post.scss"
import { Editor } from '@tinymce/tinymce-react';
import React, {useEffect, useRef, useState} from 'react';
import Header from "../../header/js/header";
import {UPCYCLE_URL} from "../../../config/host-config";

const Upcycle_Post = () => {
    const UPCYCLE_POST_URL = UPCYCLE_URL + '/createpost'
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [imgFile, setImgFile] = useState();
    const redirection = useNavigate(); // 리다이렉트 함수를 리턴
    const imgRef = useRef();
    const editorRef = useRef();


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




    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        title: false,
        content: false,
        img: false,
        tag: false
    });

    // 이미지 업로드 input의 onChange
    const imgUploadHandler = (e) => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        // if (!file) return;
        //
        // // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImgUrl(imageDataUrl); // 미리보기용으로만 사용

        //     // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);

        let flag;
        if (!file) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, img: flag});
    };


    const [tagValue, setTagValue] = useState('#태그'); // 기본적으로 #이 표시되도록 초기화

    const tagAddHandler = (event) => {
        let value = event.target.value;

        // #으로 시작하는 단어의 개수를 세기
        const hashtagWords = value.trim().split(' ').filter(word => word.startsWith('#'));

        // 단어가 5개 이상이면 추가 입력을 막기
        if (hashtagWords.length >= 5 && value.endsWith(' ')) {
            setTagValue(value.trim()); // 공백 제거
            return;
        }

        // 백스페이스로 #태그와 공백을 제거하는 경우
        if (value.endsWith(' #')) {
            value = value.slice(0, -2); // 마지막 #태그와 공백 제거
        }
        // 스페이스바가 눌린 후 바로 #을 추가 (단, 단어가 5개 미만일 때만)
        else if (value.endsWith(' ') && hashtagWords.length < 5) {
            value = value.trim() + ' #';
        }
        
        let flag;
        if (!value) { 
            flag = false;
        } else {
            flag = true;
        }
        console.log(value);
        setCorrect({...correct, tag: flag});
        setTagValue(value);
    };

    // title
    const [titleValue, setTitleValue] = useState();
    const titleAddHandler = (e) => {
        const inputVal = e.target.value;
        // console.log(inputVal);

        let flag;
        if (!inputVal) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, title: flag});
        setTitleValue(inputVal);
    }


    // content
    const [contentValue, setContentValue] = useState();
    const contentAddHandler = (content) => {
        // const data = editorRef.current.getInstance().getHTML();
        const inputVal = content;
        // console.log(content);

        let flag;
        if (!content) {
            flag = false;
        } else {
            flag = true;
        }
        setCorrect({...correct, content: flag});
        setContentValue(content);
    }

    const checkClickHandler = async (e) => {
        e.preventDefault();
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }

        // 이메일과 다른 입력값들이 올바른지 확인
        if (!correct.title || !correct.content || !correct.tag || !correct.img) {
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // fetchSignUpPost를 호출하기 전에 userValue가 올바르게 업데이트되었는지 확인
        await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가

        // 회원가입 진행
        fetchUpcyclePost();
    };
    const fetchUpcyclePost = async () => {
        const formData = new FormData();

        const file = imgRef.current.files?.[0];
        formData.append('thumbnailUrl', file);

        // 텍스트 데이터 추가
        formData.append('title', titleValue);
        formData.append('content', contentValue);
        formData.append('tag', tagValue);


        // console.log(userValue);

        // 이미지 파일이 있는 경우에만 추가
        // const file = imgRef.current.files?.[0];
        // formData.append('imageFile', file);

        const res = await fetch(UPCYCLE_POST_URL, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
            },
            body: formData
        });

        if (res.ok) {
            const json = await res.json();
            console.log(json);
            redirection('/upcycle');
            alert('성공적으로 게시물이 올라갔습니다.');
        } else {
            console.error('응답 상태 코드:', res.status);
            alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
        }

    }

    return (
        <>
            <Header/>
            <div className="upcycle-post-container">
                <div className="content-box">
                    <div className="title-box">
                        <input className="title-input"
                               type="text"
                               onChange={titleAddHandler}
                               placeholder="제목"/>
                    </div>
                    <Editor
                        style="height=1000px"
                        className="editor"
                        apiKey='k31l7cbssdoqhzh6h9f1f4c01mdz9d0g3lw57c76ji4s1un8'
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        onEditorChange={contentAddHandler}
                        ref={editorRef}
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


                    </div>
                    <input type="file" className="img-input" accept="image/*"
                           name="imagePath"
                           onChange={imgUploadHandler}
                           ref={imgRef}/>
                    <input className="tag-input"
                           value={tagValue}
                           onChange={tagAddHandler} type="text" placeholder="태그"/>

                    <div className="uppost-btn-box">
                        <button className="check" onClick={checkClickHandler}>확인</button>
                        <button className="cancel">취소</button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Upcycle_Post;