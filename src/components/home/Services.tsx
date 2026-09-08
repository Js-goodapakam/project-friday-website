import { motion } from "framer-motion";
import { EASE, viewportOnce, staggerContainer } from "../../lib/motion";

const SERVICES = [
  {
    title: "Automation",
    items: ["Workflow automation", "Business process automation", "API integration"],
  },
  {
    title: "Communication",
    items: ["Cloud telephony", "Contact center", "WhatsApp solutions"],
  },
  {
    title: "Friday AI",
    items: ["Voice AI", "AI agents", "Conversational AI"],
  },
  {
    title: "Digital Marketing",
    items: ["Branding", "Website development", "SEO"],
  },
];

const colVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Services() {
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
            Everything your business needs to move forward.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid divide-y divide-ink/[0.07] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={colVariants}
              className="py-6 sm:px-8 sm:py-0 first:pl-0"
            >
              <h3 className="text-[16px] font-semibold text-ink">
                {service.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] leading-snug text-ink/55"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
