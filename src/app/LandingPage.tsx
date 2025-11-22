"use client";

import React, { useMemo, useState, useEffect } from "react";
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
  Menu,
  X
} from "lucide-react";

// --------------------------------------------------------------------------------------
// Logo Dynam8
// --------------------------------------------------------------------------------------
// --- NOUVEAU CODE (À COLLER AU MÊME ENDROIT) ---

// On utilise une balise image standard qui pointe vers le dossier public
function Logo({ className = "h-auto w-auto" }: { className?: string }) {
  return (
    <img
      src="/logo.png" // Assurez-vous que le nom est exact ici
      alt="Logo Dynam8"
      className={className} // Cela permet de contrôler la taille via Tailwind
    />
  );
}
// --------------------------------

// --------------------------------------------------------------------------------------
// Page Principale
// --------------------------------------------------------------------------------------
export default function LandingPage() {
  // --- ROI State ---
  const [reviewsPerMonth, setReviewsPerMonth] = useState(30);
  const [minutesPerReview, setMinutesPerReview] = useState(6);
  const [hourCost, setHourCost] = useState(25);
  const monthlyFee = 20; // Basé sur le plan standard pour le calcul (plus réaliste)

  const hoursPerMonth = useMemo(() => (reviewsPerMonth * minutesPerReview) / 60, [reviewsPerMonth, minutesPerReview]);
  const monthlySaved = useMemo(() => Math.round(hoursPerMonth * hourCost), [hoursPerMonth, hourCost]);
  const annualSaved = useMemo(() => monthlySaved * 12, [monthlySaved]);
  

  // --- AJOUTER CE BLOC APRÈS LES AUTRES USEMEMO ---

  // Calcul du nombre d'avis nécessaires pour rembourser l'abonnement
  const reviewsToBreakEven = useMemo(() => {
    // Coût d'un seul avis fait à la main = (minutes / 60) * coût horaire
    const costPerSingleReview = (minutesPerReview / 60) * hourCost;

    // Sécurité anti-division par zéro
    if (costPerSingleReview <= 0) return 0;

    // Combien d'avis pour couvrir les 20€ ? On arrondit au supérieur.
    return Math.ceil(monthlyFee / costPerSingleReview);
  }, [minutesPerReview, hourCost, monthlyFee]);

// -----------------------------------------------
  // --- Contact Form ---
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "error">(null);

  // --- LE NOUVEAU CODE (VOTRE VRAIE LOGIQUE RESTAURÉE) ---

  // Ajoutez cette ligne d'état qui manquait dans ma version :
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setSent(null);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Récupération des données comme dans votre code original
    const payload = {
      name: String(formData.get("name") || ""),
      // Note: dans le nouveau design j'avais séparé nom/prenom,
      // si vous utilisez le champ unique "contact" du nouveau design, ajustez ici :
      // contact: String(formData.get("contact") || ""), 
      email: String(formData.get("email") || "non-fourni@example.com"), // J'ai pas mis de champ email dans le nouveau design contact rapide, attention !
      phone: String(formData.get("phone") || ""),
      // J'ai retiré le champ message long et website du nouveau design pour faire plus court.
      // Si votre API en a besoin absolument, il faut remettre les champs dans le JSX.
       message: "Contact depuis le formulaire simplifié", // Message par défaut
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

  // --- Scroll Spy pour navigation active (Optionnel mais sympa) ---
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      
      {/* Background Gradients - Plus subtils */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/30 via-transparent to-transparent blur-3xl" />
      </div>

      <SiteHeader />

      <main className="flex flex-col">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden px-6">
          <div className="mx-auto max-w-7xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold tracking-wide uppercase mb-8 animate-fade-in-up">
              <Zap className="size-3.5" /> Automatisation Google Business
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Votre restaurant gère la cuisine, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600">nous gérons votre réputation.</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
              Ne perdez plus vos soirées à répondre aux avis. Dynam8 automatise vos réponses, 
              anime votre page Google et fait revenir vos clients.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-8 py-4 text-base font-semibold hover:bg-slate-800 hover:scale-105 transition-all duration-200 shadow-lg shadow-slate-900/20"
              >
                Essayer gratuitement
                <ArrowRight className="size-4" />
              </a>
              <a 
                href="#roi" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-700 border border-slate-200 px-8 py-4 text-base font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                <Calculator className="size-4 text-sky-600" />
                Simuler mes économies
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 className="size-3.5 text-green-600" /></div>
                Sans engagement
              </div>
              <div className="flex items-center gap-2">
                 <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 className="size-3.5 text-green-600" /></div>
                Conforme Google
              </div>
              <div className="flex items-center gap-2">
                 <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 className="size-3.5 text-green-600" /></div>
                Support Français
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="solutions" className="py-24 bg-white border-y border-slate-100 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={MessageSquare}
                title="Réponse aux avis"
                desc="Fini le copier-coller. Une IA entraînée répond à chaque avis avec le ton de votre maison. Vous validez ou laissez faire."
                theme="sky"
              />
              <FeatureCard 
                icon={ImageIcon}
                title="Posts Hebdomadaires"
                desc="Google adore l'activité. Nous publions chaque semaine une photo (plat, ambiance) pour booster votre référencement local."
                theme="violet"
              />
              <FeatureCard 
                icon={Star}
                title="Génération d'avis"
                desc="Transformez vos clients silencieux en ambassadeurs. Envoi automatique d'un lien direct après leur visite."
                theme="emerald"
              />
            </div>
          </div>
        </section>

        {/* ROI CALCULATOR - THE SELLING TOOL */}
        <section id="roi" className="py-24 bg-slate-50 scroll-mt-20 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Combien vous coûte la gestion manuelle ?
                </h2>
                <p className="text-slate-600 mb-8">
                  Utilisez ce simulateur avec vos chiffres réels. Le temps que vous passez sur Google est du temps que vous ne passez pas en cuisine ou avec vos clients.
                </p>
                
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                  {/* Sliders */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Avis reçus par mois</label>
                        <span className="text-sm font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">{reviewsPerMonth}</span>
                      </div>
                      <input 
                        type="range" min="5" max="150" step="5"
                        value={reviewsPerMonth} onChange={(e) => setReviewsPerMonth(parseInt(e.target.value))} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Minutes pour répondre (lecture + rédaction)</label>
                        <span className="text-sm font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">{minutesPerReview} min</span>
                      </div>
                      <input 
                        type="range" min="1" max="15" 
                        value={minutesPerReview} onChange={(e) => setMinutesPerReview(parseInt(e.target.value))} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Votre taux horaire estimé (€)</label>
                        <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{hourCost} €/h</span>
                      </div>
                      <input 
                        type="range" min="15" max="100" step="5"
                        value={hourCost} onChange={(e) => setHourCost(parseInt(e.target.value))} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultat Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-blue-600 rounded-3xl transform rotate-2 opacity-20 blur-lg"></div>
                <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                  <div className="bg-slate-900 p-6 text-white text-center">
                    <p className="text-slate-300 text-sm font-medium uppercase tracking-wider">Économie potentielle</p>
                    <div className="text-5xl font-extrabold mt-2 tracking-tight">{annualSaved.toLocaleString("fr-FR")} € <span className="text-xl font-normal text-slate-400">/an</span></div>
                    <p className="text-slate-400 text-sm mt-2">Soit {hoursPerMonth} heures de travail sauvées par mois</p>
                  </div>
                  <div className="p-8 text-center space-y-6">
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-4">
                      <span className="text-slate-500">Coût mensuel actuel</span>
                      <span className="font-bold text-red-500 line-through decoration-red-500/50">{monthlySaved} €</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pb-4">
                      <span className="text-slate-500">Coût solution Dynam8</span>
                      <span className="font-bold text-green-600">~20 €</span>
                    </div>
                    

                    <div className="bg-green-50 rounded-xl p-4 border border-green-100 transition-all duration-300">
                      <p className="text-green-800 font-medium text-sm leading-relaxed">
                        <span className="flex items-center gap-2 font-bold mb-1">
                          🚀 Retour sur investissement rapide
                        </span>
                        Avec vos paramètres actuels, vous rentabilisez l'abonnement dès le{' '}
                        <strong className="text-lg bg-green-200 px-1 rounded text-green-900">
                          {reviewsToBreakEven > 0 ? `${reviewsToBreakEven}ème avis` : "..."}
                        </strong>{' '}
                        traité dans le mois.
                      </p>
                    </div>
                    
                    <a href="#contact" className="block w-full rounded-xl bg-sky-600 text-white py-3 font-bold hover:bg-sky-700 transition">
                      Démarrer l'économie
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

                  {/* TÉMOIGNAGES - SOCIAL PROOF - VERSION CORRIGÉE */}
          <section className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Ils nous ont confié leurs clés</h2>
                <p className="text-slate-600">
                  Restaurateurs et commerçants. Ils ont arrêté de gérer ça le dimanche soir.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-start">
                {/* Carte 1 : Restaurant Neuilly (Le client "Découverte/Levier") */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    <Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" />
                  </div>
                  <blockquote className="text-slate-700 font-medium flex-1 leading-relaxed">
                    “Je négligeais Google par manque de temps. C'est devenu <span className="bg-sky-50 text-sky-700 px-1 rounded font-bold">un vrai levier d'acquisition</span> et de fidélisation. Ma fiche tourne seule et m'amène des clients.”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-50 w-full">
                    <div className="size-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">👨‍🍳</div>
                    <div>
                      <div className="font-bold text-slate-900">Gérant</div>
                      <div className="text-xs text-slate-500">Restaurant – Neuilly-sur-Seine</div>
                    </div>
                  </div>
                </div>

                {/* Carte 2 : Brasserie Malakoff (Le client "Tranquillité d'esprit") */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    <Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" />
                  </div>
                  <blockquote className="text-slate-700 font-medium flex-1 leading-relaxed">
                    “Ça me rassure énormément. Je ne me prends plus la tête : <span className="bg-violet-50 text-violet-700 px-1 rounded font-bold">ma page tourne toute seule</span>. Je gagne du temps et de la visibilité sans stress.”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-50 w-full">
                    <div className="size-10 rounded-full bg-violet-100 flex items-center justify-center text-xl">👩‍🍳</div>
                    <div>
                      <div className="font-bold text-slate-900">Gérante</div>
                      <div className="text-xs text-slate-500">Brasserie – Malakoff</div>
                    </div>
                  </div>
                </div>

                {/* Carte 3 : Garage Montpellier (Le client "Avis négatifs/WhatsApp") */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    <Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" />
                  </div>
                  <blockquote className="text-slate-700 font-medium flex-1 leading-relaxed">
                    “La gestion des avis négatifs est bien plus simple. <span className="bg-emerald-50 text-emerald-700 px-1 rounded font-bold">L'alerte WhatsApp immédiate</span> en cas de mauvaise note me permet de désamorcer les problèmes rapidement.”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-50 w-full">
                    <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🔧</div>
                    <div>
                      <div className="font-bold text-slate-900">Propriétaire</div>
                      <div className="text-xs text-slate-500">Garage – Montpellier</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* PRICING */}
        <section id="tarifs" className="py-24 bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Tarifs simples et transparents</h2>
              <p className="text-slate-600">Pas de frais d'installation cachés. Tout est inclus.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard 
                title="Essentiel" 
                price="10" 
                features={["Réponses aux avis illimitées", "Détection multilingue", "Support Email"]}
              />
              <PricingCard 
                title="Standard" 
                price="20" 
                isPopular 
                features={["Réponses aux avis", "1 Post photo / semaine", "Calendrier éditorial", "Support Prioritaire"]}
              />
              <PricingCard 
                title="Complet" 
                price="30" 
                features={["Tout du pack Standard", "Campagnes SMS/Email avis", "Rapport de performance", "Conseiller dédié"]}
              />
            </div>
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section id="contact" className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">On commence quand ?</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
              Laissez-nous vos coordonnées. On vous rappelle pour configurer votre compte en 10 minutes. 
              Le premier mois est "satisfait ou remboursé".
            </p>
            
            <div className="bg-white rounded-2xl p-2 sm:p-8 max-w-lg mx-auto text-slate-900 shadow-2xl">
               {sent === "ok" ? (
                 <div className="py-12 text-center animate-in fade-in zoom-in">
                   <div className="mx-auto size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 className="size-8" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900">Message reçu !</h3>
                   <p className="text-slate-600 mt-2">On vous rappelle très vite.</p>
                 </div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left p-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom du restaurant</label>
                    <input required type="text" name="name" className="w-full rounded-lg border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="Chez Mario" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Votre Nom</label>
                      <input required type="text" name="contact" className="w-full rounded-lg border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="Mario" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                      <input required type="tel" name="phone" className="w-full rounded-lg border-slate-300 focus:ring-sky-500 focus:border-sky-500" placeholder="06..." />
                    </div>
                  </div>
                  <button disabled={sending} type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-4">
                    {sending ? "Envoi..." : "Me faire rappeler"}
                  </button>
                </form>
               )}
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
              <a href="mailto:contact@dynam8.fr" className="flex items-center gap-2 hover:text-white transition"><Mail className="size-4"/> contact@dynam8.fr</a>
              <a href="tel:+33771794665" className="flex items-center gap-2 hover:text-white transition"><Phone className="size-4"/> 07 71 79 46 65</a>
            </div>
          </div>
        </section>

      </main>

      {/* Mobile Sticky Action Bar (Sales Mode) */}
      <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
        <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-2xl shadow-2xl flex items-center p-1.5 border border-slate-800">
          <a href="#roi" className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl active:bg-white/10">
             <Calculator className="size-5 mb-0.5" />
             <span className="text-[10px] font-medium">Calculer</span>
          </a>
          <div className="w-px h-8 bg-white/20 mx-1"></div>
          <a href="#contact" className="flex-[2] bg-sky-600 rounded-xl flex items-center justify-center py-2.5 font-bold text-sm shadow-lg">
            Essai Gratuit <ArrowRight className="size-4 ml-1" />
          </a>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-slate-50 py-8 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Dynam8. Fait avec ❤️ pour les restaurateurs.</p>
      </footer>
    </div>
  );
}

// --------------------------------------------------------------------------------------
// Sub-Components
// --------------------------------------------------------------------------------------

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-14 w-auto" />
          
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#solutions" className="hover:text-sky-600 transition">Solutions</a>
          <a href="#roi" className="hover:text-sky-600 transition">Rentabilité</a>
          <a href="#tarifs" className="hover:text-sky-600 transition">Tarifs</a>
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition">
            Contact
          </a>
        </div>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 shadow-xl flex flex-col gap-4 text-lg font-medium md:hidden animate-in slide-in-from-top-5">
          <a href="#solutions" onClick={() => setMobileOpen(false)} className="p-2 text-slate-600">Solutions</a>
          <a href="#roi" onClick={() => setMobileOpen(false)} className="p-2 text-slate-600">Rentabilité</a>
          <a href="#tarifs" onClick={() => setMobileOpen(false)} className="p-2 text-slate-600">Tarifs</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="p-2 text-sky-600 font-bold">Prendre RDV</a>
        </div>
      )}
    </header>
  );
}

