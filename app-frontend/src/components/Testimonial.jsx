import { testimonialsData } from "../assets/assets";
import { motion } from "motion/react";

function Testimonial() {
  return (
    <section
      className="relative flex flex-col items-center px-6 py-24 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Purple gradient wash behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        {/* ── 5-star row ── */}
        <motion.div
          className="flex gap-1 mb-4"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xl" style={{ color: "#FCD34D" }}>
              ★
            </span>
          ))}
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
          Loved by{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #F472B6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Creators Worldwide
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
          See what people are saying about their experience.
        </motion.p>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col gap-4 p-7 rounded-xl cursor-pointer overflow-hidden"
              style={{
                background: "#12101A",
                border: "1px solid #2D1F4A",
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.4, 0, 0.2, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                borderColor: "#7C3AED",
                boxShadow: "0 0 28px rgba(124,58,237,0.2)",
                y: -4,
              }}
            >
              {/* Quote mark decoration */}
              <span
                className="absolute top-4 right-6 text-6xl leading-none pointer-events-none select-none"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#7C3AED",
                  opacity: 0.1,
                }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(item.stars)].map((_, i) => (
                  <span
                    key={i}
                    className="text-sm"
                    style={{ color: "#FCD34D" }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote text */}
              <p
                className="text-sm sm:text-base text-[#F1F0FF] leading-relaxed flex-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.text}
              </p>

              {/* Divider */}
              <div className="h-px w-full" style={{ background: "#2D1F4A" }} />

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Avatar with gradient border */}
                <div
                  className="p-0.5 rounded-full shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F472B6)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover block"
                    style={{ background: "#1C1828" }}
                  />
                </div>

                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#A855F7",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#6B5F8A",
                    }}
                  >
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
