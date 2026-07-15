import { ArrowRight, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lotus from "../../assets/lotus-nobg.png"
const scripts = [

                 
  { text: "نقش", font: "Noto Nastaliq Urdu" },              
  { text: "नक़्श", font: "Noto Sans Devanagari" },         
  { text: "模様", font: "Noto Sans JP" },                   
  { text: "图案", font: "Noto Sans SC" },                   
  { text: "Motif", font: "Poppins" },      
  { text: "Disegnio", font: "Poppins" },     
  { text: "Diseño", font: "Poppins" },       
{ text: "Дизайн", font: "Poppins" },       
{ text: "디자인", font: "Noto Sans KR" },   
                  
];
const Hero = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % scripts.length);
        setVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="background min-h-screen flex items-center justify-center -mt-5 px-6">
      <div className="max-w-6xl w-full text-center">

        <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4">
         <img
  src={lotus}
  alt="Lotus"
  className="w-24 sm:w-28 lg:w-32 h-auto -mt-3 sm:-mt-2 flex-shrink-0"
/>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-none font-bold"
            style={{ fontFamily: "League Spartan" }}
          >
            Naqsh
          </h1>

          <div className="relative h-[80px] sm:h-[95px] lg:h-[110px] flex items-center justify-center">
            <h1
              style={{ fontFamily: scripts[index].font }}
              className={`text-5xl sm:text-6xlclassName="btn" md:text-7xl lg:text-[90px] leading-none transition-opacity duration-300 ease-in-out ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
             
              {scripts[index].text}
            </h1>
          </div>
        </div>

        <h2
          className="mt-10 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "Poppins" }}
        >
          Free & Open-Source Resume Builder that helps you create a
          professional resume in just a few minutes.
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 ml-10">
          <Link to="/app">
            <button className="relative overflow-hidden btn group">
              <span className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-300
               ease-out group-hover:h-full"></span>

              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors 
              duration-300 group-hover:text-black">
                <ArrowRight size={20} />
                Get Started
              </span>
            </button>
          </Link>
              <span style={{fontFamily:"League Spartan"}}>or</span>
             <Link to="/try">
            <button className="relative overflow-hidden btn group">
              <span className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-300
               ease-out group-hover:h-full"></span>

              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors 
              duration-300 group-hover:text-black">
              
                Create w/o creating an account
              </span>
            </button>
          </Link>
         

          
        </div>

        <p className="mt-8 text-sm sm:text-base text-white/50">
          Customizable Templates • Free • Open Source
        </p>

      </div>
    </section>
  );
};

export default Hero;