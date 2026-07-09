import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Layout from "./pages/Layout";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import {Toaster} from 'react-hot-toast'
import LoginSuccess from "./pages/LoginSucess";


const App = () => {

  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: token,
          },
        });

        if (data.user) {
          dispatch(login({token,user:data.user}))
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error)
      }
        
    }

    useEffect(()=>{
        getUserData();
    },[])
  
 return (
    <>
   
    <Toaster />
    <Routes>
   
      <Route path="/" element={<Home />} />
      
      

     
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<Builder />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/login-success" element={<LoginSuccess />} />

    
      <Route path="/view/:resumeId" element={<Preview />} />
    </Routes>
    </>
  );
}

export default App;