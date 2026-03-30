import { FeaturesData } from "../assets/assets";
import { motion } from "motion/react";

/* Rotating accent colors per card — cycles if more than 6 items */
const accentColors = [
  { icon: "rgba(124,58,237,0.15)", border: "#7C3AED", text: "#C084FC" }, // purple
  { icon: "rgba(34,211,238,0.15)", border: "#22D3EE", text: "#22D3EE" }, // cyan
  { icon: "rgba(244,114,182,0.15)", border: "#F472B6", text: "#F472B6" }, // pink
  { icon: "rgba(168,85,247,0.15)", border: "#A855F7", text: "#A855F7" }, // purple2
  { icon: "rgba(34,211,238,0.12)", border: "#22D3EE", text: "#22D3EE" }, // cyan
  { icon: "rgba(252,211,77,0.12)", border: "#FCD34D", text: "#FCD34D" }, // gold
];

function Feature() {
  return (
    <section
      id="features"
      className="relative flex flex-col items-center px-6 py-24 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        {/* ── Section badge ── */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5
            text-[#A855F7] text-xs font-semibold tracking-[0.12em] uppercase"
          style={{
            background: "rgba(168,85,247,0.07)",
            border: "1px solid rgba(168,85,247,0.25)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Features
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-[#F1F0FF] text-center
            leading-[1.1] tracking-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Everything You Need{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            to Create
          </span>
        </motion.h2>

        {/* ── Subtext ── */}
        <motion.p
          className="text-base sm:text-lg text-[#A89EC4] text-center max-w-125 mb-16"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Everything you need to create stunning AI-generated images.
        </motion.p>

        {/* ── Feature cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {FeaturesData.map((item, index) => {
            const accent = accentColors[index % accentColors.length];
            return (
              <motion.div
                key={index}
                className="relative flex flex-col gap-5 p-7 rounded-xl cursor-pointer
                  overflow-hidden group"
                style={{
                  background: "#12101A",
                  border: "1px solid #2D1F4A",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  borderColor: accent.border,
                  boxShadow: `0 0 28px ${accent.icon}`,
                  y: -4,
                }}
              >
                {/* Corner glow on hover — decorative */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${accent.icon} 0%, transparent 70%)`,
                  }}
                />

                {/* Icon pill */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1C1828, #2D1F4A)",
                    boxShadow: `0 0 18px ${accent.icon}`,
                    border: `1px solid rgba(124,58,237,0.18)`,
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-lg font-semibold"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: accent.text,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#A89EC4]"
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

export default Feature;
