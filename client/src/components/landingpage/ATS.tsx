"use client";

import { motion } from "framer-motion";

const templates = [
  { name: "Minimal", score: 98 },
  { name: "Classic", score: 97 },
  { name: "Modern", score: 96 },
  { name: "Tech", score: 95 },
  { name: "Nexus", score: 92 },
  { name: "Minimal Image", score: 89 },
];

const features = [
  {
    title: "Single-column layouts",
    desc: "Multi-column resumes confuse parsers. We don't use them.",
  },
  {
    title: "Readable fonts",
    desc: "System and standard fonts only — no custom glyphs that break on scan.",
  },
  {
    title: "Standard section headings",
    desc: "\"Experience,\" not \"My Journey.\" ATS software looks for known labels.",
  },
  {
    title: "Proper PDF export",
    desc: "Text stays selectable. No flattened images, no embedded fonts that fail.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const ATS = () => {
  return (
    <section className="bg-black px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
            Applicant Tracking Systems
          </p>
          <h1 className="max-w-2xl text-4xl font-medium leading-[1.2] text-white md:text-5xl">
            What makes a template ATS-friendly?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/50">
            Most companies scan resumes with software before a person reads
            them. A template only counts as ATS-friendly if its structure
            survives that scan — layout, headings, fonts, and export all
            matter more than how it looks on screen.
          </p>
        </motion.div>

        <div className="mt-20 space-y-10">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
              className="grid grid-cols-[2.5rem_1fr] gap-6 md:grid-cols-[2.5rem_14rem_1fr]"
            >
              <span className="font-mono text-sm text-white/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-white/45">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-28">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.8 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 text-2xl font-medium text-white"
          >
            ATS score by template
          </motion.h2>

          <div className="space-y-5">
            {templates.map((template, i) => (
              <motion.div
                key={template.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                variants={fadeUp}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: i * 0.05,
                }}
                className="flex items-center gap-6"
              >
                <span className="w-36 shrink-0 text-sm text-white/70">
                  {template.name}
                </span>

                <div className="h-1.5 flex-1 overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${template.score}%` }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.05,
                    }}
                    className="h-full bg-white"
                  />
                </div>

                <span className="w-10 shrink-0 text-right text-sm tabular-nums text-white/70">
                  {template.score}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-xs text-white/30">
            Scores reflect adherence to layout, structure, and parsing best
            practices — not a guarantee of any specific outcome.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ATS;