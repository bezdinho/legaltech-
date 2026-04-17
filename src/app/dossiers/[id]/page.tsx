import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DossierTabs } from "@/components/dossiers/dossier-tabs";
import { mockDossiers, mockClients } from "@/lib/mock-data";
import type { TypeDossier } from "@/types";

const typeAffaireLabels: Record<TypeDossier, string> = {
  civil: "Droit civil",
  penal: "Droit pénal",
  commercial: "Droit commercial",
  famille: "Droit de la famille",
  administratif: "Droit administratif",
};

const statutConfig = {
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
    icone: Clock,
  },
  cloture: {
    label: "Clôturé",
    dot: "bg-emerald-500",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icone: CheckCircle2,
  },
};

export default async function PageDossier({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const dossier = mockDossiers.find((d) => d.id === id);
  if (!dossier) notFound();

  const client = mockClients.find((c) => c.id === dossier.clientId);
  if (!client) notFound();

  const statut = statutConfig[dossier.statut];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* ─── Breadcrumb ───────────────────────────────────────────────────────── */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dossiers" />}>
              Dossiers
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{dossier.numero}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── En-tête du dossier ───────────────────────────────────────────────── */}
      <div
        className="animate-fade-scale rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0s" }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statut.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statut.dot}`} />
                  {statut.label}
                </span>
                <span className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                  {typeAffaireLabels[dossier.type]}
                </span>
              </div>

              {/* Titre / description courte */}
              <h1
                className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {dossier.description.split(".")[0]}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span
                  className="font-medium"
                  style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  {dossier.numero}
                </span>
                {dossier.tribunal && (
                  <>
                    <span className="text-border">·</span>
                    <span>{dossier.tribunal}</span>
                  </>
                )}
              </div>

              {/* Parties */}
              <div className="flex items-center gap-4 pt-1">
                <Link
                  href={`/clients/${client.id}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {client.prenom ? `${client.prenom} ${client.nom}` : client.nom}
                  <ChevronRight className="h-3 w-3" />
                </Link>
                <span className="text-xs text-muted-foreground">
                  c/ {dossier.partieAdverse}
                </span>
              </div>
            </div>

            <Button className="shrink-0">
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Tabs ─────────────────────────────────────────────────────────────── */}
      <DossierTabs
        dossier={dossier}
        client={client}
        audiences={dossier.audiences}
        documents={dossier.documents}
        notes={dossier.notes}
        factures={dossier.factures}
      />
    </div>
  );
}
