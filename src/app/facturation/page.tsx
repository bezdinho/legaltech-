import Link from "next/link";
import {
  Plus,
  Download,
  Filter,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Receipt,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockDossiers, mockClients } from "@/lib/mock-data";
import type { StatutFacture } from "@/types";

const statutConfig: Record<
  StatutFacture,
  { label: string; dot: string; couleur: string; icone: React.ElementType }
> = {
  payee: {
    label: "Payée",
    dot: "bg-emerald-500",
    couleur: "text-emerald-600 dark:text-emerald-400",
    icone: CheckCircle2,
  },
  envoyee: {
    label: "Envoyée",
    dot: "bg-amber-500",
    couleur: "text-amber-600 dark:text-amber-400",
    icone: Clock,
  },
  en_retard: {
    label: "En retard",
    dot: "bg-destructive",
    couleur: "text-destructive",
    icone: AlertCircle,
  },
  brouillon: {
    label: "Brouillon",
    dot: "bg-muted-foreground/40",
    couleur: "text-muted-foreground",
    icone: Receipt,
  },
};

export default function PageFacturation() {
  const allFactures = mockDossiers.flatMap((d) => d.factures);

  const totalPayees = allFactures
    .filter((f) => f.statut === "payee")
    .reduce((s, f) => s + f.totalTTC, 0);
  const totalEnvoyees = allFactures
    .filter((f) => f.statut === "envoyee")
    .reduce((s, f) => s + f.totalTTC, 0);
  const totalEnRetard = allFactures
    .filter((f) => f.statut === "en_retard")
    .reduce((s, f) => s + f.totalTTC, 0);
  const nbEnAttente = allFactures.filter(
    (f) => f.statut === "envoyee" || f.statut === "en_retard"
  ).length;

  const kpis = [
    {
      label: "CA encaissé",
      value: totalPayees.toLocaleString("fr-MA"),
      sub: "MAD encaissés",
      icone: TrendingUp,
      accentColor: "oklch(0.55 0.17 145)",
      delay: "0.05s",
    },
    {
      label: "Encaissé",
      value: totalPayees.toLocaleString("fr-MA"),
      sub: "MAD reçus",
      icone: CheckCircle2,
      accentColor: "oklch(0.58 0.19 255)",
      delay: "0.1s",
    },
    {
      label: "Envoyées",
      value: totalEnvoyees.toLocaleString("fr-MA"),
      sub: "MAD à recevoir",
      icone: Clock,
      accentColor: "oklch(0.75 0.16 70)",
      delay: "0.15s",
    },
    {
      label: "En retard",
      value: totalEnRetard.toLocaleString("fr-MA"),
      sub: "MAD en souffrance",
      icone: AlertCircle,
      accentColor: "oklch(0.577 0.245 27)",
      delay: "0.2s",
    },
  ];

  return (
    <div className="space-y-7 max-w-7xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Facturation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Hero ────────────────────────────────────────────────────────────────── */}
      <div
        className="animate-fade-scale flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        style={{ animationDelay: "0s" }}
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
            Honoraires & paiements
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Facturation
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Suivez vos honoraires, émettez et gérez vos factures.
          </p>
        </div>
        <Button
          className="self-start sm:self-auto shrink-0"
          render={<Link href="/facturation/nouvelle" />}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle facture
        </Button>
      </div>

      {/* ─── KPI cards avec accent strip ─────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icone = kpi.icone;
          return (
            <div
              key={kpi.label}
              className="animate-slide-up group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ animationDelay: kpi.delay }}
            >
              <div
                className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
                style={{ background: kpi.accentColor }}
              />
              <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
                <Icone className="h-24 w-24" />
              </div>
              <div className="pl-3 relative">
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  {kpi.label}
                </p>
                <p
                  className="mt-2 text-2xl font-semibold tracking-tight leading-none"
                  style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  {kpi.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Liste des factures ───────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.25s" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Toutes les factures
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {allFactures.length} facture{allFactures.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-3.5 w-3.5" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-3.5 w-3.5" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border/40">
          {allFactures.map((facture, i) => {
            const client = mockClients.find((c) => c.id === facture.clientId);
            const statut = statutConfig[facture.statut];
            const nomClient = client
              ? client.prenom
                ? `${client.prenom} ${client.nom}`
                : client.nom
              : "—";
            const initiale = client
              ? (client.prenom || client.nom).charAt(0)
              : "?";

            return (
              <div
                key={facture.id}
                className="animate-slide-right group flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors cursor-pointer"
                style={{ animationDelay: `${0.28 + i * 0.04}s` }}
              >
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs font-medium">
                    {initiale}
                    {client?.nom[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {nomClient}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {facture.numero}
                        {" · "}Émise le{" "}
                        {new Date(facture.dateEmission).toLocaleDateString("fr-FR")}
                        {" · "}Échéance :{" "}
                        {new Date(facture.dateEcheance).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="flex items-center gap-1.5 text-xs font-medium">
                        <span className={`h-1.5 w-1.5 rounded-full ${statut.dot}`} />
                        <span className={statut.couleur}>{statut.label}</span>
                      </span>
                      <p
                        className="text-sm font-semibold"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {facture.totalTTC.toLocaleString("fr-MA")} MAD
                      </p>
                    </div>
                  </div>
                </div>

                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-t border-border/40">
          <p className="text-xs text-muted-foreground">
            Total factures :{" "}
            <span
              className="font-semibold text-foreground"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {allFactures.length}
            </span>
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Receipt className="h-3.5 w-3.5" />
            <span>{nbEnAttente} facture{nbEnAttente > 1 ? "s" : ""} en attente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
