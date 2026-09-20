import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Constants and content                                                     */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];
const FONT_STACK =
  '"Outfit", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

const RESUME_HREF = "/documents/Godwin-Ashiekaa.pdf";
const FORMSPREE_URL = "https://formspree.io/f/mdkaloln";
const EMAIL = "ashiekagodwin1@gmail.com";
const GITHUB = "https://github.com/Godwinash";
const LINKEDIN = "https://www.linkedin.com/in/godwin-ashiekaa-2a7aa9411";

const NAV = [
  { id: "home", label: "Home", short: "Home" },
  { id: "about", label: "About", short: "About" },
  { id: "experience", label: "Experience", short: "Career" },
  { id: "projects", label: "Projects", short: "Work" },
  { id: "skills", label: "Skills", short: "Stack" },
  { id: "contact", label: "Contact", short: "Contact" },
];

const EXPERIENCE = [
  {
    role: "Lead Product Developer",
    org: "African Data Strategist",
    place: "Lagos, Nigeria (remote)",
    period: "May 2026 to present",
    points: [
      "Selected to lead product development for an early-stage fintech and data company.",
      "Designed and built the Forensic Probe Dashboard, an executive monitoring interface for spotting financial and data anomalies.",
      "Worked on product architecture and frontend implementation for a data-security and operations product.",
    ],
  },
  {
    role: "SIWES Trainee",
    org: "Megamore Wireless Broadband",
    place: "Kano, Nigeria",
    period: "Mar 2026 to May 2026",
    points: [
      "Industrial training in a broadband environment, with exposure to network systems and enterprise workflows.",
      "Studied backend and infrastructure technologies while continuing independent engineering work.",
    ],
  },
];

const EDUCATION = {
  degree: "B.Sc Information Technology",
  school: "Bayero University Kano",
  period: "2024 to 2027, in progress",
  coursework: [
    "Software Engineering",
    "Systems Analysis and Design",
    "Object-Oriented Programming",
    "Data Structures and Algorithms",
    "Net-Centric Computing",
  ],
};

const FEATURED = [
  {
    id: "forensic-probe",
    visual: "probe",
    title: "Forensic Probe Dashboard",
    badge: { label: "Client project", tone: "slate" },
    note: "Built at African Data Strategist",
    summary:
      "An executive dashboard for monitoring high-velocity operational and financial data, built to surface anomalies and potential data or revenue leakage.",
    highlights: [
      "A real-time “Strike-Zone” indicator flags critical logic anomalies for immediate investigation.",
      "Interactive visualizations and monitoring views designed for fast executive decisions.",
      "High-contrast dark interface, structured to connect to more data sources and forensic workflows.",
    ],
    tags: ["Dashboard", "Data visualization", "Real-time monitoring", "Dark UI"],
    links: [],
  },
  {
    id: "cedar-ppsis",
    visual: "school",
    title: "Cedar Presidential Private School Management System",
    badge: { label: "In progress", tone: "blue" },
    note: "Architecture and database design complete",
    summary:
      "A school information system for a private school in Kano, covering admissions, academics, attendance, results, report cards, and online fee payment, with role-based access for the proprietor, principal, parents, and accountants. Designed to support 1,000+ students.",
    highlights: [
      "End-to-end PostgreSQL schema and migration strategy, from academic structure through results and finance.",
      "Results workflow where report cards only generate once every assessment for the term is approved.",
      "Fee module designed for multi-child checkout through Paystack or Flutterwave.",
    ],
    tags: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Prisma"],
    links: [],
  },
  {
    id: "agencyflow",
    visual: "image",
    image: "/images/agencyflow.png",
    imageAlt: "AgencyFlow CRM dashboard preview",
    title: "AgencyFlow CRM",
    badge: { label: "In progress", tone: "blue" },
    note: "Private build, not yet published",
    summary:
      "A client and workflow management system for agencies to organize tasks, track business income, and monitor client engagement.",
    highlights: [
      "Dashboards for tracking client interactions, leads, and project tasks.",
      "JWT authentication, API communication, and structured data management.",
      "Architecture planned to grow into analytics and automation features.",
    ],
    tags: ["React", "TailwindCSS", "Node.js", "JWT", "MongoDB", "Vite"],
    links: [],
  },
];

