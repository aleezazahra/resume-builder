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

const Hero = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const features = [
    {
      icon: <Sparkles className="w-10 h-10 text-yellow-400" />,
      title: "AI Resume Builder",
      desc: "Generate professional resumes in minutes.",
    },
    {
      icon: <Layout className="w-10 h-10 text-yellow-400" />,
      title: "Modern Templates",
      desc: "ATS-friendly professional designs.",
    },
    {
      icon: <Download className="w-10 h-10 text-yellow-400" />,
      title: "PDF Export",
      desc: "Download resumes instantly.",
    },
    {
      icon: <FileText className="w-10 h-10 text-yellow-400" />,
      title: "Live Preview",
      desc: "See changes in real time.",
    },
  ];

  const faqs = [
    {
      question: "Is it free?",
      answer: "Yes, basic usage is free.",
    },
    {
      question: "Can I download PDF?",
      answer: "Yes, one-click export.",
    },
    {
      question: "Can I edit later?",
      answer: "Yes, saved in dashboard.",
    },
    {
      question: "Do I need design skills?",
      answer: "No, everything is automated.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">

      {/* NAV */}
      <nav className="flex justify-between px-6 py-6">
        <h1 className="text-2xl font-bold">
          Resume<span className="text-yellow-400">Builder</span>
        </h1>

        <Link
          to="/login"
          className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      </nav>

      {/* HERO */}
      <section className="px-6 py-20 grid lg:grid-cols-2 gap-12">

        <div>
          <h1 className="text-5xl font-bold">
            Build a Resume{" "}
            <span className="text-yellow-400">
              That Gets You Hired
            </span>
          </h1>

          <p className="text-gray-400 mt-6">
            Create ATS-friendly resumes in minutes.
          </p>

          <div className="flex gap-4 mt-10">

            {/* ✅ FIXED ROUTE */}
            <Link
              to="/app"
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold"
            >
              Build Resume
            </Link>

            <Link
              to="/login"
              className="border border-yellow-400 px-6 py-3 rounded-xl"
            >
              Login
            </Link>

          </div>
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-zinc-900 p-6 rounded-xl">
            {f.icon}
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        {faqs.map((faq, i) => (
          <div key={i} className="mb-4 bg-zinc-900 rounded-lg">

            <button
              onClick={() =>
                setOpenFAQ(openFAQ === i ? null : i)
              }
              className="w-full flex justify-between p-4"
            >
              {faq.question}
              {openFAQ === i ? <ChevronUp /> : <ChevronDown />}
            </button>

            {openFAQ === i && (
              <div className="p-4 text-gray-400">
                {faq.answer}
              </div>
            )}

          </div>
        ))}
      </section>

    </div>
  );
};

export default Hero;