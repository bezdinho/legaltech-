import Link from "next/link";
import {
  Folder,
  Calendar,
  AlertCircle,
  Users,
  ArrowUpRight,
  ChevronRight,
  Scale,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  mockDossiers,
  mockClients,
} from "@/lib/mock-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statutDossier: Record<string, { label: string; dot: string }> = {
  en_cours: { label: "En cours", dot: "bg-blue-500" },
  en_attente: { label: "En attente", dot: "bg-amber-500" },
  cloture: { label: "Clôturé", dot: "bg-emerald-500" },
};

const factureStatut: Record<
  string,
  { label: string; couleur: string }
> = {
  payee: { label: "Payée", couleur: "text-emerald-600 dark:text-emerald-400" },
  envoyee: { label: "Envoyée", couleur: "text-amber-600 dark:text-amber-400" },
  en_retard: { label: "En retard", couleur: "text-red-600 dark:text-red-400" },
  brouillon: { label: "Brouillon", couleur: "text-muted-foreground" },
};

const statutBadgeClass: Record<string, string> = {
  en_cours: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
  en_attente: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
  cloture: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
};

const typeDossierLabels: Record<string, string> = {
  civil: "Civil",
  penal: "Pénal",
  commercial: "Commercial",
  famille: "Famille",
  administratif: "Administratif",
};