const MORE = [
  {
    title: "Checkit Product Explorer",
    image: "/images/checkit.png",
    badge: { label: "Frontend assessment", tone: "slate" },
    summary:
      "A product exploration interface built as a frontend assessment for a mid-level frontend role, focused on clean data presentation, responsive layout, and polish.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    live: "https://frontend-assessment-godwin.vercel.app",
    repo: "https://github.com/Godwinash/frontend-assessment-godwin",
  },
  {
    title: "Lamisking Pixiesalon and Spa",
    image: "/images/lamisking.png",
    badge: { label: "Live", tone: "green" },
    summary:
      "Website for a pixie-cut specialist salon and spa in Wuse, Abuja, presenting its story and services in a clean, responsive layout.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    live: "https://lamisking-pixiesalon.vercel.app/",
    repo: "https://github.com/Godwinash/lamisking-pixiesalon",
  },
  {
    title: "Cilantro Kano Restaurant",
    image: "/images/cilantro-kano.png",
    badge: { label: "Live", tone: "green" },
    summary:
      "A visually driven website for a Kano restaurant that presents the brand and atmosphere in a responsive layout.",
    tags: ["React", "TailwindCSS", "Vite", "ESLint", "Vercel"],
    live: "https://cilantro-kano.vercel.app/",
    repo: "https://github.com/Godwinash/cilantro-kano",
  },
  {
    title: "Travel Agency Demo",
    image: "/images/travel-agency.png",
    badge: { label: "Live", tone: "green" },
    summary:
      "Landing page for a travel agency with curated city highlights, a clean hero, and a fully responsive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://godwinash.github.io/travel_agency_demo",
    repo: "https://github.com/Godwinash/travel-agency-demo",
  },
  {
    title: "Yum Brand Redesign",
    image: "/images/yum-redesign.png",
    badge: { label: "Redesign concept", tone: "slate" },
    summary:
      "A UI redesign concept for a fast-food brand with modern layouts, improved readability, and a cleaner interface.",
    tags: ["HTML", "TailwindCSS", "JavaScript"],
    live: "https://godwinash.github.io/yum-demo",
    repo: "https://github.com/Godwinash/yum-demo",
  },
];

