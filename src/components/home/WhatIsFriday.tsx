import { motion } from "framer-motion";
import { EASE, viewportOnce, staggerContainer } from "../../lib/motion";

const PILLARS = [
  {
    title: "Innovate",
    body: "New ideas, built into working software fast.",
  },
  {
    title: "Automate",
    body: "Repetitive work moves to the background.",
  },
  {
    title: "Elevate",
    body: "Every team works from better information.",
  },
  {
    title: "Secure",
    body: "Reliability and security by default.",
  },
];

const pillarVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function WhatIsFriday() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-xl"
        >
          <h2 className="text-[30px] font-semibold leading-tight tracking-tight text-ink sm:text-[36px]">
            Technology should feel simpler.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink/60">
            Friday brings CRM, automation, communication, and AI together so
            businesses can focus on customers, people, and growth — one
            connected system instead of five disconnected tools.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-x-8 gap-y-10 border-t border-ink/[0.08] pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((pillar) => (
            <motion.div key={pillar.title} variants={pillarVariants}>
              <h3 className="text-[18px] font-semibold text-ink">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink/55">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
