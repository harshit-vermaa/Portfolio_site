"use client";
import { useState, useEffect, useRef } from "react";

// ============================================================
// ▸ CONTENT CONFIG — Edit everything here
// ============================================================
const CONFIG = {
  name: "Your Name",
  initials: "YN",
  role: "Product & Data Analyst",
  university: "University of Leeds",
  year: "2025",
  bio: "I turn messy data into clear decisions. Final-year AI student at Leeds — obsessed with the intersection of product thinking, behavioural analytics, and machine intelligence.",
  email: "your.email@leeds.ac.uk",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resumeUrl: "#",
  availableForWork: true,
  location: "Leeds, UK",
};

// ============================================================
// ▸ PHOTOS — Replace src with real image URLs or /public paths
// ▸ e.g. src: "/hackathon.jpg"  (put image in /public/)
// ============================================================
const PHOTOS = [
  { id: 1, src: "/download (1).jpeg", label: "Hackathon · Leeds 2024", caption: "72hrs, 4 Red Bulls, 1 working prototype.", tag: "HACK" },
  { id: 2, src: "/download (2).jpeg", label: "University Campus", caption: "Where most of the best ideas happened at 2am.", tag: "UNI" },
  { id: 3, src: "/images (1).jpeg", label: "Tech Conference", caption: "Pitching our ML product to 200 people.", tag: "SPEAK" },
  { id: 4, src: "/images.jpeg", label: "Networking Event", caption: "Conversations that changed how I think about product.", tag: "NET" },
  { id: 5, src: "download.jpeg", label: "Team Project Sprint", caption: "Shipping a data pipeline nobody thought could work.", tag: "BUILD" },
];

// ============================================================
// ▸ PROJECTS — Add objects here to add projects
// ============================================================
const PROJECTS = [
  { id: 1, title: "Churn Intelligence Platform", description: "End-to-end ML pipeline predicting customer churn. XGBoost + SHAP explanations surfaced via a Streamlit dashboard non-technical stakeholders actually use.", category: "Product Analytics", tags: ["XGBoost", "SHAP", "Streamlit", "SQL"], github: "#", demo: "#", metrics: ["89% AUC-ROC", "12% churn reduction", "Live dashboard"], year: "2024" },
  { id: 2, title: "Neural Sentiment Engine", description: "Fine-tuned BERT achieving 94.2% accuracy on multi-domain sentiment analysis. Production API serving 10k+ requests/day at sub-50ms latency.", category: "NLP", tags: ["PyTorch", "BERT", "FastAPI", "Docker"], github: "#", demo: null, metrics: ["94.2% accuracy", "10k req/day", "<50ms p95"], year: "2024" },
  { id: 3, title: "Leeds Property Lens", description: "Scraping → cleaning → modelling pipeline for Leeds rental market. Gradient boosting predicts fair rent within £18 avg error, visualised on an interactive map.", category: "Data Analytics", tags: ["Scrapy", "Sklearn", "Plotly", "PostgreSQL"], github: "#", demo: "#", metrics: ["8,000 listings", "£18 avg MAE", "Interactive map"], year: "2023" },
  { id: 4, title: "RAG Knowledge Assistant", description: "Retrieval-augmented generation over private documents. Hybrid BM25 + semantic search with LangChain + Chroma delivers 85% answer accuracy.", category: "AI Tools", tags: ["LangChain", "ChromaDB", "OpenAI", "FastAPI"], github: "#", demo: null, metrics: ["85% accuracy", "2.1s avg", "10k doc limit"], year: "2024" },
  { id: 5, title: "Real-Time Defect Detector", description: "YOLOv8 computer vision pipeline for manufacturing quality control. 37% reduction in false positives with custom data augmentation strategy.", category: "Computer Vision", tags: ["YOLOv8", "OpenCV", "ONNX", "Python"], github: "#", demo: null, metrics: ["37% fewer false pos", "30fps real-time", "99.1% precision"], year: "2023" },
  { id: 6, title: "AI Study Companion", description: "Full-stack web app using GPT-4 to generate adaptive flashcards from lecture notes. 500+ active users, 4.8★ rating, Stripe premium tier.", category: "Websites", tags: ["Next.js", "Supabase", "GPT-4", "Stripe"], github: "#", demo: "#", metrics: ["500+ users", "20k cards gen'd", "4.8★ rating"], year: "2024" },
];