const SKILLS = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Vite",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend and APIs",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT authentication"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Mongoose", "Redis"],
  },
  {
    title: "Testing and automation",
    items: ["Vitest", "Playwright", "Puppeteer", "ESLint"],
  },
  {
    title: "Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Chrome DevTools",
      "Postman",
      "BrowserStack",
      "Jira",
    ],
  },
  {
    title: "Architecture",
    items: [
      "Component-based design",
      "Database design",
      "Authentication and authorization",
      "API integration",
      "Real-time web apps",
      "Responsive design",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers, theme tokens, global CSS                                         */
/* -------------------------------------------------------------------------- */

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getThemeByHour = (hour) => (hour >= 7 && hour < 19 ? "light" : "dark");

function makeTokens(theme) {
  const light = theme === "light";
  return {
    theme,
    light,
    muted: light ? "text-slate-700" : "text-slate-300",
    faint: light ? "text-slate-600" : "text-slate-400",
    chip: light
      ? "border-white/70 bg-white/55 text-slate-700"
      : "border-white/10 bg-white/[0.06] text-slate-200",
    line: light ? "border-slate-300/70" : "border-white/15",
    divide: light ? "divide-slate-300/70" : "divide-white/10",
  };
}

const ThemeCtx = createContext(makeTokens("light"));
const useT = () => useContext(ThemeCtx);

const GLOBAL_CSS = `
html { scroll-behavior: smooth; }
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 3px;
}
@keyframes ga-rise {
  0%   { transform: translate3d(0, 0, 0) scale(0.96); opacity: 0; }
  12%  { opacity: 1; }
  50%  { transform: translate3d(14px, -60vh, 0) scale(1.03); }
  88%  { opacity: 1; }
  100% { transform: translate3d(-10px, -130vh, 0) scale(0.98); opacity: 0; }
}
@keyframes ga-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -14px, 0); }
}
@keyframes ga-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.45; transform: scale(1.5); }
}
.ga-bubble {
  animation-name: ga-rise;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}
.ga-float { animation: ga-float 9s ease-in-out infinite; }
.ga-pulse { animation: ga-pulse 2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .ga-bubble { display: none; }
  .ga-float, .ga-pulse { animation: none; }
}
`;

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

function Svg({ children, size = 16, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

const ArrowUpRight = () => (
  <Svg size={14}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

const DownloadIcon = () => (
  <Svg>
    <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
  </Svg>
);

const SunIcon = () => (
  <Svg size={18}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

const MoonIcon = () => (
  <Svg size={18}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Svg>
);

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

function GlassCard({ className = "", radius = "rounded-[2rem]", children }) {
  const { light } = useT();
  return (
    <div
      className={cn(
        "relative overflow-hidden border backdrop-blur-xl",
        radius,
        light
          ? "border-white/60 bg-white/30 shadow-[0_18px_50px_rgba(59,130,246,0.10)]"
          : "border-white/15 bg-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[1px] rounded-[inherit]",
          light
            ? "bg-gradient-to-br from-white/50 via-blue-100/10 to-purple-100/10"
            : "bg-gradient-to-br from-white/10 via-blue-400/5 to-purple-400/5"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HeroReveal({ children, index = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 + index * 0.12 }}
    >
      {children}
    </motion.div>
  );
}

function Badge({ tone = "slate", children }) {
  const { light } = useT();
  const tones = {
    blue: light ? "bg-blue-100 text-blue-800" : "bg-blue-500/20 text-blue-100",
    green: light
      ? "bg-emerald-100 text-emerald-800"
      : "bg-emerald-500/20 text-emerald-100",
    slate: light ? "bg-slate-200/80 text-slate-700" : "bg-white/10 text-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

function TagList({ tags }) {
  const { chip } = useT();
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn("rounded-full border px-3 py-1 text-sm", chip)}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, label, variant = "primary", children }) {
  const { light } = useT();
  const styles =
    variant === "primary"
      ? light
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-blue-500/25 text-blue-100 hover:bg-blue-500/35"
      : light
      ? "bg-white/60 text-slate-800 hover:bg-white/85"
      : "bg-white/[0.08] text-slate-200 hover:bg-white/[0.14]";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition duration-300",
        styles
      )}
    >
      {children}
      <ArrowUpRight />
    </a>
  );
}

function SectionHead({ title, blurb }) {
  const { muted } = useT();
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {blurb && <p className={cn("max-w-2xl leading-8", muted)}>{blurb}</p>}
    </div>
  );
}

const btnPrimary = (light) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-300",
    light
      ? "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.28)] hover:bg-blue-700"
      : "border border-white/15 bg-blue-500/40 text-white hover:bg-blue-500/55"
  );

const btnGhost = (light) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition duration-300",
    light
      ? "border-blue-200 bg-white/40 text-slate-900 hover:bg-white/75"
      : "border-white/15 bg-white/5 text-white hover:bg-white/10"
  );

/* -------------------------------------------------------------------------- */
/*  Background                                                                */
/* -------------------------------------------------------------------------- */

function BubbleField() {
  const { light } = useT();

  const bubbles = useMemo(
    () => [
      { size: 220, left: "6%", dur: 34, delay: 0 },
      { size: 130, left: "22%", dur: 26, delay: 9 },
      { size: 180, left: "40%", dur: 38, delay: 18 },
      { size: 90, left: "55%", dur: 22, delay: 4 },
      { size: 200, left: "70%", dur: 36, delay: 24 },
      { size: 120, left: "84%", dur: 28, delay: 12 },
      { size: 70, left: "94%", dur: 20, delay: 7 },
    ],
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="ga-bubble absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: -b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `-${b.delay}s`,
            background: light
              ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(219,234,254,0.5) 24%, rgba(96,165,250,0.22) 48%, rgba(168,85,247,0.12) 72%, rgba(255,255,255,0.04) 100%)"
              : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.36), rgba(96,165,250,0.16) 30%, rgba(59,130,246,0.14) 58%, rgba(168,85,247,0.07) 78%, rgba(255,255,255,0.02) 100%)",
            border: light
              ? "1px solid rgba(255,255,255,0.6)"
              : "1px solid rgba(255,255,255,0.12)",
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

function ThemeToggle({ onToggle, className = "" }) {
  const { light } = useT();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition duration-300",
        light
          ? "text-slate-700 hover:bg-blue-100/70"
          : "text-slate-200 hover:bg-white/10",
        className
      )}
    >
      {light ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function Navbar({ activeSection, onToggleTheme }) {
  const { light } = useT();

  const linkClass = (isActive) =>
    cn(
      "rounded-full px-4 py-2 text-sm transition duration-300",
      isActive
        ? light
          ? "bg-blue-600 text-white"
          : "bg-white/15 text-white"
        : light
        ? "text-slate-700 hover:bg-blue-100/70 hover:text-slate-950"
        : "text-slate-200 hover:bg-white/10 hover:text-white"
    );

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-50 hidden justify-center px-4 md:flex">
        <GlassCard
          radius="rounded-full"
          className="w-full max-w-5xl px-4 py-2.5"
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#home"
              aria-label="Godwin Ashiekaa, back to top"
              className="text-sm font-semibold tracking-[0.2em]"
            >
              G.A
            </a>

            <nav aria-label="Primary" className="flex items-center gap-1">
              {NAV.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={linkClass(isActive)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle onToggle={onToggleTheme} />
              <a
                href={RESUME_HREF}
                download
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                  light
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500/35 text-white hover:bg-blue-500/50"
                )}
              >
                Résumé
              </a>
            </div>
          </div>
        </GlassCard>
      </header>

      <div className="fixed right-4 top-4 z-50 md:hidden">
        <GlassCard radius="rounded-full" className="p-1">
          <ThemeToggle onToggle={onToggleTheme} className="h-10 w-10" />
        </GlassCard>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
        <GlassCard
          radius="rounded-full"
          className="mx-auto w-full max-w-md p-2"
        >
          <nav
            aria-label="Primary"
            className="flex items-center justify-between gap-1"
          >
            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-full px-2.5 py-2 text-[11px] font-medium transition duration-300",
                    isActive
                      ? light
                        ? "bg-blue-600 text-white"
                        : "bg-white/15 text-white"
                      : light
                      ? "text-slate-700 hover:bg-blue-100/70"
                      : "text-slate-200 hover:bg-white/10"
                  )}
                >
                  {item.short}
                </a>
              );
            })}
          </nav>
        </GlassCard>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function HeroPanel() {
  const { light, faint, divide } = useT();

  const orb = light
    ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.3) 26%, rgba(96,165,250,0.28) 58%, rgba(168,85,247,0.14) 80%, rgba(255,255,255,0.08) 100%)"
    : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.28), rgba(96,165,250,0.2) 30%, rgba(59,130,246,0.16) 62%, rgba(168,85,247,0.1) 88%, rgba(255,255,255,0.03) 100%)";
  const orbBorder = light
    ? "1px solid rgba(255,255,255,0.7)"
    : "1px solid rgba(255,255,255,0.14)";

  const rows = [
    ["Working as", "Lead Product Developer at African Data Strategist"],
    ["Building", "A school information system and an agency CRM"],
    ["Studying", "B.Sc Information Technology at Bayero University Kano"],
  ];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden="true"
        className="ga-float pointer-events-none absolute -right-8 -top-20 h-64 w-64 rounded-full"
        style={{ background: orb, border: orbBorder }}
      />
      <div
        aria-hidden="true"
        className="ga-float pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full"
        style={{ background: orb, border: orbBorder, animationDelay: "-4s" }}
      />

      <GlassCard className="p-6 md:p-7">
        <p className="text-lg font-semibold">Right now</p>
        <dl className={cn("mt-4 divide-y", divide)}>
          {rows.map(([label, value]) => (
            <div key={label} className="py-3.5">
              <dt className={cn("text-sm", faint)}>{label}</dt>
              <dd className="mt-1 leading-7">{value}</dd>
            </div>
          ))}
        </dl>
      </GlassCard>
    </div>
  );
}

