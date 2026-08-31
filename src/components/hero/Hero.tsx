import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EASE } from "../../lib/motion";
import HeroVisual from "./HeroVisual";

const HEADLINE_LINES = ["Technology that", "moves with", "you."];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 sm:px-8 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-8">
        {/* Text column */}
        <div>
          <h1 className="text-[38px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[52px] md:text-[58px]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.45 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/60 sm:text-[18px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
          >
            Friday connects your CRM, automation, communication, and AI into one
            system — so your business runs like it has a second brain.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
          >
            <Link
              to="/crm"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-ink/85"
            >
              Explore Friday
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              to="/vision"
              className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              See our vision
              <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
            </Link>
          </motion.div>
        </div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
