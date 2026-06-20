
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  Layout,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const LandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const features = [
    {
      icon: <Sparkles className="w-10 h-10 text-yellow-400" />,
      title: "AI Resume Builder",
      desc: "Generate professional resumes in minutes using AI-powered suggestions.",
    },
    {
      icon: <Layout className="w-10 h-10 text-yellow-400" />,
      title: "Modern Templates",
      desc: "Choose from beautiful ATS-friendly resume templates.",
    },
    {
      icon: <Download className="w-10 h-10 text-yellow-400" />,
      title: "PDF Export",
      desc: "Download your resume instantly as a high-quality PDF.",
    },
    {
      icon: <FileText className="w-10 h-10 text-yellow-400" />,
      title: "Live Preview",
      desc: "See every change in real time while building your resume.",
    },
  ];

  const faqs = [
    {
      question: "Is the resume builder free?",
      answer:
        "Yes, you can start building your resume for free and access professional templates.",
    },
    {
      question: "Can I download my resume as PDF?",
      answer:
        "Absolutely. You can export your resume as a PDF with a single click.",
    },
    {
      question: "Are the templates ATS-friendly?",
      answer:
        "Yes. All templates are optimized for Applicant Tracking Systems.",
    },
    {
      question: "Can I edit my resume later?",
      answer:
        "Yes. Simply log in to your account and continue editing anytime.",
    },
    {
      question: "Do I need design skills?",
      answer:
        "No. Our builder handles the design so you can focus on your content.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Resume<span className="text-yellow-400">Builder</span>
        </h1>

        <Link
          to="/login"
          className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Build Better Resumes
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight">
              Build a Resume
              <span className="text-yellow-400"> That Gets You Hired</span>
            </h1>

            <p className="text-zinc-400 text-lg mt-6 max-w-xl">
              Create professional, ATS-friendly resumes in minutes.
              Choose a template, customize your details, and download
              instantly.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/app?state=register"
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition"
              >
                Build Resume
              </Link>

              <Link
                to="/login"
                className="border border-yellow-400 px-8 py-4 rounded-xl hover:bg-yellow-400 hover:text-black transition"
              >
                Signup
              </Link>
            </div>
          </div>

          {/* Resume Preview */}
          
          </div>

      </section>


      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
           Features
          </h2>

          <p className="text-zinc-400 mt-4">
            Everything you need to build a professional resume.
          </p>
        </div>

       
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="text-zinc-400 mt-4">
            Everything you need to know.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-yellow-400/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-medium">
                  {faq.question}
                </span>

                {openFAQ === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {openFAQ === index && (
                <div className="px-6 pb-6 text-zinc-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500">
        © 2026 ResumeBuilder. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

