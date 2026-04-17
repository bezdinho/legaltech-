import Link from "next/link";
import {
  Folder,
  Calendar,
  AlertCircle,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Scale,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

  const dossiersActifs = mockDossiers.filter(
    (d) => d.statut === "en_cours" || d.statut === "en_attente"
  ).length;
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

  const dossiersRecents = mockDossiers.slice(0, 5);
  const prochainAudiences = allAudiences
    .filter((a) => a.statut === "programmee" && a.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  const facturesRecentes = allFactures.slice(0, 4);
  const prochainAudience = prochainAudiences[0];

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
      <div className="grid gap-5 lg:grid-cols-3">

        {/* Dossiers récents */}
        <div
          className="animate-slide-up lg:col-span-2 rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Dossiers récents
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {dossiersActifs} affaires actives
              </p>
            </div>
            <Link
              href="/dossiers"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-70 transition-opacity"
            >
              Voir tout
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-border/40">
            {dossiersRecents.map((dossier, i) => {
              const cfg = statutDossier[dossier.statut] ?? statutDossier.en_cours;

              return (
                <Link
                  key={dossier.id}
                  href={`/dossiers/${dossier.id}`}
                  className="animate-slide-right group flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors"
                  style={{ animationDelay: `${0.28 + i * 0.06}s` }}
                >
                  <div className="flex-shrink-0">
                    {dossier.statut === "cloture" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug truncate group-hover:text-primary transition-colors">
                      {dossier.description.split(".")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {dossier.numero}
                      {" · "}
                      <span>
                        {dossier.client.prenom
                          ? `${dossier.client.prenom} ${dossier.client.nom}`
                          : dossier.client.nom}
                      </span>
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {cfg.label}
                    </span>
                  </div>

                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Prochaine audience */}
        <div
          className="animate-slide-up flex flex-col gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          {prochainAudience && (
            <div className="rounded-xl border border-primary/20 bg-primary/[0.03] dark:bg-primary/5 overflow-hidden shadow-sm">
              <div className="px-5 pt-5 pb-4 border-b border-primary/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/70">
                    Prochaine audience
                  </p>
                  <Link
                    href="/calendrier"
                    className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    Calendrier →
                  </Link>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 px-3 py-2 text-center">
                    <p className="text-xs font-medium text-primary/70 uppercase tracking-wide leading-none">
                      {new Date(prochainAudience.date).toLocaleDateString("fr-FR", { month: "short" })}
                    </p>
                    <p
                      className="text-2xl font-semibold text-primary leading-tight mt-0.5"
                      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                    >
                      {new Date(prochainAudience.date).getDate()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">
                      {prochainAudience.type === "audience"
                        ? "Audience"
                        : prochainAudience.type === "delibere"
                        ? "Délibéré"
                        : "Prononcé"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {prochainAudience.heure}
                    </p>
                    {prochainAudience.salle && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {prochainAudience.salle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-primary/[0.02]">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {prochainAudience.tribunal}
                </p>
                {prochainAudience.notes && (
                  <p className="text-xs text-primary/60 mt-1.5 italic">
                    {prochainAudience.notes}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Audiences suivantes */}
          <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b border-border/40">
              <h2
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                À venir
              </h2>
            </div>
            <div className="divide-y divide-border/40">
              {prochainAudiences.slice(1).map((audience, i) => {
                const dossier = mockDossiers.find((d) =>
                  d.audiences.some((a) => a.id === audience.id)
                );
                return (
                  <div
                    key={audience.id}
                    className="animate-slide-up flex items-start gap-3 px-5 py-3"
                    style={{ animationDelay: `${0.35 + i * 0.07}s` }}
                  >
                    <div className="flex-shrink-0 mt-0.5 w-8 text-center">
                      <p
                        className="text-sm font-semibold text-primary leading-none"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {new Date(audience.date).getDate()}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase mt-0.5">
                        {new Date(audience.date).toLocaleDateString("fr-FR", { month: "short" })}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium leading-snug truncate">
                        {audience.type === "audience"
                          ? "Audience"
                          : audience.type === "delibere"
                          ? "Délibéré"
                          : "Prononcé"}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {audience.heure} · {dossier?.numero}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
