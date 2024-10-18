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


function App() {
    
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