const SKILLS = {
  "Product & Analytics": ["SQL", "Tableau", "Power BI", "Mixpanel", "GA4", "A/B Testing", "dbt"],
  "Machine Learning": ["PyTorch", "Scikit-learn", "XGBoost", "LightGBM", "SHAP", "MLflow"],
  "NLP & AI": ["Transformers", "LangChain", "BERT", "GPT-4", "RAG", "spaCy"],
  "Data Engineering": ["Pandas", "Spark", "Airflow", "PostgreSQL", "Redis", "dbt"],
  "Web & Deployment": ["Next.js", "React", "FastAPI", "Docker", "AWS", "Vercel"],
  "Computer Vision": ["OpenCV", "YOLOv8", "CLIP", "Torchvision"],
};

const METRICS = [
  { v: "6", label: "Projects Shipped", sub: "to production" },
  { v: "94.2%", label: "Best Model Accuracy", sub: "BERT fine-tune" },
  { v: "500+", label: "Product Users", sub: "AI Study Companion" },
  { v: "3×", label: "Hackathons", sub: "top 3 finishes" },
];

const CATS = ["All", "Product Analytics", "Data Analytics", "NLP", "Computer Vision", "AI Tools", "Websites"];
const NAV = ["Work", "About", "Moments", "Skills", "Contact"];

// ============================================================
// Hooks
// ============================================================
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useMouse() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

