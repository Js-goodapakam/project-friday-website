import { motion, MotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useMouseParallax } from "../../hooks/useMouseParallax";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE } from "../../lib/motion";
import aiBot from "../../assets/AI Bot.png";

interface TechCardDef {
  label: string;
  sub: string;
  pos: string;
  depth: number;
  to: string;
  icon: JSX.Element;
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#078bd3",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CRMIcon = (
  <svg {...iconProps}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const AutomationIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CommunicationIcon = (
  <svg {...iconProps}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const AIIcon = (
  <svg {...iconProps}>
    <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const TransformationIcon = (
  <svg {...iconProps}>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const SEOIcon = (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TECH_CARDS: TechCardDef[] = [
  { label: "CRM", sub: "Relationships", pos: "top-[6%] left-[2%]", depth: 14, to: "/crm", icon: CRMIcon },
  { label: "Automation", sub: "Workflows", pos: "top-[14%] right-[0%]", depth: 20, to: "/automation", icon: AutomationIcon },
  { label: "Communication", sub: "Connected", pos: "bottom-[16%] left-[0%]", depth: 17, to: "/communication", icon: CommunicationIcon },
  { label: "AI", sub: "Intelligence", pos: "bottom-[6%] right-[6%]", depth: 24, to: "/friday-ai", icon: AIIcon },
  { label: "Transformation", sub: "Modernize", pos: "top-[42%] left-[-6%]", depth: 12, to: "/digital-transformation", icon: TransformationIcon },
  { label: "SEO", sub: "Visibility", pos: "top-[46%] right-[-6%]", depth: 18, to: "/digital-marketing/seo", icon: SEOIcon },
];

export default function HeroVisual() {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMouseParallax();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto aspect-square w-full max-w-[480px]"
    >
      {/* Soft background glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(47,180,224,0.16), rgba(79,201,122,0.08) 45%, transparent 70%)",
        }}
      />

      {/* Slow orbit rings */}
      <div className="absolute inset-[6%] rounded-full border border-ink/[0.06]" />

      <div
        className="absolute inset-[16%] rounded-full border border-ink/[0.08]"
        style={{
          animation: reducedMotion
            ? "none"
            : "friday-orbit-spin 46s linear infinite",
        }}
      />

      <div
        className="absolute inset-[28%] rounded-full border border-dashed border-ink/[0.1]"
        style={{
          animation: reducedMotion
            ? "none"
            : "friday-orbit-spin-reverse 60s linear infinite",
        }}
      />

      {/* Friday AI Bot */}
      <motion.div
        id="friday-character-slot"
        className="absolute inset-[18%] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: reducedMotion ? 0 : [0, -7, 0],
        }}
        transition={{
          opacity: {
            duration: 0.7,
            ease: EASE,
            delay: 0.9,
          },
          scale: {
            duration: 0.7,
            ease: EASE,
            delay: 0.9,
          },
          y: reducedMotion
            ? {
                duration: 0,
              }
            : {
                duration: 4.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.6,
              },
        }}
      >
        <img
          src={aiBot}
          alt="Friday AI Assistant"
          className="relative z-10 h-auto w-[72%] max-w-[260px] object-contain drop-shadow-[0_18px_30px_rgba(11,28,51,0.16)]"
        />
      </motion.div>

      {/* Floating tech cards */}
      {TECH_CARDS.map((card, i) => (
        <FloatingCard
          key={card.label}
          card={card}
          index={i}
          x={x}
          y={y}
          reducedMotion={reducedMotion}
        />
      ))}

      <style>{`
        @keyframes friday-orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes friday-orbit-spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes friday-float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}

function FloatingCard({
  card,
  index,
  x,
  y,
  reducedMotion,
}: {
  card: TechCardDef;
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const translateX = useTransform(x, (v) => v * card.depth);
  const translateY = useTransform(y, (v) => v * card.depth);

  return (
    <motion.div
      className={`absolute ${card.pos}`}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: 0.9 + index * 0.1,
      }}
      style={
        reducedMotion
          ? undefined
          : {
              translateX,
              translateY,
            }
      }
    >
      <Link
        to={card.to}
        className="flex items-center gap-2.5 rounded-2xl border border-ink/[0.06] bg-white/90 px-4 py-3 shadow-[0_8px_24px_-12px_rgba(11,28,51,0.18)] backdrop-blur-sm transition-transform duration-200 hover:scale-[1.04] hover:shadow-[0_12px_28px_-10px_rgba(11,28,51,0.24)]"
        style={{
          animation: reducedMotion
            ? "none"
            : `friday-float ${5 + index}s ease-in-out ${
                index * 0.4
              }s infinite`,
        }}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#078bd3]/10">
          {card.icon}
        </div>

        <div>
          <div className="text-[13px] font-semibold text-ink">
            {card.label}
          </div>

          <div className="text-[11.5px] text-ink/50">
            {card.sub}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