function Hero() {
  const { light, muted, chip } = useT();

  return (
    <section
      id="home"
      className="flex min-h-[100svh] scroll-mt-28 items-center px-4 pb-24 pt-32 md:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-7">
          <HeroReveal index={0}>
            <p
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm",
                chip
              )}
            >
              <span
                aria-hidden="true"
                className="ga-pulse h-2 w-2 rounded-full bg-emerald-500"
              />
              Open to opportunities
            </p>
          </HeroReveal>

          <HeroReveal index={1}>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              Software engineer building dashboards, platforms, and polished web
              products.
            </h1>
          </HeroReveal>

          <HeroReveal index={2}>
            <p className={cn("max-w-xl text-lg leading-8", muted)}>
              I build with React, Next.js, TypeScript, Node.js, and PostgreSQL.
              Right now I lead product development at an early-stage fintech and
              data company.
            </p>
          </HeroReveal>

          <HeroReveal index={3}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#projects" className={btnPrimary(light)}>
                View my work
              </a>
              <a href={RESUME_HREF} download className={btnGhost(light)}>
                <DownloadIcon />
                Download résumé
              </a>
              <div className="flex items-center gap-5 text-sm">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </HeroReveal>
        </div>

        <HeroReveal index={4}>
          <HeroPanel />
        </HeroReveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

