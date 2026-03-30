import { stepsData } from "../assets/assets";
import { motion } from "motion/react";

/* Step number glow colors per card */
const stepColors = [
  { num: "01", glow: "rgba(34,211,238,0.15)", numColor: "#22D3EE" },
  { num: "02", glow: "rgba(124,58,237,0.15)", numColor: "#A855F7" },
  { num: "03", glow: "rgba(244,114,182,0.15)", numColor: "#F472B6" },
];

function Step() {
  return (
    <section
      className="relative flex flex-col items-center px-6 py-24 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Subtle section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* ── Section badge ── */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5
            text-[#22D3EE] text-xs font-semibold tracking-[0.12em] uppercase"
          style={{
            background: "rgba(34,211,238,0.07)",
            border: "1px solid rgba(34,211,238,0.25)",
          }}
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.div>

        {/* ── Section heading ── */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-[#F1F0FF] text-center
            leading-[1.1] tracking-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Simple as{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            1, 2, 3
          </span>
        </motion.h2>

        {/* ── Subtext ── */}
        <motion.p
          className="text-base sm:text-lg text-[#A89EC4] text-center max-w-120 mb-16"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Create stunning AI images in just a few simple steps.
        </motion.p>

        {/* ── Steps ── */}
        <div className="relative w-full flex flex-col gap-5">
          {/* Connecting dashed line — desktop */}
          <div
            className="hidden sm:block absolute left-9.75 top-14 bottom-14 w-px pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #7C3AED 0px, #7C3AED 6px, transparent 6px, transparent 14px)",
            }}
          />

          {stepsData.map((item, index) => {
            const { num, glow, numColor } = stepColors[index] ?? stepColors[0];
            return (
              <motion.div
                key={index}
                className="relative flex gap-5 sm:gap-7 p-6 sm:p-8 rounded-xl cursor-pointer
                  transition-transform duration-300 group"
                style={{
                  background: "#12101A",
                  border: "1px solid #2D1F4A",
                }}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  borderColor: "#7C3AED",
                  boxShadow: `0 0 28px rgba(124,58,237,0.22)`,
                  scale: 1.005,
                }}
              >
                {/* Step number watermark */}
                <span
                  className="absolute right-6 top-4 font-extrabold text-6xl leading-none
                    pointer-events-none select-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: numColor,
                    opacity: 0.08,
                  }}
                >
                  {num}
                </span>

                {/* Icon pill */}
                <div
                  className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center
                    justify-center relative z-10"
                  style={{
                    background: `linear-gradient(135deg, #1C1828, #2D1F4A)`,
                    boxShadow: `0 0 20px ${glow}`,
                    border: `1px solid rgba(124,58,237,0.2)`,
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center relative z-10">
                  {/* Step label */}
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: numColor,
                    }}
                  >
                    Step {index + 1}
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-semibold text-[#F1F0FF] mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-[#A89EC4] leading-relaxed max-w-120"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Step;
