import { useContext, useState } from "react";
import { assets, plans, FAQ_ITEMS } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

/* Map plan index → accent colors */
const PLAN_ACCENTS = [
  {
    border: "#2D1F4A",
    borderHover: "#A89EC4",
    badge: null,
    btnBg: "linear-gradient(90deg,#2D1F4A,#1C1828)",
    btnColor: "#A89EC4",
  },
  {
    border: "#7C3AED",
    borderHover: "#A855F7",
    badge: "★ Most Popular",
    btnBg: "linear-gradient(90deg,#7C3AED,#A855F7)",
    btnColor: "#fff",
  },
  {
    border: "#22D3EE",
    borderHover: "#22D3EE",
    badge: null,
    btnBg: "linear-gradient(90deg,#0891B2,#22D3EE)",
    btnColor: "#fff",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        background: "#12101A",
        border: `1px solid ${open ? "#7C3AED" : "#2D1F4A"}`,
      }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <span
          className="text-sm font-medium text-[#F1F0FF]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {q}
        </span>
        <span
          className="text-lg shrink-0 transition-transform duration-300"
          style={{
            color: "#7C3AED",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed text-[#A89EC4]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Purchase() {
  const { user, loadCreditsData, backend_url, token, setShowlogin } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly"); // "monthly" | "annual"

  const initPay = async (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Dreamrender Credits",
      description: "Credits purchase",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backend_url + "/api/users/verify-payment",
            response,
            { headers: { token } },
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowlogin(true);
        return;
      }
      const { data } = await axios.post(
        backend_url + "/api/users/payment",
        { planId },
        { headers: { token } },
      );
      if (data.success) initPay(data.order);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section
      className="relative min-h-screen pt-8 pb-20 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-14">
        {/* ── Badge ── */}
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              text-[#22D3EE] text-xs font-semibold tracking-[0.12em] uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "rgba(34,211,238,0.07)",
              border: "1px solid rgba(34,211,238,0.25)",
            }}
          >
            Pricing
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-[#F1F0FF] text-center
            leading-[1.1] tracking-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Choose Your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Creative Plan
          </span>
        </motion.h2>

        {/* ── Subtext ── */}
        <motion.p
          className="text-base sm:text-lg text-[#A89EC4] text-center max-w-120
            mx-auto mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Choose a plan that fits your creativity.
        </motion.p>

        {/* ── Billing toggle ── */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="inline-flex items-center p-1 rounded-full gap-1"
            style={{ background: "#1C1828", border: "1px solid #2D1F4A" }}
          >
            {["monthly", "annual"].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm
                  font-semibold transition-all duration-200 cursor-pointer border-none capitalize"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: billing === b ? "#7C3AED" : "transparent",
                  color: billing === b ? "#fff" : "#A89EC4",
                }}
              >
                {b === "annual" ? "Annual" : "Monthly"}
                {b === "annual" && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(34,211,238,0.15)",
                      color: "#22D3EE",
                      border: "1px solid rgba(34,211,238,0.3)",
                    }}
                  >
                    Save 30%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Pricing cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {plans.map((plan, index) => {
            const accent = PLAN_ACCENTS[index] ?? PLAN_ACCENTS[0];
            const isPopular = index === 1;
            const price =
              billing === "annual" ? Math.round(plan.price * 0.7) : plan.price;

            return (
              <motion.div
                key={index}
                className="relative flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: isPopular ? "#16102A" : "#12101A",
                  border: `1px solid ${isPopular ? "#7C3AED" : "#2D1F4A"}`,
                  boxShadow: isPopular
                    ? "0 0 40px rgba(124,58,237,0.2)"
                    : "none",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{
                  borderColor: accent.borderHover,
                  boxShadow: `0 0 32px rgba(124,58,237,0.25)`,
                  y: -4,
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div
                    className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-semibold"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                      color: "#fff",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ★ MOST POPULAR
                  </div>
                )}

                <div
                  className={`flex flex-col flex-1 p-7 ${isPopular ? "pt-10" : ""}`}
                >
                  {/* Crown icon */}
                  <img
                    src={assets.crown}
                    alt=""
                    className="w-8 h-8 object-contain mb-4"
                  />

                  {/* Plan name */}
                  <h3
                    className="text-xl font-bold text-[#F1F0FF] mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {plan.id}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm text-[#A89EC4] mb-6 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className="text-4xl font-bold text-[#F1F0FF]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ₹{price}
                    </span>
                    <span
                      className="text-sm text-[#6B5F8A]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      / {plan.purchase} credits
                    </span>
                  </div>

                  {/* Annual original price */}
                  {billing === "annual" && (
                    <p
                      className="text-xs line-through mb-5"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "#6B5F8A",
                      }}
                    >
                      ₹{plan.price}
                    </p>
                  )}

                  {/* Divider */}
                  <div
                    className="h-px my-5"
                    style={{ background: "#2D1F4A" }}
                  />

                  {/* CTA button */}
                  <button
                    onClick={() => paymentRazorpay(plan.id)}
                    className="w-full py-3 rounded-xl text-sm font-bold
                      border-none cursor-pointer transition-all duration-200
                      hover:brightness-110 hover:scale-[1.02] mt-auto"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: accent.btnBg,
                      color: accent.btnColor,
                    }}
                  >
                    {user ? "Buy Credits" : "Get Started"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── FAQ ── */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-2xl font-bold text-[#F1F0FF] text-center mb-8"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Frequently Asked{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions
            </span>
          </h3>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </motion.div>

        {/* ── Trusted by strip ── */}
        <motion.div
          className="flex flex-col items-center gap-5 pb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p
            className="text-xs font-semibold tracking-[0.14em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
          >
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Figma", "Notion", "Linear", "Vercel", "Framer"].map((name) => (
              <span
                key={name}
                className="text-base font-bold"
                style={{ fontFamily: "'Syne', sans-serif", color: "#2D1F4A" }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Purchase;
