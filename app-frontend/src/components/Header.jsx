import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const STAGGER = 0.08;
const headlineWords = ["Turn", "Your", "Words", "Into", "Stunning", "Visuals"];
const gradientWords = ["Stunning", "Visuals"];

function Header() {
  const navigate = useNavigate();
  const { user, setShowlogin } = useContext(AppContext);

  const onClickHandler = () => {
    if (user) navigate("/generate");
    else setShowlogin(true);
  };
  
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center
        text-center px-6 pt-18 pb-20 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Purple radial glow */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-175 h-125
          pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.22) 0%, transparent 70%)",
        }}
      />

      {/* All content above overlays */}
      <div className="relative z-10 flex flex-col items-center">
        {/* ── Trust badge ── */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7
            text-[#F472B6] text-xs font-semibold tracking-widest"
          style={{
            background: "rgba(244,114,182,0.1)",
            border: "1px solid rgba(244,114,182,0.3)",
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span>★</span>
          <span>Trusted by 50,000+ Creators</span>
        </motion.div>

        {/* ── Headline — staggered word reveal ── */}
        <h1
          className="flex flex-wrap justify-center gap-x-3 gap-y-1
            font-extrabold leading-[1.05] tracking-tight text-[#F1F0FF]
            text-5xl sm:text-7xl lg:text-[5.5rem] max-w-205"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              style={
                gradientWords.includes(word)
                  ? {
                      background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {}
              }
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.3 + i * STAGGER,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* ── Subtext ── */}
        <motion.p
          className="text-lg sm:text-xl mt-6 max-w-120 leading-[1.7]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#A89EC4" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        >
          AI-powered image generation. No skills needed.
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {/* Primary */}
          <motion.button
            onClick={onClickHandler}
            className="flex items-center gap-3 text-white font-bold text-base
              px-8 py-3.5 rounded-lg cursor-pointer border-none"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "linear-gradient(90deg, #7C3AED, #A855F7)",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 28px rgba(124,58,237,0.55)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Start Generating Free
            <img className="h-5" src={assets.star_group} alt="" />
          </motion.button>

          {/* Ghost */}
          <motion.button
            className="text-[#A89EC4] font-medium text-base px-7 py-3.5
              rounded-lg cursor-pointer bg-transparent transition-colors duration-200
              hover:text-[#F1F0FF]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid #2D1F4A",
            }}
            onClick={() => navigate("/purchase")}
            whileHover={{
              scale: 1.02,
              borderColor: "#7C3AED",
              backgroundColor: "rgba(124,58,237,0.08)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Buy Credits →
          </motion.button>
        </motion.div>

        {/* ── Free credits badge ── */}
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg mt-5
            text-[#22D3EE] text-sm font-semibold"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "rgba(34,211,238,0.06)",
            border: "1px solid rgba(34,211,238,0.25)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.35 }}
        >
          <span>✦</span>
          <span>5 Free Credits on Signup — No card required</span>
        </motion.div>

        {/* ── Image strip ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {Array(6)
            .fill("")
            .map((_, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden shrink-0"
                style={{
                  border: "1px solid rgba(124,58,237,0.35)",
                  boxShadow: "0 0 18px rgba(124,58,237,0.2)",
                }}
                initial={{
                  opacity: 0,
                  y: 24,
                  rotate: index % 2 === 0 ? -2 : 2,
                }}
                animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 2 : -2 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 0,
                  boxShadow: "0 0 32px rgba(124,58,237,0.6)",
                  zIndex: 10,
                }}
              >
                <img
                  src={assets[`sample_img_${index + 1}`]}
                  alt={`AI generated sample ${index + 1}`}
                  className="block w-27.5 h-27.5 max-sm:w-16 max-sm:h-16 object-cover"
                />
              </motion.div>
            ))}
        </motion.div>

        {/* ── Caption ── */}
        <motion.p
          className="text-xs font-medium uppercase tracking-[0.06em] mt-5"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          Generated by Dreamrender AI
        </motion.p>
      </div>
    </section>
  );
}

export default Header;
