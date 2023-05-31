
import './App.css';

import React, {useState } from 'react'
import Navbar from './Components/Navbar';
import MainNews from './Components/MainNews';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App =()=> {
  const [progress,setprogress]=useState(0); 
  const[text,setText] = useState();
  const changehandler =(event)=>{
    setText(event.target.value);
    console.log(text);
  }  
    return (
      <div>
      <Router>
       < Navbar text={text} changehandler={changehandler}/>
       <LoadingBar
        color='#f11946'
        progress={progress}
      />  
        <Routes>
          <Route exact path="/"  element={<MainNews setprogress={setprogress} key="everything" pageSize={9} typeofnews="everything" search={text} category=""/>}></Route>
          <Route exact path="/business" element={<MainNews setprogress={setprogress} key="head" pageSize={9} typeofnews="bussiness" search={text} category="business"/>}></Route>
          <Route exact path="/science" element={<MainNews setprogress={setprogress} key="science" pageSize={9} typeofnews="science" search={text} category="science"/>}></Route>
          <Route exact path="/technology" element={<MainNews setprogress={setprogress} key="tech" pageSize={9} typeofnews="technology" search={text} category="technology"/>}></Route>
          <Route exact path="/entertainment" element={<MainNews setprogress={setprogress} key="entertainment" pageSize={9} search={text} typeofnews="entertainment" category="entertainment"/>}></Route>
          <Route exact path="/sports" element={<MainNews setprogress={setprogress} key="sports" pageSize={9} typeofnews="sports" search={text} category="sports"/>}></Route>
          <Route exact path="/health" element={<MainNews setprogress={setprogress} key="health" pageSize={9} typeofnews="health" search={text} category="health"/>}></Route>
          <Route exact path="/top-headlines" element={<MainNews setprogress={setprogress} key="general" pageSize={9} typeofnews="top-headlines" search={text} category="general"/>}></Route>
        </Routes>
       </Router>
      </div>
    )
  }


export default App;