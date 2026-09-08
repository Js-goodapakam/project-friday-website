import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EASE, viewportOnce, staggerContainer } from "../../lib/motion";

const SOLUTIONS = [
  {
    title: "CRM & Customer Management",
    body: "Smarter relationships, better visibility, and stronger customer journeys.",
    href: "/crm",
  },
  {
    title: "Business Automation",
    body: "Automate repetitive work and improve business efficiency.",
    href: "/automation",
  },
  {
    title: "Customer Communication",
    body: "Connect every conversation across voice, chat, and WhatsApp.",
    href: "/communication",
  },
  {
    title: "AI-Powered Business",
    body: "Bring intelligence into everyday decisions and processes.",
    href: "/friday-ai",
  },
  {
    title: "Digital Transformation",
    body: "Build modern, scalable, and future-ready business operations.",
    href: "/digital-transformation",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Solutions() {
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
            Solutions built around your business.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink/60">
            From customer relationships to intelligent automation, Friday
            brings the right technology together.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((item) => (
            <motion.div key={item.title} variants={cardVariants} className="h-full">
              <Link
                to={item.href}
                className="group flex h-full flex-col rounded-2xl border border-[#dceaf4] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(7,26,51,0.28)]"
              >
                <h3 className="text-[17px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/55">
                  {item.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#078bd3]">
                  Explore
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
