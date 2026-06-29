import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo3.png";
import { LucideGithub } from "lucide-react";

const NavbarHome = () => {
    const navigate = useNavigate();

    const LogoutUser = () => {
        navigate("/app");
    };

    return (
        <div className="bg-transparent">
            <nav
                className="w-full py-1 px-8 flex items-center justify-between
                bg-zinc-900 backdrop-blur-md sticky top-0 z-50"
            >
                <Link to="/">
                    <img src={Logo} alt="logo" className="h-19 w-auto ml-15" />
                </Link>
                <div className="flex flex-row gap-9">
                 <button onClick={LogoutUser} className="btn">
                 Get Started
                </button>
                <Link to="https://github.com/aleezazahra/resume-builder">
                <button>
                    <LucideGithub className="mt-2" />
                </button>
                </Link>

                </div>
                
            </nav>
        </div>
    );
};

export default NavbarHome;