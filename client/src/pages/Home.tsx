
import Footer from "../components/Home/Footer";
import Features from "../components/landingpage/Features";
import Hero from "../components/landingpage/Hero";
import NavbarHome from "../components/landingpage/NavbarHome";
import Showcase from "../components/landingpage/Showcase";
import TemplatesSection from "../components/landingpage/TemplatesSection";

const Home=()=>{
    return(
        <div>
            <NavbarHome />

            <Hero />
            <Showcase />
            <Features />
            <TemplatesSection />
          
            <Footer />
            
        </div>
    )

}
export default Home;