function About() {
  const { muted, faint, line } = useT();

  const facts = [
    ["Focus", "Frontend-led, full-stack capable"],
    ["Based in", "Kano, Nigeria"],
    ["Education", "B.Sc Information Technology, Bayero University Kano"],
    ["Works with", "React, Next.js, TypeScript, Node.js, PostgreSQL"],
  ];

  return (
    <section id="about" className="scroll-mt-28 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead title="About me" />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <GlassCard className="h-[420px] p-2">
            <img
              src="/images/aboutimage.png"
              alt="Godwin Ashiekaa"
              className="h-full w-full rounded-[1.6rem] object-cover"
              loading="eager"
              draggable="false"
            />
          </GlassCard>

          <div className="space-y-9">
            <div className={cn("max-w-2xl space-y-4 leading-8", muted)}>
              <p>
                I’m a software engineer with a strong frontend foundation and
                hands-on experience building dashboards, CRM platforms,
                real-time applications, and authentication systems. I care about
                performance, usability, and architecture that stays
                maintainable as a product grows.
              </p>
              <p>
                Alongside leading product development for an early-stage fintech
                and data company, I’m building a school information system and a
                CRM for agencies, so my days split between the interface and the
                systems behind it.
              </p>
            </div>

            <dl className="grid max-w-2xl gap-x-8 gap-y-5 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className={cn("border-t pt-4", line)}>
                  <dt className={cn("text-sm", faint)}>{label}</dt>
                  <dd className="mt-1 leading-7">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

function Experience() {
  const { light, muted, faint, chip, line } = useT();

  return (
    <section id="experience" className="scroll-mt-28 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead title="Where I’ve worked" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <ol className={cn("relative space-y-12 border-l pl-8", line)}>
            {EXPERIENCE.map((job) => (
              <li key={job.org} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[2.4rem] top-2 h-3 w-3 rounded-full ring-4",
                    light
                      ? "bg-blue-600 ring-[#eef6ff]"
                      : "bg-blue-400 ring-[#07101f]"
                  )}
                />
                <p className={cn("text-sm", faint)}>{job.period}</p>
                <h3 className="mt-1 text-xl font-semibold md:text-2xl">
                  {job.role}
                </h3>
                <p className={cn("mt-1", muted)}>{job.org}</p>
                <p className={cn("text-sm", faint)}>{job.place}</p>

                <ul className={cn("mt-4 max-w-2xl space-y-2.5 leading-7", muted)}>
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-3 h-1 w-1 shrink-0 rounded-full",
                          light ? "bg-slate-500" : "bg-slate-400"
                        )}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="space-y-5 self-start">
            <h3 className="text-xl font-semibold md:text-2xl">Education</h3>
            <div>
              <p className="font-medium">{EDUCATION.degree}</p>
              <p className={muted}>{EDUCATION.school}</p>
              <p className={cn("text-sm", faint)}>{EDUCATION.period}</p>
            </div>
            <div className="space-y-3">
              <p className={cn("text-sm", faint)}>Coursework</p>
              <ul className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course) => (
                  <li
                    key={course}
                    className={cn("rounded-full border px-3 py-1 text-sm", chip)}
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

function ProbeVisual() {
  const pts = [
    [0, 96], [20, 90], [40, 94], [60, 84], [80, 88], [100, 78], [120, 84],
    [140, 72], [160, 80], [180, 70], [200, 62], [218, 28], [240, 58],
    [260, 74], [280, 66], [300, 72], [320, 60],
  ];
  const line = pts.map((p) => p.join(",")).join(" ");
  const area = `M${pts.map((p) => p.join(",")).join(" L")} L320,140 L0,140 Z`;

  return (
    <div className="flex h-full flex-col bg-[#060d1b] p-4 text-white">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Forensic Probe</span>
        <span className="flex items-center gap-1.5 text-rose-300">
          <span
            aria-hidden="true"
            className="ga-pulse h-1.5 w-1.5 rounded-full bg-rose-400"
          />
          Strike-Zone
        </span>
      </div>

      <svg
        viewBox="0 0 320 140"
        className="mt-3 min-h-0 w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Illustrative line chart with one highlighted anomaly"
      >
        <defs>
          <linearGradient id="probeFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#probeFill)" />
        <polyline
          points={line}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect
          x="196"
          y="8"
          width="44"
          height="124"
          rx="6"
          fill="#f43f5e"
          fillOpacity="0.1"
          stroke="#f43f5e"
          strokeOpacity="0.55"
          strokeDasharray="3 3"
        />
        <circle cx="218" cy="28" r="4" fill="#f43f5e" />
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="space-y-1.5 rounded-lg border border-white/10 bg-white/[0.05] p-2"
          >
            <span className="block h-1.5 w-2/3 rounded bg-slate-500/50" />
            <span className="block h-1.5 w-1/3 rounded bg-slate-600/50" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        Interface illustration, not real data
      </p>
    </div>
  );
}

function SchoolVisual() {
  const boxes = [
    { x: 16, y: 24, label: "students" },
    { x: 117, y: 24, label: "assessments" },
    { x: 218, y: 24, label: "report_cards" },
    { x: 16, y: 88, label: "attendance" },
    { x: 117, y: 88, label: "invoices" },
    { x: 218, y: 88, label: "payments" },
    { x: 16, y: 152, label: "users" },
    { x: 117, y: 152, label: "fee_structures" },
  ];
  const links = [
    [102, 39, 117, 39],
    [203, 39, 218, 39],
    [59, 54, 59, 88],
    [203, 103, 218, 103],
    [59, 118, 59, 152],
    [160, 152, 160, 118],
  ];

  return (
    <div className="flex h-full flex-col bg-[#060d1b] p-4 text-white">
      <p className="text-xs text-slate-400">Schema overview, simplified</p>
      <svg
        viewBox="0 0 320 200"
        className="mt-2 min-h-0 w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Simplified diagram of connected database tables"
      >
        {links.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#475569"
            strokeWidth="1.5"
          />
        ))}
        {boxes.map((b) => (
          <g key={b.label}>
            <rect
              x={b.x}
              y={b.y}
              width="86"
              height="30"
              rx="7"
              fill="#0f1b33"
              stroke="#38bdf8"
              strokeOpacity="0.45"
            />
            <text
              x={b.x + 43}
              y={b.y + 19}
              textAnchor="middle"
              fontSize="9.5"
              fill="#cbd5e1"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {b.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ProjectVisual({ project }) {
  const { light } = useT();
  return (
    <div
      className={cn(
        "relative h-64 overflow-hidden rounded-[1.5rem] border md:h-80",
        light ? "border-white/70" : "border-white/10"
      )}
    >
      {project.visual === "probe" && <ProbeVisual />}
      {project.visual === "school" && <SchoolVisual />}
      {project.visual === "image" && (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function FeaturedProject({ project, flip }) {
  const { light, muted, faint } = useT();

  return (
    <GlassCard className="p-5 md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className={cn(flip && "lg:order-2")}>
          <ProjectVisual project={project} />
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge tone={project.badge.tone}>{project.badge.label}</Badge>
            {project.note && (
              <span className={cn("text-sm", faint)}>{project.note}</span>
            )}
          </div>

          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <p className={cn("leading-8", muted)}>{project.summary}</p>

          <ul className={cn("space-y-2.5 text-[15px] leading-7", muted)}>
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-3 h-1 w-1 shrink-0 rounded-full",
                    light ? "bg-slate-500" : "bg-slate-400"
                  )}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <TagList tags={project.tags} />

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <ExternalLink
                  key={l.href}
                  href={l.href}
                  label={`${project.title}: ${l.label}`}
                  variant={l.variant}
                >
                  {l.label}
                </ExternalLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function MoreProjects() {
  const { light, muted, faint, divide } = useT();

  return (
    <ul className={cn("divide-y", divide)}>
      {MORE.map((p) => (
        <li
          key={p.title}
          className="group grid gap-5 py-7 sm:grid-cols-[13rem_1fr] md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-8"
        >
          <div
            className={cn(
              "h-36 overflow-hidden rounded-2xl border",
              light ? "border-white/70" : "border-white/10"
            )}
          >
            <img
              src={p.image}
              alt={`${p.title} preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-lg font-semibold">{p.title}</h4>
              <Badge tone={p.badge.tone}>{p.badge.label}</Badge>
            </div>
            <p className={cn("max-w-xl text-[15px] leading-7", muted)}>
              {p.summary}
            </p>
            <p className={cn("text-sm", faint)}>{p.tags.join(", ")}</p>
          </div>

          <div className="flex flex-wrap gap-3 sm:col-span-2 md:col-span-1 md:flex-col md:items-stretch">
            <ExternalLink href={p.live} label={`${p.title}: live site`}>
              Live site
            </ExternalLink>
            <ExternalLink
              href={p.repo}
              label={`${p.title}: source code on GitHub`}
              variant="secondary"
            >
              Source
            </ExternalLink>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 px-4 md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHead
          title="Things I’ve built"
          blurb="Products and systems I’m working on now, followed by shipped sites and frontend builds you can open."
        />

        <div className="space-y-8">
          {FEATURED.map((project, i) => (
            <FeaturedProject key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="space-y-2 pt-6">
          <h3 className="text-2xl font-semibold tracking-tight">
            More builds
          </h3>
          <MoreProjects />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

function Skills() {
  const { line } = useT();

  return (
    <section id="skills" className="scroll-mt-28 px-4 md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHead title="What I work with" />

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group) => (
            <div key={group.title} className={cn("border-t pt-5", line)}>
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-4">
                <TagList tags={group.items} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

function ContactForm() {
  const { light, muted } = useT();
  const [status, setStatus] = useState("idle");

  const field = cn(
    "mt-2 w-full rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl transition duration-300",
    light
      ? "border-white/70 bg-white/45 text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/70"
      : "border-white/15 bg-white/[0.06] text-white placeholder:text-slate-400 focus:border-blue-400/60 focus:bg-white/10"
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(https://formspree.io/f/mdkaloln, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <GlassCard className="p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={field}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="What role or project did you have in mind?"
            className={cn(field, "resize-none")}
          />
        </div>

        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className={cn(btnPrimary(light), "disabled:opacity-60")}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p role="status" aria-live="polite" className={cn("text-sm", muted)}>
            {status === "sent" &&
              "Message sent. I’ll reply to the email you provided."}
            {status === "error" &&
              `That didn’t send. Try again, or email ${EMAIL} directly.`}
          </p>
        </div>
      </form>
    </GlassCard>
  );
}

function Contact() {
  const { light, faint, line, divide } = useT();

  const details = [
    ["Email", EMAIL, `mailto:${EMAIL}`],
    ["GitHub", "github.com/Godwinash", GITHUB],
    ["LinkedIn", "linkedin.com/in/godwin-ashiekaa", LINKEDIN],
    ["Location", "Kano, Nigeria", null],
  ];

  return (
    <section id="contact" className="scroll-mt-28 px-4 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <SectionHead
            title="Get in touch"
            blurb="Hiring, or have a project in mind? Send a message and I’ll get back to you."
          />

          <dl className={cn("divide-y border-y", line, divide)}>
            {details.map(([label, text, href]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
              >
                <dt className={cn("text-sm", faint)}>{label}</dt>
                <dd>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="underline-offset-4 hover:underline"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <a href="/documents/Godwin-Ashiekaa.pdf" download className={btnGhost(light)}>
            <DownloadIcon />
            Download résumé
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  const { faint, line } = useT();
  return (
    <footer className="relative z-10 px-4 pb-28 pt-4 md:px-8 md:pb-12">
      <div
        className={cn(
          "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm",
          line,
          faint
        )}
      >
        <p>© {new Date().getFullYear()} Godwin Ashiekaa</p>
        <a href="#home" className="underline-offset-4 hover:underline">
          Back to top
        </a>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  App                                                                       */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("ga-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage unavailable, fall through */
    }
    return getThemeByHour(new Date().getHours());
  });
  const [activeSection, setActiveSection] = useState("home");

  const tokens = useMemo(() => makeTokens(theme), [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("ga-theme", next);
      } catch {
        /* storage unavailable, theme still switches for this visit */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeCtx.Provider value={tokens}>
      <style>{GLOBAL_CSS}</style>

      <div
        className={cn(
          "isolate min-h-screen overflow-x-hidden transition-colors duration-700",
          tokens.light ? "bg-[#eef6ff] text-slate-900" : "bg-[#07101f] text-white"
        )}
        style={{ fontFamily: FONT_STACK }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <div
          aria-hidden="true"
          className={cn(
            "fixed inset-0 -z-20 transition-opacity duration-700",
            tokens.light
              ? "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.20),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.10),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_35%),linear-gradient(180deg,#f7fbff_0%,#e8f3ff_44%,#edf6ff_100%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.35),transparent_35%),linear-gradient(180deg,#040816_0%,#091529_45%,#0a1120_100%)]"
          )}
        />

        <BubbleField />
        <Navbar activeSection={activeSection} onToggleTheme={toggleTheme} />

        <main
          id="main"
          className="relative z-10 space-y-28 pb-24 md:space-y-36 md:pb-32"
        >
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}