// ============================================================
// Custom Cursor
// ============================================================
function Cursor() {
  const { x, y } = useMouse();
  const [click, setClick] = useState(false);
  useEffect(() => {
    const d = () => { setClick(true); setTimeout(() => setClick(false), 250); };
    window.addEventListener("mousedown", d);
    return () => window.removeEventListener("mousedown", d);
  }, []);
  return (
    <>
      <div style={{ position: "fixed", left: x - 4, top: y - 4, width: 8, height: 8, borderRadius: "50%", background: "#e8c07d", zIndex: 9999, pointerEvents: "none", transform: click ? "scale(3)" : "scale(1)", transition: "transform 0.15s", mixBlendMode: "difference" }} />
      <div style={{ position: "fixed", left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(232,192,125,0.35)", zIndex: 9998, pointerEvents: "none", transition: "left 0.1s ease, top 0.1s ease" }} />
    </>
  );
}

// ============================================================
// Scroll Progress
// ============================================================
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const d = document.documentElement; setP((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100); };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${p}%`, zIndex: 9997, background: "linear-gradient(90deg,#e8c07d,#c97d4e)", transition: "width 0.06s linear" }} />;
}

// ============================================================
// Navbar
// ============================================================
function Navbar({ light, setLight }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const navBg = scrolled ? (light ? "rgba(248,244,235,0.94)" : "rgba(10,9,8,0.94)") : "transparent";
  const border = scrolled ? `1px solid ${light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"}` : "1px solid transparent";
  const textCol = light ? "rgba(26,21,18,0.5)" : "rgba(245,240,232,0.4)";
  const textHov = light ? "#1a1512" : "#f5f0e8";

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg, backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: border, transition: "all 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#e8c07d,#c97d4e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#0a0908", fontFamily: "'Syne',sans-serif", letterSpacing: "0.04em" }}>{CONFIG.initials}</div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: light ? "#1a1512" : "#f5f0e8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{CONFIG.name.split(" ")[0]}</span>
      </div>

      <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
        {NAV.map(n => (
          <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: textCol, padding: "6px 14px", borderRadius: 4, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = textHov} onMouseLeave={e => e.target.style.color = textCol}>{n}</button>
        ))}
        <div style={{ width: 1, height: 16, background: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)", margin: "0 8px" }} />
        <button onClick={() => setLight(!light)} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)"}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{light ? "🌙" : "☀️"}</button>
        {CONFIG.availableForWork && <a href={`mailto:${CONFIG.email}`} style={{ marginLeft: 8, padding: "7px 18px", borderRadius: 6, background: "linear-gradient(135deg,#e8c07d,#c97d4e)", color: "#0a0908", fontSize: 12, fontWeight: 800, fontFamily: "'Syne',sans-serif", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>Hire Me</a>}
      </div>

      <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: `1px solid ${light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)"}`, borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: light ? "#1a1512" : "#f5f0e8", fontSize: 16 }} className="mobile-btn">{mobileOpen ? "✕" : "☰"}</button>

      {mobileOpen && (
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, background: light ? "rgba(248,244,235,0.97)" : "rgba(10,9,8,0.97)", backdropFilter: "blur(24px)", borderBottom: border, padding: "12px 24px 20px" }}>
          {NAV.map(n => <button key={n} onClick={() => go(n)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: light ? "rgba(26,21,18,0.6)" : "rgba(245,240,232,0.5)", padding: "12px 0", borderBottom: `1px solid ${light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)"}` }}>{n}</button>)}
        </div>
      )}
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ light }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const c = light;
  const fg = c ? "#1a1512" : "#f5f0e8";
  const muted = c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.38)";

  return (
    <section style={{ minHeight: "100vh", background: c ? "#f8f4eb" : "#0a0908", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 40px" }}>
      {/* Ambient bg text */}
      <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Syne',sans-serif", fontSize: "clamp(60px,12vw,160px)", fontWeight: 800, color: c ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.025)", letterSpacing: "0.06em", userSelect: "none", whiteSpace: "nowrap" }}>DATA · PRODUCT · AI</div>

      {/* Decorative rings */}
      <div style={{ position: "absolute", right: "10%", top: "18%", width: "clamp(220px,28vw,440px)", height: "clamp(220px,28vw,440px)", borderRadius: "50%", border: `1px solid ${c ? "rgba(232,192,125,0.25)" : "rgba(232,192,125,0.12)"}`, background: c ? "radial-gradient(circle,rgba(232,192,125,0.18) 0%,transparent 70%)" : "radial-gradient(circle,rgba(232,192,125,0.08) 0%,transparent 70%)", animation: "slowSpin 30s linear infinite" }} />
      <div style={{ position: "absolute", right: "11%", top: "19.5%", width: "clamp(175px,22.5vw,360px)", height: "clamp(175px,22.5vw,360px)", borderRadius: "50%", border: `1px dashed ${c ? "rgba(201,125,78,0.18)" : "rgba(201,125,78,0.1)"}`, animation: "slowSpin 20s linear infinite reverse" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: 80, position: "relative", zIndex: 1 }}>
        {/* Availability */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36, padding: "5px 14px", borderRadius: 20, background: c ? "rgba(232,192,125,0.14)" : "rgba(232,192,125,0.09)", border: `1px solid ${c ? "rgba(232,192,125,0.38)" : "rgba(232,192,125,0.22)"}`, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(-10px)", transition: "all 0.8s ease" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.13em", color: "#e8c07d", textTransform: "uppercase" }}>Open to roles · {CONFIG.location}</span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, margin: "0 0 28px", fontSize: "clamp(50px,8vw,112px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: fg, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(28px)", transition: "all 0.9s ease 0.1s" }}>
          {CONFIG.name.split(" ")[0]}<br />
          <span style={{ WebkitTextStroke: `1.5px ${fg}`, color: "transparent" }}>{CONFIG.name.split(" ").slice(1).join(" ") || "Portfolio"}</span>
        </h1>

        {/* Role + bio */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(24px,5vw,72px)", flexWrap: "wrap", marginBottom: 52, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.22s" }}>
          <div style={{ flex: "0 0 auto" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 6 }}>Role</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: fg }}>{CONFIG.role}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: muted, marginTop: 4 }}>{CONFIG.university} · {CONFIG.year}</div>
          </div>
          <div style={{ flex: "1 1 280px", maxWidth: 480 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 6 }}>About</div>
            <p style={{ margin: 0, fontFamily: "'Instrument Serif',serif", fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.65, color: c ? "rgba(26,21,18,0.72)" : "rgba(245,240,232,0.62)", fontStyle: "italic" }}>{CONFIG.bio}</p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transition: "all 0.9s ease 0.36s" }}>
          <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "13px 30px", borderRadius: 8, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#e8c07d,#c97d4e)", color: "#0a0908", fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: "0 8px 32px rgba(232,192,125,0.28)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 16px 40px rgba(232,192,125,0.42)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 8px 32px rgba(232,192,125,0.28)"; }}>View My Work ↓</button>
          <a href={CONFIG.resumeUrl} style={{ padding: "13px 28px", borderRadius: 8, textDecoration: "none", border: `1px solid ${c ? "rgba(26,21,18,0.16)" : "rgba(245,240,232,0.16)"}`, color: fg, fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s", display: "inline-block" }}
            onMouseEnter={e => { e.currentTarget.style.background = c ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>Download CV</a>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 80, paddingTop: 32, borderTop: `1px solid ${c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"}`, opacity: loaded ? 1 : 0, transition: "opacity 1.1s ease 0.65s", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 28 }}>
            {[{ l: "GitHub", u: CONFIG.github }, { l: "LinkedIn", u: CONFIG.linkedin }, { l: "Email", u: `mailto:${CONFIG.email}` }].map(({ l, u }) => (
              <a key={l} href={u} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.1em", color: muted, textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#e8c07d"} onMouseLeave={e => e.target.style.color = muted}>{l} ↗</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 1, background: muted }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.14em", color: muted, textTransform: "uppercase" }}>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WORK
// ============================================================
const CAT_COLORS = { "Product Analytics": "#e8c07d", "Data Analytics": "#7dd3c8", "NLP": "#a78bfa", "Computer Vision": "#6ee7b7", "AI Tools": "#f9a8d4", "Websites": "#93c5fd" };

function WorkRow({ p, i, light }) {
  const [ref, inView] = useInView(0.1);
  const [hov, setHov] = useState(false);
  const c = light;
  const accent = CAT_COLORS[p.category] || "#e8c07d";

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `all 0.7s ease ${i * 0.07}s` }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px", gap: "0 32px", alignItems: "start", padding: "26px 16px", borderTop: `1px solid ${c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"}`, background: hov ? (c ? "rgba(232,192,125,0.04)" : "rgba(232,192,125,0.03)") : "transparent", borderRadius: 4, transition: "background 0.3s", marginLeft: -16, marginRight: -16 }}>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: accent, fontWeight: 600 }}>{p.year}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: c ? "rgba(26,21,18,0.28)" : "rgba(245,240,232,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{p.category}</div>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(17px,2.3vw,24px)", margin: "0 0 10px", letterSpacing: "-0.01em", color: hov ? accent : (c ? "#1a1512" : "#f5f0e8"), transition: "color 0.3s" }}>{p.title}</h3>
          <p style={{ margin: "0 0 14px", fontFamily: "'Instrument Serif',serif", fontSize: 15, lineHeight: 1.65, color: c ? "rgba(26,21,18,0.58)" : "rgba(245,240,232,0.48)", maxWidth: 540 }}>{p.description}</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {p.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, padding: "3px 10px", borderRadius: 4, background: c ? "rgba(0,0,0,0.055)" : "rgba(255,255,255,0.065)", color: c ? "rgba(26,21,18,0.55)" : "rgba(245,240,232,0.45)", border: `1px solid ${c ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`, letterSpacing: "0.05em" }}>{t}</span>)}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {p.metrics.map(m => <div key={m} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: accent, marginBottom: 5, letterSpacing: "0.04em" }}>{m}</div>)}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.38)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.38)"}>Demo ↗</a>}
            <a href={p.github} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.38)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = accent} onMouseLeave={e => e.target.style.color = c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.38)"}>Code ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Work({ light }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);
  const c = light;

  return (
    <section id="work" style={{ padding: "120px 40px", background: c ? "#f8f4eb" : "#0a0908" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 12 }}>Selected Work</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,64px)", margin: 0, letterSpacing: "-0.03em", lineHeight: 0.95, color: c ? "#1a1512" : "#f5f0e8" }}>
              Projects that<br /><span style={{ WebkitTextStroke: `1.5px ${c ? "#1a1512" : "#f5f0e8"}`, color: "transparent" }}>matter.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{ padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s", background: active === cat ? "#e8c07d" : "transparent", color: active === cat ? "#0a0908" : (c ? "rgba(26,21,18,0.48)" : "rgba(245,240,232,0.38)"), border: `1px solid ${active === cat ? "#e8c07d" : (c ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)")}`, fontWeight: active === cat ? 700 : 400 }}>{cat}</button>
            ))}
          </div>
        </div>
        {filtered.map((p, i) => <WorkRow key={p.id} p={p} i={i} light={light} />)}
        <div style={{ height: 1, background: c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)", marginTop: 8 }} />
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <a href={CONFIG.github} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: c ? "rgba(26,21,18,0.4)" : "rgba(245,240,232,0.32)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#e8c07d"} onMouseLeave={e => e.target.style.color = c ? "rgba(26,21,18,0.4)" : "rgba(245,240,232,0.32)"}>View all on GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About({ light }) {
  const [ref, inView] = useInView();
  const c = light;
  return (
    <section id="about" style={{ padding: "120px 40px", background: c ? "#f0ebe0" : "#0f0d0b", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px 80px", alignItems: "start" }}>
          <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-28px)", transition: "all 0.9s ease" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 20 }}>About Me</div>
            <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.55, margin: "0 0 28px", color: c ? "#1a1512" : "#f5f0e8", fontStyle: "italic" }}>
              "I don't just analyse data — I ask what question the data is actually answering."
            </p>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, lineHeight: 1.78, color: c ? "rgba(26,21,18,0.62)" : "rgba(245,240,232,0.52)", margin: "0 0 20px" }}>
              Final-year AI student at the University of Leeds. My work sits at the intersection of product analytics, behavioural data, and machine learning. I think in systems, communicate in stories, and ship products people actually use.
            </p>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, lineHeight: 1.78, color: c ? "rgba(26,21,18,0.62)" : "rgba(245,240,232,0.52)", margin: 0 }}>
              Target roles: <strong style={{ color: "#e8c07d" }}>Product Analyst</strong>, Data Scientist, Data Analyst. I bring a rare combination of technical depth and product intuition.
            </p>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(28px)", transition: "all 0.9s ease 0.15s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {METRICS.map(({ v, label, sub }, i) => (
                <div key={label} style={{ padding: "28px 24px", background: i % 2 === 0 ? (c ? "rgba(0,0,0,0.045)" : "rgba(255,255,255,0.035)") : "transparent", border: `1px solid ${c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.055)"}`, borderRadius: i === 0 ? "12px 0 0 0" : i === 1 ? "0 12px 0 0" : i === 2 ? "0 0 0 12px" : "0 0 12px 0" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 800, color: "#e8c07d", letterSpacing: "-0.03em", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: c ? "#1a1512" : "#f5f0e8", marginTop: 8 }}>{label}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: c ? "rgba(26,21,18,0.38)" : "rgba(245,240,232,0.32)", marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MOMENTS — Accordion photo strip
// ============================================================
function Moments({ light }) {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView();
  const c = light;
  const tagColors = ["#e8c07d", "#7dd3c8", "#a78bfa", "#6ee7b7", "#f9a8d4"];

  return (
    <section id="moments" style={{ padding: "120px 40px", background: c ? "#f8f4eb" : "#0a0908" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 12 }}>Beyond the Code</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4.5vw,56px)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1, color: c ? "#1a1512" : "#f5f0e8" }}>
              Defining<br /><span style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontStyle: "italic", WebkitTextStroke: `1.5px ${c ? "#1a1512" : "#f5f0e8"}`, color: "transparent" }}>moments.</span>
            </h2>
          </div>
          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, color: c ? "rgba(26,21,18,0.48)" : "rgba(245,240,232,0.38)", maxWidth: 340, lineHeight: 1.65, margin: 0 }}>
            The experiences that shaped how I think, build, and collaborate. Hover to explore.
          </p>
        </div>

        {/* Accordion strip */}
        <div ref={ref} style={{ display: "flex", gap: 6, height: 480, borderRadius: 10, overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.97)", transition: "all 0.9s ease" }}>
          {PHOTOS.map((photo, i) => {
            const isActive = active === i;
            const accent = tagColors[i % tagColors.length];
            return (
              <div key={photo.id} onMouseEnter={() => setActive(i)} style={{ flex: isActive ? "3 1 0" : "1 1 0", minWidth: isActive ? 260 : 72, transition: "flex 0.6s cubic-bezier(0.4,0,0.2,1)", position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 6 }}>
                {photo.src ? (
                  <img src={photo.src} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: c ? `linear-gradient(145deg,rgba(232,192,125,0.13) 0%,rgba(201,125,78,0.07) 100%)` : `linear-gradient(145deg,rgba(232,192,125,0.08) 0%,rgba(201,125,78,0.04) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"}` }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(20px,4vw,52px)", color: accent, opacity: 0.3, letterSpacing: "0.04em" }}>{photo.tag}</span>
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, background: isActive ? "linear-gradient(to top,rgba(10,9,8,0.9) 0%,transparent 55%)" : "rgba(10,9,8,0.5)", transition: "all 0.5s" }} />
                <div style={{ position: "absolute", top: 14, left: 14, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.14em", padding: "3px 9px", borderRadius: 20, background: "rgba(10,9,8,0.6)", color: accent, border: `1px solid ${accent}40`, textTransform: "uppercase" }}>{photo.tag}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px", opacity: isActive ? 1 : 0, transform: isActive ? "none" : "translateY(14px)", transition: "all 0.4s ease" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: "#f5f0e8", marginBottom: 5 }}>{photo.label}</div>
                  <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 14, color: "rgba(245,240,232,0.6)", fontStyle: "italic" }}>{photo.caption}</div>
                </div>
                <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%) rotate(90deg)", whiteSpace: "nowrap", fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em", color: "rgba(245,240,232,0.38)", textTransform: "uppercase", opacity: isActive ? 0 : 1, transition: "opacity 0.3s" }}>{photo.label.split("·")[0].trim()}</div>
              </div>
            );
          })}
        </div>

        {/* Photo add tip */}
        <div style={{ marginTop: 18, padding: "12px 18px", borderRadius: 8, background: c ? "rgba(232,192,125,0.07)" : "rgba(232,192,125,0.05)", border: `1px dashed ${c ? "rgba(232,192,125,0.28)" : "rgba(232,192,125,0.18)"}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#e8c07d", letterSpacing: "0.08em" }}>💡 ADD PHOTOS:</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: c ? "rgba(26,21,18,0.45)" : "rgba(245,240,232,0.38)" }}>Place images in <code style={{ color: "#e8c07d" }}>/public/</code> then set <code style={{ color: "#e8c07d" }}>src: "/your-image.jpg"</code> in the PHOTOS array at the top of portfolio.jsx</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS
// ============================================================
function Skills({ light }) {
  const [ref, inView] = useInView();
  const c = light;
  const catColors = ["#e8c07d", "#7dd3c8", "#a78bfa", "#6ee7b7", "#f9a8d4", "#93c5fd"];

  return (
    <section id="skills" style={{ padding: "120px 40px", background: c ? "#f0ebe0" : "#0f0d0b" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "60px 80px", alignItems: "start" }}>
          <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.8s", position: "sticky", top: 96 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 16 }}>Toolkit</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,48px)", margin: "0 0 20px", letterSpacing: "-0.03em", lineHeight: 1, color: c ? "#1a1512" : "#f5f0e8" }}>What I<br />work with.</h2>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, lineHeight: 1.7, color: c ? "rgba(26,21,18,0.52)" : "rgba(245,240,232,0.42)", margin: 0 }}>Every tool listed has been used in a real project — not just listed to look good.</p>
          </div>
          <div>
            {Object.entries(SKILLS).map(([cat, skills], ci) => {
              const accent = catColors[ci % catColors.length];
              return (
                <div key={cat} style={{ padding: "24px 0", borderTop: `1px solid ${c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.055)"}`, display: "grid", gridTemplateColumns: "180px 1fr", gap: 20, alignItems: "center" }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600, color: accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {skills.map(s => (
                      <span key={s} style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, padding: "5px 12px", borderRadius: 4, background: c ? "rgba(0,0,0,0.055)" : "rgba(255,255,255,0.055)", color: c ? "rgba(26,21,18,0.68)" : "rgba(245,240,232,0.58)", border: `1px solid ${c ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.08)"}`, transition: "all 0.15s", cursor: "default" }}
                        onMouseEnter={e => { e.target.style.background = `${accent}18`; e.target.style.color = accent; e.target.style.borderColor = `${accent}38`; }}
                        onMouseLeave={e => { e.target.style.background = c ? "rgba(0,0,0,0.055)" : "rgba(255,255,255,0.055)"; e.target.style.color = c ? "rgba(26,21,18,0.68)" : "rgba(245,240,232,0.58)"; e.target.style.borderColor = c ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.08)"; }}
                      >{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ height: 1, background: c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.055)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact({ light }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const c = light;

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    window.open(`mailto:${CONFIG.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`);
    setSent(true); setTimeout(() => setSent(false), 4000);
  };

  const inp = { width: "100%", padding: "13px 16px", borderRadius: 6, fontSize: 14, background: c ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", border: `1px solid ${c ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.09)"}`, color: c ? "#1a1512" : "#f5f0e8", outline: "none", fontFamily: "'Syne',sans-serif", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <section id="contact" style={{ padding: "120px 40px", background: c ? "#f8f4eb" : "#0a0908" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px 80px", alignItems: "start" }}>
          <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.8s" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.14em", color: "#e8c07d", textTransform: "uppercase", marginBottom: 16 }}>Get in Touch</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4.5vw,58px)", margin: "0 0 22px", letterSpacing: "-0.03em", lineHeight: 0.95, color: c ? "#1a1512" : "#f5f0e8" }}>
              Let's build<br /><span style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontStyle: "italic" }}>something.</span>
            </h2>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, lineHeight: 1.7, color: c ? "rgba(26,21,18,0.52)" : "rgba(245,240,232,0.44)", margin: "0 0 36px" }}>
              Open to Product Analyst, Data Analyst, and Data Scientist internships and graduate roles. If you're building something interesting with data or AI — I'd love to hear about it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ l: "Email", v: CONFIG.email, h: `mailto:${CONFIG.email}` }, { l: "LinkedIn", v: "Connect →", h: CONFIG.linkedin }, { l: "GitHub", v: "Follow →", h: CONFIG.github }].map(({ l, v, h }) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 20, alignItems: "baseline", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.opacity = "0.65"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.1em", color: "#e8c07d", textTransform: "uppercase", minWidth: 70 }}>{l}</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, color: c ? "#1a1512" : "#f5f0e8" }}>{v}</span>
                </a>
              ))}
            </div>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.8s ease 0.14s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {["name", "email"].map(field => (
                <div key={field}>
                  <label style={{ display: "block", fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.32)", marginBottom: 7 }}>{field}</label>
                  <input style={inp} placeholder={field === "name" ? "Your name" : "your@email.com"} type={field === "email" ? "email" : "text"} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} onFocus={e => e.target.style.borderColor = "#e8c07d"} onBlur={e => e.target.style.borderColor = c ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.09)"} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: c ? "rgba(26,21,18,0.42)" : "rgba(245,240,232,0.32)", marginBottom: 7 }}>Message</label>
              <textarea style={{ ...inp, resize: "vertical", minHeight: 120 }} placeholder="Hi, I'm recruiting for a Product Analyst role at…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={e => e.target.style.borderColor = "#e8c07d"} onBlur={e => e.target.style.borderColor = c ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.09)"} />
            </div>
            <button onClick={submit} style={{ width: "100%", padding: "14px", borderRadius: 6, border: "none", cursor: "pointer", background: sent ? "linear-gradient(135deg,#4ade80,#22c55e)" : "linear-gradient(135deg,#e8c07d,#c97d4e)", color: "#0a0908", fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: `0 8px 28px ${sent ? "rgba(74,222,128,0.28)" : "rgba(232,192,125,0.28)"}`, transition: "all 0.3s" }}>
              {sent ? "✓ Opening Email Client…" : "Send Message →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ light }) {
  const c = light;
  return (
    <footer style={{ padding: "36px 40px", background: c ? "#f0ebe0" : "#0f0d0b", borderTop: `1px solid ${c ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.055)"}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: c ? "#1a1512" : "#f5f0e8", letterSpacing: "-0.01em", marginBottom: 3 }}>{CONFIG.name} <span style={{ color: "#e8c07d" }}>·</span> {CONFIG.role}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: c ? "rgba(26,21,18,0.32)" : "rgba(245,240,232,0.28)", letterSpacing: "0.06em" }}>© 2025 · {CONFIG.university}</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV.map(n => <button key={n} onClick={() => document.getElementById(n.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: c ? "rgba(26,21,18,0.36)" : "rgba(245,240,232,0.3)", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#e8c07d"} onMouseLeave={e => e.target.style.color = c ? "rgba(26,21,18,0.36)" : "rgba(245,240,232,0.3)"}>{n}</button>)}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function Portfolio() {
  const [light, setLight] = useState(false);
  return (
    <div style={{ background: light ? "#f8f4eb" : "#0a0908", color: light ? "#1a1512" : "#f5f0e8", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body, a, button { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,192,125,0.28); border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slowSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media (max-width: 768px) {
          section, footer, nav { padding-left: 20px !important; padding-right: 20px !important; }
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          [style*="grid-template-columns: 1fr 1fr"],
          [style*="grid-template-columns: 1fr 2fr"],
          [style*="grid-template-columns: 260px 1fr"],
          [style*="grid-template-columns: 80px 1fr 160px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Cursor />
      <ScrollProgress />
      <Navbar light={light} setLight={setLight} />
      <Hero light={light} />
      <Work light={light} />
      <About light={light} />
      <Moments light={light} />
      <Skills light={light} />
      <Contact light={light} />
      <Footer light={light} />
    </div>
  );
}
