import Link from "next/link";
import { Star, MapPin, Phone, Mail, Scale, Award } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockDossiers } from "@/lib/mock-data";

const avocat = {
  prenom: "Rachid",
  nom: "Amrani",
  email: "r.amrani@cabinet-amrani.ma",
  telephone: "+212 522 456 789",
  barreau: "Casablanca",
  numeroInscription: "BAR-CASA-2015-0847",
  specialites: ["Droit commercial", "Droit des affaires", "Droit civil"],
  biographie:
    "Maître Rachid Amrani est avocat au Barreau de Casablanca depuis 2015. Spécialisé en droit des affaires et droit commercial, il accompagne entreprises et particuliers dans leurs litiges et transactions juridiques complexes.",
  notesMoyenne: 4.8,
  nombreAvis: 47,
  tarifHoraire: 1200,
};

export default function PageProfil() {
  const allFactures = mockDossiers.flatMap((d) => d.factures);

  const dossiersClos = mockDossiers.filter((d) => d.statut === "cloture").length;
  const dossierActifs = mockDossiers.filter((d) => d.statut === "en_cours").length;
  const totalHonoraires = allFactures
    .filter((f) => f.statut === "payee")
    .reduce((s, f) => s + f.totalTTC, 0);

  const stats = [
    { label: "Dossiers actifs", value: dossierActifs, sub: "affaires en cours", delay: "0.25s" },
    { label: "Dossiers clôturés", value: dossiersClos, sub: "affaires résolues", delay: "0.3s" },
    {
      label: "Honoraires encaissés",
      value: `${totalHonoraires.toLocaleString("fr-MA")}`,
      sub: "MAD encaissés",
      delay: "0.35s",
    },
    {
      label: "Tarif horaire",
      value: `${avocat.tarifHoraire.toLocaleString("fr-MA")}`,
      sub: "MAD / heure",
      delay: "0.4s",
    },
  ];

  return (
    <div className="space-y-7 max-w-3xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mon profil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Hero ────────────────────────────────────────────────────────────────── */}
      <div className="animate-fade-scale" style={{ animationDelay: "0s" }}>
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
          Fiche professionnelle
        </p>
        <h1
          className="text-3xl font-semibold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Mon profil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Votre identité professionnelle et vos statistiques d&apos;activité.
        </p>
      </div>

      {/* ─── Carte identité ───────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <Avatar className="h-20 w-20 rounded-2xl flex-shrink-0">
              <AvatarFallback className="text-2xl rounded-2xl font-medium">
                {avocat.prenom[0]}
                {avocat.nom[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    className="text-2xl font-semibold leading-tight"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Maître {avocat.prenom} {avocat.nom}
                  </h2>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(avocat.notesMoyenne)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1.5">
                      {avocat.notesMoyenne} ({avocat.nombreAvis} avis)
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  Modifier
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {[
                  { icone: MapPin, label: `Barreau de ${avocat.barreau}` },
                  { icone: Scale, label: avocat.numeroInscription },
                  { icone: Mail, label: avocat.email },
                  { icone: Phone, label: avocat.telephone },
                ].map(({ icone: Icone, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Icone className="h-3.5 w-3.5 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {avocat.specialites.map((spec) => (
                  <Badge key={spec} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-border/40">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {avocat.biographie}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Statistiques ────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="animate-slide-up rounded-xl border border-border/60 bg-card p-5 shadow-sm"
            style={{ animationDelay: s.delay }}
          >
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
            <p
              className="mt-2 text-2xl font-semibold tracking-tight leading-none"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {s.value}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ─── Distinctions ────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.45s" }}
      >
        <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
          <Award className="h-4 w-4 text-muted-foreground" />
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Distinctions & certifications
          </h2>
        </div>
        <div className="divide-y divide-border/40">
          {[
            { titre: "Membre du Barreau de Casablanca", annee: "2015" },
            { titre: "Certifié en Droit des Affaires International", annee: "2018" },
            { titre: "Médiateur agréé — Centre de Médiation de Casablanca", annee: "2020" },
          ].map((item) => (
            <div
              key={item.titre}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <p className="text-sm">{item.titre}</p>
              <span
                className="text-xs font-medium text-muted-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                {item.annee}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
