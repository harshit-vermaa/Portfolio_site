"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// CONTENT CONFIGURATION — Edit here to update all sections
// ============================================================

const CONFIG = {
  name: "Harshit Verma",
  role: "Product Analyst & Data Scientist",
  university: "University of Leeds",
  tagline: "Product-focused analyst building intelligent AI and data-driven solutions for real-world impact.",
  bio: "AI postgraduate at the University of Leeds with a strong focus on product analytics, data science, and intelligent systems. I enjoy transforming complex data into scalable products, actionable insights, and user-focused solutions.",
  email: "harshitvermaofficial59@leeds.ac.uk",
  github: "https://github.com/harshit-vermaa",
  linkedin: "https://www.linkedin.com/in/harshit-verma-6646bb216/",
  resumeUrl: "#",
  availableForWork: true,
};

// ============================================================
// GALLERY IMAGES — Replace src with your actual image paths/URLs
// ============================================================
const GALLERY_IMAGES = [
  {
    id: 5,
    src: "/Pitch.jpeg",
    tag: "WINNER",
    label: "Dragons Den",
    caption: "From idea to winning pitch",
    color: "#10b981",
  },
  {
    id: 1,
    src: "/Hack_02.jpg",
    tag: "AI-HACK",
    label: "AI in Box",
    caption: "36hrs, 3 Red Bulls, 1 working prototype.",
    color: "#7c3aed",
  },
  {
    id: 2,
    src: "/Hack_01.jpeg",
    tag: "DATA-HACK",
    label: "UoL Datathon",
    caption: "Datathon by Pharmacy2U — building in 36hrs.",
    color: "#06b6d4",
  },
  {
    id: 3,
    src: "/Uni.jpeg",
    tag: "UNI",
    label: "University Campus",
    caption: "University of Leeds — the place that shaped it all.",
    color: "#ec4899",
  },
  {
    id: 4,
    src: "/S2.jpeg",
    tag: "SPEAK",
    label: "Presentation",
    caption: "Speaking at a student-led data summit.",
    color: "#f59e0b",
  },
];

// ============================================================
// PROJECTS — Add a new object to add a new project
// ============================================================
const PROJECTS = [
  {
    id: 1,
    title: "TrueHire.Ai",
    description: "AI hiring platform combining ATS screening, resume fraud detection, and LLM-generated personalized assessments. Multi-layer pipeline automates evaluation and delivers actionable feedback to applicants.",
    category: ["AI Tools"],
    tags: ["LLM", "NLP", "RAG", "TRANSFORMER", "AI"],
    github: "https://github.com",
    demo: null,
    featured: true,
    metrics: ["3-layer AI pipeline", "60/30/10 weighted scoring", "100% personalised exams"],
  },
  {
    id: 2,
    title: "Pharmacy2U-adherence-predictor",
    description: "ML system forecasting high-risk non-adherent patients 3–6 months ahead using behavioral prescription patterns. XGBoost with temporal validation recommends interventions to cut NHS costs.",
    category: "Data Science",
    tags: ["ML", "XGBoost", "Healthcare ML", "Temporal Validation", "Data Analystics"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    metrics: ["5.5M+ events analyzed", "72.9% recall", "0.80 ROC-AUC"],
  },
  {
    id: 3,
    title: "Global Fintech Sentiment Engine",
    description: "Multi-national NLP pipeline analyzing retail investment trends across UK, US, and India. Features a custom 'Surgical Rule' classifier to extract asset-specific sentiment from unstructured social data.",
    category: "Data Analytics",
    tags: ["Python", "NLTK", "VADER", "FinBERT", "Regex", "Tableau", "YouTube API", "Data Analytics"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    metrics: ["4,800+ Sentences Analyzed", "92% Classification Accuracy", "Cross-Regional Sentiment Parity"],
  },
  // {
  //   id: 4,
  //   title: "RAG Knowledge Assistant",
  //   description: "Retrieval-augmented generation system over private documents. Uses LangChain + Chroma vector DB with hybrid BM25 + semantic search for superior recall.",
  //   category: "AI Tools",
  //   tags: ["LangChain", "ChromaDB", "OpenAI", "FastAPI"],
  //   github: "https://github.com",
  //   demo: null,
  //   featured: false,
  //   metrics: ["85% answer accuracy", "2.1s avg latency", "10k doc capacity"],
  // },
  // {
  //   id: 5,
  //   title: "Leeds Property Analytics",
  //   description: "Scraping → cleaning → modelling pipeline for Leeds rental market. Predicts fair rent prices with gradient boosting, visualised in an interactive map.",
  //   category: "Data Analytics",
  //   tags: ["Scrapy", "Scikit-learn", "Plotly", "PostgreSQL"],
  //   github: "https://github.com",
  //   demo: "https://demo.com",
  //   featured: false,
  //   metrics: ["£18 avg error", "8,000 listings", "Interactive map"],
  // },
  // {
  //   id: 6,
  //   title: "AI Study Companion",
  //   description: "Full-stack web app using GPT-4 to generate adaptive flashcards and quizzes from uploaded lecture notes. Built with Next.js, Supabase, and Stripe.",
  //   category: "Websites",
  //   tags: ["Next.js", "Supabase", "GPT-4", "Stripe"],
  //   github: "https://github.com",
  //   demo: "https://demo.com",
  //   featured: false,
  //   metrics: ["500+ users", "20k flashcards generated", "4.8/5 rating"],
  // },
];

// ============================================================
// SKILLS — Edit here
// ============================================================
const SKILLS = {
"Product Intelligence": [
    "A/B Testing", "DAU/MAU", "Retention Analysis", "Churn Prediction", "Funnel & Conversion Optimization"],

  "Machine Learning": ["PyTorch", "TensorFlow", "Prediction Modeling", "Scikit-learn", "XGBoost", "Random Forest", "Regression"],

  "NLP & LLMs": ["RAG", "Transformers", "LangChain", "BERT", "GPT", "Sentiment Analysis", "Topic Modelling", "Topic Modeling"],

  "Computer Vision": ["OpenCV", "PyTorch", "Torchvision", "Object Detection", "ResNet50", "Domain Adaptation", "Deep CORAL",  "DANN"],

  "Data & Analytics": ["Advanced SQL", "Data Wrangling (Pandas/NumPy)",  "Tableau", "Power BI", "Excel", "Matplotlib/Seaborn"],

  "Web, APIs & Infrastructure": ["Next.js", "React", "Node.js", "REST", "Azure", "AWS(EC2/S3)", "Vercel", "Git", "Linux"],
};

// ============================================================
// ARTICLES — Add objects here for blog/LinkedIn posts
// ============================================================
const ARTICLES = [];

// ============================================================
// METRICS (Dashboard Section)
// ============================================================
const METRICS = [
  { label: "GitHub Repos", value: "22", icon: "📁" },
  { label: "ML Models Shipped", value: "4", icon: "🧠" },
  { label: "Lines of Code", value: "29k+", icon: "💻" },
  { label: "Datasets Processed", value: "10", icon: "📊" },
];

// ============================================================
// Utility
// ============================================================
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useInView(threshold = 0.15) {
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

// ============================================================
// Custom Cursor
// ============================================================
function CustomCursor({ darkMode }) {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const checkHover = (e) => {
      const el = e.target;
      const isInteractive = el.closest("a,button,input,textarea,[data-hover]");
      setHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", checkHover, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={cursorRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 99999,
        width: 12, height: 12, borderRadius: "50%",
        background: clicking ? "#06b6d4" : "#7c3aed",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s, background 0.2s, width 0.15s, height 0.15s",
        boxShadow: `0 0 ${clicking ? 20 : 10}px ${clicking ? "#06b6d4" : "#7c3aed"}`,
        willChange: "transform",
      }} />
      {/* Ring follower */}
      <div ref={followerRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 99998,
        width: hovering ? 50 : 40, height: hovering ? 50 : 40,
        borderRadius: "50%",
        border: `1.5px solid ${hovering ? "rgba(6,182,212,0.7)" : "rgba(124,58,237,0.5)"}`,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s, width 0.3s, height 0.3s, border-color 0.3s",
        backdropFilter: hovering ? "blur(2px)" : "none",
        willChange: "transform",
      }} />
    </>
  );
}

