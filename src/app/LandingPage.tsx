"use client";

import React, { useMemo, useState } from "react";
import {
  CheckCircle2, Gauge, ShieldCheck, Zap, Cog, Handshake, Play,
  Rocket, Lock, ArrowRight, Calculator, Mail, Phone,
  MessageSquare, Cpu, Clock, BarChart3
} from "lucide-react";
import Link from "next/link";

// Logo SVG inline (piloté par currentColor)
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

// --- Page ---
export default function LandingPage() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourCost, setHourCost] = useState(25);
  const [monthlyFee, setMonthlyFee] = useState(199);

  const monthlySaved = useMemo(() => Math.round(hoursPerWeek * hourCost * 4.33), [hoursPerWeek, hourCost]);
  const roi = useMemo(() => Math.max(0, monthlySaved - monthlyFee), [monthlySaved, monthlyFee]);
  const roiPct = useMemo(
    () => (monthlyFee > 0 ? Math.round(((monthlySaved - monthlyFee) / monthlyFee) * 100) : 0),
    [monthlySaved, monthlyFee]
  );

  const pillars = [
    {
      icon: Gauge,
      title: "Performance",
      color: "from-emerald-500/15 to-emerald-500/0",
      bullets: [
        "Accessible 24/7, sans pause ni congés",
        "Exécution en temps réel et à grande échelle",
        "Fiabilité : ça tombe juste. Toujours.",
      ],
    },
    {
      icon: Rocket,
      title: "Compétitivité",
      color: "from-indigo-500/15 to-indigo-500/0",
      bullets: [
        "Jusqu'à l'équivalent d'1 ETP économisé/mois",
        "Faire en 50 € ce qui coûte 2 300 €",
        "Aller plus vite que vos concurrents",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Sécurité",
      color: "from-amber-500/15 to-amber-500/0",
      bullets: [
        "Vos données restent chez vous",
        "Aucune rétention inutile : on traite puis on oublie",
        "Déploiement on-premise possible",
      ],
    },
  ];

  const cases = [
    { icon: MessageSquare, title: "Répondre aux messages", desc: "WhatsApp / email / site — accusé, tri, réponses types, transfert aux bonnes personnes." },
    { icon: Cog, title: "Administratif sans friction", desc: "Récupération factures, pièces manquantes, relances automatiques, archivage Drive." },
    { icon: Cpu, title: "Saisie sans saisie", desc: "Lecture de PDF, extraction des champs et insertion dans vos outils (ERP/CRM/Excel)." },
    { icon: Clock, title: "Planification & rappels", desc: "Créneaux, confirmations, SMS de rappel, réduction des ‘no-shows’." },
    { icon: BarChart3, title: "Suivi en temps réel", desc: "Tableaux de bord simples pour voir volumes, délais, anomalies, valeur gagnée." },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-neutral-900" />
            <span className="font-semibold tracking-tight">Dynam8</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#valeur" className="hover:text-neutral-600">Valeur</a>
            <a href="#concret" className="hover:text-neutral-600">Cas concrets</a>
            <a href="#roi" className="hover:text-neutral-600">ROI</a>
            <a href="#securite" className="hover:text-neutral-600">Sécurité</a>
            <Link href="/replai" className="hover:text-neutral-600">ReplAi</Link>
            <a href="#contact" className="hover:text-neutral-600">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800">
            Discuter de votre besoin <ArrowRight className="size-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_50%)]" />

        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-full bg-neutral-900 text-white">
                <Zap className="size-3" /> Gagnez des heures chaque semaine
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Automatiser <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">vos tâches répétitives</span>,
                libérer du temps pour l’essentiel.
              </h1>
              <p className="mt-5 text-neutral-700 text-lg">
                Nous mettons en place des assistants logiciels qui travaillent 24/7 pour votre PME :
                réponses aux messages, collecte de documents, relances, saisie automatique, reporting.
                Concret, rapide, mesurable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#roi" className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm font-semibold hover:bg-neutral-800">
                  Estimer mon ROI <Calculator className="size-4" />
                </a>
                <Link
                  href="/replai"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white
                            bg-gradient-to-r from-sky-600 to-emerald-500 shadow-sm
                            hover:from-sky-700 hover:to-emerald-600
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                >
                  Voir ReplAi <Play className="size-4" />
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Déploiement en jours, pas en mois</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Sans changer vos outils</div>
              </div>
            </div>

            {/* Vignette "Assistant à vos côtés" enrichie */}
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="h-full w-full rounded-xl bg-gradient-to-br from-neutral-100 to-white p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-neutral-900 grid place-items-center">
                        <Logo className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Assistant à vos côtés</p>
                        <p className="text-xs text-neutral-600">Travaille 24/7 sur vos tâches</p>
                      </div>
                    </div>
                    <span className="text-xs rounded-full border border-neutral-300 px-2.5 py-1 bg-white">Temps réel</span>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-neutral-200 bg-white p-3">
                      <p className="text-xs font-medium text-neutral-600">Étape 1</p>
                      <p className="text-sm font-semibold mt-0.5">Message reçu</p>
                      <p className="text-xs text-neutral-600 mt-1">WhatsApp / email / site</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-3">
                      <p className="text-xs font-medium text-neutral-600">Étape 2</p>
                      <p className="text-sm font-semibold mt-0.5">Doc analysé</p>
                      <p className="text-xs text-neutral-600 mt-1">Montant, dates, pièces manquantes</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-3">
                      <p className="text-xs font-medium text-neutral-600">Étape 3</p>
                      <p className="text-sm font-semibold mt-0.5">Action effectuée</p>
                      <p className="text-xs text-neutral-600 mt-1">Excel/CRM mis à jour + relance</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <CheckCircle2 className="size-4" /> Sans changer vos outils
                    </div>
                    <div className="text-xs font-semibold rounded-full bg-neutral-900 text-white px-3 py-1">
                      ~6 h/sem gagnées
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 hidden sm:block">
                <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm w-64">
                  <p className="text-xs font-medium text-neutral-600">Exemple</p>
                  <p className="mt-1 text-sm">Lecture d’un PDF de facture → extraction → saisie automatique dans Excel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeur */}
      <section id="valeur" className="py-16 sm:py-24 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm relative overflow-hidden">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${p.color}`} />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <p.icon className="size-6" />
                    <h3 className="text-lg font-bold">{p.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas concrets */}
      <section id="concret" className="py-16 sm:py-24 bg-white border-y border-neutral-200 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Concret, pas du blabla</h2>
            <p className="mt-3 text-neutral-700">Voici ce que nous mettons réellement en place chez nos clients PME.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex items-center gap-3">
                  <c.icon className="size-6" />
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-neutral-300 p-6 bg-gradient-to-br from-neutral-50 to-white">
              <p className="text-sm text-neutral-600">Vous avez un process très spécifique ?</p>
              <p className="font-semibold">On le cartographie ensemble en 30 minutes et on vous montre une maquette.</p>
              <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:underline">Parler d’un cas précis <ArrowRight className="size-4" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="py-16 sm:py-24 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Titre + intro sur toute la largeur */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Votre retour sur investissement</h2>
            <p className="mt-3 texts-neutral-700">Même avec un seul process automatisé, le gain est immédiat.</p>
          </div>

          {/* Grille: uniquement les deux cartes pour garantir l'alignement */}
          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-start">
            {/* Carte ROI (gauche) */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium">Heures gagnées / semaine</label>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 text-sm text-neutral-700">{hoursPerWeek} h</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Coût horaire (€)</label>
                  <input
                    type="number"
                    value={hourCost}
                    onChange={(e) => setHourCost(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Abonnement mensuel (€)</label>
                  <input
                    type="number"
                    value={monthlyFee}
                    onChange={(e) => setMonthlyFee(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2"
                  />
                </div>
              </div>
              <div className="mt-6 grid sm:grid-cols-3 gap-6 text-center">
                <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                  <div className="text-xs text-neutral-600">Économie mensuelle</div>
                  <div className="text-2xl font-extrabold">{monthlySaved.toLocaleString("fr-FR")} €</div>
                </div>
                <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                  <div className="text-xs text-neutral-600">ROI net / mois</div>
                  <div className="text-2xl font-extrabold">{roi.toLocaleString("fr-FR")} €</div>
                </div>
                <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                  <div className="text-xs text-neutral-600">x l’abonnement</div>
                  <div className="text-2xl font-extrabold">{isFinite(roiPct) ? `${roiPct} %` : "—"}</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-neutral-600">
                Référence : 1 ETP ≈ 2 300 €/mois. Avec l’automatisation, vous achetez des heures — pas des licences inutiles.
              </p>
            </div>

            {/* Carte "Comment on travaille" (droite) */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">Comment on travaille</h3>
              <ul className="mt-3 space-y-3 text-sm text-neutral-700">
                <li className="flex gap-2"><span className="mt-1"><Handshake className="size-4" /></span><span><strong>30 min d’échange</strong> pour comprendre vos tâches répétitives et vos outils actuels.</span></li>
                <li className="flex gap-2"><span className="mt-1"><Cog className="size-4" /></span><span><strong>Prototype</strong> en quelques jours sur un cas ciblé (ex : relance facture, réponse WhatsApp, saisie Excel).</span></li>
                <li className="flex gap-2"><span className="mt-1"><Rocket className="size-4" /></span><span><strong>Mise en production</strong> progressive, suivi via un mini tableau de bord.</span></li>
                <li className="flex gap-2"><span className="mt-1"><ShieldCheck className="size-4" /></span><span><strong>Contrats simples</strong> : abonnement mensuel, résiliable, propriété des automatisations transférée si vous le souhaitez.</span></li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800">
                Parler de votre process <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Sécurité */}
      <section id="securite" className="py-16 sm:py-24 bg-neutral-50 border-y border-neutral-200 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Sécurité & confidentialité</h2>
            <p className="mt-3 text-neutral-700">Transparence totale sur où vont vos données et ce que nous en faisons.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-3"><Lock className="size-6" /><h3 className="font-semibold">Données minimisées</h3></div>
              <p className="mt-2 text-sm text-neutral-700">On capture la demande, on la traite, <span className="font-semibold">puis on supprime</span>. Pas de rétention par défaut.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-3"><ShieldCheck className="size-6" /><h3 className="font-semibold">Déploiement chez vous</h3></div>
              <p className="mt-2 text-sm text-neutral-700">Option on-premise : vos données ne sortent pas de votre SI. Nous accompagnons la prise en main.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-3"><Cpu className="size-6" /><h3 className="font-semibold">Outils sobres</h3></div>
              <p className="mt-2 text-sm text-neutral-700">Pas de grand jargon. Des briques simples (API, scripts, connecteurs) qui font le job et que vous pouvez reprendre.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-neutral-900 to-neutral-700 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Prenons 30 minutes sur votre process le plus pénible</h2>
              <p className="mt-3 text-neutral-300">On mesure le temps gagné, on chiffre le ROI, et si ça ne vaut pas le coup… on vous le dira.</p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Sans engagement</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Résultats en jours</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4" /> Équipe basée en France</li>
              </ul>
            </div>
            <div id="contact" className="rounded-2xl bg-white text-neutral-900 p-6 border border-white/10 shadow-2xl scroll-mt-28">
              <h3 className="text-lg font-bold">Contact</h3>
              <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
                <input required placeholder="Nom" className="rounded-xl border border-neutral-300 px-3 py-2" />
                <input required type="email" placeholder="Email" className="rounded-xl border border-neutral-300 px-3 py-2" />
                <input placeholder="Téléphone (optionnel)" className="rounded-xl border border-neutral-300 px-3 py-2" />
                <textarea required placeholder="Décrivez la tâche à automatiser" rows={4} className="rounded-xl border border-neutral-300 px-3 py-2" />
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800">
                  Envoyer <Mail className="size-4" />
                </button>
              </form>
              <div className="mt-4 text-sm text-neutral-600 flex flex-col gap-1">
                <p className="flex items-center gap-2"><Phone className="size-4" /> 07 71 79 46 65</p>
                <p className="flex items-center gap-2"><Mail className="size-4" /> contact@dynam8.org</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
