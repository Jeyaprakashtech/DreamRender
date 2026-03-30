import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/purchase" },
  { label: "Generate", href: "/generate" },
];

function Navbar() {
  const { user, setShowlogin, credits, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavigation = (href) => {
    if ((href === "/generate" || href === "/gallery") && !user) {
      setShowlogin(true);
    } else {
      navigate(href);
    }
  };
  /* scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* outside click closes dropdown */
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdown(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* route change closes mobile menu */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* ══════════════ NAVBAR ══════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          h-18 px-4 sm:px-8 lg:px-16 transition-all duration-300
          ${
            scrolled
              ? "backdrop-blur-lg shadow-[0_1px_0_rgba(45,31,74,0.55)]"
              : "bg-transparent"
          }`}
        style={scrolled ? { background: "rgba(10,10,15,0.82)" } : {}}
      >
        {/* ── Logo ── */}
        <Link to="/">
          <img width={250} src={assets.logo} alt="" />
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNavigation(href)}
              className={`relative text-sm font-medium pb-0.5 transition-colors duration-200
                no-underline group
                ${isActive(href) ? "text-[#F1F0FF]" : "text-[#A89EC4] hover:text-[#F1F0FF]"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {label}
              {/* animated underline */}
              <span
                className={`absolute -bottom-0.5 left-0 h-[1.5px] rounded-full
                  transition-all duration-200
                  ${isActive(href) ? "w-full" : "w-0 group-hover:w-full"}`}
                style={{
                  background: "linear-gradient(90deg, #7C3AED, #22D3EE)",
                }}
              />
            </button>
          ))}
        </div>

        {/* ── Right side ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {/* Credits badge */}
              <button
                onClick={() => navigate("/purchase")}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5
                  rounded-full text-[#FCD34D] text-xs font-semibold
                  transition-all duration-200 hover:scale-105 cursor-pointer border-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "rgba(252,211,77,0.07)",
                  border: "1px solid rgba(252,211,77,0.22)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(252,211,77,0.13)";
                  e.currentTarget.style.borderColor = "rgba(252,211,77,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(252,211,77,0.07)";
                  e.currentTarget.style.borderColor = "rgba(252,211,77,0.22)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#FCD34D">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                </svg>
                {credits} Credits
              </button>

              {/* Hi name */}
              <span
                className="hidden md:block text-sm font-medium text-[#A89EC4]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Hi, {user.name?.split(" ")[0]}
              </span>

              {/* Avatar + dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdown((o) => !o)}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                    text-white text-sm font-bold cursor-pointer border-2 border-transparent
                    transition-all duration-200 hover:border-[#7C3AED] hover:scale-105"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(135deg, #7C3AED, #F472B6)",
                  }}
                >
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute top-[calc(100%+10px)] right-0 w-52 rounded-xl
                      overflow-hidden z-50 shadow-[0_20px_48px_rgba(0,0,0,0.7)]"
                    style={{
                      background: "#12101A",
                      border: "1px solid #2D1F4A",
                      animation: "dropIn 180ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <style>{`
                      @keyframes dropIn {
                        from { opacity:0; transform:scale(0.95) translateY(-6px); }
                        to   { opacity:1; transform:scale(1) translateY(0); }
                      }
                    `}</style>

                    {/* Header */}
                    <div
                      className="px-4 py-3"
                      style={{ borderBottom: "1px solid #2D1F4A" }}
                    >
                      <p
                        className="text-sm font-semibold text-[#F1F0FF]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-[11px] text-[#6B5F8A] mt-0.5 truncate"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {user.email}
                      </p>
                    </div>

                    {/* Items */}
                    {[
                      {
                        icon: <GalleryIcon />,
                        label: "My Gallery",
                        path: "/gallery",
                      },
                      {
                        icon: <SparkIcon />,
                        label: "Generate",
                        path: "/generate",
                      },
                      {
                        icon: <StarIcon />,
                        label: "Buy Credits",
                        path: "/purchase",
                      },
                    ].map(({ icon, label, path }) => (
                      <button
                        key={label}
                        onClick={() => {
                          navigate(path);
                          setDropdown(false);
                        }}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left
                          text-sm font-medium text-[#A89EC4] bg-transparent border-none
                          cursor-pointer transition-colors duration-150
                          hover:bg-[rgba(124,58,237,0.1)] hover:text-[#F1F0FF]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {icon} {label}
                      </button>
                    ))}

                    <div
                      className="h-px my-1"
                      style={{ background: "#2D1F4A" }}
                    />

                    <button
                      onClick={() => {
                        logout();
                        setDropdown(false);
                      }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left
                        text-sm font-medium text-[#A89EC4] bg-transparent border-none
                        cursor-pointer transition-colors duration-150
                        hover:bg-[rgba(239,68,68,0.1)] hover:text-[#EF4444]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <LogoutIcon /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Ghost login */}
              <button
                onClick={() => setShowlogin(true)}
                className=" sm:block text-sm font-medium text-[#A89EC4] bg-transparent
                  px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                  hover:text-[#F1F0FF] hover:bg-[rgba(124,58,237,0.08)]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  border: "1px solid #2D1F4A",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#7C3AED")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#2D1F4A")
                }
              >
                Log In
              </button>

              {/* CTA */}
              <button
                onClick={() => setShowlogin(true)}
                className="hidden md:block text-sm font-semibold text-white px-5 py-2 rounded-lg
                  cursor-pointer border-none transition-all duration-200
                  hover:scale-[1.03] hover:brightness-110"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 22px rgba(124,58,237,0.45)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Get Started
              </button>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.25 bg-transparent border-none
              cursor-pointer p-1 z-60"
          >
            <span
              className="block w-5.5 h-0.5 rounded-sm bg-[#A89EC4]
                transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5.5 h-0.5 rounded-sm bg-[#A89EC4]
                transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5.5 h-0.5 rounded-sm bg-[#A89EC4]
                transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* ══════════════ MOBILE OVERLAY ══════════════ */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col px-8 pt-24 pb-12
            backdrop-blur-2xl"
          style={{
            background: "rgba(10,10,15,0.97)",
            animation: "fadeUp 240ms ease",
          }}
        >
          <style>{`
            @keyframes fadeUp {
              from { opacity:0; transform:translateY(8px); }
              to   { opacity:1; transform:translateY(0); }
            }
          `}</style>

          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="text-[#A89EC4] no-underline py-3.5 text-3xl font-bold
                transition-all duration-200 hover:text-[#F1F0FF] hover:pl-2"
              style={{
                fontFamily: "'Syne', sans-serif",
                borderBottom: "1px solid rgba(45,31,74,0.45)",
              }}
            >
              {label}
            </Link>
          ))}

          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/purchase")}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3
                    rounded-lg text-[#FCD34D] text-sm font-semibold border-none cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(252,211,77,0.07)",
                    border: "1px solid rgba(252,211,77,0.22)",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="#FCD34D"
                  >
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                  </svg>
                  {credits} Credits remaining
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-lg text-sm font-medium text-[#A89EC4]
                    bg-transparent cursor-pointer transition-all duration-200
                    hover:text-[#F1F0FF] hover:border-[#7C3AED]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid #2D1F4A",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowlogin(true);
                    setMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-lg text-sm font-medium text-[#A89EC4]
                    bg-transparent cursor-pointer transition-all duration-200
                    hover:text-[#F1F0FF]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid #2D1F4A",
                  }}
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setShowlogin(true);
                    setMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white
                    border-none cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                  }}
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ── Inline SVG icons ── */
const GalleryIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const SparkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
  </svg>
);
const CogIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default Navbar;
