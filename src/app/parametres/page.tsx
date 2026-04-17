import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const avocat = {
  prenom: "Rachid",
  nom: "Amrani",
  email: "r.amrani@cabinet-amrani.ma",
  telephone: "+212 522 456 789",
  barreau: "Casablanca",
  numeroInscription: "BAR-CASA-2015-0847",
  tarifHoraire: 1200,
};

export default function PageParametres() {
  const prefsNotifications = [
    { label: "Rappel d'audience (48h avant)", actif: true },
    { label: "Nouveau message reçu", actif: true },
    { label: "Facture en retard de paiement", actif: true },
    { label: "Nouveau document déposé", actif: false },
    { label: "Résumé hebdomadaire par email", actif: false },
  ];

  return (
    <div className="space-y-7 max-w-2xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Paramètres</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Hero ────────────────────────────────────────────────────────────────── */}
      <div className="animate-fade-scale" style={{ animationDelay: "0s" }}>
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
          Configuration du compte
        </p>
        <h1
          className="text-3xl font-semibold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez vos préférences et les informations de votre cabinet.
        </p>
      </div>

      {/* ─── Informations du cabinet ──────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Informations du cabinet
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ces informations apparaissent sur vos factures et correspondances.
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Prénom
              </label>
              <Input defaultValue={avocat.prenom} className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Nom
              </label>
              <Input defaultValue={avocat.nom} className="text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email professionnel
            </label>
            <Input defaultValue={avocat.email} type="email" className="text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Téléphone
            </label>
            <Input defaultValue={avocat.telephone} className="text-sm font-mono" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Barreau
              </label>
              <Input defaultValue={avocat.barreau} className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                N° d&apos;inscription
              </label>
              <Input defaultValue={avocat.numeroInscription} className="text-sm font-mono" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tarif horaire (MAD)
            </label>
            <Input defaultValue={avocat.tarifHoraire} type="number" className="text-sm font-mono" />
          </div>
          <div className="pt-1">
            <Button>Enregistrer les modifications</Button>
          </div>
        </div>
      </div>

      {/* ─── Notifications ───────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Notifications
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configurez vos alertes et rappels automatiques.
          </p>
        </div>
        <div className="divide-y divide-border/40">
          {prefsNotifications.map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <span className="text-sm">{pref.label}</span>
              <button
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  pref.actif ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    pref.actif ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Sécurité ────────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Sécurité
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez votre mot de passe et l&apos;accès à votre compte.
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Mot de passe actuel
            </label>
            <Input type="password" placeholder="••••••••" className="text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Nouveau mot de passe
            </label>
            <Input type="password" placeholder="••••••••" className="text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Confirmer le nouveau mot de passe
            </label>
            <Input type="password" placeholder="••••••••" className="text-sm" />
          </div>
          <div className="pt-1">
            <Button variant="outline">Mettre à jour le mot de passe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
