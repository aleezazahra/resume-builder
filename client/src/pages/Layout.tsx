import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import {useSelector} from 'react-redux'
import Loader from "../components/Loader.tsx";
import Login from "./Login.tsx";
import Footer from "../components/Home/Footer.tsx";

const Layout=()=>{
    const { user, loading } = useSelector((state: any) => state.auth)

    if(loading){
        return <Loader />
    }
    return(
        <div>
            {
                user?(  <div className="min-h-screen bg-gray-50">
             
                <Outlet />
            </div>)
            :<Login />
            
            }
         
          
                <Footer />
        </div>
    )
}
export default Layout;