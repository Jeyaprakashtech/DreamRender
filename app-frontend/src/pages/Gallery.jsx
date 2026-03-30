import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const FILTERS = [
  "All",
  "Realistic",
  "Anime",
  "3D",
  "Fantasy",
  "Sketch",
  "Cinematic",
];

/* Derive a style tag from the prompt — fallback to "Realistic" */
const getTag = (prompt = "") => {
  const p = prompt.toLowerCase();
  if (p.includes("anime")) return "Anime";
  if (p.includes("3d")) return "3D";
  if (p.includes("fantasy")) return "Fantasy";
  if (p.includes("sketch")) return "Sketch";
  if (p.includes("cinematic")) return "Cinematic";
  return "Realistic";
};

function Gallery() {
  const { getUserImage } = useContext(AppContext);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [fullview, setFullview] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserImage();
      setImages(data ?? []);
    };
    fetch();
  }, []);

  /* Filtered + searched list */
  const visible = images.filter((img) => {
    const tag = getTag(img.prompt);
    const matchF = filter === "All" || tag === filter;
    const matchS =
      !search ||
      (img.prompt ?? "").toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  /*------- Image Downloader ---------*/
const downloadUrl = (image) => {
  return image.replace(
  "/upload/",
  "/upload/fl_attachment:Dreamrender-image/"
)}
  const openFull = (img) => {
    setSelected(img);
    setFullview(true);
  };
  const closeFull = () => {
    setFullview(false);
    setSelected(null);
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen pt-18 pb-20 overflow-hidden"
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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-87.5 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-10">
        {/* ── Heading ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-[#F1F0FF] leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your Creative{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Gallery
              </span>
            </h1>
            <p
              className="text-sm mt-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#A89EC4" }}
            >
              {images.length} image{images.length !== 1 ? "s" : ""} generated
            </p>
          </div>

          {/* Search input */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200"
            style={{
              background: "#1C1828",
              border: `1px solid ${searchFocus ? "#7C3AED" : "#2D1F4A"}`,
              boxShadow: searchFocus
                ? "0 0 0 3px rgba(124,58,237,0.12)"
                : "none",
              minWidth: "220px",
            }}
          >
            <SearchIcon />
            <input
              type="text"
              placeholder="Search prompts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              className="bg-transparent text-sm text-[#F1F0FF] placeholder:text-[#6B5F8A]
                outline-none flex-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                duration-200 cursor-pointer border-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: filter === f ? "#7C3AED" : "#1C1828",
                color: filter === f ? "#fff" : "#A89EC4",
                border: `1px solid ${filter === f ? "#7C3AED" : "#2D1F4A"}`,
                boxShadow:
                  filter === f ? "0 0 14px rgba(124,58,237,0.35)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* ── Empty state ── */}
        {images.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-28 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{
                border: "2px dashed #2D1F4A",
                animation: "dashPulse 2s ease-in-out infinite",
              }}
            >
              <style>{`
                @keyframes dashPulse {
                  0%,100% { border-color:#2D1F4A; }
                  50%      { border-color:#7C3AED; }
                }
              `}</style>
              <span className="text-3xl" style={{ opacity: 0.3 }}>
                ✦
              </span>
            </div>
            <div className="text-center">
              <p
                className="text-lg font-semibold text-[#F1F0FF] mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                No images yet
              </p>
              <p
                className="text-sm text-[#6B5F8A] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Start generating to build your gallery
              </p>
              <button
                onClick={() => navigate("/generate")}
                className="px-7 py-3 rounded-xl text-sm font-bold text-white
                  border-none cursor-pointer transition-all duration-200
                  hover:brightness-110 hover:scale-[1.02]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                }}
              >
                Start Generating ✦
              </button>
            </div>
          </motion.div>
        )}

        {/* ── No results after filter ── */}
        {images.length > 0 && visible.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-20 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p
              className="text-base font-semibold text-[#A89EC4]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              No images match "{search || filter}"
            </p>
            <button
              onClick={() => {
                setFilter("All");
                setSearch("");
              }}
              className="text-xs text-[#7C3AED] underline cursor-pointer bg-transparent border-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* ── Image grid ── */}
        {visible.length > 0 && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {visible.map((img, index) => {
              const tag = getTag(img.prompt);
              return (
                <motion.div
                  key={img._id ?? index}
                  className="relative rounded-xl overflow-hidden break-inside-avoid
                    cursor-pointer group"
                  style={{
                    border: "1px solid rgba(124,58,237,0.25)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    boxShadow: "0 0 28px rgba(124,58,237,0.45)",
                    borderColor: "#7C3AED",
                  }}
                  onClick={() => openFull(img)}
                >

                  
                  {/* Image */}
                  <img
                    src={img.image}
                    alt={img.prompt ?? `Image ${index + 1}`}
                    className="w-full h-auto block"
                    style={{ background: "#1C1828" }}
                  />

                  {/* Style tag pill */}
                  <div
                    className="absolute top-2 left-2 px-2.5 py-1 rounded-full
                      text-[10px] font-bold tracking-wide"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "rgba(244,114,182,0.85)",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {tag}
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-3 gap-2
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,15,0.92) 0%, transparent 55%)",
                    }}
                  >
                    {/* Prompt snippet */}
                    <p
                      className="text-xs text-[#A89EC4] line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {img.prompt}
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <a
                        href={downloadUrl(img.image)}
                        
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          text-xs font-semibold text-white no-underline
                          transition-all duration-150 hover:brightness-110"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          background: "linear-gradient(90deg,#7C3AED,#A855F7)",
                        }}
                      >
                        <DownloadIcon /> Download
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/generate");
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          text-xs font-semibold transition-all duration-150 cursor-pointer
                          border-none hover:border-[#7C3AED]"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          background: "rgba(28,24,40,0.85)",
                          border: "1px solid #2D1F4A",
                          color: "#A89EC4",
                        }}
                      >
                        <SparkIcon /> Re-generate
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ══════════ FULLVIEW OVERLAY ══════════ */}
      <AnimatePresence>
        {fullview && selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            style={{
              background: "rgba(10,10,15,0.88)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeFull();
            }}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden
                grid grid-cols-1 lg:grid-cols-[1fr_1fr]"
              style={{
                background: "#12101A",
                border: "1px solid #2D1F4A",
                boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              }}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Top gradient rule */}
              <div
                className="absolute top-0 left-0 right-0 h-px z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #7C3AED, #22D3EE, transparent)",
                }}
              />

              {/* ── LEFT — image ── */}
              <div
                className="flex items-center justify-center p-6"
                style={{ background: "#0D0B18" }}
              >
                <motion.img
                  src={selected.image}
                  alt={selected.prompt}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                  style={{ boxShadow: "0 0 40px rgba(124,58,237,0.3)" }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>

              {/* ── RIGHT — details ── */}
              <div className="flex flex-col gap-5 p-7 pt-10">
                <h2
                  className="text-2xl font-extrabold text-[#F1F0FF]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Image Details
                </h2>

                {/* Style tag */}
                <div
                  className="inline-flex w-fit items-center px-3 py-1 rounded-full
                    text-xs font-bold"
                  style={{
                    background: "rgba(244,114,182,0.12)",
                    border: "1px solid rgba(244,114,182,0.35)",
                    color: "#F472B6",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {getTag(selected.prompt)}
                </div>

                {/* Prompt */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-semibold tracking-[0.08em] uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#A89EC4",
                    }}
                  >
                    Prompt
                  </label>
                  <p
                    className="px-4 py-3.5 rounded-xl text-sm text-[#F1F0FF] leading-relaxed"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "#1C1828",
                      border: "1px solid #2D1F4A",
                    }}
                  >
                    {selected.prompt ?? "No prompt recorded"}
                  </p>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-semibold tracking-[0.08em] uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#A89EC4",
                    }}
                  >
                    Generated on
                  </label>
                  <p
                    className="px-4 py-3 rounded-xl text-sm text-[#F1F0FF]"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "#1C1828",
                      border: "1px solid #2D1F4A",
                    }}
                  >
                    {selected.date
                      ? new Date(selected.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "#2D1F4A" }} />

                {/* Actions */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href={downloadUrl(selected.image)}
                    
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                      text-white no-underline transition-all duration-200
                      hover:brightness-110 hover:scale-[1.02]"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                    }}
                  >
                    <DownloadIcon /> Download
                  </a>
                  <button
                    onClick={() => {
                      closeFull();
                      navigate("/generate");
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                      cursor-pointer border-none transition-all duration-200
                      hover:border-[#7C3AED] hover:text-[#F1F0FF]"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "#1C1828",
                      border: "1px solid #2D1F4A",
                      color: "#A89EC4",
                    }}
                  >
                    <SparkIcon /> Re-generate
                  </button>
                </motion.div>
              </div>

              {/* Close button */}
              <button
                onClick={closeFull}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center
                  justify-center cursor-pointer border-none z-10 transition-all duration-150
                  hover:scale-110"
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
              >
                <img
                  src={assets.cross_icon}
                  alt="Close"
                  className="w-3 h-3 object-contain"
                />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Icons ── */
const DownloadIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const SparkIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6B5F8A"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default Gallery;
