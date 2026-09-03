import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getThemeByHour(hour) {
  return hour >= 7 && hour < 19 ? "light" : "dark";
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sectionEase = [0.22, 1, 0.36, 1];

function GlassCard({ theme, className = "", children }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border backdrop-blur-xl",
        theme === "light"
          ? "border-white/60 bg-white/28 shadow-[0_18px_50px_rgba(59,130,246,0.10)]"
          : "border-white/15 bg-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)]",
          theme === "light"
            ? "bg-gradient-to-br from-white/50 via-blue-100/12 to-purple-100/10"
            : "bg-gradient-to-br from-white/12 via-blue-400/6 to-purple-400/6"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionReveal({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: "blur(10px)", scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: false, amount: 0.26 }}
      transition={{ duration: 0.85, ease: sectionEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerGroup({ children, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.18 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 26,
          filter: "blur(10px)",
          scale: 0.985,
        },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          transition: {
            duration: 0.8,
            ease: sectionEase,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar({ theme, activeSection }) {
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-50 mx-auto hidden w-full justify-center px-4 md:flex">
        <GlassCard
          theme={theme}
          className="w-full max-w-5xl rounded-full px-4 py-3"
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#home"
              className="text-sm font-semibold uppercase tracking-[0.2em]"
            >
              G.A
            </a>

            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition duration-300",
                      isActive
                        ? theme === "light"
                          ? "bg-blue-500 text-white shadow-[0_8px_24px_rgba(59,130,246,0.18)]"
                          : "bg-white/14 text-white"
                        : theme === "light"
                        ? "text-slate-700 hover:bg-blue-100/60 hover:text-slate-950"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <a
              href="#contact"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                theme === "light"
                  ? "bg-gradient-to-r from-blue-500/90 to-blue-400/90 text-white hover:from-blue-500 hover:to-indigo-500"
                  : "bg-gradient-to-r from-blue-500/25 to-purple-500/20 text-white hover:from-blue-500/35 hover:to-purple-500/30"
              )}
            >
              Let’s Talk
            </a>
          </div>
        </GlassCard>
      </header>

      <div className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
        <GlassCard
          theme={theme}
          className="mx-auto w-full max-w-md rounded-full px-2 py-2"
        >
          <nav className="flex items-center justify-between gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[11px] font-medium transition duration-300",
                    isActive
                      ? theme === "light"
                        ? "bg-blue-500 text-white"
                        : "bg-white/14 text-white"
                      : theme === "light"
                      ? "text-slate-700 hover:bg-blue-100/60"
                      : "text-slate-200 hover:bg-white/10"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </GlassCard>
      </div>
    </>
  );
}

function Loader({ theme, onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 8;

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 400);
          return 100;
        }

        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.03 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      <div
        className={cn(
          "absolute inset-0",
          theme === "light"
            ? "bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.10),transparent_20%),linear-gradient(180deg,#f7fbff_0%,#e7f2ff_55%,#edf6ff_100%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.20),transparent_25%),radial-gradient(circle_at_80%_12%,rgba(168,85,247,0.14),transparent_22%),linear-gradient(180deg,#040816_0%,#0a1428_48%,#0a1120_100%)]"
        )}
      />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full blur-2xl",
              theme === "light" ? "bg-blue-200/35" : "bg-blue-300/10"
            )}
            style={{
              width: 140 + i * 28,
              height: 140 + i * 28,
              left: `${(i * 15) % 100}%`,
              top: `${(i * 12) % 100}%`,
            }}
            animate={{ y: [0, -16, 0], x: [0, 10, -4, 0] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <GlassCard theme={theme} className="w-[min(92vw,420px)] px-8 py-10">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <p
              className={cn(
                "text-xs uppercase tracking-[0.35em]",
                theme === "light" ? "text-slate-500" : "text-slate-300/80"
              )}
            >
              Initializing portfolio
            </p>
            <h1
              className={cn(
                "text-3xl font-semibold tracking-tight",
                theme === "light" ? "text-slate-900" : "text-white"
              )}
            >
              Godwin Ashiekaa
            </h1>
          </div>

          <div className="space-y-3">
            <div
              className={cn(
                "h-3 overflow-hidden rounded-full border",
                theme === "light"
                  ? "border-white/70 bg-white/55"
                  : "border-white/10 bg-white/5"
              )}
            >
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  theme === "light"
                    ? "bg-gradient-to-r from-blue-500 via-sky-300 to-purple-300"
                    : "bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400"
                )}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              />
            </div>

            <p
              className={cn(
                "text-sm",
                theme === "light" ? "text-slate-600" : "text-slate-300"
              )}
            >
              {progress}%
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function BubbleField({ theme }) {
  const [phase, setPhase] = useState("burst");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let timeoutId;

    const runCycle = () => {
      setPhase("burst");
      timeoutId = setTimeout(() => {
        setPhase("calm");
        timeoutId = setTimeout(runCycle, 6000);
      }, 3200);
    };

    runCycle();

    return () => clearTimeout(timeoutId);
  }, [reducedMotion]);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const sizeMap = [260, 220, 190, 160, 140, 120, 100, 84, 68];

        const size = sizeMap[i % sizeMap.length];
        const isLarge = size >= 190;
        const isMedium = size >= 100 && size < 190;
        const isSmall = size < 100;

        return {
          id: i,
          size,
          left: `${(i * 15 + 3) % 100}%`,
          leftAlt: `${(i * 19 + 17) % 100}%`,
          burstDuration: isLarge
            ? 11 + (i % 3)
            : isMedium
            ? 8 + (i % 3)
            : 5 + (i % 2),
          calmDuration: isLarge
            ? 18 + (i % 4)
            : isMedium
            ? 14 + (i % 4)
            : 10 + (i % 3),
          delay: (i % 12) * 0.22,
          driftA: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4),
          driftB: (i % 2 === 0 ? -1 : 1) * (5 + (i % 5) * 3),
          wobble: 3 + (i % 4) * 2,
          opacity: isLarge ? 0.34 : isMedium ? 0.28 : 0.22,
          blur: isLarge ? 0 : isMedium ? 1 : 0,
          bottomStart: -18 - (i % 8) * 8,
          showInCalm:
            isLarge ? i % 2 === 0 : isMedium ? i % 3 !== 0 : i % 4 === 0,
          extraBurst: isSmall && (i % 2 === 0 || i % 5 === 0),
        };
      }),
    []
  );

  if (reducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((bubble) => {
        const visible = phase === "burst" ? true : bubble.showInCalm;

        const duration =
          phase === "burst" ? bubble.burstDuration : bubble.calmDuration;

        const animateY =
          phase === "burst" ? ["0vh", "-132vh"] : ["0vh", "-118vh"];

        const animateScale =
          phase === "burst"
            ? [0.7, 1.08, 0.95, 1.12, 0.96]
            : [0.9, 1.01, 0.98, 1.02, 0.99];

        const animateX =
          phase === "burst"
            ? [0, bubble.driftA, bubble.driftB, bubble.wobble, 0]
            : [0, bubble.driftA * 0.55, bubble.wobble, 0];

        const bubbleOpacity =
          phase === "burst"
            ? bubble.extraBurst
              ? Math.min(bubble.opacity + 0.08, 0.38)
              : bubble.opacity
            : bubble.opacity * 0.72;

        return (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full will-change-transform"
            initial={false}
            animate={{
              y: animateY,
              x: animateX,
              scale: animateScale,
              opacity: visible ? bubbleOpacity : 0,
              left: phase === "burst" ? bubble.left : bubble.leftAlt,
            }}
            transition={{
              duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: phase === "burst" ? "easeOut" : "easeInOut",
              opacity: { duration: 1 },
              left: { duration: 2.2, ease: "easeInOut" },
            }}
            style={{
              width: bubble.size,
              height: bubble.size,
              bottom: `${bubble.bottomStart}%`,
              filter: bubble.blur ? `blur(${bubble.blur}px)` : undefined,
              background:
                theme === "light"
                  ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.96), rgba(219,234,254,0.52) 24%, rgba(96,165,250,0.24) 48%, rgba(168,85,247,0.14) 72%, rgba(255,255,255,0.04) 100%)"
                  : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42), rgba(96,165,250,0.18) 30%, rgba(59,130,246,0.16) 58%, rgba(168,85,247,0.08) 78%, rgba(255,255,255,0.02) 100%)",
              border:
                theme === "light"
                  ? "1px solid rgba(255,255,255,0.62)"
                  : "1px solid rgba(255,255,255,0.14)",
              boxShadow:
                theme === "light"
                  ? "inset -14px -14px 32px rgba(255,255,255,0.14), inset 10px 10px 26px rgba(255,255,255,0.62), 0 20px 45px rgba(59,130,246,0.10)"
                  : "inset -12px -12px 30px rgba(255,255,255,0.02), inset 10px 10px 20px rgba(255,255,255,0.08), 0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="absolute left-[18%] top-[14%] h-[20%] w-[20%] rounded-full bg-white/60 blur-sm"
              style={{ opacity: theme === "light" ? 0.96 : 0.45 }}
            />
            <div
              className="absolute right-[20%] bottom-[18%] h-[12%] w-[12%] rounded-full blur-md"
              style={{
                opacity: theme === "light" ? 0.28 : 0.12,
                background:
                  theme === "light"
                    ? "rgba(96,165,250,0.35)"
                    : "rgba(168,85,247,0.18)",
              }}
            />
          </motion.div>
        );
      })}

      <motion.div
        className="absolute inset-x-0 bottom-0 h-48"
        animate={{
          opacity: phase === "burst" ? 0.35 : 0.16,
        }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            theme === "light"
              ? "radial-gradient(ellipse at bottom, rgba(96,165,250,0.22), rgba(255,255,255,0.0) 70%)"
              : "radial-gradient(ellipse at bottom, rgba(96,165,250,0.14), rgba(255,255,255,0.0) 70%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}

function Footer({ theme }) {
  return (
    <footer className="relative z-10 px-4 pb-28 pt-6 md:px-8 md:pb-14">
      <div className="mx-auto max-w-6xl">
        <GlassCard
          theme={theme}
          className="overflow-hidden px-6 py-6 md:px-8 md:py-7"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] opacity-65">
                Portfolio
              </p>
              <h3 className="text-xl font-semibold md:text-2xl">
                Built with clarity, motion, and intention.
              </h3>
              <p className="max-w-2xl text-sm leading-7 opacity-72">
                Software developer focused on building modern web applications
                with clean architecture, refined interfaces, and thoughtful user
                experience.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#home"
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-white/45 text-slate-700 hover:bg-white/70"
                      : "bg-white/8 text-slate-200 hover:bg-white/12"
                  )}
                >
                  Back to Top
                </a>

                <a
                  href="#contact"
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : "bg-gradient-to-r from-blue-500/30 to-purple-500/20 text-white"
                  )}
                >
                  Contact
                </a>
              </div>

              <p className="text-xs tracking-[0.2em] opacity-55">
                GODWIN ASHIEKAA
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getThemeByHour(new Date().getHours()));
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getThemeByHour(new Date().getHours()));
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loading]);

  return (
    <div
      className={cn(
        "min-h-screen overflow-x-hidden font-[Outfit] transition-colors duration-1000",
        theme === "light"
          ? "bg-[#eef6ff] text-slate-900"
          : "bg-[#07101f] text-white"
      )}
    >
      <div
        className={cn(
          "fixed inset-0 -z-20 transition-all duration-1000",
          theme === "light"
            ? "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.20),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.10),transparent_18%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.7),transparent_35%),linear-gradient(180deg,#f7fbff_0%,#e8f3ff_44%,#edf6ff_100%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.35),transparent_35%),linear-gradient(180deg,#040816_0%,#091529_45%,#0a1120_100%)]"
        )}
      />

      {!loading && (
        <div className="fixed inset-0 -z-10 opacity-100">
          <BubbleField theme={theme} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading && (
          <Loader
            key="loader"
            theme={theme}
            onDone={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar theme={theme} activeSection={activeSection} />

          <main className="relative z-10 space-y-28 pb-24 md:space-y-32 md:pb-32">
            <section
              id="home"
              className="flex min-h-screen items-center px-4 pb-20 pt-32 md:px-8"
            >
              <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <GlassCard
                    theme={theme}
                    className="inline-flex rounded-full px-4 py-2"
                  >
                    <span className="text-sm text-blue-700 dark:text-blue-200">
                      Glassmorphism portfolio concept
                    </span>
                  </GlassCard>

                  <div className="space-y-5">
                    <p
                      className={cn(
                        "text-sm uppercase tracking-[0.35em]",
                        theme === "light"
                          ? "text-slate-500"
                          : "text-slate-300/70"
                      )}
                    >
                      Hello, I’m Godwin
                    </p>

                    <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                      Building fast, polished, and immersive web experiences.
                    </h1>

                    <p
                      className={cn(
                        "max-w-2xl text-base leading-8 sm:text-lg",
                        theme === "light"
                          ? "text-slate-600"
                          : "text-slate-300/80"
                      )}
                    >
                      A software developer portfolio featuring time-aware theming,
                      bubbling liquid-glass motion, and smooth visuals inspired by
                      premium mobile interfaces.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#projects"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                        theme === "light"
                          ? "bg-gradient-to-r from-blue-500 to-sky-400 text-white shadow-[0_10px_30px_rgba(59,130,246,0.25)] hover:from-blue-500 hover:to-indigo-500"
                          : "bg-gradient-to-r from-blue-500/30 to-purple-500/20 text-white hover:from-blue-500/40 hover:to-purple-500/30"
                      )}
                    >
                      View Projects
                    </a>

                    <a
                      href="#contact"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                        theme === "light"
                          ? "border border-blue-100/80 bg-white/25 text-slate-900 hover:bg-blue-50/70"
                          : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      )}
                    >
                      Contact Me
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
                  className="relative mx-auto flex h-[460px] w-full max-w-[460px] items-center justify-center"
                >
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute h-72 w-72 rounded-full",
                      theme === "light"
                        ? "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.94),rgba(255,255,255,0.3)_26%,rgba(96,165,250,0.24)_58%,rgba(168,85,247,0.12)_80%,rgba(255,255,255,0.08)_100%)]"
                        : "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.28),rgba(96,165,250,0.18)_30%,rgba(59,130,246,0.14)_62%,rgba(168,85,247,0.08)_88%,rgba(255,255,255,0.03)_100%)]"
                    )}
                    style={{
                      border:
                        theme === "light"
                          ? "1px solid rgba(255,255,255,0.68)"
                          : "1px solid rgba(255,255,255,0.14)",
                      boxShadow:
                        theme === "light"
                          ? "inset 14px 14px 32px rgba(255,255,255,0.6), inset -14px -14px 32px rgba(255,255,255,0.16), 0 35px 80px rgba(59,130,246,0.18)"
                          : "inset 10px 10px 22px rgba(255,255,255,0.08), inset -10px -10px 22px rgba(255,255,255,0.03), 0 35px 80px rgba(0,0,0,0.28)",
                    }}
                  >
                    <div className="absolute left-[18%] top-[16%] h-14 w-14 rounded-full bg-white/45 blur-md" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute left-6 top-16 h-32 w-32 rounded-full",
                      theme === "light" ? "bg-blue-100/35" : "bg-blue-300/10"
                    )}
                    style={{
                      border:
                        theme === "light"
                          ? "1px solid rgba(255,255,255,0.58)"
                          : "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(24px)",
                    }}
                  />

                  <motion.div
                    animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute right-8 top-10 h-24 w-24 rounded-full",
                      theme === "light"
                        ? "bg-purple-100/40"
                        : "bg-purple-300/10"
                    )}
                    style={{
                      border:
                        theme === "light"
                          ? "1px solid rgba(255,255,255,0.55)"
                          : "1px solid rgba(255,255,255,0.10)",
                      backdropFilter: "blur(26px)",
                    }}
                  />

                  <motion.div
                    animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute bottom-8 right-10 h-20 w-20 rounded-full",
                      theme === "light" ? "bg-sky-100/35" : "bg-cyan-100/10"
                    )}
                    style={{
                      border:
                        theme === "light"
                          ? "1px solid rgba(255,255,255,0.5)"
                          : "1px solid rgba(255,255,255,0.10)",
                      backdropFilter: "blur(22px)",
                    }}
                  />

                  <GlassCard
                    theme={theme}
                    className="relative z-10 w-full max-w-sm px-6 py-7"
                  >
                    <div className="space-y-4">
                      <p
                        className={cn(
                          "text-xs uppercase tracking-[0.25em]",
                          theme === "light"
                            ? "text-slate-500"
                            : "text-slate-400"
                        )}
                      >
                        Now Building
                      </p>
                      <h3 className="text-2xl font-semibold">Liquid Glass UI</h3>
                      <p
                        className={cn(
                          "text-sm leading-7",
                          theme === "light"
                            ? "text-slate-600"
                            : "text-slate-300/80"
                        )}
                      >
                        Auto-switching day and night theme, premium frosted surfaces,
                        soda-like bubble bursts, and a clean project-first layout.
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </section>

            <section id="about" className="px-4 md:px-8">
  <div className="mx-auto max-w-6xl">
    <div className="mb-8 space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] opacity-70">
        About Me
      </p>
      <h2 className="text-3xl font-semibold md:text-4xl">
        Building systems that feel as good as they perform.
      </h2>
    </div>

    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionReveal>
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.35, ease: sectionEase }}
        >
          <GlassCard theme={theme} className="h-[420px] p-5">
            <div className="relative h-full overflow-hidden rounded-[1.65rem]">
              <img
                src="/images/aboutimage.png"
                alt="About Godwin"
                className="w-full h-full object-cover rounded-[1.65rem]"
                loading="eager"
                draggable="false"
              />

              <div className="absolute bottom-5 left-5 right-5 z-20">
                <div
                  className={cn(
                    "rounded-[1.4rem] px-5 py-5 backdrop-blur-xl border shadow-lg",
                    theme === "light"
                      ? "bg-white/60 text-slate-900 border-white/30"
                      : "bg-white/25 text-white border-white/20"
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.25em] font-medium">
                    Identity
                  </p>
                  <p className="mt-3 text-base leading-7 font-medium">
                    Clean systems, smooth interaction, and refined visual structure.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </SectionReveal>

      <SectionReveal>
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ duration: 0.35, ease: sectionEase }}
        >
          <GlassCard theme={theme} className="h-full p-8 md:p-10">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.28em] opacity-65">
                  Software Developer
                </p>

                <h3 className="max-w-2xl text-2xl font-semibold leading-tight md:text-3xl">
                  I build systems that are modern, scalable, and visually refined.
                </h3>

                <p className="max-w-2xl leading-8 opacity-80">
                  I’m a software developer focused on building modern, responsive,
                  and well-structured web applications. I work across both frontend
                  and backend, creating systems that are functional, scalable, and
                  intuitive. My approach combines clean architecture, smooth interaction,
                  and a strong design sense to deliver products that feel as good as
                  they perform.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Approach", "Clean architecture, smooth interaction, and readable structure"],
                  ["Focus", "Full-stack development, responsive systems, and polished UX"],
                  ["Style", "Minimal design with premium visual behavior"],
                  ["Goal", "Build scalable products that feel modern and intuitive"],
                ].map(([title, text]) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: sectionEase }}
                    className={cn(
                      "rounded-[1.5rem] p-4",
                      theme === "light" ? "bg-white/30" : "bg-white/6"
                    )}
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] opacity-65">
                      {title}
                    </p>
                    <p className="mt-3 text-sm leading-7 opacity-85">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </SectionReveal>
    </div>
  </div>
