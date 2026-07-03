import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo3.png";
import { ArrowLeft, Github } from "lucide-react";
import { Moon,Sun } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (

    <header className="w-full border-b border-white/10 bg-black/20 backdrop-blur-2xl">
      <nav className="flex h-20 w-full items-center justify-between px-6 md:px-10 lg:px-16">
        <Link to="/">
          <img
            src={Logo}
            alt="Naqsh"
            className="h-14 w-auto transition-opacity duration-300 hover:opacity-80"
          />
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex btn items-center justify-center rounded-full border  text-white transition-all duration-300 hover:border-white/20 0"
          >
            <ArrowLeft size={18} />
          </button>

       

          <a
            href="https://github.com/aleezazahra/resume-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex btn items-center justify-center rounded-full border  text-white transition-all duration-300 hover:border-white/20 "
          >
            <Github size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;