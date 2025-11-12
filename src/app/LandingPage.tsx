"use client";

import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  Rocket,
  Lock,
  ArrowRight,
  Calculator,
  Mail,
  Phone,
  MessageSquare,
  CalendarDays,
  Star,
  Image as ImageIcon,
  BarChart3,
  Users,
  Clock,
  Play,
  ChevronDown,
} from "lucide-react";

// --------------------------------------------------------------------------------------
// Logo (inline SVG, currentColor-aware for easy theming) – composant pur
// --------------------------------------------------------------------------------------
function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo Dynam8">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopOpacity="1" />
          <stop offset="100%" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#g1)" stroke="currentColor" strokeOpacity="0.08" />
      <path d="M20 46 L32 16 L44 46" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 36 H40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 20 l3 -2 m-3 2 l-3 -2 m3 2 l0 4 m0 -4 l4 0 m-4 0 l-4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// --------------------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------------------
export default function LandingPage() {
  // ROI state (spécifique gestion d'avis / posts)
  const [reviewsPerMonth, setReviewsPerMonth] = useState(30); // avis traités
  const [minutesPerReview, setMinutesPerReview] = useState(6); // temps manuel par avis
  const [hourCost, setHourCost] = useState(25);
  const monthlyFee = 10; // plan Essentiel

  const hoursPerMonth = useMemo(
    () => (reviewsPerMonth * minutesPerReview) / 60,
    [reviewsPerMonth, minutesPerReview]
  );
  const monthlySaved = useMemo(
    () => Math.round(hoursPerMonth * hourCost),
    [hoursPerMonth, hourCost]
  );
  const roiPct = useMemo(
    () => (monthlyFee > 0 ? Math.round(((monthlySaved - monthlyFee) / monthlyFee) * 100) : 0),
    [monthlySaved]
  );

  // Lien YouTube (non-affiché dans l'UI). Laissez ce data-attribute pour le retrouver facilement.
  const youtubeUrl = "https://www.youtube.com/embed/VIDEO_ID";

  // --- Contact form state + submit handler (POST /api/contact)
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
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
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
        setErrorMsg(data?.error || "Impossible d’envoyer le message.");
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

  const features = [
    {
      icon: MessageSquare,
      title: "Réponse automatique aux avis",
      desc: "Chaque avis reçoit une réponse personnalisée (langue détectée, ton adapté). Les avis 1★ remontent en priorité avec une prise de contact directe.",
      bullets: [
        "Détection langue & sentiment",
        "Réponses ajustées à votre établissement",
        "Escalade manuelle si nécessaire",
      ],
      accent: {
        ring: "ring-sky-300/60",
        pill: "bg-sky-600",
        dot: "bg-sky-400",
        icon: "text-sky-700",
        grad: "from-sky-50 to-white",
      },
    },
    {
      icon: ImageIcon,
      title: "Post automatique chaque semaine",
      desc: "Publication hebdomadaire sur votre fiche Google : photo, description courte, call-to-action. Alimentation depuis vos photos ou une banque dédiée.",
      bullets: [
        "Calendrier programmable",
        "Lignes éditoriales prêtes à l’emploi",
        "Contrôle avant publication (option)",
      ],
      accent: {
        ring: "ring-violet-300/60",
        pill: "bg-violet-600",
        dot: "bg-violet-400",
        icon: "text-violet-700",
        grad: "from-violet-50 to-white",
      },
    },
    {
      icon: Star,
      title: "Génération d’avis (sollicitation)",
      desc: "Après une visite/réservation, un message poli invite vos clients à partager leur expérience avec un lien direct vers votre fiche.",
      bullets: [
        "Envoi 3h après l’expérience",
        "Rappels discrets si pas de réponse",
        "Conforme aux règles Google (pas d’incitation frauduleuse)",
      ],
      accent: {
        ring: "ring-emerald-300/60",
        pill: "bg-emerald-600",
        dot: "bg-emerald-400",
        icon: "text-emerald-700",
        grad: "from-emerald-50 to-white",
      },
    },
  ] as const;

  const steps = [
    { title: "Connexion à votre fiche Google", icon: ShieldCheck, text: "Accès limité à votre compte, révocable à tout moment et protégé par un contrat" },
    { title: "Personnalisation en 48h", icon: Rocket, text: "Vos réponses types, vos thématiques de posts et vos messages d’invitation aux avis." },
    { title: "Pilote 7 jours", icon: CalendarDays, text: "On lance un test sur un échantillon (réponses + 1 post + 1 campagne d’avis)." },
    { title: "Suivi des résultats", icon: BarChart3, text: "Tableau de bord : volume d’avis, note moyenne, vues de posts, temps économisé, nouveaux clients." },
  ];

  const faqs = [
    {
      q: "Est-ce conforme aux règles Google ?",
      a: "Oui. Nous n’achetons pas d’avis et n’offrons pas de contreparties. Les messages sont de simples invitations, conformes aux guidelines.",
    },
    {
      q: "Puis-je valider les réponses avant publication ?",
      a: "Oui. Vous pouvez activer la pré-modération : vous validez les réponses et les posts avant qu’ils ne partent.",
    },
    {
      q: "Que se passe-t-il si j’arrête ?",
      a: "Tout s’arrête immédiatement, sans surcoût. Les accès Google peuvent être révoqués par vous à tout moment.",
    },
    {
      q: "Où sont hébergées les données ?",
      a: "Dans nos serveurs, en Europe. Nous appliquons une politique de minimisation : nous ne conservons pas les données au-delà du nécessaire opérationnel.",
    },
  ];

  // Témoignages : 3 éléments distincts et éditables individuellement
  // Témoignages : 3 éléments distincts avec avatar emoji
// Témoignages : 3 éléments distincts avec avatar emoji cohérent
  const [testimonials] = useState([
    {
      id: "t-neuilly",
      author: "Restaurant – Neuilly-sur-Seine",
      role: "Gérant",
      emoji: "👨‍🍳",
      accent: "bg-sky-100 text-sky-800",
      text:
        "On répond désormais à tous les avis sans effort, et les posts hebdo maintiennent la fiche active. +18 avis en 2 semaines, note stable.",
    },
    {
      id: "t-malakoff",
      author: "Restaurant – Malakoff",
      role: "Gérante",
      emoji: "👩‍🍳",
      accent: "bg-violet-100 text-violet-800",
      text:
        "Simple à mettre en place, pas d’engagement. On gagne du temps et on garde la main quand on veut pré-valider les messages.",
    },
    {
      id: "t-mtp-garage",
      author: "Garage automobile – Montpellier",
      role: "Propriétaire",
      emoji: "🧑‍🔧",
      accent: "bg-emerald-100 text-emerald-800",
      text:
        "Les réponses automatiques + rappels d’avis ont relancé notre visibilité locale. Process propre et conforme aux règles Google.",
    },
  ]);



  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Metadonnée non-visuelle pour conserver l'URL YouTube dans le code */}
      <div className="sr-only" aria-hidden="true" data-youtube={youtubeUrl} />

      {/* Decorative backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-full bg-white border border-sky-200 text-sky-700 shadow-sm">
                <Zap className="size-3" /> Optimisation de votre page Google
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Plus d’avis, plus de vues, <span className="bg-gradient-to-r from-sky-700 via-blue-600 to-violet-600 bg-clip-text text-transparent">plus de clients</span> : en pilote automatique.
              </h1>
              <p className="mt-5 text-neutral-700 text-lg max-w-xl">
                Dynam8 gère votre fiche Google : réponses aux avis, posts hebdomadaires et invitations à laisser un avis. Vous gardez la main, nous gérons l’exécution.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#roi" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white text-neutral-900 px-5 py-3 text-sm font-semibold shadow-sm hover:border-neutral-400">
                  Estimer mon ROI <Calculator className="size-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-sky-700 to-blue-600 shadow-sm hover:from-sky-800 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                >
                  Essai gratuit 7 jours <ArrowRight className="size-4" />
                </a>
              </div>

              {/* Proof / highlights */}
              <ul className="mt-6 grid grid-cols-2 gap-4 text-sm text-neutral-700 max-w-xl">
                <li className="flex items-center gap-2"><Users className="size-4 text-sky-700" /> Restaurants, garages, commerces de proximité</li>
                <li className="flex items-center gap-2"><Clock className="size-4 text-sky-700" /> Mise en place en 48h</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sky-700" /> Sans engagement</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-sky-700" /> Arrêt en 1 clic</li>
              </ul>
            </div>

            {/* Visuel démo (statique, accessible). L'iframe YouTube reste non rendue. */}
            <div className="relative">
              <button
                type="button"
                className="group aspect-video w-full rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl overflow-hidden shadow-xl ring-1 ring-black/5 grid place-content-center"
                aria-label="Demander une démo"
                onClick={() => {
                  const contact = document.getElementById("contact");
                  if (contact) contact.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-3 grid place-content-center h-14 w-14 rounded-full bg-neutral-900/90 text-white">
                    <Play className="size-6" />
                  </div>
                  <p className="text-sm text-neutral-700">
                    Voir une démo (pas besoin de compte). Cliquez pour nous contacter.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Produit (cartes colorées) */}
      <section id="produit" className="py-16 sm:py-24 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ring-1 ${f.accent.ring} hover:shadow-md transition`}
              >
                <div className={`absolute -top-3 -right-3 h-10 w-10 rounded-full ${f.accent.dot} blur`} />
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl grid place-items-center text-white ${f.accent.pill} shadow-sm`}>
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm text-neutral-700">{f.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {f.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2"><CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${f.accent.icon}`} />{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="fonctionnement" className="py-16 sm:py-24 bg-white border-y border-neutral-200 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Mise en place simple et sécurisée</h2>
            <p className="mt-3 text-neutral-700">On reste dans l’écosystème Google. Accès minimaux, traçabilité, et possibilité de validation avant publication.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 hover:bg-white hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <s.icon className="size-6 text-sky-700" />
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages (preuves sociales) */}
      {/* Témoignages (preuves sociales) */}
      <section className="py-16 sm:py-24 bg-white border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Ils gagnent du temps et de la visibilité</h2>
            <p className="mt-3 text-neutral-700">Exemples anonymisés issus de restaurants et garages clients.</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-10 w-10 shrink-0 rounded-full grid place-items-center text-lg ${t.accent}`}
                    aria-hidden="true"
                  >
                    {t.emoji}
                  </div>
                  <div className="min-w-0">
                    <blockquote className="text-[15px] text-neutral-800 leading-relaxed">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-2 text-xs text-neutral-600 truncate">
                      {t.author}{t.role ? ` — ${t.role}` : ""}
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>


      {/* Tarifs */}
      <section id="tarifs" className="py-16 sm:py-24 bg-neutral-50 border-y border-neutral-200 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Tarifs simples</h2>
            <p className="mt-3 text-neutral-700">Sans engagement. Vous pouvez arrêter à tout moment.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <PricingCard
              label="Essentiel"
              price="10€ / mois"
              description="Réponse automatique aux avis uniquement."
              features={["Détection langue & sentiment", "Modèles adaptés à votre établissement"]}
              cta="Démarrer"
            />
            <PricingCard
              highlight
              label="Standard"
              price="20€ / mois"
              description="Réponse aux avis + 1 post/semaine."
              features={["Calendrier éditorial inclus", "Pré-modération possible"]}
              cta="Choisir"
            />
            <PricingCard
              label="Complet"
              price="30€ / mois"
              description="Avis automatiques + post hebdo + sollicitations d’avis."
              features={["Messages 3h après la visite", "Rappels discrets si pas de réponse"]}
              cta="Contacter"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Questions fréquentes</h2>
            <p className="mt-3 text-neutral-700">Si vous avez d’autres questions, contactez-nous : on répond vite.</p>
          </div>

          <div className="mt-8 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-neutral-200 bg-white p-4 open:shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-neutral-900">
                  {f.q}
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-sm text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (contact) */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-sky-800 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Prêt à booster votre fiche Google ?</h2>
              <p className="mt-3 text-sky-100">On configure, on teste 7 jours, vous jugez sur résultats. Pas de carte bleue requise.</p>
              <ul className="mt-6 space-y-2 text-sm text-sky-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Sans engagement</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Résultats visibles en jours</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Équipe basée en France</li>
              </ul>
            </div>
            <div id="contact" className="rounded-2xl bg-white/90 backdrop-blur-xl text-neutral-900 p-6 border border-white/10 shadow-2xl scroll-mt-28">
              <h3 className="text-lg font-bold">Contact</h3>

              <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={handleSubmit} aria-describedby="form-status">
                {/* Honeypot anti-spam (caché) */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

                <label className="sr-only" htmlFor="name">Nom</label>
                <input required id="name" name="name" placeholder="Nom" className="rounded-xl border border-neutral-300 px-3 py-2" />
                <label className="sr-only" htmlFor="email">Email</label>
                <input required id="email" type="email" name="email" placeholder="Email" className="rounded-xl border border-neutral-300 px-3 py-2" />
                <label className="sr-only" htmlFor="phone">Téléphone</label>
                <input id="phone" name="phone" placeholder="Téléphone (optionnel)" className="rounded-xl border border-neutral-300 px-3 py-2" />
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea required id="message" name="message" placeholder="Décrivez votre établissement et votre fiche Google (lien si possible)" rows={4} className="rounded-xl border border-neutral-300 px-3 py-2" />

                <button disabled={sending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-800 disabled:opacity-60">
                  {sending ? "Envoi..." : (<><span>Envoyer</span> <Mail className="size-4" /></>)}
                </button>

                {/* Messages de statut (ARIA live) */}
                <p id="form-status" aria-live="polite" className="sr-only">
                  {sent === "ok" ? "Message envoyé" : sent === "error" ? "Erreur d’envoi" : ""}
                </p>
                {sent === "ok" && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    Merci ! Votre message a bien été envoyé.
                  </p>
                )}
                {sent === "error" && (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                )}
              </form>

              <div className="mt-4 text-sm text-neutral-600 flex flex-col gap-1">
                <p className="flex items-center gap-2"><Phone className="size-4" /> <a href="tel:+33771794665" className="hover:underline">07 71 79 46 65</a></p>
                <p className="flex items-center gap-2"><Mail className="size-4" /> <a href="mailto:contact@dynam8.fr" className="hover:underline">contact@dynam8.fr</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI déplacé en bas pour usage rendez-vous */}
      <section id="roi" className="py-16 sm:py-24 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Votre retour sur investissement</h2>
            <p className="mt-3 text-neutral-700">Automatiser les avis et les posts libère du temps et améliore votre visibilité locale.</p>
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-start">
            {/* Carte ROI */}
            <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-6 shadow-sm ring-1 ring-black/5">
              <div className="grid sm:grid-cols-4 gap-6">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="reviews">Avis par mois</label>
                  <input id="reviews" type="range" min={5} max={200} value={reviewsPerMonth} onChange={(e) => setReviewsPerMonth(parseInt(e.target.value))} className="w-full" />
                  <div className="mt-1 text-sm text-neutral-700">{reviewsPerMonth}</div>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="minutes">Minutes / avis</label>
                  <input id="minutes" type="number" value={minutesPerReview} onChange={(e) => setMinutesPerReview(Number(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-300 px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="cost">Coût horaire (€)</label>
                  <input id="cost" type="number" value={hourCost} onChange={(e) => setHourCost(Number(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-300 px-3 py-2" />
                </div>
              </div>
              <div className="mt-6 grid sm:grid-cols-3 gap-6 text-center">
                <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 p-4">
                  <div className="text-xs text-neutral-600">Heures économisées / mois</div>
                  <div className="text-2xl font-extrabold">{hoursPerMonth.toLocaleString("fr-FR")}</div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 p-4">
                  <div className="text-xs text-neutral-600">Économie mensuelle</div>
                  <div className="text-2xl font-extrabold">{monthlySaved.toLocaleString("fr-FR")} €</div>
                </div>
                <div className="rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 p-4">
                  <div className="text-xs text-sky-700">x l’abonnement (10€)</div>
                  <div className="text-2xl font-extrabold text-sky-800">{Number.isFinite(roiPct) ? `${roiPct} %` : "—"}</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-neutral-600">
                Référence : une réponse manuelle prend ~5–7 min en moyenne (lecture, rédaction, publication). Les posts hebdo et la sollicitation d’avis sont inclus.
              </p>
            </div>

            {/* Carte "Sécurité & conformité" */}
            <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-bold">Sécurité & conformité</h3>
              <ul className="mt-3 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-2"><span className="mt-1"><ShieldCheck className="size-4 text-sky-700" /></span><span><strong>Accès minimaux</strong> à votre Google Business Profile. Révocable à tout moment.</span></li>
                <li className="flex gap-2"><span className="mt-1"><Lock className="size-4 text-sky-700" /></span><span><strong>Pas de rétention inutile</strong> : on traite puis on supprime. Journalisation des actions.</span></li>
                <li className="flex gap-2"><span className="mt-1"><MessageSquare className="size-4 text-sky-700" /></span><span><strong>Sollicitations d’avis conformes</strong> : pas de faux avis ni d’incitations trompeuses, uniquement un lien et un message de courtoisie.</span></li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800">
                Parler de votre fiche Google <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-3 left-0 right-0 z-40 px-4 sm:hidden">
        <div className="mx-auto max-w-md rounded-2xl bg-neutral-900 text-white shadow-xl">
          <a href="#contact" className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold">Essai gratuit 7 jours</span>
            <ArrowRight className="size-5" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Dynam8 — Tous droits réservés</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-900">Mentions légales</a>
            <a href="#" className="hover:text-neutral-900">Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --------------------------------------------------------------------------------------
// Header (avec burger mobile minimal)
// --------------------------------------------------------------------------------------
function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-white/40 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-sky-700" />
          <span className="font-semibold tracking-tight">Dynam8</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#produit" className="hover:text-neutral-700">Produit</a>
          <a href="#fonctionnement" className="hover:text-neutral-700">Comment ça marche</a>
          <a href="#roi" className="hover:text-neutral-700">ROI</a>
          <a href="#tarifs" className="hover:text-neutral-700">Tarifs</a>
          <a href="#contact" className="hover:text-neutral-700">Contact</a>
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-700 to-blue-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:from-sky-800 hover:to-blue-700">
            Essai 7 jours <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Burger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-3 grid gap-2 text-sm">
            <a href="#produit" className="py-2">Produit</a>
            <a href="#fonctionnement" className="py-2">Comment ça marche</a>
            <a href="#roi" className="py-2">ROI</a>
            <a href="#tarifs" className="py-2">Tarifs</a>
            <a href="#contact" className="py-2">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}

// --------------------------------------------------------------------------------------
// Pricing card component
// --------------------------------------------------------------------------------------
function PricingCard({
  label,
  price,
  description,
  features,
  cta,
  highlight,
}: {
  label: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl ${highlight ? "border-2 border-sky-700" : "border border-neutral-200"} bg-white p-6 shadow-sm hover:shadow-md transition`}>
      {highlight && (
        <span className="absolute -top-3 right-4 text-[11px] font-semibold bg-sky-700 text-white rounded-full px-2 py-0.5">Populaire</span>
      )}
      {!highlight && <div className="absolute -top-3 right-6 h-8 w-8 rounded-full bg-sky-200/60 blur" />}

      <p className="text-xs font-medium text-sky-700">{label}</p>
      <h3 className="text-2xl font-extrabold mt-1">{price}</h3>
      <p className="text-sm text-neutral-700 mt-2">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-neutral-700">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 text-sky-700" />{f}</li>
        ))}
      </ul>
      <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-700 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-800">{cta}</a>
    </div>
  );
}
