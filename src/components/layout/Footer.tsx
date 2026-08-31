import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "../../lib/motion";
import fridayLogo from "../../assets/friday-logo-full.png";

const PRODUCT_LINKS = [
  { label: "CRM", href: "/crm" },
  { label: "Automation", href: "/automation" },
  { label: "Communication", href: "/communication" },
  { label: "AI", href: "/ai" },
];

const COMPANY_LINKS = [
  { label: "Vision", href: "/vision" },
  { label: "Industries", href: "/industries" },
  { label: "Let's Talk", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE }}
      className="border-t border-ink/[0.06] bg-[#fbfcfd] px-5 pb-10 pt-16 sm:px-8 md:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={fridayLogo} alt="Friday Innovation" className="h-16 w-auto" draggable={false} />
          <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-ink/50">
            Friday connects your CRM, automation, communication, and AI into one
            system — so your business runs like it has a second brain.
          </p>
        </div>

        <div>
          <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/40">
            Product
          </div>
          <ul className="mt-4 space-y-3">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-[14.5px] text-ink/65 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[12px] font-semibold uppercase tracking-wider text-ink/40">
            Company
          </div>
          <ul className="mt-4 space-y-3">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-[14.5px] text-ink/65 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col-reverse items-center justify-between gap-4 border-t border-ink/[0.06] pt-6 sm:flex-row">
        <span className="text-[13px] text-ink/40">
          © {year} Friday Innovation. All rights reserved.
        </span>
        <span className="text-[12.5px] font-medium uppercase tracking-wider text-ink/35">
          Innovate · Automate · Elevate
        </span>
      </div>
    </motion.footer>
  );
}
