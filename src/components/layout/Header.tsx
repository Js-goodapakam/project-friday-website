import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { EASE, staggerContainer } from "../../lib/motion";
import fridayMark from "../../assets/friday-header-mark.png";

interface NavLinkItem {
  label: string;
  href: string;
}

interface NavGroup {
  heading?: string;
  headingHref?: string;
  items: NavLinkItem[];
}

type NavEntry =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "dropdown";
      label: string;
      groups: NavGroup[];
    };

const NAV: NavEntry[] = [
  {
    type: "link",
    label: "Home",
    href: "/",
  },

  {
    type: "dropdown",
    label: "Solutions",
    groups: [
      {
        items: [
          {
            label: "CRM & Customer Management",
            href: "/crm",
          },
          {
            label: "Business Automation",
            href: "/automation",
          },
          {
            label: "Customer Communication",
            href: "/communication",
          },
          {
            label: "AI-Powered Business",
            href: "/friday-ai",
          },
          {
            label: "Digital Transformation",
            href: "/digital-transformation",
          },
        ],
      },
    ],
  },

  {
    type: "dropdown",
    label: "Services",
    groups: [
      {
        items: [
          {
            label: "Automation",
            href: "/automation",
          },
          {
            label: "Communication",
            href: "/communication",
          },
          {
            label: "Friday AI",
            href: "/friday-ai",
          },
        ],
      },

      {
        heading: "Digital Marketing",
        headingHref: "/digital-marketing",
        items: [
          {
            label: "Branding",
            href: "/digital-marketing/branding",
          },
          {
            label: "Website Development",
            href: "/digital-marketing/website-development",
          },
          {
            label: "SEO",
            href: "/digital-marketing/seo",
          },
        ],
      },
    ],
  },

  {
    type: "link",
    label: "Industries",
    href: "/industries",
  },

  {
    type: "link",
    label: "Vision",
    href: "/vision",
  },

  {
    type: "dropdown",
    label: "Company",
    groups: [
      {
        items: [
          {
            label: "About Friday",
            href: "/about",
          },
          {
            label: "Resources",
            href: "/resources",
          },
          {
            label: "Contact",
            href: "/contact",
          },
        ],
      },
    ],
  },
];

const logoVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

