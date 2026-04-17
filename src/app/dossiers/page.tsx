import {
  FolderOpen,
  Clock,
  CheckCircle2,
  PauseCircle,
  Plus,
  Filter,
  ChevronRight,
} from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockDossiers, mockClients } from "@/lib/mock-data";
import type { StatutDossier, TypeDossier } from "@/types";

const statutConfig: Record<
  StatutDossier,
  { label: string; dot: string; badge: string; icone: React.ElementType }
> = {
  en_cours: {
    label: "En cours",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icone: Clock,
  },
  en_attente: {
    label: "En attente",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icone: PauseCircle,
  },
  cloture: {
    label: "Clôturé",
    dot: "bg-emerald-500",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icone: CheckCircle2,
  },
};

const typeDossierLabels: Record<TypeDossier, string> = {
  civil: "Droit civil",
  penal: "Droit pénal",
  commercial: "Droit commercial",
  famille: "Droit de la famille",
  administratif: "Droit administratif",
};

export default function PageDossiers() {
  const totaux = {
    total: mockDossiers.length,
    en_cours: mockDossiers.filter((d) => d.statut === "en_cours").length,
    en_attente: mockDossiers.filter((d) => d.statut === "en_attente").length,
    cloture: mockDossiers.filter((d) => d.statut === "cloture").length,
  };

  const stats = [
    { label: "Total dossiers", value: totaux.total, sub: "dans le cabinet", delay: "0.05s" },
    { label: "En cours", value: totaux.en_cours, sub: "affaires actives", delay: "0.1s" },
    { label: "En attente", value: totaux.en_attente, sub: "en suspens", delay: "0.15s" },
    { label: "Clôturés", value: totaux.cloture, sub: "dossiers terminés", delay: "0.2s" },
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
            <BreadcrumbPage>Dossiers</BreadcrumbPage>
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
            Gestion des affaires
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Dossiers juridiques
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez l&apos;ensemble de vos affaires en cours et archivées.
          </p>
        </div>
        <Button className="self-start sm:self-auto shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau dossier
        </Button>
      </div>

      {/* ─── Mini stats ──────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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
              className="mt-2 text-4xl font-semibold tracking-tight leading-none"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {s.value}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ─── Liste des dossiers ───────────────────────────────────────────────────── */}
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
              Tous les dossiers
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {totaux.total} dossier{totaux.total > 1 ? "s" : ""} au total
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filtrer
          </Button>
        </div>

        <div className="divide-y divide-border/40">
          {mockDossiers.map((dossier, i) => {
            const client = mockClients.find((c) => c.id === dossier.clientId);
            const statut = statutConfig[dossier.statut];

            return (
              <Link
                key={dossier.id}
                href={`/dossiers/${dossier.id}`}
                className="animate-slide-right group flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
                style={{ animationDelay: `${0.28 + i * 0.04}s` }}
              >
                <div className="flex-shrink-0">
                  {dossier.statut === "cloture" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground/60" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug truncate group-hover:text-primary transition-colors">
                        {dossier.description.split(".")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {dossier.numero}
                        {" · "}
                        {typeDossierLabels[dossier.type]}
                        {client && (
                          <>
                            {" · "}
                            {client.prenom ? `${client.prenom} ${client.nom}` : client.nom}
                          </>
                        )}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statut.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statut.dot}`} />
                      {statut.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    {client && (
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[9px]">
                            {(client.prenom || client.nom).charAt(0)}
                            {client.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {client.prenom ? `${client.prenom} ${client.nom}` : client.nom}
                        </span>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      Me. Rachid Amrani
                    </span>
                  </div>
                </div>

                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// suppress unused import warning for FolderOpen
void FolderOpen;
