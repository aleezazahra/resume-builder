import React from "react";
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Layout from "./pages/Layout";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
const App=()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path="app" element={<Layout />}>
         <Route index element={<Dashboard />}/>
         <Route path='builder/:resumeID' element={<Builder />} />

         </Route>

         <Route>
          <Route path="view/:resumeID" element={<Preview />} />
          <Route path="login" element={<Login />} />
          
         </Route>
         

         



    
      </Routes>

    </div>
  )
}
export default App;