</section>

            <section id="projects" className="px-4 md:px-8">
  <div className="mx-auto max-w-6xl space-y-10">
    <SectionReveal>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] opacity-70">
          Projects
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Selected Work
        </h2>
      </div>
    </SectionReveal>

    <SectionReveal>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.35, ease: sectionEase }}
      >
        <GlassCard theme={theme} className="p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div
              className={cn(
                "relative h-64 overflow-hidden rounded-[1.8rem] border",
                theme === "light"
                  ? "border-white/65 bg-white/28"
                  : "border-white/10 bg-white/6"
              )}
            >
              <img
                src="/images/agencyflow.png"
                alt="AgencyFlow CRM preview"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                className={cn(
                  "absolute inset-0",
                  theme === "light" ? "bg-white/18" : "bg-black/18"
                )}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/16" />

              <motion.div
                className={cn(
                  "absolute left-8 top-8 h-28 w-28 rounded-full",
                  theme === "light" ? "bg-blue-100/22" : "bg-blue-300/10"
                )}
                animate={{ y: [0, -6, 0], x: [0, 6, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  border:
                    theme === "light"
                      ? "1px solid rgba(255,255,255,0.42)"
                      : "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                }}
              />

              <motion.div
                className={cn(
                  "absolute bottom-8 right-8 h-20 w-36 rounded-full",
                  theme === "light" ? "bg-purple-100/22" : "bg-purple-300/10"
                )}
                animate={{ x: [0, -6, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  border:
                    theme === "light"
                      ? "1px solid rgba(255,255,255,0.38)"
                      : "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(18px)",
                }}
              />

              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className={cn(
                    "rounded-[1.2rem] px-4 py-3 text-sm uppercase tracking-[0.2em] backdrop-blur-xl",
                    theme === "light"
                      ? "bg-white/48 text-slate-700"
                      : "bg-white/10 text-slate-200"
                  )}
                >
                  AgencyFlow CRM
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.25em] opacity-70">
                  Featured Project
                </p>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]",
                    theme === "light"
                      ? "bg-blue-100/80 text-blue-700"
                      : "bg-blue-500/15 text-blue-200"
                  )}
                >
                  In Progress
                </span>
              </div>

              <h3 className="text-2xl font-semibold md:text-3xl">
                AgencyFlow CRM
              </h3>

              <p className="leading-8 opacity-80">
                A client and workflow management system designed to organize tasks,
                track business income, and monitor client engagement—built to
                improve structure, visibility, and overall productivity.
              </p>

              <div className="text-sm opacity-60">
                React • TailwindCSS • Node.js • JWT Authentication • MongoDB • Vite
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium",
                    theme === "light"
                      ? "bg-white/45 text-slate-700"
                      : "bg-white/8 text-slate-300"
                  )}
                >
                  Private Build
                </span>

                <span
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium",
                    theme === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500/20 text-blue-100"
                  )}
                >
                  Not Yet Published
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </SectionReveal>

    <StaggerGroup className="grid gap-6 md:grid-cols-2">
      <StaggerItem>
        <motion.div
          whileHover={{ y: -6, scale: 1.012 }}
          transition={{ duration: 0.35, ease: sectionEase }}
        >
          <GlassCard theme={theme} className="group p-6">
            <div className="space-y-5">
              <div
                className={cn(
                  "relative h-44 overflow-hidden rounded-[1.5rem] border",
                  theme === "light"
                    ? "border-white/65 bg-white/28"
                    : "border-white/10 bg-white/6"
                )}
              >
                <img
                  src="/images/checkit.png"
                  alt="Checkit Product Explorer preview"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div
                  className={cn(
                    "absolute inset-0",
                    theme === "light" ? "bg-white/16" : "bg-black/20"
                  )}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/18 via-transparent to-purple-500/14" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className={cn(
                      "rounded-[1.1rem] px-3 py-2 text-[11px] uppercase tracking-[0.2em] backdrop-blur-xl",
                      theme === "light"
                        ? "bg-white/48 text-slate-600"
                        : "bg-white/10 text-slate-200"
                    )}
                  >
                    Checkit Product Explorer
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  Checkit Product Explorer
                </h3>
                <p className="text-sm leading-7 opacity-75">
                  A product exploration interface built as a frontend assessment
                  for a mid-level frontend engineer role, focused on clean data
                  presentation, responsive layout, and a polished user experience.
                </p>
                <div className="text-sm opacity-60">
                  Next.js • TypeScript • TailwindCSS • Vercel
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://frontend-assessment-godwin.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-500/20 text-blue-100 hover:bg-blue-500/30"
                  )}
                >
                  Live
                </a>
                <a
                  href="https://github.com/Godwinash/frontend-assessment-godwin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-white/45 text-slate-700 hover:bg-white/70"
                      : "bg-white/8 text-slate-200 hover:bg-white/12"
                  )}
                >
                  GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </StaggerItem>

      <StaggerItem>
        <motion.div
          whileHover={{ y: -6, scale: 1.012 }}
          transition={{ duration: 0.35, ease: sectionEase }}
        >
          <GlassCard theme={theme} className="group p-6">
            <div className="space-y-5">
              <div
                className={cn(
                  "relative h-44 overflow-hidden rounded-[1.5rem] border",
                  theme === "light"
                    ? "border-white/65 bg-white/28"
                    : "border-white/10 bg-white/6"
                )}
              >
                <img
                  src="/images/travel-agency.png"
                  alt="Travel Agency Demo preview"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div
                  className={cn(
                    "absolute inset-0",
                    theme === "light" ? "bg-white/16" : "bg-black/20"
                  )}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/18 via-transparent to-purple-500/14" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className={cn(
                      "rounded-[1.1rem] px-3 py-2 text-[11px] uppercase tracking-[0.2em] backdrop-blur-xl",
                      theme === "light"
                        ? "bg-white/48 text-slate-600"
                        : "bg-white/10 text-slate-200"
                    )}
                  >
                    Travel Agency Demo
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  Travel Agency Demo
                </h3>
                <p className="text-sm leading-7 opacity-75">
                  Modern landing page for a travel agency featuring curated cities,
                  a clean hero layout, and responsive design for better user
                  experience.
                </p>
                <div className="text-sm opacity-60">
                  HTML • CSS • JavaScript
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://godwinash.github.io/travel_agency_demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-500/20 text-blue-100 hover:bg-blue-500/30"
                  )}
                >
                  Live
                </a>
                <a
                  href="https://github.com/Godwinash/travel-agency-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-white/45 text-slate-700 hover:bg-white/70"
                      : "bg-white/8 text-slate-200 hover:bg-white/12"
                  )}
                >
                  GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </StaggerItem>

      <StaggerItem>
        <motion.div
          whileHover={{ y: -6, scale: 1.012 }}
          transition={{ duration: 0.35, ease: sectionEase }}
        >
          <GlassCard theme={theme} className="group p-6">
            <div className="space-y-5">
              <div
                className={cn(
                  "relative h-44 overflow-hidden rounded-[1.5rem] border",
                  theme === "light"
                    ? "border-white/65 bg-white/28"
                    : "border-white/10 bg-white/6"
                )}
              >
                <img
                  src="/images/yum-redesign.png"
                  alt="Yum Brand Redesign preview"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div
                  className={cn(
                    "absolute inset-0",
                    theme === "light" ? "bg-white/16" : "bg-black/20"
                  )}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/18 via-transparent to-purple-500/14" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className={cn(
                      "rounded-[1.1rem] px-3 py-2 text-[11px] uppercase tracking-[0.2em] backdrop-blur-xl",
                      theme === "light"
                        ? "bg-white/48 text-slate-600"
                        : "bg-white/10 text-slate-200"
                    )}
                  >
                    Yum Brand Redesign
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  Yum Brand Redesign
                </h3>
                <p className="text-sm leading-7 opacity-75">
                  UI redesign for a fast food brand focused on modern layouts,
                  improved readability, and a cleaner user interface.
                </p>
                <div className="text-sm opacity-60">
                  HTML • TailwindCSS • JavaScript
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://godwinash.github.io/yum-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-500/20 text-blue-100 hover:bg-blue-500/30"
                  )}
                >
                  Live
                </a>
                <a
                  href="https://github.com/Godwinash/yum-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-white/45 text-slate-700 hover:bg-white/70"
                      : "bg-white/8 text-slate-200 hover:bg-white/12"
                  )}
                >
                  GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </StaggerItem>

      <StaggerItem>
        <motion.div
          whileHover={{ y: -6, scale: 1.012 }}
          transition={{ duration: 0.35, ease: sectionEase }}
        >
          <GlassCard theme={theme} className="group p-6">
            <div className="space-y-5">
              <div
                className={cn(
                  "relative h-44 overflow-hidden rounded-[1.5rem] border",
                  theme === "light"
                    ? "border-white/65 bg-white/28"
                    : "border-white/10 bg-white/6"
                )}
              >
                <img
                  src="/images/cilantro-kano.png"
                  alt="Cilantro Kano Restaurant preview"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div
                  className={cn(
                    "absolute inset-0",
                    theme === "light" ? "bg-white/16" : "bg-black/20"
                  )}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/18 via-transparent to-purple-500/14" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className={cn(
                      "rounded-[1.1rem] px-3 py-2 text-[11px] uppercase tracking-[0.2em] backdrop-blur-xl",
                      theme === "light"
                        ? "bg-white/48 text-slate-600"
                        : "bg-white/10 text-slate-200"
                    )}
                  >
                    Cilantro Kano Restaurant
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  Cilantro Kano Restaurant
                </h3>
                <p className="text-sm leading-7 opacity-75">
                  A modern, visually-driven restaurant website.
                  It serves as a digital storefront to showcase the establishment's brand, atmosphere,
                  and likely its menu or contact information.
                </p>
                <div className="text-sm opacity-60">
                  React • TailwindCSS • Vite • JavaScript( with ESLint)
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://cilantro-kano.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-500/20 text-blue-100 hover:bg-blue-500/30"
                  )}
                >
                  Live
                </a>
                <a
                  href="https://github.com/Godwinash/cilantro-kano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                    theme === "light"
                      ? "bg-white/45 text-slate-700 hover:bg-white/70"
                      : "bg-white/8 text-slate-200 hover:bg-white/12"
                  )}
                >
                  GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </StaggerItem>
    </StaggerGroup>
  </div>