// ============================================================
// Orbital Ring Hero Animation
// ============================================================
// ============================================================
// ARC SKILL CARDS — Inspired by the half-ring / Gather reference
// Skills float along a large glowing semicircular arc at the bottom
// Text content sits fully above the arc — zero overlap
// ============================================================
const ARC_SKILLS = [
  { label: "Python",            color: "#7c3aed", icon: "🐍" },
  { label: "PyTorch",           color: "#ec4899", icon: "🔥" },
  { label: "SQL",               color: "#06b6d4", icon: "🗄️" },
  { label: "LangChain",         color: "#10b981", icon: "🔗" },
  { label: "Computer Vision",   color: "#f59e0b", icon: "👁️" },
  { label: "NLP",               color: "#6366f1", icon: "💬" },
  { label: "Product Analytics", color: "#06b6d4", icon: "📊" },
  { label: "A/B Testing",       color: "#ec4899", icon: "🧪" },
  { label: "Docker",            color: "#7c3aed", icon: "🐳" },
  { label: "XGBoost",           color: "#10b981", icon: "🚀" },
  { label: "Dashboards",        color: "#f59e0b", icon: "📈" },
  { label: "Data Pipelines",    color: "#6366f1", icon: "⚙️" },
];

function HeroCanvas({ darkMode }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Each card has a permanent slot angle along the arc + a float offset
    const cards = ARC_SKILLS.map((skill, i) => ({
      ...skill,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.4 + Math.random() * 0.3,
    }));

    function draw() {
      tRef.current += 0.008;
      const t = tRef.current;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const n = cards.length;
      // Arc center: horizontally centred, sits at ~55% height so top arc is clearly visible
      const arcCx = W / 2;
      const arcCy = H * 0.72;          // centre of the circle is well inside the viewport
      const arcR  = Math.min(W * 0.52, 480);  // radius of the arc

      // Spread cards across the top half of the circle (~150° span)
      const arcStartDeg = 195;
      const arcEndDeg   = 345;
      const arcSpanDeg  = arcEndDeg - arcStartDeg; // 150°

      // ── Draw the glowing arc track ──────────────────────────────
      const trackStart = (arcStartDeg - 5) * (Math.PI / 180);
      const trackEnd   = (arcEndDeg   + 5) * (Math.PI / 180);

      // Outer glow layers
      [60, 30, 12].forEach((blur, bi) => {
        ctx.save();
        ctx.shadowColor = "#7c3aed";
        ctx.shadowBlur = blur;
        ctx.beginPath();
        ctx.arc(arcCx, arcCy, arcR, trackStart, trackEnd);
        ctx.strokeStyle = `rgba(124,58,237,${0.06 + bi * 0.04})`;
        ctx.lineWidth = 2 + bi * 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // Main arc line
      ctx.save();
      const arcGrad = ctx.createLinearGradient(
        arcCx - arcR, arcCy, arcCx + arcR, arcCy
      );
      arcGrad.addColorStop(0,   "rgba(124,58,237,0.0)");
      arcGrad.addColorStop(0.2, "rgba(124,58,237,0.5)");
      arcGrad.addColorStop(0.5, "rgba(6,182,212,0.7)");
      arcGrad.addColorStop(0.8, "rgba(124,58,237,0.5)");
      arcGrad.addColorStop(1,   "rgba(124,58,237,0.0)");
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR, trackStart, trackEnd);
      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // ── Slow drift: the whole arc gently oscillates ──────────────
      const driftAngle = Math.sin(t * 0.25) * 0.04; // ±2° gentle sway

      // ── Draw each skill card ─────────────────────────────────────
      cards.forEach((card, i) => {
        // Base position along the arc
        const frac = i / (n - 1);  // 0..1
        const baseDeg = arcStartDeg + frac * arcSpanDeg;
        const baseRad = baseDeg * (Math.PI / 180) + driftAngle;

        // Gentle float: each card bobs independently
        const floatY = Math.sin(t * card.floatSpeed + card.floatOffset) * 5;

        const px = arcCx + Math.cos(baseRad) * arcR;
        const py = arcCy + Math.sin(baseRad) * arcR + floatY;

        // Mouse proximity glow
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const rect = canvas.getBoundingClientRect();
        const dist = Math.hypot(px - (mx - rect.left), py - (my - rect.top));
        const hovered = dist < 52;
        const proximity = Math.max(0, 1 - dist / 160); // 0..1 soft halo

        // Card dimensions
        const CARD_W = 110;
        const CARD_H = 56;
        const RADIUS = 14;

        ctx.save();
        ctx.translate(px, py);

        // Soft ambient glow when nearby
        if (proximity > 0) {
          ctx.shadowColor = card.color;
          ctx.shadowBlur = 20 + proximity * 30;
        }

        // Card background
        ctx.beginPath();
        ctx.roundRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, RADIUS);
        if (hovered) {
          ctx.fillStyle = card.color + "33";
        } else {
          ctx.fillStyle = darkMode ? "rgba(12,12,22,0.75)" : "rgba(255,255,255,0.75)";
        }
        ctx.fill();

        // Card border — glows more when hovered
        ctx.strokeStyle = hovered ? card.color + "cc" : card.color + "50";
        ctx.lineWidth = hovered ? 1.5 : 1;
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Icon
        ctx.font = "18px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(card.icon, 0, -8);

        // Label
        ctx.font = `600 10px 'JetBrains Mono', monospace`;
        ctx.fillStyle = hovered ? "#fff" : (darkMode ? card.color : card.color);
        ctx.textBaseline = "middle";
        ctx.fillText(card.label, 0, 13);

        ctx.restore();
      });

      // ── Ambient particles drifting along the arc ─────────────────
      for (let pi = 0; pi < 6; pi++) {
        const pFrac = ((t * 0.12 + pi / 6) % 1);
        const pDeg = arcStartDeg + pFrac * arcSpanDeg;
        const pRad = pDeg * (Math.PI / 180) + driftAngle;
        const px = arcCx + Math.cos(pRad) * arcR;
        const py = arcCy + Math.sin(pRad) * arcR;
        const alpha = Math.sin(pFrac * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${alpha})`;
        ctx.shadowColor = "#7c3aed";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [darkMode]);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Dark fade at top so arc cards don't bleed into text */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "58%", zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(8,8,16,0.82) 0%, rgba(8,8,16,0.5) 60%, transparent 100%)",
      }} />
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{ width: "100%", height: "100%", display: "block", pointerEvents: "auto" }}
      />
    </div>
  );
}

// ============================================================
// Animated background — subtle grid + noise
// ============================================================
function GridBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />
      <div style={{
        position: "absolute", top: "-20%", left: "60%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        transform: "translate(-50%, 0)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "-5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
      }} />
    </div>
  );
}

// ============================================================
// Scroll Progress Bar
// ============================================================
function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setProg((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 2, zIndex: 9999,
      width: `${prog}%`,
      background: "linear-gradient(90deg, #7c3aed, #06b6d4, #10b981)",
      transition: "width 0.05s linear",
      boxShadow: "0 0 10px rgba(124,58,237,0.6)",
    }} />
  );
}

// ============================================================
// Navbar
// ============================================================
const NAV_ITEMS = ["About", "Gallery", "Skills", "Projects", "Dashboard", "Writing", "Contact"];

function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      background: scrolled ? (darkMode ? "rgba(8,8,16,0.85)" : "rgba(255,255,255,0.85)") : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono', monospace",
          }}>
            {CONFIG.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1a202c", letterSpacing: "0.02em" }}>
            {CONFIG.name.split(" ")[0].toLowerCase()}<span style={{ color: "#7c3aed" }}>.</span>dev
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 12px", borderRadius: 6,
                fontSize: 13, fontWeight: 500, fontFamily: "inherit",
                color: darkMode ? "#94a3b8" : "#64748b",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.target.style.color = darkMode ? "#e2e8f0" : "#1a202c"; e.target.style.background = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { e.target.style.color = darkMode ? "#94a3b8" : "#64748b"; e.target.style.background = "none"; }}
            >{item}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: 36, height: 36, borderRadius: 8, border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, transition: "all 0.2s",
            }}
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          {CONFIG.availableForWork && (
            <a href={`mailto:${CONFIG.email}`} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "#fff", textDecoration: "none",
              fontSize: 13, fontWeight: 600,
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
              Hire Me
            </a>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none", width: 36, height: 36, borderRadius: 8,
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              background: "none", cursor: "pointer", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: darkMode ? "#e2e8f0" : "#1a202c",
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          background: darkMode ? "rgba(8,8,16,0.95)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          padding: "12px 24px 20px",
        }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                padding: "10px 0", fontSize: 15, fontWeight: 500, fontFamily: "inherit",
                color: darkMode ? "#94a3b8" : "#64748b",
                borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              }}
            >{item}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
// Section wrapper
// ============================================================
function Section({ id, children, style }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section id={id} ref={ref} style={{
      position: "relative", zIndex: 1,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style,
    }}>
      {children}
    </section>
  );
}

function SectionHeader({ label, title, subtitle, darkMode }) {
  return (
    <div style={{ marginBottom: 56, textAlign: "center" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 14px", borderRadius: 20,
        background: "rgba(124,58,237,0.12)",
        border: "1px solid rgba(124,58,237,0.25)",
        marginBottom: 16,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed" }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, margin: "0 0 12px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", color: darkMode ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.02em" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 17, color: darkMode ? "#94a3b8" : "#64748b", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function Hero({ darkMode }) {
  const [typed, setTyped] = useState("");
  const roles = ["Data Scientist", "AI Engineer", "Product Analyst", "ML Engineer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const deletingRef = useRef(false);
  const iRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const role = roles[roleIdx];
    const tick = () => {
      if (!deletingRef.current) {
        iRef.current += 1;
        setTyped(role.slice(0, iRef.current));
        if (iRef.current === role.length) {
          timeoutRef.current = setTimeout(() => {
            deletingRef.current = true;
            timeoutRef.current = setTimeout(tick, 120);
          }, 2200);
          return;
        }
        timeoutRef.current = setTimeout(tick, 130);
      } else {
        iRef.current -= 1;
        setTyped(role.slice(0, iRef.current));
        if (iRef.current === 0) {
          deletingRef.current = false;
          setRoleIdx(r => (r + 1) % roles.length);
          return;
        }
        timeoutRef.current = setTimeout(tick, 65);
      }
    };
    iRef.current = 0;
    deletingRef.current = false;
    timeoutRef.current = setTimeout(tick, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [roleIdx]);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end",
      padding: "0 24px 60px",
      textAlign: "center",
      position: "relative", zIndex: 1, overflow: "hidden",
    }}>

      {/* ── Arc canvas — fills entire section ── */}
      <HeroCanvas darkMode={darkMode} />

      {/* ── Deep centre glow ── */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: darkMode
          ? "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Hero text content — sits BELOW the arc ring ── */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: 820,
      }}>

        {/* Available badge */}
        {CONFIG.availableForWork && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 20,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.28)",
            marginBottom: 20,
            animation: "fadeInDown 0.6s ease",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#10b981", boxShadow: "0 0 8px #10b981",
              animation: "pulse 2s infinite",
            }} />
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#10b981",
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em",
            }}>
              AVAILABLE · FULL TIME & INTERNSHIP · 2026
            </span>
          </div>
        )}

        {/* Name */}
        <h1 style={{
          fontSize: "clamp(36px, 5.5vw, 72px)",
          fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.035em",
          margin: "0 0 14px",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          animation: "fadeInUp 0.7s ease 0.1s both",
        }}>
          <span style={{ color: darkMode ? "#f1f5f9" : "#0f172a" }}>Hi, I'm </span>
          <span style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 55%, #10b981 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{CONFIG.name}</span>
        </h1>

        {/* Typewriter role */}
        <div style={{
          fontSize: "clamp(15px, 2.2vw, 22px)", fontWeight: 500, marginBottom: 14,
          fontFamily: "'JetBrains Mono', monospace",
          color: darkMode ? "#94a3b8" : "#475569",
          animation: "fadeInUp 0.7s ease 0.2s both", minHeight: "1.5em",
        }}>
          <span style={{ color: "#7c3aed" }}>{">"}</span>
          <span style={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}> {typed}</span>
          <span style={{ borderRight: "2px solid #7c3aed", marginLeft: 2, animation: "blink 1s infinite" }}>&#8203;</span>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(13px, 1.5vw, 16px)",
          color: darkMode ? "#94a3b8" : "#64748b",
          maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.65,
          animation: "fadeInUp 0.7s ease 0.3s both",
        }}>
          {CONFIG.tagline}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
          animation: "fadeInUp 0.7s ease 0.4s both",
        }}>
          <button
            onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "11px 24px", borderRadius: 10, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
              boxShadow: "0 0 28px rgba(124,58,237,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(124,58,237,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(124,58,237,0.35)"; }}
          >
            View Projects →
          </button>

          <a href={CONFIG.github} target="_blank" rel="noreferrer" style={{
            padding: "11px 24px", borderRadius: 10,
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.11)"}`,
            color: darkMode ? "#e2e8f0" : "#1e293b",
            background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "inherit",
            transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 7,
            backdropFilter: "blur(8px)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.11)"; }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>⌥</span> GitHub
          </a>

          <a href={CONFIG.resumeUrl} style={{
            padding: "11px 24px", borderRadius: 10,
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.11)"}`,
            color: darkMode ? "#e2e8f0" : "#1e293b",
            background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "inherit",
            transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 7,
            backdropFilter: "blur(8px)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.11)"; }}
          >
            ↓ Download CV
          </a>
        </div>

        {/* Social links row */}
        <div style={{
          display: "flex", gap: 16, marginTop: 22, justifyContent: "center",
          animation: "fadeInUp 0.7s ease 0.5s both",
        }}>
          {[
            { label: "GitHub",   url: CONFIG.github,           icon: "⌥" },
            { label: "LinkedIn", url: CONFIG.linkedin,          icon: "in" },
            { label: "Email",    url: `mailto:${CONFIG.email}`, icon: "@" },
          ].map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 9,
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                color: darkMode ? "#94a3b8" : "#64748b",
                backdropFilter: "blur(8px)",
              }}>{icon}</div>
              <span style={{ fontSize: 10, color: darkMode ? "#475569" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        animation: "bounce 2s infinite", zIndex: 3,
      }}>
        <div style={{
          width: 22, height: 34, borderRadius: 11,
          border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)"}`,
          display: "flex", justifyContent: "center", paddingTop: 5,
        }}>
          <div style={{ width: 3, height: 8, borderRadius: 2, background: "#7c3aed", animation: "scrollDot 1.5s infinite" }} />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function About({ darkMode }) {
  const cardStyle = {
    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
    border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
    borderRadius: 14, padding: "24px", backdropFilter: "blur(10px)",
    transition: "border-color 0.2s, transform 0.2s",
  };

  return (
    <Section id="about" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader label="About Me" title="Builder. Thinker. Data Nerd." darkMode={darkMode} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{
              ...cardStyle, marginBottom: 20,
              background: darkMode ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.04)",
              border: `1px solid rgba(124,58,237,0.2)`,
            }}>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: darkMode ? "#cbd5e1" : "#334155" }}>{CONFIG.bio}</p>
            </div>

            <div style={cardStyle}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#7c3aed", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>🎓 Education</h3>
              <p style={{ margin: 0, fontSize: 15, color: darkMode ? "#94a3b8" : "#475569", lineHeight: 1.6 }}>
                <strong style={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}>MSc Advanced Computer Science (Artificial Intelligence)</strong><br />
                {CONFIG.university} · 2025–2026<br />
                <span style={{ fontSize: 13, color: darkMode ? "#64748b" : "#94a3b8" }}> <b>Modules</b>: Data Science, Machine Learning, Deep Learning, Data Mining & Text Analysis, Cloud Computing, Advanced Software Engineering, Prog of DS, KRR</span>
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🎨", title: "Product Thinking", desc: "I care about why we build, not just how. User-first, metric-driven." },
              { icon: "🧠", title: "Deep ML", desc: "From theory to deployed models, transformers, GBMs, CV pipelines." },
              { icon: "📊", title: "Data-Driven", desc: "Obsessed with turning messy data into clean, actionable insight." },
              { icon: "🚀", title: "Startup Mindset", desc: "Ship fast, learn faster. Pragmatic about tooling, rigorous about results." },
            ].map(({ icon, title, desc }) => (
              <div key={title}
                style={{ ...cardStyle, cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: darkMode ? "#e2e8f0" : "#1e293b" }}>{title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: darkMode ? "#64748b" : "#94a3b8", lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// GALLERY SECTION
// ============================================================
function Gallery({ darkMode }) {
  const [active, setActive] = useState(1);

  return (
    <Section id="gallery" style={{ padding: "100px 24px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          label="Beyond the Code"
          title="In the Real World"
          subtitle="Hackathons, conferences, campus life — where the best ideas happen at 2am."
          darkMode={darkMode}
        />

        <div style={{
          display: "flex",
          gap: 12,
          height: 360,
          alignItems: "stretch",
        }}>
          {GALLERY_IMAGES.map((img) => {
            const isActive = active === img.id;
            return (
              <div
                key={img.id}
                onMouseEnter={() => setActive(img.id)}
                style={{
                  flex: isActive ? "4" : "1",
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)",
                  border: isActive ? `2px solid ${img.color}80` : "2px solid transparent",
                  boxShadow: isActive ? `0 0 40px ${img.color}30` : "none",
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    filter: isActive ? "brightness(0.75)" : "brightness(0.45) grayscale(0.4)",
                    transition: "filter 0.5s ease",
                  }}
                />

                {/* Tag badge */}
                <div style={{
                  position: "absolute", top: 14, left: 14,
                  padding: "3px 10px", borderRadius: 6,
                  background: img.color,
                  fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                  color: "#fff", letterSpacing: "0.1em",
                }}>
                  {img.tag}
                </div>

                {/* Label on side when collapsed */}
                {!isActive && (
                  <div style={{
                    position: "absolute",
                    bottom: 20, left: "50%",
                    transform: "translateX(-50%) rotate(90deg)",
                    transformOrigin: "center center",
                    whiteSpace: "nowrap",
                    fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    {img.label}
                  </div>
                )}

                {/* Caption when active */}
                {isActive && (
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "40px 24px 24px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
                    animation: "fadeInUp 0.4s ease",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{img.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>{img.caption}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: darkMode ? "#475569" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
          Hover any panel to expand · Replace images in GALLERY_IMAGES config
        </p>
      </div>
    </Section>
  );
}

// ============================================================
// SKILLS SECTION
// ============================================================
function Skills({ darkMode }) {
  const colors = {
    "Product Intelligence": "#7c3aed",
    "Machine Learning": "#06b6d4",
    "NLP & LLMs": "#10b981",
    "Computer Vision": "#f59e0b",
    "Data & Analytics": "#ec4899",
    "Web, APIs & Infrastructure": "#6366f1",
  };

  return (
    <Section id="skills" style={{ padding: "100px 24px", background: darkMode ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader label="Technical Skills" title="The Stack I Work With" subtitle="Modern data stack optimized for high-impact analysis: bridging the gap between big data and product decisions." darkMode={darkMode} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {Object.entries(SKILLS).map(([category, skills]) => {
            const color = colors[category] || "#7c3aed";
            return (
              <div key={category} style={{
                background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                borderRadius: 14, padding: "24px",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600, color, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map(skill => (
                    <span key={skill} style={{
                      padding: "5px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                      background: `${color}15`, color, border: `1px solid ${color}25`,
                      transition: "all 0.15s", cursor: "default",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                      onMouseEnter={e => { e.target.style.background = `${color}28`; e.target.style.borderColor = `${color}50`; }}
                      onMouseLeave={e => { e.target.style.background = `${color}15`; e.target.style.borderColor = `${color}25`; }}
                    >{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// PROJECTS SECTION
// ============================================================
const PROJECT_CATEGORIES = ["All", "ML", "AI", "NLP", "Data Analytics"];

function ProjectCard({ project, darkMode, delay }) {
  const [ref, inView] = useInView(0.1);
  const categoryColors = {
    "ML": "#7c3aed", "NLP": "#06b6d4", "Computer Vision": "#10b981",
    "Data Analytics": "#f59e0b", "Websites": "#ec4899", "AI Tools": "#6366f1",
  };
  const color = categoryColors[project.category] || "#7c3aed";

  return (
    <div ref={ref} style={{
      background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
      border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
      borderRadius: 16, padding: "28px", backdropFilter: "blur(10px)",
      transition: "all 0.25s", cursor: "default",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${delay * 0.08}s`,
      display: "flex", flexDirection: "column",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${color}15`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <span style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 600,
            background: `${color}18`, color, border: `1px solid ${color}25`,
            fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10,
          }}>{project.category}</span>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.01em" }}>
            {project.title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" style={{
              width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              color: darkMode ? "#94a3b8" : "#64748b", textDecoration: "none", fontSize: 14, transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#7c3aed"; }}
              onMouseLeave={e => { e.currentTarget.style.color = darkMode ? "#94a3b8" : "#64748b"; }}
              title="Live Demo"
            >↗</a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer" style={{
            width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            color: darkMode ? "#94a3b8" : "#64748b", textDecoration: "none", fontSize: 14, transition: "all 0.15s",
            fontFamily: "'JetBrains Mono', monospace",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#7c3aed"; }}
            onMouseLeave={e => { e.currentTarget.style.color = darkMode ? "#94a3b8" : "#64748b"; }}
            title="GitHub"
          >⌥</a>
        </div>
      </div>

      <p style={{ margin: "0 0 16px", fontSize: 14, color: darkMode ? "#94a3b8" : "#64748b", lineHeight: 1.65, flex: 1 }}>
        {project.description}
      </p>

      {project.metrics && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {project.metrics.map(m => (
            <span key={m} style={{
              padding: "3px 10px", borderRadius: 5, fontSize: 12, fontWeight: 500,
              background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
              color: darkMode ? "#cbd5e1" : "#475569",
              fontFamily: "'JetBrains Mono', monospace",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}>{m}</span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            padding: "3px 9px", borderRadius: 4, fontSize: 12,
            background: "transparent",
            color: darkMode ? "#475569" : "#94a3b8",
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function Projects({ darkMode }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(activeFilter));

  return (
    <Section id="projects" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Projects" title="Things I've Built" subtitle="Bridging the gap between raw data and product strategy through advanced ML and deep analytical exploration." darkMode={darkMode} />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {PROJECT_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} style={{
              padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.2s",
              background: activeFilter === cat ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              color: activeFilter === cat ? "#fff" : (darkMode ? "#94a3b8" : "#64748b"),
              border: activeFilter === cat ? "1px solid transparent" : `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"}`,
              boxShadow: activeFilter === cat ? "0 0 20px rgba(124,58,237,0.3)" : "none",
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} darkMode={darkMode} delay={i} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href={CONFIG.github} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 10,
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
            color: darkMode ? "#94a3b8" : "#64748b",
            background: "none", textDecoration: "none", fontSize: 14, fontWeight: 500,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "#7c3aed"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"; e.currentTarget.style.color = darkMode ? "#94a3b8" : "#64748b"; }}
          >
            ⌥ View all repos on GitHub →
          </a>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// DASHBOARD SECTION
// ============================================================
function AnimatedBar({ value, max, color, delay }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 4,
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        width: inView ? `${(value / max) * 100}%` : "0%",
        transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
        boxShadow: `0 0 10px ${color}60`,
      }} />
    </div>
  );
}

function Dashboard({ darkMode }) {
  const skills_progress = [
    { name: "Python / ML", value: 92, color: "#7c3aed" },
    { name: "Product Metrics & Strategy", value: 88, color: "#06b6d4" },
    { name: "NLP & GenAI", value: 85, color: "#10b981" },
    { name: "Computer Vision", value: 70, color: "#f59e0b" },
    { name: "SQL & Data Wrangling", value: 82, color: "#ec4899" },
    { name: "A/B Testing & Experimentation", value: 75, color: "#6366f1" },
  ];

  return (
    <Section id="dashboard" style={{ padding: "100px 24px", background: darkMode ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader label="Dashboard" title="By the Numbers" subtitle="A data-driven view of my work, because portfolios should have metrics too." darkMode={darkMode} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {METRICS.map(({ label, value, icon }) => (
            <div key={label} style={{
              background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
              borderRadius: 14, padding: "24px", textAlign: "center",
              backdropFilter: "blur(10px)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: darkMode ? "#f1f5f9" : "#0f172a", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: 13, color: darkMode ? "#64748b" : "#94a3b8", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
          border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
          borderRadius: 16, padding: "32px", backdropFilter: "blur(10px)",
        }}>
          <h3 style={{ margin: "0 0 28px", fontSize: 15, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b" }}>Self-assessed proficiency</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 40px" }}>
            {skills_progress.map(({ name, value, color }, i) => (
              <div key={name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: darkMode ? "#94a3b8" : "#475569", fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color, fontFamily: "'JetBrains Mono', monospace" }}>{value}%</span>
                </div>
                <AnimatedBar value={value} max={100} color={color} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// WRITING / ARTICLES SECTION
// ============================================================
function Writing({ darkMode }) {
  return (
    <Section id="writing" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="Writing" title="Thoughts & Articles" subtitle="I write about ML systems, data engineering, and product thinking." darkMode={darkMode} />

        {ARTICLES.length === 0 ? (
          <div style={{
            background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
            border: `1px dashed ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
            borderRadius: 16, padding: "60px 40px", textAlign: "center",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✍️</div>
            <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a" }}>Articles Loading…</h3>
            <p style={{ margin: "0 0 28px", fontSize: 15, color: darkMode ? "#64748b" : "#94a3b8", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              I'm currently drafting articles on RAG architectures, data quality automation, and shipping ML in production. Check back soon.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["RAG vs Fine-tuning", "Data Quality at Scale", "ML in Production", "LLM Evaluation"].map(topic => (
                <span key={topic} style={{
                  padding: "6px 14px", borderRadius: 6, fontSize: 13,
                  background: "rgba(124,58,237,0.1)", color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,0.2)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>Coming: {topic}</span>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <a href={CONFIG.linkedin} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 22px", borderRadius: 8,
                background: "linear-gradient(135deg, #0077b5, #00a0dc)",
                color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600,
              }}>
                Follow on LinkedIn for updates →
              </a>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 20 }}>
            {ARTICLES.map(article => (
              <a key={article.id} href={article.url} target="_blank" rel="noreferrer" style={{
                display: "block", textDecoration: "none",
                background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                borderRadius: 14, padding: "24px", backdropFilter: "blur(10px)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#7c3aed", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{article.platform} · {article.date}</span>
                  <span style={{ fontSize: 14 }}>↗</span>
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: darkMode ? "#f1f5f9" : "#0f172a" }}>{article.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: darkMode ? "#64748b" : "#94a3b8", lineHeight: 1.6 }}>{article.excerpt}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

// ============================================================
// PAPER AIRPLANE ANIMATION COMPONENT
// ============================================================
function PlaneAnimation({ onDone }) {
  const [phase, setPhase] = useState("fly"); // fly | done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("done"), 1600);
    const t2 = setTimeout(() => onDone(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "rgba(8,8,16,0.85)", backdropFilter: "blur(12px)",
      animation: phase === "done" ? "fadeOut 0.6s ease 2.4s forwards" : "fadeIn 0.3s ease",
    }}>
      {phase === "fly" && (
        <div style={{ position: "relative", width: 300, height: 120 }}>
          {/* Plane */}
          <div style={{
            position: "absolute",
            fontSize: 44,
            animation: "planeFlySend 1.5s cubic-bezier(0.4,0,0.2,1) forwards",
          }}>✈️</div>
          {/* Trail dots */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: "absolute", top: 22,
              left: -20 - i * 18,
              width: 6, height: 6, borderRadius: "50%",
              background: "#7c3aed",
              opacity: 0.7 - i * 0.2,
              animation: `trailDot 1.5s ease ${i * 0.05}s forwards`,
            }} />
          ))}
        </div>
      )}

      {phase === "done" && (
        <div style={{ textAlign: "center", animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36,
            boxShadow: "0 0 40px rgba(16,185,129,0.5)",
          }}>✓</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#f1f5f9" }}>Message Sent!</h3>
          <p style={{ margin: 0, fontSize: 15, color: "#64748b" }}>Your email client should open. Talk soon 🚀</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CONTACT SECTION
// ============================================================
function Contact({ darkMode }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [showPlane, setShowPlane] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xgodrrwo", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio Contact from ${form.name}`,
          message: form.message,
        }),
      });
      if (res.ok) {
        setShowPlane(true);
        setStatus("success");
        setTimeout(() => setForm({ name: "", email: "", subject: "", message: "" }), 800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
    color: darkMode ? "#e2e8f0" : "#1e293b", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <>
      {showPlane && <PlaneAnimation onDone={() => { setShowPlane(false); }} />}

      <Section id="contact" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Compact headline */}
          <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{
                fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em",
                color: darkMode ? "#f1f5f9" : "#0f172a", margin: "0 0 10px",
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              }}>
                Let's build something{" "}
                <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  data-driven.
                </span>
              </h2>
              <p style={{ fontSize: 15, color: darkMode ? "#64748b" : "#94a3b8", maxWidth: 500, lineHeight: 1.55, margin: 0 }}>
                Open to product analyst roles, data science collaborations, and interesting conversations about analytics, AI, and product.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 28, alignItems: "start" }}>
            {/* Left — Form */}
            <div style={{
              background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 20, padding: "28px",
              backdropFilter: "blur(20px)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: darkMode ? "#64748b" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.07em" }}>Your Name</label>
                  <input style={inputStyle} placeholder="Ada Lovelace" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = "#7c3aed"}
                    onBlur={e => e.target.style.borderColor = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: darkMode ? "#64748b" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.07em" }}>Email Address</label>
                  <input style={inputStyle} placeholder="ada@example.com" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = "#7c3aed"}
                    onBlur={e => e.target.style.borderColor = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} />
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: darkMode ? "#64748b" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.07em" }}>Subject</label>
                <input style={inputStyle} placeholder="Analyst role at Acme · Collaboration · General enquiry" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "#7c3aed"}
                  onBlur={e => e.target.style.borderColor = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: darkMode ? "#64748b" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.07em" }}>Message</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} placeholder="Tell me about the opportunity or what you'd like to discuss..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "#7c3aed"}
                  onBlur={e => e.target.style.borderColor = darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} />
              </div>

              <button onClick={handleSubmit} disabled={status === "sending" || status === "success"} style={{
                width: "100%", padding: "13px", borderRadius: 10, border: "none",
                cursor: status === "sending" || status === "success" ? "default" : "pointer",
                background: status === "success"
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : status === "error"
                  ? "linear-gradient(135deg, #ef4444, #dc2626)"
                  : "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
                boxShadow: status === "success" ? "0 0 30px rgba(16,185,129,0.35)" : "0 0 30px rgba(59,130,246,0.35)",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: status === "sending" ? 0.7 : 1,
              }}
                onMouseEnter={e => { if (status === "idle" || status === "error") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(59,130,246,0.5)"; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = status === "success" ? "0 0 30px rgba(16,185,129,0.35)" : "0 0 30px rgba(59,130,246,0.35)"; }}
              >
                <span>
                  {status === "sending" ? "Sending…" : status === "success" ? "Message Sent ✓" : status === "error" ? "Failed — Try Again" : "Send Message"}
                </span>
                {status === "idle" && <span style={{ fontSize: 18 }}>→</span>}
              </button>
              {status === "error" && (
                <p style={{ margin: "8px 0 0", fontSize: 12, color: "#ef4444", textAlign: "center" }}>
                  Something went wrong. Please email directly at {CONFIG.email}
                </p>
              )}
            </div>

            {/* Right — Info panel (combined into one card) */}
            <div style={{
              background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 16, padding: "24px",
              backdropFilter: "blur(16px)",
              display: "flex", flexDirection: "column", gap: 20,
            }}>
              <div>
                <h3 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: darkMode ? "#e2e8f0" : "#1e293b" }}>Find me online</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "✉️", text: CONFIG.email },
                    { icon: "📍", text: "Leeds, United Kingdom" },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                        flexShrink: 0,
                      }}>{icon}</div>
                      <span style={{ fontSize: 12, color: darkMode ? "#94a3b8" : "#475569", wordBreak: "break-all" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }} />

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? "#475569" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Social Links</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { icon: "⌥", href: CONFIG.github, label: "GitHub" },
                    { icon: "in", href: CONFIG.linkedin, label: "LinkedIn" },
                    { icon: "@", href: `mailto:${CONFIG.email}`, label: "Email" },
                  ].map(({ icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" title={label} style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                      color: darkMode ? "#94a3b8" : "#64748b",
                      textDecoration: "none", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "#7c3aed"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"; e.currentTarget.style.color = darkMode ? "#94a3b8" : "#64748b"; }}
                    >{icon}</a>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }} />

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? "#475569" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Response Time</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#10b981", fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 }}>Usually &lt; 24h</div>
                <div style={{ fontSize: 12, color: darkMode ? "#64748b" : "#94a3b8", lineHeight: 1.5 }}>Open to full-time roles, contract work, and collaborations.</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ darkMode }) {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#1e293b", fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
            {CONFIG.name.toLowerCase().replace(" ", ".")}<span style={{ color: "#7c3aed" }}>.dev</span>
          </div>
          <div style={{ fontSize: 12, color: darkMode ? "#475569" : "#94a3b8" }}>
            © 2025 · Built with React · {CONFIG.university}
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
                fontSize: 13, color: darkMode ? "#475569" : "#94a3b8", transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#7c3aed"}
              onMouseLeave={e => e.target.style.color = darkMode ? "#475569" : "#94a3b8"}
            >{item}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function Portfolio_2() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div style={{
      minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      background: darkMode ? "#080810" : "#f8fafc",
      color: darkMode ? "#e2e8f0" : "#1e293b",
      transition: "background 0.3s, color 0.3s",
      overflowX: "hidden",
      cursor: "none",
    }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; cursor: none !important; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }
        @keyframes scrollDot { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(14px); opacity: 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; pointer-events: none; } }
        @keyframes tooltipIn { from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
        @keyframes planeFlySend {
          0% { left: 0; top: 50%; opacity: 1; transform: translateY(-50%) scale(1) rotate(-10deg); }
          60% { left: 220px; top: 10%; opacity: 1; transform: translateY(-50%) scale(1.15) rotate(-25deg); }
          100% { left: 340px; top: -20px; opacity: 0; transform: translateY(-50%) scale(0.7) rotate(-30deg); }
        }
        @keyframes trailDot {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.3) translateX(-40px); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 3px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: 3fr 2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <CustomCursor darkMode={darkMode} />
      <ScrollProgress />
      <GridBackground />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Gallery darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Dashboard darkMode={darkMode} />
      <Writing darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
