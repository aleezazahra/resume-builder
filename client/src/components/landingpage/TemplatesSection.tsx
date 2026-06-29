import { motion } from "framer-motion";

import minimal from "../../assets/minimal.png";
import modern from "../../assets/modern.png";
import minimalimage from "../../assets/minimalimage.png";
import tech from "../../assets/tech.png";
import nexus from "../../assets/nexus.png";
import classic from "../../assets/classic.png";

const templates = [
  {
    name: "Minimal",
    image: minimal,
  },
  {
    name: "Modern",
    image: modern,
  },
  {
    name: "Minimal Image",
    image: minimalimage,
  },
  {
    name: "Tech",
    image: tech,
  },
  {
    name: "Nexus",
    image: nexus,
  },
  {
    name: "Classic",
    image: classic,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TemplatesSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-28 px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-white/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 flex flex-col items-center gap-4 text-center"
        >
          <h1 className="text-5xl font-semibold text-white md:text-6xl">
            Templates
          </h1>

          <p className="max-w-3xl text-sm uppercase tracking-[0.35em] text-white/40">
            Highly customizable templates. Currently six available, with more
            coming soon.
          </p>
        </motion.div>

        {/* Templates */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {templates.map((template, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
            >
              {/* Image */}
              <img
                src={template.image}
                alt={template.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -bottom-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              </div>

              {/* Name */}
              <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 transition-all duration-500 group-hover:translate-y-0">
                <h3 className="text-xl font-semibold text-white">
                  {template.name}
                </h3>

                <p className="mt-2 text-sm text-white/70 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100">
                  Fully customizable • ATS Friendly
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesSection;