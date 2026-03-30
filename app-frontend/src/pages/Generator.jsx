import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const STYLES = [
  "Realistic",
  "Anime",
  "Oil Paint",
  "3D",
  "Sketch",
  "Cinematic",
  "Fantasy",
];
const RATIOS = [
  { label: "1:1", icon: "▪" },
  { label: "16:9", icon: "▬" },
  { label: "9:16", icon: "▮" },
  { label: "4:3", icon: "▭" },
];
const QUALITY = ["Standard", "HD", "Ultra"];

function Generator() {
  const { generateImage, credits } = useContext(AppContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedStyle, setStyle] = useState("Realistic");
  const [selectedQuality, setQuality] = useState("Standard");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setLoading(true);
    setIsImageLoaded(false);

    const promptInput =
      inputText +
      " " +
      " Style: " +
      selectedStyle +
      ". " +
      "Quality: " +
      selectedQuality;
    const result = await generateImage(promptInput);
    console.log(promptInput);
    if (result) {
      setImage(result);
      setIsImageLoaded(true);
    }
    setLoading(false);
  };
/*------- Image Downloader ---------*/
const downloadUrl = (image) => {
  return image.replace(
  "/upload/",
  "/upload/fl_attachment:Dreamrender-image/"
)}

  const lowCredits = credits < 3;

  useEffect(() => {
        toast("This is Demo Project. please don't create more than 2 images ")
      }, []);
  return (
    <section
      className="relative min-h-screen pt-8 overflow-hidden"
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

      {/* Output area glow */}
      <div
        className="absolute top-1/3 right-0 w-125 h-125 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* ── Header bar ── */}
        <div className="flex items-center justify-center mb-10">
          <div>
            <motion.h1
              className="text-2xl sm:text-3xl font-extrabold text-[#F1F0FF]"
              style={{ fontFamily: "'Syne', sans-serif" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Generate
            </motion.h1>
            <motion.p
              className="text-sm mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#A89EC4" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Turn your words into stunning visuals
            </motion.p>
          </div>
        </div>

        {/* ── Low credits warning ── */}
        <AnimatePresence>
          {lowCredits && (
            <motion.div
              className="flex items-center gap-3 px-5 py-3 rounded-xl mb-6 text-sm font-medium"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(251,191,36,0.07)",
                border: "1px solid rgba(251,191,36,0.25)",
                color: "#FCD34D",
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span>⚠</span>
              Running low! You have {credits} credit{credits !== 1 ? "s" : ""}{" "}
              left.
              <button
                onClick={() => navigate("/purchase")}
                className="ml-auto text-xs font-semibold underline cursor-pointer
                  bg-transparent border-none"
                style={{ color: "#FCD34D" }}
              >
                Top up →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Two-column layout ── */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6"
        >
          {/* ════ LEFT — Controls (40%) ════ */}
          <div className="flex flex-col gap-5">
            {/* Prompt textarea */}
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
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe your image in detail…"
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl text-sm resize-none outline-none
                  transition-all duration-200 text-[#F1F0FF] placeholder:text-[#6B5F8A]"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "#1C1828",
                  border: "1px solid #2D1F4A",
                  minHeight: "140px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22D3EE";
                  e.target.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#2D1F4A";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Style selector */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold tracking-[0.08em] uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#A89EC4",
                }}
              >
                Style
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStyle(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold
                      transition-all duration-200 cursor-pointer border-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: selectedStyle === s ? "#7C3AED" : "#1C1828",
                      color: selectedStyle === s ? "#fff" : "#A89EC4",
                      border: `1px solid ${selectedStyle === s ? "#7C3AED" : "#2D1F4A"}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold tracking-[0.08em] uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#A89EC4",
                }}
              >
                Quality
              </label>
              <div className="flex gap-2">
                {QUALITY.map((q, i) => {
                  const isLocked = q === "Ultra" && credits < 10;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => !isLocked && setQuality(q)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                        rounded-xl text-xs font-semibold transition-all duration-200
                        cursor-pointer border-none"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        opacity: isLocked ? 0.4 : 1,
                        cursor: isLocked ? "not-allowed" : "pointer",
                        background:
                          selectedQuality === q
                            ? "rgba(124,58,237,0.2)"
                            : "#1C1828",
                        color: selectedQuality === q ? "#C084FC" : "#A89EC4",
                        border: `1px solid ${selectedQuality === q ? "#7C3AED" : "#2D1F4A"}`,
                      }}
                    >
                      {isLocked && <span>🔒</span>}
                      {q}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate button */}
            <motion.button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="w-full py-4 rounded-xl text-base font-bold text-white
                border-none cursor-pointer mt-1 transition-opacity duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                opacity: loading || !inputText.trim() ? 0.6 : 1,
                cursor:
                  loading || !inputText.trim() ? "not-allowed" : "pointer",
              }}
              whileHover={
                !loading && inputText.trim()
                  ? {
                      scale: 1.02,
                      boxShadow: "0 0 32px rgba(124,58,237,0.55)",
                    }
                  : {}
              }
              whileTap={!loading && inputText.trim() ? { scale: 0.98 } : {}}
            >
              {loading ? "Rendering your vision…" : "Generate Image ✦"}
            </motion.button>
          </div>

          {/* ════ RIGHT — Output (60%) ════ */}
          <div className="flex flex-col gap-4">
            <div
              className="relative w-full px-12 h-full rounded-2xl overflow-hidden flex items-center
                justify-center"
              style={{
                background: "#12101A",
                border: "1px solid #2D1F4A",
              }}
            >
              {/* Empty state */}
              {!loading && !isImageLoaded && (
                <motion.div
                  className="flex flex-col items-center justify-center gap-4 p-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="w-32 h-32 rounded-2xl flex items-center justify-center"
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
                      @keyframes shimmer {
                        0%   { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                      }
                    `}</style>
                    <span className="text-4xl" style={{ opacity: 0.3 }}>
                      ✦
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#6B5F8A",
                    }}
                  >
                    Your image will appear here
                  </p>
                </motion.div>
              )}

              {/* Loading state */}
              {loading && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.08) 50%, transparent 100%)",
                        animation: "shimmer 1.5s infinite",
                      }}
                    />
                  </div>
                  <div
                    className="w-16 h-16 rounded-full border-2 border-transparent"
                    style={{
                      borderTopColor: "#7C3AED",
                      borderRightColor: "#22D3EE",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <p
                    className="text-sm font-medium relative z-10"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#A89EC4",
                    }}
                  >
                    Rendering your vision…
                  </p>
                  {/* Progress bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden"
                    style={{ background: "#1C1828" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #7C3AED, #22D3EE)",
                        animation: "progress 10s linear forwards",
                      }}
                    />
                    <style>{`@keyframes progress { from { width:0%; } to { width:95%; } }`}</style>
                  </div>
                </motion.div>
              )}

              {/* Generated image */}
              {isImageLoaded && image && !loading && (
                <motion.img
                  src={image}
                  alt="Generated"
                  className="w-full h-full object-contain rounded-2xl"
                  style={{ boxShadow: "0 0 40px rgba(124,58,237,0.25)" }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </div>

            {/* Prompt echo */}
            {isImageLoaded && inputText && (
              <motion.p
                className="text-xs px-1 truncate"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#6B5F8A",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Generated from: "{inputText}"
              </motion.p>
            )}

            {/* Action bar */}
            {isImageLoaded && !loading && (
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Download */}
                <a
                  href={downloadUrl(image)}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    text-white no-underline transition-all duration-200 hover:brightness-110
                    hover:scale-[1.02]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                  }}
                >
                  <DownloadIcon /> Download
                </a>

                {/* Regenerate */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    transition-all duration-200 cursor-pointer border-none
                    hover:border-[#7C3AED] hover:text-[#F1F0FF]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "#1C1828",
                    border: "1px solid #2D1F4A",
                    color: "#A89EC4",
                  }}
                >
                  <RefreshIcon /> Regenerate
                </button>

                {/* Generate another */}
                <button
                  type="button"
                  onClick={() => {
                    setIsImageLoaded(false);
                    setImage(null);
                    setInputText("");
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    transition-all duration-200 cursor-pointer border-none
                    hover:text-[#F1F0FF]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "transparent",
                    border: "1px solid #2D1F4A",
                    color: "#6B5F8A",
                  }}
                >
                  + New Image
                </button>
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
}

/* ── Icons ── */
const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
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
const RefreshIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
  </svg>
);

export default Generator;