function dateLocale() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Composants internes ──────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  trend,
  icone: Icone,
  accentColor,
  delay,
}: {
  label: string;
  value: string | number;
  sub: string;
  trend?: string;
  icone: React.ElementType;
  accentColor: string;
  delay: string;
}) {
  return (
    <div
      className="animate-slide-up group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: delay }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
        style={{ background: accentColor }}
      />
      <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
        <Icone className="h-24 w-24" />
      </div>
      <div className="pl-3 relative">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p
          className="mt-2 text-4xl font-semibold tracking-tight leading-none"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {value}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{sub}</p>
          {trend && (
            <span className="ml-auto flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageTableauDeBord() {
  const allAudiences = mockDossiers.flatMap((d) => d.audiences);
  const allFactures = mockDossiers.flatMap((d) => d.factures);

  const dossiersEnCours = mockDossiers.filter(
    (d) => d.statut === "en_cours"
  ).length;
  const today = new Date().toISOString().split("T")[0];
  const weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + 7);
  const weekEndStr = weekEnd.toISOString().split("T")[0];

  const audiencesSemaine = allAudiences.filter(
    (a) => a.statut === "programmee" && a.date >= today && a.date <= weekEndStr
  ).length;

  const nbFacturesImpayes = allFactures.filter(
    (f) => f.statut !== "payee"
  ).length;

  const clientsActifs = mockClients.filter((c) =>
    mockDossiers.some((d) => d.clientId === c.id && d.statut === "en_cours")
  ).length;

  const caRecent = allFactures
    .filter((f) => f.statut === "payee")
    .reduce((s, f) => s + f.totalTTC, 0);

  const dossiersRecents5 = [...mockDossiers]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const audiencesAujourdHui = mockDossiers.flatMap((d) =>
    d.audiences
      .filter((a) => a.date === today)
      .map((a) => ({ audience: a, dossier: d }))
  );

  const facturesRecentes = allFactures.slice(0, 4);

  const kpis = [
    {
      label: "Dossiers en cours",
      value: dossiersEnCours,
      sub: `sur ${mockDossiers.length} dossiers au total`,
      icone: Folder,
      accentColor: "#3b82f6",
      delay: "0.05s",
    },
    {
      label: "Audiences cette semaine",
      value: audiencesSemaine,
      sub: "audiences programmées",
      icone: Calendar,
      accentColor: "#f97316",
      delay: "0.1s",
    },
    {
      label: "Factures impayées",
      value: nbFacturesImpayes,
      sub: "à encaisser",
      icone: AlertCircle,
      accentColor: "#ef4444",
      delay: "0.15s",
    },
    {
      label: "Clients actifs",
      value: clientsActifs,
      sub: "clients avec dossier en cours",
      icone: Users,
      accentColor: "#22c55e",
      delay: "0.2s",
    },
  ];

  return (
    <div className="space-y-7 max-w-7xl">

      {/* ─── Hero row ──────────────────────────────────────────────────────────── */}
      <div
        className="animate-fade-scale flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        style={{ animationDelay: "0s" }}
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
            Tableau de bord
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Bonjour, Me. Rachid Amrani
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Voici un résumé de votre activité du jour.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-2.5 shadow-sm self-start sm:self-auto">
          <Scale className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-sm capitalize text-muted-foreground">
            {dateLocale()}
          </p>
        </div>
      </div>

      {/* ─── KPI grid ──────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* ─── Contenu principal ─────────────────────────────────────────────────── */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">

        {/* Dossiers récents */}
        <Card
          className="animate-slide-up gap-0 py-0"
          style={{ animationDelay: "0.25s" }}
        >
          <CardHeader className="border-b border-border/40 flex-row items-center justify-between">
            <CardTitle
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Dossiers récents
            </CardTitle>
            <Link
              href="/dossiers"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-70 transition-opacity"
            >
              Voir tout
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border/40">
            {dossiersRecents5.map((dossier, i) => (
              <Link
                key={dossier.id}
                href={`/dossiers/${dossier.id}`}
                className="animate-slide-right group flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors"
                style={{ animationDelay: `${0.28 + i * 0.06}s` }}
              >
                <Badge className={statutBadgeClass[dossier.statut]}>
                  {statutDossier[dossier.statut]?.label}
                </Badge>
                <span className="min-w-0 flex-1 text-sm truncate">
                  {dossier.client.prenom
                    ? `${dossier.client.prenom} ${dossier.client.nom}`
                    : dossier.client.nom}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {typeDossierLabels[dossier.type]}
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Audiences aujourd'hui */}
        <Card
          className="animate-slide-up gap-0 py-0"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="border-b border-border/40 flex-row items-center justify-between">
            <CardTitle
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Audiences aujourd&apos;hui
            </CardTitle>
            <Link
              href="/calendrier"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-70 transition-opacity"
            >
              Calendrier
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {audiencesAujourdHui.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                Aucune audience aujourd&apos;hui
              </p>
            ) : (
              <div className="divide-y divide-border/40">
                {audiencesAujourdHui.map(({ audience, dossier }, i) => (
                  <Link
                    key={audience.id}
                    href={`/dossiers/${dossier.id}`}
                    className="animate-slide-right group flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors"
                    style={{ animationDelay: `${0.33 + i * 0.05}s` }}
                  >
                    <span
                      className="shrink-0 w-12 text-sm font-semibold text-primary"
                      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                    >
                      {audience.heure}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {dossier.numero}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {audience.tribunal} · {dossier.client.prenom
                          ? `${dossier.client.prenom} ${dossier.client.nom}`
                          : dossier.client.nom}
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ─── Facturation récente ────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.35s" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Facturation récente
            </h2>
          </div>
          <Link
            href="/facturation"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-70 transition-opacity"
          >
            Voir tout
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-border/40">
          {facturesRecentes.map((facture, i) => {
            const client = mockClients.find((c) => c.id === facture.clientId);
            const cfg = factureStatut[facture.statut] ?? factureStatut.envoyee;

            return (
              <div
                key={facture.id}
                className="animate-slide-up flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${0.38 + i * 0.05}s` }}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-[11px] font-medium bg-muted">
                    {client?.prenom ? client.prenom[0] : client?.nom[0]}
                    {client?.nom[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {client?.prenom
                      ? `${client.prenom} ${client.nom}`
                      : client?.nom}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {facture.numero} · {new Date(facture.dateEmission).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p
                    className="text-sm font-semibold tracking-tight"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {facture.totalTTC.toLocaleString("fr-MA")} MAD
                  </p>
                  <p className={`text-[11px] font-medium mt-0.5 ${cfg.couleur}`}>
                    {cfg.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-t border-border/40">
          <p className="text-xs text-muted-foreground">
            CA total encaissé :{" "}
            <span
              className="font-semibold text-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {caRecent.toLocaleString("fr-MA")} MAD
            </span>
          </p>
          <Link
            href="/facturation/nouvelle"
            className="text-xs font-medium text-primary hover:opacity-70 transition-opacity"
          >
            + Nouvelle facture
          </Link>
        </div>
      </div>
    </div>
  );
}
