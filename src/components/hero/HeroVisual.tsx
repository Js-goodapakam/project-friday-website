import { motion, MotionValue, useTransform } from "framer-motion";
import { useMouseParallax } from "../../hooks/useMouseParallax";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE } from "../../lib/motion";
import aiBot from "../../assets/AI Bot.png";

interface TechCardDef {
  label: string;
  sub: string;
  pos: string;
  depth: number;
}

const TECH_CARDS: TechCardDef[] = [
  { label: "CRM", sub: "Relationships", pos: "top-[6%] left-[2%]", depth: 14 },
  { label: "Automation", sub: "Workflows", pos: "top-[14%] right-[0%]", depth: 20 },
  { label: "Communication", sub: "Connected", pos: "bottom-[16%] left-[0%]", depth: 17 },
  { label: "AI", sub: "Intelligence", pos: "bottom-[6%] right-[6%]", depth: 24 },
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
      <div
        className="rounded-2xl border border-ink/[0.06] bg-white/90 px-4 py-3 shadow-[0_8px_24px_-12px_rgba(11,28,51,0.18)] backdrop-blur-sm"
        style={{
          animation: reducedMotion
            ? "none"
            : `friday-float ${5 + index}s ease-in-out ${
                index * 0.4
              }s infinite`,
        }}
      >
        <div className="text-[13px] font-semibold text-ink">
          {card.label}
        </div>

        <div className="text-[11.5px] text-ink/50">
          {card.sub}
        </div>
      </div>
    </motion.div>
  );
}