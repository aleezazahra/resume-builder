"use client";

import { motion } from "framer-motion";
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

const features = [
  {
    name: "Free Forever",
    desc: "No paywalls, no trials, no credit card. Every feature, every time.",
    icon: BadgeCheck,
  },
  {
    name: "AI Enhancements",
    desc: "Rewrite weak bullet points into outcomes recruiters actually notice.",
    icon: BrainCircuit,
  },
  {
    name: "ATS Friendly",
    desc: "Clean markup that parses correctly in every tracking system.",
    icon: ShieldCheck,
  },
  {
    name: "No Ads",
    desc: "A quiet, focused workspace. Nothing competing for your attention.",
    icon: Ban,
  },
  {
    name: "Open Source",
    desc: "Inspect the code, fork it, or contribute back.",
    icon: Globe,
  },
  {
    name: "PDF Export",
    desc: "Print-ready exports in seconds, no formatting drift.",
    icon: FileText,
  },
  {
    name: "Unlimited Resumes",
    desc: "Tailor a version for every role without losing track.",
    icon: Infinity,
  },
  {
    name: "Flexible Templates",
    desc: "Swap layouts and palettes without rebuilding content.",
    icon: Palette,
  },
  {
    name: "Share Anywhere",
    desc: "One public link, always up to date.",
    icon: Sparkles,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Features = () => {
  return (
    <section id="features" className="bg-black px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Capabilities
          </p>
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.15] text-white md:text-5xl">
            Everything a modern resume needs. Nothing it doesn&apos;t.
          </h2>
        </motion.div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.05,
                }}
                className="group grid grid-cols-[3rem_2.5rem_1fr] items-start gap-6 py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[3rem_2.5rem_16rem_1fr] md:items-center"
              >
                <span className="font-mono text-sm text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-white/50 transition-colors duration-300 group-hover:text-white"
                />

                <h3 className="text-lg font-medium text-white">
                  {feature.name}
                </h3>

                <p className="text-sm leading-relaxed text-white/40 md:text-right">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;