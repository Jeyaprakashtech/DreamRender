import { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [state, setState] = useState("Login"); // "Login" | "Sign Up"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { setShowlogin, backend_url, setToken, setuser } =
    useContext(AppContext);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "Login") {
        const { data } = await axios.post(backend_url + "/api/users/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setuser(data.user);
          localStorage.setItem("token", data.token);
          setShowlogin(false);
          toast.success("Logged in successfully 🚀");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backend_url + "/api/users/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setuser(data.user);
          localStorage.setItem("token", data.token);
          setShowlogin(false);
          toast.success("Account created! 10 free credits added ✦");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* ── Full-screen overlay ── */
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(10,10,15,0.85)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowlogin(false);
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .auth-input:focus { outline: none; }
      `}</style>

      {/* ── Modal card ── */}
      <motion.form
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-110 rounded-2xl overflow-hidden"
        style={{
          background: "#12101A",
          border: "1px solid #2D1F4A",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
        }}
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7C3AED, #22D3EE, transparent)",
          }}
        />

        <div className="px-8 pt-3 pb-4">
          {/* ── Logo + tagline ── */}
          <div className="flex flex-col items-center mb-4">
            <span
              className="font-extrabold text-xl tracking-widest mb-1.5"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <img width={250} src={assets.logo} alt="" />
            </span>
            <p
              className="text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
            >
              Dream it. Type it. Render it.
            </p>
          </div>

          {/* ── Tab switcher ── */}
          <div
            className="flex rounded-xl p-1 mb-7"
            style={{ background: "#1C1828", border: "1px solid #2D1F4A" }}
          >
            {["Login", "Sign Up"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setState(tab)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all
                  duration-200 cursor-pointer border-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: state === tab ? "#7C3AED" : "transparent",
                  color: state === tab ? "#fff" : "#A89EC4",
                  boxShadow:
                    state === tab ? "0 0 16px rgba(124,58,237,0.35)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Welcome text ── */}
          <div className="mb-6 text-center">
            <h2
              className="text-xl font-bold text-[#F1F0FF]  mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {state === "Login" ? "Welcome back" : "Create your account"}
            </h2>
            <p
              className="text-sm text-[#A89EC4]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {state === "Login"
                ? "Log in to continue creating with AI"
                : "Start turning ideas into stunning visuals"}
            </p>
          </div>

          {/* ── Fields ── */}
          <div className="flex flex-col gap-3">
            {/* Name — Sign Up only */}
            <AnimatePresence>
              {state === "Sign Up" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <InputField
                    icon={<UserIcon />}
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <InputField
              icon={<MailIcon />}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <InputField
              icon={<LockIcon />}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPass((o) => !o)}
                  className="text-[#6B5F8A] hover:text-[#A89EC4] transition-colors duration-150
                    bg-transparent border-none cursor-pointer p-0"
                >
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
          </div>

          {/* Forgot password */}
          {state === "Login" && (
            <p
              className="text-xs mt-2.5 mb-1 text-right cursor-pointer
                transition-colors duration-150 hover:text-[#F1F0FF]"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#22D3EE" }}
            >
              Forgot password?
            </p>
          )}

          {/* ── Submit button ── */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white
              border-none cursor-pointer mt-5 transition-all duration-200"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "linear-gradient(90deg, #7C3AED, #A855F7)",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            whileHover={
              !loading
                ? { scale: 1.02, boxShadow: "0 0 28px rgba(124,58,237,0.5)" }
                : {}
            }
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading
              ? "Please wait…"
              : state === "Login"
                ? "Continue →"
                : "Create Account →"}
          </motion.button>

          {/* ── Switch state ── */}
          <p
            className="text-center text-xs mt-6"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
          >
            {state === "Login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <span
              onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
              className="font-semibold cursor-pointer transition-colors duration-150"
              style={{ color: "#A855F7" }}
              onMouseEnter={(e) => (e.target.style.color = "#C084FC")}
              onMouseLeave={(e) => (e.target.style.color = "#A855F7")}
            >
              {state === "Login" ? "Sign up free" : "Log in"}
            </span>
          </p>

          {/* ── Terms ── */}
          <p
            className="text-center text-[11px] mt-3"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
          >
            By continuing you agree to our{" "}
            <a href="#" className="underline" style={{ color: "#6B5F8A" }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline" style={{ color: "#6B5F8A" }}>
              Privacy Policy
            </a>
          </p>

          {state === "Sign Up" && (
            <motion.div
              className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl"
              style={{
                background: "rgba(34,211,238,0.06)",
                border: "1px solid rgba(34,211,238,0.2)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <span className="text-xs" style={{ color: "#22D3EE" }}>
                ✦
              </span>
              <span
                className="text-xs font-medium"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#22D3EE",
                }}
              >
                10 free credits on signup — no card required
              </span>
            </motion.div>
          )}
        </div>

        {/* ── Close button ── */}
        <button
          type="button"
          onClick={() => setShowlogin(false)}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center
            justify-center bg-transparent border-none cursor-pointer
            transition-all duration-150 hover:scale-110"
          style={{
            background: "#1C1828",
            border: "1px solid #2D1F4A",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2D1F4A")}
        >
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-3 h-3 object-contain"
          />
        </button>
      </motion.form>
    </motion.div>
  );
}

/* ── Reusable input field ── */
function InputField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
  suffix,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
      style={{
        background: "#1C1828",
        border: `1px solid ${focused ? "#7C3AED" : "#2D1F4A"}`,
        boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
      }}
    >
      <span
        style={{
          color: focused ? "#7C3AED" : "#6B5F8A",
          transition: "color 200ms",
        }}
      >
        {icon}
      </span>
      <input
        className="auth-input flex-1 bg-transparent text-sm text-[#F1F0FF]
          placeholder:text-[#6B5F8A]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
      />
      {suffix}
    </div>
  );
}

/* ── SVG Icons ── */
const UserIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const EyeIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);
const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
  </svg>
);

export default Login;
