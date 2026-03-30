import { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

function Final() {
  const navigate = useNavigate();
  const { user, setShowlogin } = useContext(AppContext);

  const onClickHandler = () => {
    if (user) navigate("/generate");
    else setShowlogin(true);
  };

  return (
    <section
      className="relative flex flex-col items-center px-6 py-24 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Full-width dark card with gradient purple glow bg */}
      <motion.div
        className="relative z-10 w-full max-w-5xl rounded-2xl flex flex-col
          items-center text-center px-8 py-16 sm:py-20 overflow-hidden"
        style={{
          background: "#12101A",
          border: "1px solid #2D1F4A",
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
      >
        {/* Inner purple glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.25) 0%, transparent 65%)",
          }}
        />

        {/* Decorative blurred orbs */}
        <div
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(124,58,237,0.12)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(244,114,182,0.1)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8
              text-[#22D3EE] text-xs font-semibold tracking-[0.12em] uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "rgba(34,211,238,0.07)",
              border: "1px solid rgba(34,211,238,0.25)",
            }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            ✦ Start for free today
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]
              tracking-tight mb-6 max-w-175"
            style={{ fontFamily: "'Syne', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Next Masterpiece
            </span>
            <br />
            <span className="text-[#F1F0FF]">is One Prompt Away</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg text-[#A89EC4] max-w-120 mb-10 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join 50,000+ creators. Start free. No credit card required.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Primary */}
            <motion.button
              onClick={onClickHandler}
              className="flex items-center gap-3 text-white font-bold text-base sm:text-lg
                px-9 py-4 rounded-lg cursor-pointer border-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "linear-gradient(90deg, #7C3AED, #A855F7)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 36px rgba(124,58,237,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Start Generating Now →
              <img className="h-5" src={assets.star_group} alt="" />
            </motion.button>

            {/* Ghost */}
            <motion.button
              onClick={() => navigate("/purchase")}
              className="text-[#A89EC4] font-medium text-base sm:text-lg
                px-8 py-4 rounded-lg cursor-pointer bg-transparent"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                border: "1px solid #2D1F4A",
              }}
              whileHover={{
                scale: 1.02,
                borderColor: "#7C3AED",
                color: "#F1F0FF",
                backgroundColor: "rgba(124,58,237,0.08)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              See Pricing Plans
            </motion.button>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-5 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            viewport={{ once: true }}
          >
            {[
              "✦ 5 free credits on signup",
              "✦ No credit card needed",
              "✦ Cancel anytime",
            ].map((text) => (
              <span
                key={text}
                className="text-xs font-medium"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B5F8A",
                }}
              >
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Final;
