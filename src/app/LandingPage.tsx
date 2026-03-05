"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  Zap,
  ArrowRight,
  Calculator,
  Mail,
  Phone,
  MessageSquare,
  Star,
  Image as ImageIcon,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// --------------------------------------------------------------------------------------
// Logo Dynam8 (Version Image PNG)
// --------------------------------------------------------------------------------------
/* eslint-disable @next/next/no-img-element */
function Logo({ className = "h-auto w-auto" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Logo Dynam8"
      className={className}
    />
  );
}

// --------------------------------------------------------------------------------------
// Animated Counter Hook
// --------------------------------------------------------------------------------------
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current !== target ? count : 0;
    prevTarget.current = target;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}

// --------------------------------------------------------------------------------------
// Intersection Observer Hook for scroll animations
// --------------------------------------------------------------------------------------
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

// --------------------------------------------------------------------------------------
// Page Principale
// --------------------------------------------------------------------------------------
export default function LandingPage() {

  // --- ROI State ---
  const [targetClients, setTargetClients] = useState(30);
  const [avgCheck, setAvgCheck] = useState(50);
  const monthlyFee = 25;

  const totalClientsYear = useMemo(() => targetClients * 6.5, [targetClients]);
  const totalRevenueYear = useMemo(() => Math.round(totalClientsYear * avgCheck), [totalClientsYear, avgCheck]);
  const totalCostYear = monthlyFee * 12;
  const animatedRevenue = useCountUp(totalRevenueYear);

  // --- Contact Form ---
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "error">(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setSent(null);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      contact: String(formData.get("contact") || ""),
      phone: String(formData.get("phone") || ""),
      email: "non-fourni@contact-rapide.com",
      message: "Demande de rappel depuis le simulateur de croissance",
    };

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) {
        setSent("error");
        setErrorMsg(data?.error || "Impossible d'envoyer le message.");
      } else {
        setSent("ok");
        form.reset();
      }
    } catch {
      setSent("error");
      setErrorMsg("Erreur réseau. Réessayez dans un instant.");
    } finally {
      setSending(false);
    }
  }

  // --- FAQ ---
  const faqs = [
    {
      q: "Est-ce que c'est autorisé par Google ?",
      a: "Oui, à 100%. Nous utilisons les outils officiels de Google Business Profile. Pas d'achat de faux avis ni d'incitations interdites. Notre système aide simplement vos vrais clients à s'exprimer plus facilement.",
    },
    {
      q: "Et si une réponse automatique ne me plaît pas ?",
      a: "Vous gardez le contrôle total. Vous pouvez modifier ou supprimer n'importe quelle réponse en un clic. Pour les avis sensibles (1 ou 2 étoiles), nous activons une option de validation manuelle avant publication.",
    },
    {
      q: "Est-ce que je suis engagé sur la durée ?",
      a: "Non. Notre offre est sans engagement. Vous pouvez arrêter d'un mois sur l'autre. Nous misons sur la qualité de notre service pour vous garder, pas sur un contrat.",
    },
    {
      q: "Ça fonctionne pour mon type de commerce ?",
      a: "Oui. Nous accompagnons tous les types d'établissements : commerces de proximité, artisans, professions libérales, hôtels, garages, instituts de beauté, et bien d'autres. Nos réponses et publications sont personnalisées selon votre secteur et le ton de votre enseigne.",
    },
  ];

  // Scroll animations
  const heroAnim = useInView();
  const featuresAnim = useInView();
  const roiAnim = useInView();
  const testimonialsAnim = useInView();
  const pricingAnim = useInView();

  return (
    <>
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&display=swap');

        :root {
          --font-body: 'DM Sans', system-ui, sans-serif;
          --font-display: 'Fraunces', Georgia, serif;
          --c-ink: #0f172a;
          --c-muted: #64748b;
          --c-surface: #f8fafc;
          --c-accent: #0369a1;
          --c-accent-light: #e0f2fe;
          --c-warm: #f59e0b;
          --c-success: #059669;
        }

        * { box-sizing: border-box; }

        body {
          font-family: var(--font-body);
          color: var(--c-ink);
          background: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        .font-display { font-family: var(--font-display); }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Custom range slider */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          background: #e2e8f0;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--c-accent);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(3, 105, 161, 0.35);
          transition: transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--c-accent);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(3, 105, 161, 0.35);
        }

        /* Fade-in animations */
        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up-d1 { transition-delay: 0.1s; }
        .fade-up-d2 { transition-delay: 0.2s; }
        .fade-up-d3 { transition-delay: 0.3s; }
        .fade-up-d4 { transition-delay: 0.4s; }

        /* Grain overlay */
        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* Marquee */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }

        /* Glow pulse */
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }

        /* Details animation */
        details[open] summary ~ * {
          animation: sweep 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes sweep {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Sur mesure card gradient border */
        .card-surmesure {
          background: linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #0369a1, #7c3aed) border-box;
          border: 2px solid transparent;
        }
      `}</style>

      <div className="min-h-screen overflow-x-hidden">
        <SiteHeader />

        <main>
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* HERO                                                          */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
            {/* Background shapes */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-sky-100/60 to-cyan-50/40 blur-3xl" />
              <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-violet-50/50 to-indigo-50/30 blur-3xl" />
            </div>

            <div ref={heroAnim.ref} className="mx-auto max-w-6xl px-6">
              <div className={`fade-up ${heroAnim.inView ? "visible" : ""}`}>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/60 text-sky-700 text-xs font-semibold tracking-wide">
                    <Zap className="size-3" /> Automatisation Google Business
                  </span>
                </div>
              </div>

              <h1 className={`fade-up fade-up-d1 ${heroAnim.inView ? "visible" : ""} font-display text-center text-4xl sm:text-5xl md:text-7xl font-800 tracking-tight leading-[1.08] mb-6`}>
                Vous gérez votre commerce,
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 50%, #7c3aed 100%)" }}>
                    on gère votre réputation.
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-sky-200/40 -z-0 rounded-sm" />
                </span>
              </h1>

              <p className={`fade-up fade-up-d2 ${heroAnim.inView ? "visible" : ""} text-center mx-auto max-w-xl text-base sm:text-lg text-slate-500 leading-relaxed mb-10`} style={{ fontFamily: "var(--font-body)" }}>
                Dynam8 automatise vos réponses aux avis, anime votre fiche Google et transforme vos visiteurs en clients fidèles — quel que soit votre secteur d&apos;activité.
              </p>

              <div className={`fade-up fade-up-d3 ${heroAnim.inView ? "visible" : ""} flex flex-col sm:flex-row items-center justify-center gap-3`}>
                <a
                  href="#contact"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #0369a1, #0284c7)" }}
                >
                  Démarrer l&apos;essai gratuit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#roi"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-700 border border-slate-200 px-8 py-4 text-base font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  <Calculator className="size-4 text-sky-600" />
                  Simuler mes gains
                </a>
              </div>

              {/* Trust badges */}
              <div className={`fade-up fade-up-d4 ${heroAnim.inView ? "visible" : ""} mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400`}>
                {[
                  { icon: Shield, text: "Conforme Google" },
                  { icon: Clock, text: "Setup en 10 min" },
                  { icon: Users, text: "Sans engagement" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <b.icon className="size-4 text-slate-300" />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* SOCIAL PROOF MARQUEE                                          */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="relative border-y border-slate-100 bg-slate-50/50 py-4 overflow-hidden">
            <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
              {[...Array(2)].map((_, setIdx) => (
                <React.Fragment key={setIdx}>
                  {[
                    "⭐ 4.8 étoiles de moyenne pour nos clients",
                    "🏪 +200 établissements accompagnés",
                    "📈 +35% de nouveaux clients en moyenne",
                    "💬 98% des avis répondus sous 1h",
                    "🇫🇷 Support 100% français",
                    "⭐ 4.8 étoiles de moyenne pour nos clients",
                    "🏪 +200 établissements accompagnés",
                    "📈 +35% de nouveaux clients en moyenne",
                    "💬 98% des avis répondus sous 1h",
                    "🇫🇷 Support 100% français",
                  ].map((text, i) => (
                    <span key={`${setIdx}-${i}`} className="text-sm font-medium text-slate-500 flex items-center gap-3">
                      {text}
                      <span className="text-slate-200">•</span>
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* HOW IT WORKS (3 étapes)                                       */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section id="solutions" className="py-24 sm:py-32 scroll-mt-20">
            <div ref={featuresAnim.ref} className="mx-auto max-w-6xl px-6">
              <div className={`fade-up ${featuresAnim.inView ? "visible" : ""} text-center mb-16`}>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Comment ça marche</span>
                <h2 className="font-display text-3xl sm:text-4xl font-700 tracking-tight mb-4">
                  Trois piliers pour dominer Google
                </h2>
                <p className="mx-auto max-w-lg text-slate-500">
                  Pendant que vous servez vos clients, notre système travaille pour vous 24h/24.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: MessageSquare,
                    step: "01",
                    title: "Réponse aux avis",
                    desc: "Fini le copier-coller. Une IA personnalisée répond à chaque avis avec le ton de votre enseigne. Vous validez ou laissez faire.",
                    gradient: "from-sky-500 to-cyan-400",
                    bg: "bg-sky-50",
                  },
                  {
                    icon: ImageIcon,
                    step: "02",
                    title: "Posts hebdomadaires",
                    desc: "Google adore l'activité. Nous publions chaque semaine une photo ou un post pour maintenir votre fiche vivante et booster votre référencement local.",
                    gradient: "from-violet-500 to-purple-400",
                    bg: "bg-violet-50",
                  },
                  {
                    icon: Star,
                    step: "03",
                    title: "Boost des avis",
                    desc: "Transformez vos clients silencieux en ambassadeurs. Relances automatiques et QR Code au comptoir pour multiplier vos avis positifs.",
                    gradient: "from-amber-500 to-orange-400",
                    bg: "bg-amber-50",
                  },
                ].map((feature, i) => (
                  <div
                    key={feature.step}
                    className={`fade-up fade-up-d${i + 1} ${featuresAnim.inView ? "visible" : ""} group relative rounded-2xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`${feature.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <feature.icon className="size-5" style={{ color: `var(--c-accent)` }} />
                      </div>
                      <span className="text-xs font-black text-slate-300 tracking-widest uppercase">
                        Étape {feature.step}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-700 text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                    <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ROI CALCULATOR                                                */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section id="roi" className="relative py-24 sm:py-32 scroll-mt-20 grain" style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)" }}>
            <div ref={roiAnim.ref} className="mx-auto max-w-6xl px-6 relative z-10">
              <div className={`fade-up ${roiAnim.inView ? "visible" : ""} text-center mb-14`}>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Simulateur</span>
                <h2 className="font-display text-3xl sm:text-4xl font-700 tracking-tight mb-4">
                  Quel impact sur votre chiffre d&apos;affaires ?
                </h2>
                <p className="mx-auto max-w-lg text-slate-500">
                  Une fiche Google active génère plus d&apos;appels et de clients. Simulez l&apos;évolution sur 1 an.
                </p>
              </div>

              <div className={`fade-up fade-up-d1 ${roiAnim.inView ? "visible" : ""} grid lg:grid-cols-5 gap-8 items-start`}>
                {/* Sliders - 3 cols */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-semibold text-slate-700">
                        Nouveaux clients visés / mois
                      </label>
                      <span className="text-sm font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg tabular-nums">
                        +{targetClients}
                      </span>
                    </div>
                    <input
                      type="range" min="5" max="100" step="5"
                      value={targetClients}
                      onChange={(e) => setTargetClients(parseInt(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">Croissance visée : de 0 à {targetClients}/mois sur 12 mois</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-semibold text-slate-700">
                        Ticket moyen
                      </label>
                      <span className="text-sm font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg tabular-nums">
                        {avgCheck} €
                      </span>
                    </div>
                    <input
                      type="range" min="15" max="150" step="5"
                      value={avgCheck}
                      onChange={(e) => setAvgCheck(parseInt(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>

                  {/* Mini stats row */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900 tabular-nums">{Math.round(totalClientsYear)}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Clients / an</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900">{avgCheck}€</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Ticket moyen</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-emerald-600">x{(totalRevenueYear / totalCostYear).toFixed(0)}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">ROI</div>
                    </div>
                  </div>
                </div>

                {/* Result card - 2 cols */}
                <div className="lg:col-span-2 relative">
                  <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-sky-400/20 to-violet-400/20 blur-2xl glow-pulse" />
                  <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-8 text-center">
                      <p className="text-sky-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
                        CA Additionnel · An 1
                      </p>
                      <div className="font-display text-5xl sm:text-6xl font-900 text-white tracking-tight mb-2 tabular-nums">
                        +{animatedRevenue.toLocaleString("fr-FR")}€
                      </div>
                      <p className="text-slate-500 text-xs">
                        Progression linéaire estimée
                      </p>
                    </div>

                    <div className="px-8 pb-8 space-y-4">
                      <div className="flex justify-between items-center text-sm py-2.5 border-t border-slate-700/50">
                        <span className="text-slate-400">Coût Dynam8 / an</span>
                        <span className="font-bold text-white">{totalCostYear} €</span>
                      </div>

                      <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                          <TrendingUp className="size-4" /> Le service s&apos;autofinance
                        </div>
                        <p className="text-emerald-300/70 text-xs leading-relaxed">
                          Dès les premiers clients générés par votre nouvelle visibilité.
                        </p>
                      </div>

                      <a
                        href="#contact"
                        className="group block w-full rounded-xl text-white py-3.5 text-center font-bold transition-all duration-200 text-sm tracking-wide shadow-lg shadow-sky-600/30 hover:shadow-xl hover:shadow-sky-600/40"
                        style={{ background: "linear-gradient(135deg, #0369a1, #0284c7)" }}
                      >
                        Démarrer ma croissance
                        <ArrowRight className="inline-block size-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* TÉMOIGNAGES                                                   */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section className="py-24 sm:py-32 scroll-mt-20">
            <div ref={testimonialsAnim.ref} className="mx-auto max-w-6xl px-6">
              <div className={`fade-up ${testimonialsAnim.inView ? "visible" : ""} text-center mb-14`}>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Témoignages</span>
                <h2 className="font-display text-3xl sm:text-4xl font-700 tracking-tight mb-4">
                  Ils nous ont confié leur réputation
                </h2>
                <p className="text-slate-500">Des professionnels de tous secteurs qui ont repris le contrôle de leur visibilité en ligne.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "Je négligeais Google par manque de temps. C'est devenu un vrai levier d'acquisition et de fidélisation.",
                    highlight: "un vrai levier d'acquisition",
                    name: "Gérant",
                    role: "Commerce — Neuilly-sur-Seine",
                    emoji: "🛍️",
                    accent: "sky",
                  },
                  {
                    quote: "Ça me rassure énormément. Je ne me prends plus la tête : ma page tourne toute seule. Je gagne du temps et de la visibilité.",
                    highlight: "ma page tourne toute seule",
                    name: "Gérante",
                    role: "Institut de beauté — Malakoff",
                    emoji: "💅",
                    accent: "violet",
                  },
                  {
                    quote: "La gestion des avis négatifs est bien plus simple. L'alerte immédiate me permet de désamorcer les problèmes rapidement.",
                    highlight: "L'alerte immédiate",
                    name: "Propriétaire",
                    role: "Garage — Montpellier",
                    emoji: "🔧",
                    accent: "emerald",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className={`fade-up fade-up-d${i + 1} ${testimonialsAnim.inView ? "visible" : ""} group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col`}
                  >
                    <div className="flex items-center gap-0.5 mb-4 text-amber-400">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="size-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-slate-600 text-sm leading-relaxed flex-1">
                      &ldquo;{t.quote.split(t.highlight)[0]}
                      <span className={`font-bold text-${t.accent === "sky" ? "sky" : t.accent === "violet" ? "violet" : "emerald"}-700 bg-${t.accent === "sky" ? "sky" : t.accent === "violet" ? "violet" : "emerald"}-50 px-1 rounded`}>
                        {t.highlight}
                      </span>
                      {t.quote.split(t.highlight)[1]}&rdquo;
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3 pt-5 border-t border-slate-100">
                      <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                        {t.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{t.name}</div>
                        <div className="text-xs text-slate-400">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* PRICING                                                       */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section id="tarifs" className="py-24 sm:py-32 scroll-mt-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}>
            <div ref={pricingAnim.ref} className="mx-auto max-w-5xl px-6">
              <div className={`fade-up ${pricingAnim.inView ? "visible" : ""} text-center mb-14`}>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Tarifs</span>
                <h2 className="font-display text-3xl sm:text-4xl font-700 tracking-tight mb-4">
                  Simples et transparents
                </h2>
                <p className="text-slate-500">Pas de frais d&apos;installation cachés. Sans engagement. Tout est inclus.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {/* Standard */}
                <div className={`fade-up fade-up-d1 ${pricingAnim.inView ? "visible" : ""} relative rounded-2xl p-7 flex flex-col bg-white border border-slate-200 shadow-sm`}>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Standard</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-900 text-slate-900">25€</span>
                      <span className="text-sm text-slate-400">/mois</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">L&apos;essentiel pour booster votre visibilité locale</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Réponse aux avis illimitées",
                      "1 post / photo par semaine",
                      "Support prioritaire",
                    ].map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                        <span className="text-slate-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="block w-full py-3 rounded-xl text-center text-sm font-bold transition-all duration-200 bg-slate-100 text-slate-900 hover:bg-slate-200"
                  >
                    Choisir ce plan
                  </a>
                </div>

                {/* Complet — Recommandé */}
                <div className={`fade-up fade-up-d2 ${pricingAnim.inView ? "visible" : ""} relative rounded-2xl p-7 flex flex-col bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-[1.03] z-10`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white"
                    style={{ background: "linear-gradient(135deg, #0369a1, #7c3aed)" }}
                  >
                    Recommandé
                  </div>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400">Complet</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-900 text-white">49€</span>
                      <span className="text-sm text-slate-400">/mois</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">La solution complète pour dominer votre zone de chalandise</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Tout du plan Standard",
                      "Programme de boost des avis",
                      "Rapport de performance mensuel",
                      "Conseiller dédié",
                    ].map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-sky-400" />
                        <span className="text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://buy.stripe.com/28EcN5ehT1nA4BNbZX0Jq03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-xl text-center text-sm font-bold transition-all duration-200 bg-white text-slate-900 hover:bg-slate-100"
                  >
                    S&apos;abonner maintenant
                  </a>
                </div>

                {/* Sur mesure */}
                <div className={`fade-up fade-up-d3 ${pricingAnim.inView ? "visible" : ""} relative rounded-2xl p-7 flex flex-col card-surmesure shadow-sm`}>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ background: "linear-gradient(135deg, #0369a1, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sur mesure</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-3xl font-900 text-slate-900">Sur devis</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Pour chaque situation unique, une solution adaptée</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Création / refonte de site web",
                      "Nouvelle page Google Business",
                      "Plateforme de réservation sur mesure",
                      "Accompagnement stratégique",
                    ].map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm">
                        <Sparkles className="size-4 shrink-0 mt-0.5 text-violet-500" />
                        <span className="text-slate-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="block w-full py-3 rounded-xl text-center text-sm font-bold transition-all duration-200 text-white"
                    style={{ background: "linear-gradient(135deg, #0369a1, #7c3aed)" }}
                  >
                    Nous contacter
                  </a>
                </div>
              </div>

              {/* Reassurance below pricing */}
              <p className={`fade-up fade-up-d4 ${pricingAnim.inView ? "visible" : ""} text-center text-xs text-slate-400 mt-8`}>
                Premier mois satisfait ou remboursé · Sans engagement · Résiliation en 1 clic
              </p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* FAQ                                                           */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section id="faq" className="py-24 sm:py-32 scroll-mt-20 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-2xl px-6">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">FAQ</span>
                <h2 className="font-display text-3xl sm:text-4xl font-700 tracking-tight">Questions fréquentes</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-slate-50/80 border border-slate-200/70 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden open:bg-white open:shadow-sm open:border-slate-200 transition-all"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-sm text-slate-900 select-none">
                      {f.q}
                      <ChevronDown className="size-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* CONTACT / CTA                                                 */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <section id="contact" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #0c1222 0%, #0f172a 50%, #1a1145 100%)" }}>
            {/* Decorative orbs */}
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
              <h2 className="font-display text-3xl sm:text-5xl font-800 text-white mb-5 tracking-tight">
                On commence quand ?
              </h2>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Laissez-nous vos coordonnées. On vous rappelle pour configurer votre compte en 10 minutes. Premier mois satisfait ou remboursé.
              </p>

              <div className="bg-white rounded-2xl max-w-md mx-auto shadow-2xl shadow-black/30 overflow-hidden">
                {sent === "ok" ? (
                  <div className="py-14 px-8 text-center">
                    <div className="mx-auto size-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="font-display text-xl font-700 text-slate-900">Message reçu !</h3>
                    <p className="text-slate-500 mt-2 text-sm">On vous appelle très vite.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-7 space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                        Nom de votre établissement
                      </label>
                      <input
                        required type="text" name="name"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition"
                        placeholder="Mon enseigne"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                          Votre Nom
                        </label>
                        <input
                          required type="text" name="contact"
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                          Téléphone
                        </label>
                        <input
                          required type="tel" name="phone"
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-none transition"
                          placeholder="06..."
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      disabled={sending} type="submit"
                      className="w-full text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60 shadow-lg shadow-sky-600/25 hover:shadow-xl hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #0369a1, #0284c7)" }}
                    >
                      {sending ? "Envoi..." : "Me faire rappeler"}
                      {!sending && <ArrowRight className="size-4" />}
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <a href="mailto:contact@dynam8.fr" className="flex items-center gap-2 hover:text-white transition">
                  <Mail className="size-4" /> contact@dynam8.fr
                </a>
                <a href="tel:+33771794665" className="flex items-center gap-2 hover:text-white transition">
                  <Phone className="size-4" /> 07 71 79 46 65
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
          <div className="bg-slate-900/95 backdrop-blur-lg text-white rounded-2xl shadow-2xl flex items-center p-1.5 border border-slate-700/50">
            <a href="#roi" className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl active:bg-white/10">
              <Calculator className="size-5 mb-0.5" />
              <span className="text-[10px] font-medium">Simuler</span>
            </a>
            <div className="w-px h-8 bg-white/15 mx-1" />
            <a
              href="#contact"
              className="flex-[2] rounded-xl flex items-center justify-center py-2.5 font-bold text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg, #0369a1, #0284c7)" }}
            >
              Essai Gratuit <ArrowRight className="size-4 ml-1.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white py-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Dynam8 · Fait avec ❤️ pour les commerçants.
          </p>
        </footer>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <Logo className="h-12 w-auto" />

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          {[
            { href: "#solutions", label: "Solutions" },
            { href: "#roi", label: "Simulateur" },
            { href: "#tarifs", label: "Tarifs" },
            { href: "#faq", label: "FAQ" },
          ].map((link) => (
            <a key={link.href} href={link.href} className="hover:text-slate-900 transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-sky-600/20"
            style={{ background: "linear-gradient(135deg, #0369a1, #0284c7)" }}
          >
            Contact
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 p-5 shadow-xl flex flex-col gap-1 md:hidden">
          {[
            { href: "#solutions", label: "Solutions" },
            { href: "#roi", label: "Simulateur" },
            { href: "#tarifs", label: "Tarifs" },
            { href: "#faq", label: "FAQ" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="p-3 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 p-3 text-center text-white font-bold rounded-lg"
            style={{ background: "linear-gradient(135deg, #0369a1, #0284c7)" }}
          >
            Prendre RDV
          </a>
        </div>
      )}
    </header>
  );
}
