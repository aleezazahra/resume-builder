import {
  BadgeCheck,
  Sparkles,
 FileText,
  Globe,
  Palette,
  Infinity,
  BrainCircuit,
  ShieldCheck,
  Ban,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      name: "Free Forever",
      desc: "Completely free with no hidden costs.",
      icon: <BadgeCheck size={28} />,
    },
    {
      name: "No Ads",
      desc: "Enjoy a clean, distraction-free experience.",
      icon: <Ban size={28} />,
    },
    {
      name: "Open Source",
      desc: "Built for the community and open to everyone.",
      icon: <Globe size={28} />,
    },
    {
      name: "PDF Export",
      desc: "Generate beautiful PDF resumes instantly.",
      icon: <FileText size={28} />,
    },
    {
      name: "Unlimited Resumes",
      desc: "Create and manage as many resumes as you like.",
      icon: <Infinity size={28} />,
    },
    {
      name: "Flexible Templates",
      desc: "Customize layouts and colors effortlessly.",
      icon: <Palette size={28} />,
    },
    {
      name: "ATS Friendly",
      desc: "Optimized for Applicant Tracking Systems.",
      icon: <ShieldCheck size={28} />,
    },
    {
      name: "AI Enhancements",
      desc: "Improve summaries and job descriptions instantly.",
      icon: <BrainCircuit size={28} />,
    },
    {
      name: "Share Anywhere",
      desc: "Share your resume with a simple public link.",
      icon: <Sparkles size={28} />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-28 px-6">

      <div className="absolute left-1/2 top-0 h-[450px] w-[450px]  rounded-full bg-white/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
            Everything you need
          </p>

          <h2 className="text-5xl font-semibold text-white md:text-6xl">
            Features built for
            <span className="block text-white/50">modern resumes.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-300 ">
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {feature.name}
                </h3>

                <p className="leading-7 text-white/55">
                  {feature.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;