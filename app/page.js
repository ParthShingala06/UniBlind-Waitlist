"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logoSrc from "./resources/Icon.png";
import supabase from "./lib/supabase";

/* ───────── COLORS ───────── */
const C = {
  blue: "#1B90E8",
  blueDark: "#1060C0",
  blueLight: "#4AAFF5",
  yellow: "#FFB300",
  yellowLight: "#FFC940",
  yellowDim: "#E09A00",
  dark: "#080D14",
  card: "#0E1828",
  cardHover: "#132030",
  text: "#E8EEF5",
  dim: "#8A9AB5",
  white: "#FFFFFF",
};

/* ───────── LOGO ───────── */
const Logo = ({ size = 36 }) => (
  <Image src={logoSrc} alt="UniBlind" width={size} height={size} style={{ borderRadius: 8 }} />
);

/* ───────── FADE-IN ON SCROLL ───────── */
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ───────── STYLES ───────── */
const s = {
  section: {
    padding: "110px 32px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: C.yellow,
    marginBottom: 12,
  },
  h2: {
    fontFamily: "var(--font-heading), sans-serif",
    fontSize: "clamp(30px, 4.5vw, 46px)",
    fontWeight: 700,
    color: C.white,
    letterSpacing: -1.5,
    lineHeight: 1.12,
  },
  sub: {
    fontSize: 16,
    color: C.dim,
    maxWidth: 500,
    lineHeight: 1.7,
    marginTop: 14,
  },
  btnPrimary: {
    background: `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`,
    color: "#fff",
    border: "none",
    padding: "13px 28px",
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
};

/* ═══════════════ NAV ═══════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(20px)",
        background: scrolled ? "rgba(8,13,20,0.85)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(27,144,232,0.1)"
          : "1px solid transparent",
        transition: "all 0.4s",
      }}
    >
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <Logo />
        <span
          style={{
            fontWeight: 800,
            fontSize: 20,
            color: C.white,
            letterSpacing: -0.5,
          }}
        >
          UniBlind
        </span>
      </a>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {["Features", "How It Works", "Why Us", "Preview"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(/ /g, "-")}`}
            style={{
              color: C.dim,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {l}
          </a>
        ))}
        <a href="#cta" style={s.btnPrimary}>
          Get Early Access
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════ HERO ═══════════════ */
function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "140px 24px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "25%",
          width: 750,
          height: 750,
          background:
            "radial-gradient(circle, rgba(27,144,232,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "10%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(255,179,0,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "pulse 8s ease-in-out infinite 4s",
        }}
      />

      <FadeIn>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(27,144,232,0.1)",
            border: "1px solid rgba(27,144,232,0.22)",
            padding: "8px 20px",
            borderRadius: 50,
            fontSize: 12,
            color: C.yellowLight,
            fontWeight: 500,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.blue,
              display: "inline-block",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          Launching Soon — Campus Beta
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "clamp(46px, 7.5vw, 84px)",
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -3,
            color: C.white,
            maxWidth: 860,
            margin: 0,
          }}
        >
          Speak Freely.
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${C.blue}, ${C.yellow})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stay Anonymous.
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p
          style={{
            fontSize: 17,
            color: C.dim,
            maxWidth: 530,
            lineHeight: 1.7,
            marginTop: 22,
          }}
        >
          The verified anonymous community for university students. Rate
          professors, review courses, share opportunities — no judgment, no
          exposure.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
          <a
            href="#cta"
            style={{
              ...s.btnPrimary,
              padding: "15px 34px",
              fontSize: 15,
              boxShadow: "0 8px 32px rgba(27,144,232,0.3)",
            }}
          >
            Join the Waitlist
          </a>
          <a
            href="#features"
            style={{
              background: "transparent",
              color: C.text,
              border: "1px solid rgba(27,144,232,0.3)",
              padding: "15px 34px",
              borderRadius: 50,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            See Features ↓
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.45}>
        <div style={{ display: "flex", gap: 52, marginTop: 68 }}>
          {[
            ["100%", "Anonymous"],
            [".edu", "Verified Only"],
            ["0", "Data Sold"],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 30,
                  fontWeight: 700,
                  color: C.yellow,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.dim,
                  marginTop: 3,
                  letterSpacing: 0.5,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════ HOW IT WORKS ═══════════════ */
const steps = [
  {
    n: "01",
    t: "University Email",
    d: "Enter your .edu or institution email. Domain auto-maps to your university.",
  },
  {
    n: "02",
    t: "OTP Verification",
    d: "One-time code to your inbox. That's the last time we touch your email.",
  },
  {
    n: "03",
    t: "Get Your Alias",
    d: "Auto-generated alias like Falcon_8271. No name, no photo, no trace.",
  },
  {
    n: "04",
    t: "Speak Freely",
    d: "Post in your campus channel, rate professors, or share on the public feed.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" style={s.section}>
      <FadeIn>
        <div style={s.label}>How It Works</div>
        <h2 style={s.h2}>Four steps. Fully anonymous.</h2>
        <p style={s.sub}>
          We verify you&apos;re a student, then forget who you are. Forever.
        </p>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          marginTop: 52,
          background: "rgba(27,144,232,0.07)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {steps.map((st, i) => (
          <FadeIn key={st.n} delay={i * 0.1}>
            <div
              style={{
                background: C.card,
                padding: "36px 24px",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 54,
                  fontWeight: 700,
                  color: "rgba(27,144,232,0.1)",
                  lineHeight: 1,
                  marginBottom: 18,
                }}
              >
                {st.n}
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.white,
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                {st.t}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: C.dim,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {st.d}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ FEATURES ═══════════════ */
const features = [
  {
    icon: "🏫",
    t: "University Channels",
    d: "Private, gated space per campus. Only students with matching email domain can see or post. Your campus, your rules.",
    tags: ["Private", "Verified", "Per-Campus"],
    span: 2,
  },
  {
    icon: "⭐",
    t: "Professor Ratings",
    d: "Teaching quality, grading fairness, attendance, bias, approachability. Aggregate scores. Honest reviews.",
    tags: [],
    span: 1,
  },
  {
    icon: "📚",
    t: "Course Reviews",
    d: "Difficulty, usefulness, workload, exam patterns. Filter by department & semester.",
    tags: [],
    span: 1,
  },
  {
    icon: "🌐",
    t: "Public Feed",
    d: "Cross-university layer. Jobs, hackathons, admissions, collabs, co-founder searches, referrals.",
    tags: ["Jobs", "Hackathons", "Startups", "Research"],
    span: 1,
  },
  {
    icon: "🗓️",
    t: "Event Board",
    d: "Fests, hackathons, workshops, competitions. Post with date, link, organizer. Auto-archive past events.",
    tags: [],
    span: 1,
  },
  {
    icon: "💬",
    t: "Threaded Discussions",
    d: "Upvote, downvote, nested replies. OP gets distinct anonymous tag. Quality rises, noise sinks.",
    tags: [],
    span: 1,
  },
  {
    icon: "🛡️",
    t: "AI Moderation",
    d: "Perspective API pre-screens every post. Auto-flag, auto-reject high toxicity. Strike system. Zero tolerance for doxxing.",
    tags: ["Perspective API", "Strike System"],
    span: 2,
  },
];

function Features() {
  return (
    <section id="features" style={s.section}>
      <FadeIn>
        <div style={s.label}>V1 Features</div>
        <h2 style={s.h2}>Everything campus life needs.</h2>
        <p style={s.sub}>Built lean. Every feature earns its place.</p>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 52,
        }}
      >
        {features.map((f, i) => (
          <FadeIn
            key={f.t}
            delay={i * 0.06}
            style={{ gridColumn: `span ${f.span}` }}
          >
            <div
              style={{
                background:
                  f.span === 2
                    ? `linear-gradient(135deg, rgba(8,20,40,0.4), rgba(255,179,0,0.05))`
                    : C.card,
                border: `1px solid rgba(27,144,232,${f.span === 2 ? 0.2 : 0.07})`,
                borderRadius: 14,
                padding: "32px 24px",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 16,
                  background: "rgba(27,144,232,0.1)",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.white,
                  margin: "0 0 8px",
                }}
              >
                {f.t}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: C.dim,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {f.d}
              </p>
              {f.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginTop: 14,
                  }}
                >
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 50,
                        background: "rgba(255,179,0,0.08)",
                        color: C.yellow,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ WHY UNIBLIND ═══════════════ */
const whyItems = [
  ["😶", "Students Fear Judgment", "Full anonymity. No name, no photo, no history."],
  ["🔒", "No Verified Student Space", "University email gate. No outsiders, no fakes."],
  [
    "📱",
    "Info Scattered Everywhere",
    "One centralized feed. No more 47 WhatsApp groups.",
  ],
  [
    "🎓",
    "Senior Knowledge Dies Each Batch",
    "Persistent bridge + AMAs. Wisdom stays.",
  ],
  [
    "📊",
    "Placement Data Is Opaque",
    "Crowdsourced anonymous salary & offer data.",
  ],
  [
    "🧠",
    "Mental Health Stigma",
    "Anonymous peer support. No face, no shame.",
  ],
  [
    "🏆",
    "No Cross-Campus Pipeline",
    "Public feed across all verified universities.",
  ],
  [
    "📝",
    "No Honest Reviews",
    "Anonymous structured professor & course ratings.",
  ],
];

function WhySection() {
  return (
    <section id="why-us" style={s.section}>
      <FadeIn>
        <div style={s.label}>Why UniBlind</div>
        <h2 style={s.h2}>The campus problem, solved.</h2>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          marginTop: 52,
          background: "rgba(27,144,232,0.05)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {whyItems.map(([icon, title, desc], i) => (
          <FadeIn key={title} delay={i * 0.05}>
            <div
              style={{
                background: C.card,
                padding: "26px 24px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                height: "100%",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 38,
                  height: 38,
                  borderRadius: 9,
                  background: "rgba(27,144,232,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                }}
              >
                {icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.white,
                    margin: "0 0 4px",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: 12,
                    color: C.dim,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ COMPETITIVE EDGE ═══════════════ */
const comp = [
  ["Blind", "Employees only, no campus features", "❌"],
  ["Reddit", "Not verified, not scoped, noisy", "❌"],
  ["WhatsApp", "No anonymity, no persistence, no structure", "❌"],
  [
    "UniBlind",
    "Verified + Anonymous + Scoped + Structured + Cross-campus",
    "✅",
  ],
];

function Competitive() {
  return (
    <section style={s.section}>
      <FadeIn>
        <div style={s.label}>Competitive Edge</div>
        <h2 style={s.h2}>No one else does all five.</h2>
      </FadeIn>
      <div
        style={{
          marginTop: 52,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(27,144,232,0.08)",
        }}
      >
        {comp.map(([name, desc, st], i) => (
          <FadeIn key={name} delay={i * 0.07}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 28px",
                background:
                  name === "UniBlind"
                    ? `linear-gradient(135deg, rgba(8,20,40,0.45), rgba(255,179,0,0.08))`
                    : C.card,
                borderBottom:
                  i < 4 ? "1px solid rgba(27,144,232,0.06)" : "none",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: name === "UniBlind" ? C.yellow : C.white,
                  }}
                >
                  {name}
                </span>
                <span
                  style={{ fontSize: 13, color: C.dim, marginLeft: 16 }}
                >
                  {desc}
                </span>
              </div>
              <span style={{ fontSize: 20 }}>{st}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ APP PREVIEW ═══════════════ */
const posts = [
  {
    alias: "Falcon_8271",
    time: "2m",
    text: "Is anyone else struggling with Prof. Mitchell's grading? Got 15/50 on the mid-sem and I studied for 3 weeks straight.",
    up: 47,
    cmt: 23,
  },
  {
    alias: "Ghost_4092",
    time: "18m",
    text: "Microsoft hiring SDE interns — referral link inside. Only pre-final years. Drop resume anonymously.",
    up: 112,
    cmt: 58,
  },
  {
    alias: "Nebula_7763",
    time: "1h",
    text: "CS 301 — skip the textbook, just do past papers. Saved my sem.",
    up: 89,
    cmt: 31,
  },
];

function Preview() {
  return (
    <section
      id="preview"
      style={{ ...s.section, textAlign: "center" }}
    >
      <FadeIn>
        <h2 style={{ ...s.h2, margin: "0 auto" }}>See it in action.</h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div
          style={{
            display: "inline-block",
            width: 320,
            marginTop: 52,
            background: C.card,
            borderRadius: 32,
            border: "2px solid rgba(27,144,232,0.13)",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(27,144,232,0.18)",
          }}
        >
          <div
            style={{
              width: 130,
              height: 26,
              background: C.dark,
              borderRadius: "0 0 18px 18px",
              margin: "0 auto",
            }}
          />
          <div style={{ padding: "14px 14px 28px", textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 12,
                borderBottom: "1px solid rgba(27,144,232,0.07)",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: C.white,
                }}
              >
                🏫 MIT Cambridge
              </span>
              <span style={{ fontSize: 16 }}>✏️</span>
            </div>
            <div
              style={{ display: "flex", gap: 6, marginBottom: 12 }}
            >
              {["Feed", "Profs", "Courses", "Events"].map((t, i) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    padding: "5px 12px",
                    borderRadius: 50,
                    background:
                      i === 0
                        ? `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`
                        : "rgba(27,144,232,0.08)",
                    color: i === 0 ? "#fff" : C.dim,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {posts.map((p) => (
              <div
                key={p.alias}
                style={{
                  background: "rgba(27,144,232,0.04)",
                  border: "1px solid rgba(27,144,232,0.06)",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.blue,
                    }}
                  >
                    {p.alias}
                  </span>
                  <span style={{ fontSize: 9, color: C.dim }}>
                    {p.time} ago
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: C.text,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {p.text}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    marginTop: 8,
                    fontSize: 10,
                    color: C.dim,
                  }}
                >
                  <span style={{ color: C.yellow, fontWeight: 600 }}>
                    ▲ {p.up}
                  </span>
                  <span>💬 {p.cmt}</span>
                  <span>⚑</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════ CTA ═══════════════ */
function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase
      .from("waitlist")
      .insert([{ email }]);
    setLoading(false);
    if (err) {
      console.error("Supabase error:", err);
      if (err.code === "23505") {
        setError("You're already on the waitlist!");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } else {
      setDone(true);
    }
  }

  return (
    <section id="cta" style={{ ...s.section, textAlign: "center" }}>
      <FadeIn>
        <div
          style={{
            maxWidth: 650,
            margin: "0 auto",
            background: `linear-gradient(135deg, rgba(8,20,40,0.3), rgba(255,179,0,0.05))`,
            border: "1px solid rgba(27,144,232,0.18)",
            borderRadius: 20,
            padding: "64px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 38,
              fontWeight: 700,
              color: C.white,
              letterSpacing: -1.5,
              margin: 0,
              position: "relative",
              zIndex: 2,
            }}
          >
            Your campus is waiting.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.dim,
              marginTop: 14,
              marginBottom: 28,
              position: "relative",
              zIndex: 2,
            }}
          >
            Join the waitlist. Be the first to bring UniBlind to your
            university.
          </p>
          {done ? (
            <p
              style={{
                fontSize: 16,
                color: C.yellowLight,
                fontWeight: 600,
                position: "relative",
                zIndex: 2,
              }}
            >
              🎉 You&apos;re on the waitlist!
            </p>
          ) : (
            <div
              style={{
                maxWidth: 420,
                margin: "0 auto",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="you@university.edu"
                  style={{
                    flex: 1,
                    padding: "13px 18px",
                    borderRadius: 50,
                    border: "1px solid rgba(27,144,232,0.2)",
                    background: "rgba(8,13,20,0.5)",
                    color: C.text,
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ ...s.btnPrimary, whiteSpace: "nowrap", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Joining…" : "Join Waitlist"}
                </button>
              </div>
              {error && (
                <p style={{ fontSize: 13, color: "#FF6B6B", marginTop: 10, marginBottom: 0 }}>
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════ FOOTER ═══════════════ */
function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: 36,
        borderTop: "1px solid rgba(27,144,232,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <Logo size={22} />
        <span style={{ fontWeight: 700, fontSize: 14, color: C.white }}>
          UniBlind
        </span>
      </div>
      <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>
        Verified. Anonymous. Campus-first. &nbsp;·&nbsp; Privacy &nbsp;·&nbsp;
        Terms &nbsp;·&nbsp; Contact
      </p>
      <p
        style={{
          fontSize: 11,
          color: "rgba(138,154,181,0.4)",
          marginTop: 8,
        }}
      >
        © 2026 UniBlind. All rights reserved.
      </p>
    </footer>
  );
}

/* ═══════════════ GLOBAL CSS (keyframes) ═══════════════ */
function GlobalCSS() {
  return (
    <style jsx global>{`
      @keyframes pulse {
        0%,
        100% {
          opacity: 0.4;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.08);
        }
      }
      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }
      * {
        box-sizing: border-box;
      }
      html {
        scroll-behavior: smooth;
      }
      ::selection {
        background: rgba(108, 63, 197, 0.4);
        color: #fff;
      }
      a:hover {
        color: ${C.yellow} !important;
      }
      @media (max-width: 900px) {
        nav > div:nth-child(2) a:not([style*="gradient"]) {
          display: none !important;
        }
      }
    `}</style>
  );
}

/* ═══════════════ PAGE ═══════════════ */
export default function Page() {
  return (
    <>
      <GlobalCSS />
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <WhySection />
      <Competitive />
      <Preview />
      <CTA />
      <Footer />
    </>
  );
}
