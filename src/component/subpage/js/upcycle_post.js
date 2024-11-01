import { Link, useNavigate } from 'react-router-dom';
import "../scss/upcycle_post.scss"
import { Editor } from '@tinymce/tinymce-react';
import React, {useEffect, useRef, useState} from 'react';
import Header from "../../header/js/header";

const Upcycle_Post = () => {
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


    // const [userValue, setUserValue] = useState({
    //     name: '',
    //     nickname: '',
    //     email: '',
    //     password: '',
    //     phoneNumber: '',
    //     adress: '',
    //     imagePath: ''
    // });
    //

    // 검증 완료 체크에 대한 상태변수 관리
    // const [correct, setCorrect] = useState({
    //     password: false,
    //     passwordCheck: false,
    //     email: false,
    //     phoneNumber: false
    // });

    // const saveInputState = (flag, inputVal, key) => {
    //
    //     setCorrect({
    //         ...correct,
    //         [key]: flag
    //     });
    //     setUserValue({
    //         ...userValue,
    //         [key]: inputVal
    //     });
    //
    // };

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

    const [tagValue, setTagValue] = useState('#태그'); // 기본적으로 #이 표시되도록 초기화

    const handleInputChange = (event) => {
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

        setTagValue(value);
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
                    <input className="tag-input"
                           value={tagValue}
                           onChange={handleInputChange} type="text" placeholder="태그"/>

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