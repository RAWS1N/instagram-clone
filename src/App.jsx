import React from "react";
import { Main,Login } from "./Pages";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
