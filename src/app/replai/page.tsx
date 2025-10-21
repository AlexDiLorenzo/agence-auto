import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Lock, ShieldCheck, Search, ThumbsUp, Gauge, Timer,
} from "lucide-react";

export const metadata = {
  title: "Replai – Réponse automatique aux avis Google | Dynam8",
  description:
    "Replai génère des réponses automatiques pertinentes à vos avis Google pour gagner du temps et booster votre SEO local.",
};

const btn = {
  primary:
    "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white " +
    "bg-gradient-to-r from-sky-600 to-emerald-500 shadow-sm hover:from-sky-700 hover:to-emerald-600 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70",
};

const card =
  "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition " +
  "hover:shadow-md hover:-translate-y-0.5";

export default function ReplAiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-50 to-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Repl<span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">ai</span> — Réponse automatique aux avis Google
          </h1>

          <p className="mt-5 text-neutral-700 text-lg">
            Des réponses <span className="font-semibold">pertinentes, maîtrisées et personnalisées</span> à vos avis Google —
            pour <span className="font-semibold">gagner du temps</span>, renforcer l’<span className="font-semibold">engagement client</span> et
            améliorer votre <span className="font-semibold">SEO local</span>.
          </p>

          {/* Prix haut de page */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-baseline gap-2 rounded-xl px-4 py-2 backdrop-blur
                         bg-white/70 text-neutral-900 shadow-sm
                         ring-1 ring-transparent
                         [background:linear-gradient(white,white)_padding-box,linear-gradient(90deg,#0284c7,#10b981)_border-box]
                         border border-transparent"
            >
              <span className="text-2xl font-extrabold">9,99€</span>
              <span className="text-xs opacity-80">H.T / mois</span>
            </span>
            <span className="text-sm text-neutral-600">Sans engagement — annulez quand vous voulez.</span>
          </div>

          {/* CTA principal */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#contact" className={btn.primary}>
              Accéder au service <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Points clés */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-sky-600" /> Mise en place en 5 minutes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-sky-600" /> Validation manuelle optionnelle pour les avis 1⭐
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-sky-600" /> Équipe basée en France
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu visuel */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-4">
          <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-sky-50 to-white grid place-items-center border border-neutral-200">
            <p className="text-neutral-500 text-sm">Aperçu produit — ReplAi</p>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Pourquoi ReplAi ?</h2>
            <p className="mt-3 text-neutral-700">Des réponses de qualité, dans un délai réduit, avec un ton aligné à votre image.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {[
              { icon: Search, title: "Visibilité locale", desc: "Des réponses régulières et soignées : un signal positif pour Google." },
              { icon: ThumbsUp, title: "Engagement client", desc: "Un ton adapté à chaque avis pour renforcer la relation." },
              { icon: Gauge, title: "Désescalade négatifs", desc: "Réponses calmes, factuelles, avec issue constructive proposée." },
              { icon: Timer, title: "Gain de temps", desc: "Relisez, ajustez, validez si besoin. Le gros du travail est déjà fait." },
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

      {/* Sécurité */}
      <section className="py-12 sm:py-16 bg-neutral-50/70 border-y border-neutral-200">
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
              <p className="mt-2 text-sm text-neutral-700">Aligné à votre charte. Pas de “review gating”. Vous gardez le contrôle sur les avis sensibles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bas */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-2xl font-extrabold tracking-tight">Prêt à gagner du temps sur vos avis ?</h3>
          <p className="mt-3 text-neutral-700">On s’occupe des réponses. Vous gardez le contrôle.</p>
          <div className="mt-6 flex justify-center">
            <Link href="/#contact" className={btn.primary}>
              Accéder au service <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