</section>

            <section id="skills" className="px-4 md:px-8">
              <div className="mx-auto max-w-6xl space-y-10">
                <SectionReveal>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                      Skills
                    </p>
                    <h2 className="text-3xl font-semibold md:text-4xl">
                      Tech Stack
                    </h2>
                  </div>
                </SectionReveal>

                <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Frontend",
                      skills: [
                        { name: "React", level: 85 },
                        { name: "Next.js", level: 84 },
                        { name: "JavaScript", level: 88 },
                        { name: "TailwindCSS", level: 90 },
                        { name: "HTML", level: 95 },
                        { name: "CSS", level: 92 },
                      ],
                    },
                    {
                      title: "Backend",
                      skills: [
                        { name: "Node.js", level: 80 },
                        { name: "Python", level: 85 },
                        { name: "Java", level: 81 },
                        { name: "Express.js", level: 78 },
                        { name: "MongoDB", level: 75 },
                        { name: "JWT Auth", level: 82 },
                      ],
                    },
                    {
                      title: "Tools",
                      skills: [
                        { name: "Git", level: 85 },
                        { name: "GitHub", level: 88 },
                        { name: "Figma", level: 82 },
                        { name: "Vercel", level: 89 },
                        { name: "Vite", level: 86 },
                        { name: "VS Code", level: 90 },
                      ],
                    },
                  ].map((category) => (
                    <StaggerItem key={category.title}>
                      <GlassCard theme={theme} className="space-y-6 p-6 md:p-7">
                        <p className="text-xs uppercase tracking-[0.25em] opacity-60">
                          {category.title}
                        </p>

                        <div className="space-y-5">
                          {category.skills.map((skill) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <p className="opacity-85">{skill.name}</p>
                                <p className="opacity-60">{skill.level}%</p>
                              </div>

                              <div
                                className={cn(
                                  "relative h-2 w-full overflow-hidden rounded-full",
                                  theme === "light"
                                    ? "bg-white/40"
                                    : "bg-white/10"
                                )}
                              >
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: false, amount: 0.6 }}
                                  transition={{
                                    duration: 1.2,
                                    ease: sectionEase,
                                  }}
                                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-400"
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-400/10 blur-md" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </section>

            <section id="contact" className="px-4 md:px-8">
              <div className="mx-auto max-w-5xl">
                <SectionReveal>
                  <div className="space-y-3 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                      Contact
                    </p>
                    <h2 className="text-3xl font-semibold md:text-4xl">
                      Let’s build something great
                    </h2>
                    <p className="mx-auto max-w-2xl leading-8 opacity-72">
                      Got a project, idea, or opportunity? Send a message and let’s create
                      something clean, modern, and impactful.
                    </p>
                  </div>
                </SectionReveal>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <SectionReveal>
                    <GlassCard theme={theme} className="p-6 md:p-8">
                      <form
                        action="https://formspree.io/f/mdkaloln"
                        method="POST"
                        className="space-y-5"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="text-xs uppercase tracking-[0.22em] opacity-65"
                            >
                              Name
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              placeholder="Your name"
                              className={cn(
                                "w-full rounded-[1.3rem] border px-4 py-3 text-sm outline-none backdrop-blur-xl transition duration-300",
                                theme === "light"
                                  ? "border-white/65 bg-white/35 text-slate-800 placeholder:text-slate-500 focus:border-blue-300 focus:bg-white/50 focus:shadow-[0_0_0_4px_rgba(96,165,250,0.10)]"
                                  : "border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus:border-blue-400/40 focus:bg-white/8 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.10)]"
                              )}
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-xs uppercase tracking-[0.22em] opacity-65"
                            >
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              placeholder="you@example.com"
                              className={cn(
                                "w-full rounded-[1.3rem] border px-4 py-3 text-sm outline-none backdrop-blur-xl transition duration-300",
                                theme === "light"
                                  ? "border-white/65 bg-white/35 text-slate-800 placeholder:text-slate-500 focus:border-blue-300 focus:bg-white/50 focus:shadow-[0_0_0_4px_rgba(96,165,250,0.10)]"
                                  : "border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus:border-blue-400/40 focus:bg-white/8 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.10)]"
                              )}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-xs uppercase tracking-[0.22em] opacity-65"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows="6"
                            required
                            placeholder="Tell me a bit about your project or idea..."
                            className={cn(
                              "w-full resize-none rounded-[1.5rem] border px-4 py-4 text-sm outline-none backdrop-blur-xl transition duration-300",
                              theme === "light"
                                ? "border-white/65 bg-white/35 text-slate-800 placeholder:text-slate-500 focus:border-blue-300 focus:bg-white/50 focus:shadow-[0_0_0_4px_rgba(96,165,250,0.10)]"
                                : "border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus:border-blue-400/40 focus:bg-white/8 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.10)]"
                            )}
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <motion.button
                            type="submit"
                            whileHover={{ y: -3, scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            transition={{ duration: 0.28, ease: sectionEase }}
                            className={cn(
                              "rounded-full px-6 py-3 text-sm font-medium transition",
                              theme === "light"
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.22)]"
                                : "bg-gradient-to-r from-blue-500/30 to-purple-500/20 text-white"
                            )}
                          >
                            Send Message
                          </motion.button>

                          <a
                            href="mailto:ashiekagodwin1@gmail.com"
                            className={cn(
                              "rounded-full px-5 py-3 text-sm font-medium transition",
                              theme === "light"
                                ? "bg-white/50 text-slate-800 hover:bg-white/70"
                                : "bg-white/8 text-white hover:bg-white/12"
                            )}
                          >
                            Email Instead
                          </a>
                        </div>
                      </form>
                    </GlassCard>
                  </SectionReveal>

                  <SectionReveal>
                    <GlassCard theme={theme} className="h-full p-6 md:p-8">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <p className="text-xs uppercase tracking-[0.25em] opacity-65">
                            Reach Out
                          </p>
                          <h3 className="text-2xl font-semibold">
                            Open to projects and opportunities
                          </h3>
                          <p className="leading-8 opacity-75">
                            Whether it’s a landing page, dashboard, full web application, or
                            redesign, I’m open to building products that are functional,
                            modern, and thoughtfully crafted.
                          </p>
                        </div>

                        <div className="grid gap-4">
                          {[
                            ["Email", "ashiekaagodwin1@gmail.com", "mailto:ashiekaagodwin1@gmail.com"],
                            ["GitHub", "github.com/Godwinash", "https://github.com/Godwinash"],
                            ["Location", "Nigeria", null],
                          ].map(([title, text, link]) => (
                            <motion.div
                              key={title}
                              whileHover={{ y: -3, scale: 1.01 }}
                              transition={{ duration: 0.28, ease: sectionEase }}
                              className={cn(
                                "rounded-[1.4rem] p-4",
                                theme === "light" ? "bg-white/30" : "bg-white/6"
                              )}
                            >
                              <p className="text-[10px] uppercase tracking-[0.22em] opacity-65">
                                {title}
                              </p>
                              {link ? (
                                <a
                                  href={link}
                                  target={link.startsWith("http") ? "_blank" : undefined}
                                  rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="mt-2 block text-sm leading-7 opacity-85 hover:opacity-100 hover:underline"
                                >
                                  {text}
                                </a>
                              ) : (
                                <p className="mt-2 text-sm leading-7 opacity-85">{text}</p>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        <motion.a
                          href="/documents/portfolio.pdf"
                          download
                          whileHover={{ y: -3, scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          transition={{ duration: 0.28, ease: sectionEase }}
                          className={cn(
                            "inline-flex w-full items-center justify-center rounded-[1.4rem] px-5 py-4 text-sm font-medium transition",
                            theme === "light"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.18)]"
                              : "bg-gradient-to-r from-blue-500/30 to-purple-500/20 text-white"
                          )}
                        >
                          Download Portfolio PDF
                        </motion.a>
                      </div>
                    </GlassCard>
                  </SectionReveal>
                </div>
              </div>
            </section>
          </main>

          <Footer theme={theme} />
        </>
      )}
    </div>
  );
}
