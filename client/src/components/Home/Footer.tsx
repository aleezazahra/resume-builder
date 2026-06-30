import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black px-6 pt-16 text-white/50 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col justify-between gap-12 border-b border-white/10 pb-12 md:flex-row">
        {/* Left */}
        <div className="max-w-sm">
          <h3 className="text-2xl font-semibold text-white">Naqsh</h3>

          <p className="mt-4 text-sm leading-7 text-white/40">
            A free and open-source resume builder with customizable templates,
            AI-powered writing assistance, PDF export, and shareable resume
            links.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-16">
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="transition hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#templates" className="transition hover:text-white">
                  Templates
                </a>
              </li>

              <li>
                <a href="#faq" className="transition hover:text-white">
                  FAQ
                </a>
              </li>

              <li>
                <Link to="/app" className="transition hover:text-white">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/aleezazahra/resume-builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://horizons.hackclub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Hack Club Horizons
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/40 md:flex-row md:text-sm">
        <p>© {new Date().getFullYear()} Naqsh. All rights reserved.</p>

        <p>
          Made by{" "}
          <a
            href="https://aleezazahra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 underline underline-offset-4 transition-colors hover:text-white"
          >
            aleeza
          </a>{" "}
          with 🩷 for{" "}
          <a
            href="https://horizons.hackclub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 underline underline-offset-4 transition-colors hover:text-white"
          >
            Hack Club Horizons
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;