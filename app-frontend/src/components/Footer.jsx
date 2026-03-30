import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const productLinks = [
  { label: "Generate", href: "/generate" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/purchase" },
  { label: "API", href: "#", badge: "Soon" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className="relative w-full"
      style={{
        background: "#0A0A0F",
        borderTop: "1px solid #2D1F4A",
      }}
    >
      {/* Gradient rule at very top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7C3AED, #22D3EE, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-8">
        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 — Logo + tagline + socials */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="font-extrabold text-xl tracking-widest text-left bg-transparent
                border-none cursor-pointer p-0 w-fit"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <img width={250} src={assets.logo} alt="" />
            </button>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed max-w-55"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
            >
              Dream it. Type it. Render it.
              <br />
              AI-powered image generation for everyone.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {/* Twitter / X */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center
                  transition-all duration-200 hover:scale-110"
                style={{
                  background: "#1C1828",
                  border: "1px solid #2D1F4A",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#7C3AED")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#2D1F4A")
                }
                aria-label="Twitter"
              >
                <img
                  src={assets.twitter_icon}
                  alt="Twitter"
                  className="w-4 h-4 object-contain"
                />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center
                  transition-all duration-200 hover:scale-110"
                style={{
                  background: "#1C1828",
                  border: "1px solid #2D1F4A",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#F472B6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#2D1F4A")
                }
                aria-label="Instagram"
              >
                <img
                  src={assets.instagram_icon}
                  alt="Instagram"
                  className="w-4 h-4 object-contain"
                />
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center
                  transition-all duration-200 hover:scale-110"
                style={{
                  background: "#1C1828",
                  border: "1px solid #2D1F4A",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#22D3EE")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#2D1F4A")
                }
                aria-label="Facebook"
              >
                <img
                  src={assets.facebook_icon}
                  alt="Facebook"
                  className="w-4 h-4 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Col 2 — Product links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs font-semibold tracking-[0.12em] uppercase mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#A89EC4" }}
            >
              Product
            </h4>
            {productLinks.map(({ label, href, badge }) => (
              <Link
                key={label}
                to={href}
                className="flex items-center gap-2 text-sm no-underline
                  transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B5F8A",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F1F0FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B5F8A")}
              >
                {label}
                {badge && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "rgba(34,211,238,0.1)",
                      color: "#22D3EE",
                      border: "1px solid rgba(34,211,238,0.2)",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Col 3 — Company links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs font-semibold tracking-[0.12em] uppercase mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#A89EC4" }}
            >
              Company
            </h4>
            {companyLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm no-underline transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#6B5F8A",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F1F0FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B5F8A")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Col 4 — Newsletter */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-xs font-semibold tracking-[0.12em] uppercase mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#A89EC4" }}
            >
              Stay in the loop
            </h4>
            <p
              className="text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
            >
              Get prompt tips & updates in your inbox.
            </p>

            {/* Email input + button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mt-1">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 text-sm px-4 py-2.5 rounded-lg outline-none
                  transition-all duration-200 text-[#F1F0FF]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "#1C1828",
                  border: "1px solid #2D1F4A",
                  color: "#F1F0FF",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7C3AED";
                  e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#2D1F4A";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                className="text-sm font-semibold text-white px-4 py-2.5 rounded-lg
                  border-none cursor-pointer transition-all duration-200 hover:brightness-110
                  hover:scale-[1.02] whitespace-nowrap"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid #2D1F4A" }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
          >
            © 2025 Dreamrender. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            <span
              className="text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
            >
              Made with
            </span>
            <span className="text-xs" style={{ color: "#F472B6" }}>
              ♥
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#6B5F8A" }}
            >
              for creators everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