const navItemVariants = {
  hidden: {
    opacity: 0,
    y: -6,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
};

const ctaVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },

  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      className="transition-transform duration-200"
      style={{
        transform: open ? "rotate(180deg)" : "none",
      }}
      aria-hidden="true"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const { scrollY } = useScroll();

  const paddingY = useTransform(
    scrollY,
    [0, 140],
    [22, 12]
  );

  const bgOpacity = useTransform(
    scrollY,
    [0, 140],
    [0, 1]
  );

  const blurPx = useTransform(
    scrollY,
    [0, 140],
    [0, 14]
  );

  const backdropFilter = useTransform(
    blurPx,
    (value) => `blur(${value}px)`
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] =
    useState<string | null>(null);

  const [openLabel, setOpenLabel] =
    useState<string | null>(null);

  const closeTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const location = useLocation();

  useEffect(() => {
    setOpenLabel(null);
    setMenuOpen(false);
    setMobileOpenGroup(null);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setOpenLabel(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    closeTimer.current = setTimeout(() => {
      setOpenLabel(null);
    }, 150);
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border-b border-ink/5"
          style={{
            backgroundColor: "#fbfcfdf2",
            opacity: bgOpacity,
            backdropFilter,
          }}
        />

        <motion.div
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <motion.div variants={logoVariants}>
            <Link
              to="/"
              className="block"
              aria-label="Friday Home"
            >
              <img
                src={fridayMark}
                alt="Friday"
                className="h-11 w-auto sm:h-[52px]"
                draggable={false}
              />
            </Link>
          </motion.div>

          <nav
            className="hidden items-center gap-6 text-[14.5px] text-ink/70 md:flex"
            aria-label="Primary navigation"
            onMouseLeave={scheduleClose}
          >
            {NAV.map((entry) => {
              if (entry.type === "link") {
                return (
                  <motion.div
                    key={entry.label}
                    variants={navItemVariants}
                  >
                    <Link
                      to={entry.href}
                      className="transition-colors hover:text-ink"
                    >
                      {entry.label}
                    </Link>
                  </motion.div>
                );
              }

              const isOpen =
                openLabel === entry.label;

              return (
                <motion.div
                  key={entry.label}
                  variants={navItemVariants}
                  className="relative"
                  onMouseEnter={() =>
                    openMenu(entry.label)
                  }
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 transition-colors hover:text-ink"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenLabel(
                        isOpen ? null : entry.label
                      )
                    }
                  >
                    {entry.label}

                    <ChevronIcon open={isOpen} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -6,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -6,
                        }}
                        transition={{
                          duration: 0.18,
                          ease: EASE,
                        }}
                        onMouseEnter={() =>
                          openMenu(entry.label)
                        }
                        className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(11,28,51,0.25)]"
                      >
                        <div className="flex gap-9">
                          {entry.groups.map(
                            (group, groupIndex) => (
                              <div
                                key={groupIndex}
                                className="min-w-[190px]"
                              >
                                {group.heading &&
                                  (group.headingHref ? (
                                    <Link
                                      to={group.headingHref}
                                      className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-ink/40 hover:text-ink/60"
                                    >
                                      {group.heading}
                                    </Link>
                                  ) : (
                                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink/40">
                                      {group.heading}
                                    </div>
                                  ))}

                                <ul className="space-y-2.5">
                                  {group.items.map(
                                    (item) => (
                                      <li
                                        key={item.href}
                                      >
                                        <Link
                                          to={item.href}
                                          className="block text-[14px] leading-snug text-ink/70 transition-colors hover:text-ink"
                                        >
                                          {item.label}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            variants={ctaVariants}
            className="hidden md:block"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-ink/85"
            >
              Let&apos;s Talk

              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </motion.div>

          <motion.button
            variants={ctaVariants}
            type="button"
            className="flex flex-col gap-[5px] md:hidden"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            <span
              className="h-[2px] w-6 bg-ink transition-transform duration-300"
              style={{
                transform: menuOpen
                  ? "rotate(45deg) translateY(6px)"
                  : "none",
              }}
            />

            <span
              className="h-[2px] w-6 bg-ink transition-opacity duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
              }}
            />

            <span
              className="h-[2px] w-6 bg-ink transition-transform duration-300"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-6px)"
                  : "none",
              }}
            />
          </motion.button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: EASE,
            }}
            className="fixed inset-0 z-40 flex flex-col gap-1 overflow-y-auto bg-white/98 px-8 pb-10 pt-28 backdrop-blur-sm md:hidden"
          >
            {NAV.map((entry) => {
              if (entry.type === "link") {
                return (
                  <Link
                    key={entry.label}
                    to={entry.href}
                    className="border-b border-ink/5 py-4 text-[20px] font-medium text-ink"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    {entry.label}
                  </Link>
                );
              }

              const expanded =
                mobileOpenGroup === entry.label;

              return (
                <div
                  key={entry.label}
                  className="border-b border-ink/5"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-[20px] font-medium text-ink"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileOpenGroup(
                        expanded ? null : entry.label
                      )
                    }
                  >
                    {entry.label}

                    <ChevronIcon
                      open={expanded}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: EASE,
                        }}
                        className="overflow-hidden"
                      >
                        {entry.groups.map(
                          (group, groupIndex) => (
                            <div
                              key={groupIndex}
                              className="pb-3 pl-2"
                            >
                              {group.heading && (
                                <div className="mb-1 mt-2 text-[11px] font-semibold uppercase tracking-wider text-ink/35">
                                  {group.heading}
                                </div>
                              )}

                              {group.items.map(
                                (item) => (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    className="block py-2 text-[16px] text-ink/65"
                                    onClick={() =>
                                      setMenuOpen(
                                        false
                                      )
                                    }
                                  >
                                    {item.label}
                                  </Link>
                                )
                              )}
                            </div>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <Link
              to="/contact"
              className="mt-5 text-[20px] font-medium text-ink underline underline-offset-4"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}