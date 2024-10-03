import logo from './logo.svg';
import './App.css';
import {Reset} from "styled-reset";

import {BrowserRouter, json, Route, Router, Routes, useLocation} from "react-router-dom";

import Main from "./component/main/js/main";
import Sign_in from "./component/sign/js/sign_in";
import Sign_up from "./component/sign/js/sign_up";
import My_profile from "./component/mypage/js/my_profile";

function App() {
  return (
    <BrowserRouter>
      <Reset/>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/sign_in" element={<Sign_in/>}/>
              <Route path="/sign_up" element={<Sign_up/>}/>
              <Route path="/my_profile" element={<My_profile/>}/>

          </Routes>
    </BrowserRouter>
  );
}

export default App;
