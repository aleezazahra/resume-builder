import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero=()=>{
  return(
    <>
    <div className="items-center justify-center background ">
      <div className="flex flex-col justify-center text-center items-center mt-20">
        <div className="flex flex-row mt-10">
          <h1 className="text-[100px]" style={{fontFamily:"League Spartan"}}>Naqsh</h1>
           <h1 className="text-[100px]" style={{fontFamily:"Noto Nastaliq Urdu"}}>نقش</h1>
        </div>
           
      <h2 className="mt-10 text-4xl font-sans">Create your Resume in Minutes</h2>
      </div>

      <div className="justify-center mt-5">
        <Link to="/app" className="flex flex-row gap-10 justify-center">
         <button className="btn flex flex-row">
          <ArrowRight />
          Get started</button>
        <button className="btn">Upload Resume</button>
        </Link>

       

      </div>
     
    </div>
    </>
  )
}
export default Hero;