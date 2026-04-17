import Link from "next/link";
import { Plus, Filter, Mail, Phone, ChevronRight } from "lucide-react";
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
import { mockClients, mockDossiers } from "@/lib/mock-data";

export default function PageClients() {
  const totalPhysique = mockClients.filter((c) => c.type === "physique").length;
  const totalMorale = mockClients.filter((c) => c.type === "morale").length;

  const stats = [
    { label: "Total clients", value: mockClients.length, sub: "dans le cabinet", delay: "0.05s" },
    { label: "Personnes physiques", value: totalPhysique, sub: "clients particuliers", delay: "0.1s" },
    { label: "Personnes morales", value: totalMorale, sub: "sociétés & entités", delay: "0.15s" },
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
            <BreadcrumbPage>Clients</BreadcrumbPage>
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
            Portefeuille clients
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Clients
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez votre portefeuille de clients et leurs dossiers associés.
          </p>
        </div>
        <Button className="self-start sm:self-auto shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </div>

      {/* ─── Mini stats ──────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
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

      {/* ─── Liste des clients ────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Tous les clients
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mockClients.length} client{mockClients.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filtrer
          </Button>
        </div>

        <div className="divide-y divide-border/40">
          {mockClients.map((client, i) => {
            const dossiers = mockDossiers.filter((d) => d.clientId === client.id);
            const dossierActifs = dossiers.filter(
              (d) => d.statut === "en_cours" || d.statut === "en_attente"
            ).length;
            const nomAffiche = client.prenom ? `${client.prenom} ${client.nom}` : client.nom;
            const initiale = (client.prenom || client.nom).charAt(0);

            return (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="animate-slide-right group flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
                style={{ animationDelay: `${0.23 + i * 0.04}s` }}
              >
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="text-sm font-medium">
                    {initiale}
                    {client.nom[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                        {nomAffiche}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Client depuis {new Date(client.createdAt).getFullYear()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {dossierActifs > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {dossierActifs} actif{dossierActifs > 1 ? "s" : ""}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0 hidden sm:flex">
                      <Phone className="h-3 w-3" />
                      {client.telephone}
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
