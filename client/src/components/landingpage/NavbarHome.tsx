import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Github } from "lucide-react";
import Logo from "../../assets/logo3.png";

const NavbarHome = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 md:px-8 pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border transition-all duration-300
        ${
          scrolled
            ? "border-white/15 bg-black/70 shadow-2xl backdrop-blur-2xl"
            : "border-white/10 bg-white/5 backdrop-blur-xl"
        }
        px-6 py-3`}
      >
      
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Naqsh"
            className="h-14 w-auto object-contain"
          />
        </Link>

   
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#templates"
            className="text-sm text-white/70 transition hover:text-white"
          >
            Templates
          </a>

          <a
            href="#faq"
            className="text-sm text-white/70 transition hover:text-white"
          >
            FAQ
          </a>

          <Link
            to="https://github.com/aleezazahra/resume-builder"
            target="_blank"
            className="text-white/70 transition hover:text-white"
          >
            <Github size={22} />
          </Link>

          <button
            onClick={() => navigate("/app")}
            className="rounded-xl border border-white/15 bg-white/10 px-5 py-2 font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white hover:text-black"
          >
            Get Started
          </button>
        </div>

    
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-white md:hidden"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

 
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileMenu
            ? "mt-3 max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl p-6">
          <div className="flex flex-col gap-5">
            <a
              href="#features"
              className="text-white/70 hover:text-white"
              onClick={() => setMobileMenu(false)}
            >
              Features
            </a>

            <a
              href="#templates"
              className="text-white/70 hover:text-white"
              onClick={() => setMobileMenu(false)}
            >
              Templates
            </a>

            <a
              href="#faq"
              className="text-white/70 hover:text-white"
              onClick={() => setMobileMenu(false)}
            >
              FAQ
            </a>

            <Link
              to="https://github.com/aleezazahra/resume-builder"
              target="_blank"
              className="flex items-center gap-2 text-white/70 hover:text-white"
            >
              <Github size={20} />
              GitHub
            </Link>

            <button
              onClick={() => navigate("/app")}
              className="mt-2 rounded-xl bg-white py-3 font-semibold text-black transition hover:opacity-90"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavbarHome;