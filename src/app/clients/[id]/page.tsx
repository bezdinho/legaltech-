import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Phone,
  Calendar,
  FolderOpen,
  Receipt,
  Clock,
  ChevronRight,
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
import { mockClients, mockDossiers } from "@/lib/mock-data";
import type { StatutDossier, TypeDossier } from "@/types";

const typeDossierLabels: Record<TypeDossier, string> = {
  civil: "Droit civil",
  penal: "Droit pénal",
  commercial: "Droit commercial",
  famille: "Droit de la famille",
  administratif: "Droit administratif",
};

const statutDossierConfig: Record<StatutDossier, { label: string; dot: string; badge: string }> = {
  en_cours: {
    label: "En cours",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  en_attente: {
    label: "En attente",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  cloture: {
    label: "Clôturé",
    dot: "bg-emerald-500",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
};

const factureStatutConfig = {
  payee: {
    label: "Payée",
    dot: "bg-emerald-500",
    couleur: "text-emerald-600 dark:text-emerald-400",
  },
  envoyee: {
    label: "Envoyée",
    dot: "bg-amber-500",
    couleur: "text-amber-600 dark:text-amber-400",
  },
  en_retard: {
    label: "En retard",
    dot: "bg-destructive",
    couleur: "text-destructive",
  },
  brouillon: {
    label: "Brouillon",
    dot: "bg-muted-foreground/40",
    couleur: "text-muted-foreground",
  },
};

export default async function PageFicheClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = mockClients.find((c) => c.id === id);
  if (!client) notFound();

  const dossiers = mockDossiers.filter((d) => d.clientId === client.id);
  const factures = dossiers.flatMap((d) => d.factures);

  const totalFacture = factures.reduce((s, f) => s + f.totalTTC, 0);
  const totalEncaisse = factures
    .filter((f) => f.statut === "payee")
    .reduce((s, f) => s + f.totalTTC, 0);
  const dossierActifs = dossiers.filter(
    (d) => d.statut === "en_cours" || d.statut === "en_attente"
  ).length;

  const nomAffiche = client.prenom ? `${client.prenom} ${client.nom}` : client.nom;
  const initiale = (client.prenom || client.nom).charAt(0);

  const stats = [
    { label: "Dossiers actifs", value: dossierActifs, sub: "en cours", delay: "0.2s" },
    { label: "Total dossiers", value: dossiers.length, sub: "affaires totales", delay: "0.25s" },
    {
      label: "Total facturé",
      value: totalFacture.toLocaleString("fr-MA"),
      sub: "MAD facturés",
      delay: "0.3s",
    },
    {
      label: "Encaissé",
      value: totalEncaisse.toLocaleString("fr-MA"),
      sub: "MAD reçus",
      delay: "0.35s",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* ─── Breadcrumb ───────────────────────────────────────────────────────── */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/clients" />}>
              Clients
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{nomAffiche}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── En-tête client ───────────────────────────────────────────────────── */}
      <div
        className="animate-fade-scale rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0s" }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-2xl flex-shrink-0">
                <AvatarFallback className="text-xl rounded-2xl font-medium">
                  {initiale}
                  {client.nom[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1
                    className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {nomAffiche}
                  </h1>
                  <span className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {client.type === "physique" ? "Personne physique" : "Personne morale"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  {[
                    { icone: Mail, label: client.email },
                    { icone: Phone, label: client.telephone },
                    {
                      icone: Calendar,
                      label: `Client depuis ${new Date(client.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`,
                    },
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
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              Modifier la fiche
            </Button>
          </div>
        </div>
      </div>

      {/* ─── KPIs ─────────────────────────────────────────────────────────────── */}
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

      {/* ─── Contenu principal ────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Dossiers */}
        <div
          className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <h2
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Dossiers ({dossiers.length})
              </h2>
            </div>
            <Link
              href="/dossiers"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:opacity-70 transition-opacity"
            >
              Voir tout
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {dossiers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-7 w-7 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Aucun dossier.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {dossiers.map((dossier) => {
                const cfg = statutDossierConfig[dossier.statut];
                return (
                  <Link
                    key={dossier.id}
                    href={`/dossiers/${dossier.id}`}
                    className="group flex items-start justify-between gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug truncate group-hover:text-primary transition-colors">
                        {dossier.description.split(".")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {dossier.numero}
                        {" · "}
                        {typeDossierLabels[dossier.type]}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Factures */}
        <div
          className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <h2
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Factures ({factures.length})
            </h2>
          </div>
          {factures.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Receipt className="h-7 w-7 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Aucune facture.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {factures.map((facture) => {
                const cfg = factureStatutConfig[facture.statut];
                return (
                  <div
                    key={facture.id}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {facture.numero}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(facture.dateEmission).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 text-xs font-medium ${cfg.couleur}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {facture.totalTTC.toLocaleString("fr-MA")} MAD
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// suppress unused warning
void Clock;
