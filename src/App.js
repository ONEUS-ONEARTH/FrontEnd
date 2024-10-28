import logo from './logo.svg';
import './App.css';
import {Reset} from "styled-reset";

import {BrowserRouter, json, Route, Router, Routes, useLocation} from "react-router-dom";

import Main from "./component/main/js/main";
import Sign_in from "./component/sign/js/sign_in";
import Sign_up from "./component/sign/js/sign_up";
import My_profile from "./component/mypage/js/my_profile";
import My_meet_list from "./component/mypage/js/my_meet_list";
import My_upcycle_list from "./component/mypage/js/my_upcycle_list";
import Upcycle from "./component/subpage/js/upcycle";
import Upcycle_post from "./component/subpage/js/upcycle_post";
import Upcycle_meet from "./component/subpage/js/upcycle_meet";
import Upcycle_meet_post from "./component/subpage/js/upcycle_meet_post";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
    const clientId='506474340540-ptvmfj17ahedtpqqi63bnor2g0c38lgg.apps.googleusercontent.com';
    
  return (
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <Reset/>
      <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/sign_in" element={<Sign_in/>}/>
          <Route path="/sign_up" element={<Sign_up/>}/>
          <Route path="/my_profile" element={<My_profile/>}/>
          <Route path="/my_meet_list" element={<My_meet_list/>}/>
          <Route path="/my_upcycle_list" element={<My_upcycle_list/>}/>
          <Route path="/upcycle" element={<Upcycle/>}/>
          <Route path="/upcycle_post" element={<Upcycle_post/>}/>
          <Route path="/upcycle_meet" element={<Upcycle_meet/>}/>
          <Route path="/upcycle_meet_post" element={<Upcycle_meet_post/>}/>
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
  );
}

export default App;