function FeatureCard({ icon: Icon, title, desc, theme }: { icon: any, title: string, desc: string, theme: "sky" | "violet" | "emerald" }) {
  const colors = {
    sky: "bg-sky-50 text-sky-700 border-sky-100 group-hover:border-sky-300",
    violet: "bg-violet-50 text-violet-700 border-violet-100 group-hover:border-violet-300",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:border-emerald-300",
  };

  return (
    <div className={`group p-6 rounded-2xl border bg-white transition duration-300 hover:shadow-md ${colors[theme].split(" ").pop()}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[theme].split(" ").slice(0, 2).join(" ")}`}>
        <Icon className="size-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, features, isPopular }: { title: string, price: string, features: string[], isPopular?: boolean }) {
  return (
    <div className={`relative rounded-2xl p-8 bg-white border ${isPopular ? "border-sky-600 ring-1 ring-sky-600 shadow-xl scale-105 z-10" : "border-slate-200 shadow-sm"}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Recommandé
        </div>
      )}
      <h3 className={`text-lg font-semibold ${isPopular ? "text-sky-600" : "text-slate-900"}`}>{title}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-extrabold text-slate-900">{price}€</span>
        <span className="text-slate-500 font-medium"> /mois</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
            <CheckCircle2 className="size-5 text-green-500 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <a href="#contact" className={`block w-full py-3 rounded-xl text-center font-bold transition ${isPopular ? "bg-sky-600 text-white hover:bg-sky-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}>
        Choisir
      </a>
    </div>
  );
}