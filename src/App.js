import logo from './logo.svg';
import './App.css';
import {Reset} from "styled-reset";

import {BrowserRouter, json, Route, Router, Routes, useLocation} from "react-router-dom";

import Main from "./component/main/js/main";

function App() {
  return (
    <BrowserRouter>
      <Reset/>
          <Routes>
              <Route path="/" element={<Main/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
