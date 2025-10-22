import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Lock, ShieldCheck, Search, ThumbsUp, Gauge, Timer,
} from "lucide-react";

export const metadata = {
  title: "Replai — Réponse automatique aux avis Google | Dynam8",
  description:
    "Boostez la visibilité de votre établissement et l’engagement clients grâce à Replai. Vidéo, bénéfices, sécurité, prix et accès au service.",
};

const btnPrimary =
  "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white " +
  "bg-gradient-to-r from-sky-600 to-emerald-500 shadow-sm hover:from-sky-700 hover:to-emerald-600 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70";

const card =
  "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5";

// Logo inline (copié de la page principale)
function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo agence">
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

export default function ReplaiPage() {
  return (
    <main className="relative min-h-screen">
      {/* Fond structuré : gradient diagonal + halos discrets */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-200 via-sky-50 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-96 w-96 rounded-full bg-sky-300/15 blur-3xl" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      {/* Navbar “verre” (moins grise, plus premium) */}
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-neutral-900" />
            <span className="font-semibold tracking-tight">Dynam8</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#valeur" className="hover:text-neutral-700">Valeur</Link>
            <Link href="/#concret" className="hover:text-neutral-700">Cas concrets</Link>
            <Link href="/#roi" className="hover:text-neutral-700">ROI</Link>
            <Link href="/#securite" className="hover:text-neutral-700">Sécurité</Link>
            <span className="font-medium text-neutral-900">Replai</span>
            <Link href="/#contact" className="hover:text-neutral-700">Contact</Link>
          </nav>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white
                      bg-neutral-900/90 hover:bg-neutral-900"
          >
            Discuter de votre besoin <ArrowRight className="size-4" />
          </Link>

        </div>
      </header>

      {/* 1) Titre + Catch phrase */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-6">
        <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Repl<span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">ai</span> — Réponse automatique aux avis Google
        </h1>
        <p className="mt-4 text-2xl sm:text-3xl font-semibold leading-snug">
          Boostez la visibilité de votre établissement et l’engagement client grâce à Repl
          <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">Ai</span>
        </p>
        <p className="mt-3 text-neutral-700 text-lg">
          La solution dynamique qui automatise des réponses personnalisées aux avis laissés par vos clients.
        </p>

        </div>
      </section>

      {/* 2) Vidéo YouTube (grande) */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-4">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/79ZEOZ3-GKI"
              title="Replai — Démo produit"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 3) Pourquoi Replai */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Pourquoi Replai ?</h2>
            <p className="mt-3 text-neutral-700">
              Des réponses de qualité, avec une <span className="font-semibold">cadence maîtrisée</span> et des
              <span className="font-semibold"> horaires d’envoi alignés</span> à votre activité — pas de messages intempestifs la nuit.
            </p>
          </div>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {[
              { icon: Search, title: "Visibilité locale", desc: "Des réponses régulières et soignées : un signal positif pour Google." },
              { icon: ThumbsUp, title: "Engagement client", desc: "Un ton adapté à chaque avis pour renforcer la relation." },
              { icon: Gauge, title: "Désescalade négatifs", desc: "Réponses calmes, factuelles, avec issue constructive proposée." },
              { icon: Timer, title: "Cadence & horaires", desc: "Délais paramétrables (ex. 2h/24h), envoi pendant vos heures d’ouverture, mode silencieux nuit/week-end." },
            ].map((b, i) => (
              <div key={i} className={card}>
                <div className="flex items-center gap-3">
                  <b.icon className="size-6 text-sky-600" />
                  <h3 className="font-semibold">{b.title}</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) Sécurité & confidentialité (fond neutre, pas gris) */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Sécurité & confidentialité</h2>
            <p className="mt-3 text-neutral-700">Transparence sur le traitement et la conservation des données.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className={card}>
              <div className="flex items-center gap-3">
                <Lock className="size-6 text-sky-600" />
                <h3 className="font-semibold">Données minimisées</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-700">On traite, puis on supprime. Pas de rétention par défaut.</p>
            </div>
            <div className={card}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-sky-600" />
                <h3 className="font-semibold">Ton maîtrisé</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-700">
                Aligné à votre charte. Pas de “review gating”. Validation manuelle optionnelle pour les avis 1⭐ (notification WhatsApp).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Prix (avant le CTA) */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-baseline gap-2 rounded-xl px-5 py-3 backdrop-blur
                          bg-white/80 text-neutral-900 shadow-sm
                          ring-1 ring-transparent
                          [background:linear-gradient(white,white)_padding-box,linear-gradient(90deg,#0284c7,#10b981)_border-box]
                          border border-transparent">
            <span className="text-2xl font-extrabold">9,99€</span>
            <span className="text-xs opacity-80">H.T / mois</span>
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            Sans engagement, vous arrêtez quand vous voulez.
          </p>
        </div>
      </section>

      {/* 6) CTA final */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Prêt à améliorer vos réponses aux avis ?
          </h3>
          <p className="mt-3 text-neutral-700">On s’occupe des réponses ; vous gardez la cadence et les horaires.</p>
          <div className="mt-6 flex justify-center">
            <Link href="/#contact" className={btnPrimary}>
              Accéder au service <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
