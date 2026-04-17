"use client";

import { useState } from "react";
import {
  FileText,
  FileImage,
  File,
  Upload,
  Plus,
  MapPin,
  Clock,
  User,
  Scale,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  CheckCheck,
  Receipt,
  StickyNote,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type {
  Dossier,
  Audience,
  Document,
  Note,
  Facture,
  Client,
  StatutAudience,
  StatutFacture,
  TypeDossier,
} from "@/types";

// ─── Config statique ──────────────────────────────────────────────────────────

const typeDossierLabels: Record<TypeDossier, string> = {
  civil: "Droit civil",
  penal: "Droit pénal",
  commercial: "Droit commercial",
  famille: "Droit de la famille",
  administratif: "Droit administratif",
};

const typeAudienceLabels = {
  audience: "Audience",
  delibere: "Délibéré",
  prononce: "Prononcé",
};

const statutDossierConfig = {
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

const audienceStatutConfig: Record<
  StatutAudience,
  {
    label: string;
    icone: React.ElementType;
    point: string;
    texte: string;
    ring: string;
  }
> = {
  programmee: {
    label: "Programmée",
    icone: Calendar,
    point: "bg-blue-600",
    texte: "text-blue-700 dark:text-blue-400",
    ring: "ring-blue-200 dark:ring-blue-900",
  },
  terminee: {
    label: "Tenue",
    icone: CheckCheck,
    point: "bg-muted-foreground",
    texte: "text-muted-foreground",
    ring: "ring-muted/50",
  },
  reportee: {
    label: "Reportée",
    icone: RotateCcw,
    point: "bg-amber-500",
    texte: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-200 dark:ring-amber-900",
  },
};

const factureStatutConfig: Record<
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
    icone: XCircle,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTaille(octets: number): string {
  if (octets < 1024 * 1024) return `${(octets / 1024).toFixed(0)} Ko`;
  return `${(octets / 1024 / 1024).toFixed(1)} Mo`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateCourte(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateHeure(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function iconeDocument(nom: string): React.ElementType {
  const ext = nom.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "png") return FileImage;
  if (ext === "pdf") return FileText;
  return File;
}

function getExtension(nom: string): string {
  return nom.split(".").pop()?.toLowerCase() ?? "";
}

const formatCouleurs: Record<string, string> = {
  pdf: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  docx: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  xlsx: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  jpg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  png: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface DossierTabsProps {
  dossier: Dossier;
  client: Client;
  audiences: Audience[];
  documents: Document[];
  notes: Note[];
  factures: Facture[];
}

// ─── Composant ────────────────────────────────────────────────────────────────

export function DossierTabs({
  dossier,
  client,
  audiences,
  documents,
  notes,
  factures,
}: DossierTabsProps) {
  const [nouvelleNote, setNouvelleNote] = useState("");
  const [notesLocales, setNotesLocales] = useState<Note[]>(notes);

  const today = new Date().toISOString().split("T")[0];
  const audiencesTries = [...audiences].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const prochainAudience = audiencesTries.find(
    (a) => a.statut === "programmee" && a.date >= today
  );

  const statutDossier = statutDossierConfig[dossier.statut];

  function ajouterNote() {
    if (!nouvelleNote.trim()) return;
    const note: Note = {
      id: `note-temp-${Date.now()}`,
      contenu: nouvelleNote.trim(),
      createdAt: new Date().toISOString(),
      auteur: "Me. Rachid Amrani",
    };
    setNotesLocales((prev) => [note, ...prev]);
    setNouvelleNote("");
  }

  return (
    <Tabs defaultValue="resume" className="space-y-5">
      <TabsList className="grid w-full grid-cols-5 h-10 rounded-xl bg-muted/60">
        <TabsTrigger value="resume" className="rounded-lg text-xs font-medium">
          Résumé
        </TabsTrigger>
        <TabsTrigger value="audiences" className="relative rounded-lg text-xs font-medium">
          Audiences
          {audiencesTries.filter((a) => a.statut === "programmee").length > 0 && (
            <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
              {audiencesTries.filter((a) => a.statut === "programmee").length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="documents" className="rounded-lg text-xs font-medium">
          Documents
          {documents.length > 0 && (
            <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted-foreground/20 text-[9px] font-medium">
              {documents.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="notes" className="rounded-lg text-xs font-medium">
          Notes
        </TabsTrigger>
        <TabsTrigger value="facturation" className="rounded-lg text-xs font-medium">
          Facturation
        </TabsTrigger>
      </TabsList>

      {/* ─── TAB RÉSUMÉ ──────────────────────────────────────────────────────── */}
      <TabsContent value="resume" className="space-y-4">
        {/* Prochaine audience */}
        {prochainAudience && (
          <div className="rounded-xl border border-primary/20 bg-primary/[0.03] dark:bg-primary/5 overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b border-primary/10">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                Prochaine audience
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl bg-primary/10 px-3.5 py-2.5 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-primary/70">
                    {new Date(prochainAudience.date).toLocaleDateString("fr-FR", { month: "short" })}
                  </p>
                  <p
                    className="text-2xl font-semibold text-primary leading-tight mt-0.5"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {new Date(prochainAudience.date).getDate()}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-sm leading-snug">
                      {typeAudienceLabels[prochainAudience.type]}
                    </p>
                    <Badge className="shrink-0 bg-primary/10 text-primary border-0 text-[10px]">
                      {Math.ceil(
                        (new Date(prochainAudience.date).getTime() - Date.now()) / 86400000
                      )}{" "}
                      jours
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {prochainAudience.heure}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {prochainAudience.tribunal}
                    {prochainAudience.salle && ` — ${prochainAudience.salle}`}
                  </p>
                </div>
              </div>
              {prochainAudience.notes && (
                <div className="mt-3 rounded-lg bg-primary/[0.06] px-3 py-2 text-xs text-primary/80">
                  <span className="font-medium">Note : </span>
                  {prochainAudience.notes}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Informations clés */}
          <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <h3
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Informations du dossier
              </h3>
            </div>
            <div className="divide-y divide-border/40">
              {[
                { label: "Numéro", valeur: dossier.numero },
                { label: "Type d'affaire", valeur: typeDossierLabels[dossier.type] },
                {
                  label: "Statut",
                  valeur: (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statutDossier.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statutDossier.dot}`} />
                      {statutDossier.label}
                    </span>
                  ),
                },
                { label: "Partie adverse", valeur: dossier.partieAdverse },
                { label: "Tribunal", valeur: dossier.tribunal },
                { label: "Ouvert le", valeur: formatDate(dossier.createdAt) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-5 py-2.5"
                >
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm text-right">{item.valeur}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Client */}
            <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
                <User className="h-4 w-4 text-muted-foreground" />
                <h3
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Client
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs font-medium">
                      {client.prenom ? client.prenom[0] : client.nom[0]}
                      {client.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {client.prenom ? `${client.prenom} ${client.nom}` : client.nom}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{client.email}</p>
                    <p className="text-xs text-muted-foreground">{client.telephone}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 ml-auto" />
                </div>
              </div>
            </div>

            {/* Avocat référent */}
            <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
                <Scale className="h-4 w-4 text-muted-foreground" />
                <h3
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Avocat référent
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs font-medium">RA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Me. Rachid Amrani</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Barreau de Casablanca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-border/40">
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Description
            </h3>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {dossier.description}
            </p>
          </div>
        </div>
      </TabsContent>

      {/* ─── TAB AUDIENCES ────────────────────────────────────────────────────── */}
      <TabsContent value="audiences" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {audiencesTries.length} audience{audiencesTries.length > 1 ? "s" : ""} au total
          </p>
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Planifier
          </Button>
        </div>

        {audiencesTries.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card shadow-sm">
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Calendar className="h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Aucune audience enregistrée.
              </p>
              <Button size="sm" variant="outline" className="mt-3">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Planifier une audience
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative pl-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border/60" />
            <div className="space-y-3">
              {audiencesTries.map((audience) => {
                const cfg = audienceStatutConfig[audience.statut];
                const StatutIcone = cfg.icone;
                const isToday = audience.date === today;
                const isFuture = audience.date > today;

                return (
                  <div key={audience.id} className="relative flex gap-4">
                    <div
                      className={`absolute -left-6 mt-3.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-4 z-10 ${cfg.point} ${cfg.ring}`}
                    >
                      <StatutIcone className="h-2.5 w-2.5 text-white" />
                    </div>

                    <div
                      className={`flex-1 rounded-xl border overflow-hidden ${
                        isToday
                          ? "border-orange-300 dark:border-orange-700 bg-orange-50/60 dark:bg-orange-950/20"
                          : isFuture
                          ? "border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/10"
                          : "border-border/60 bg-muted/20 opacity-70"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className={`font-semibold text-sm ${!isFuture && !isToday ? "text-muted-foreground" : ""}`}>
                                {typeAudienceLabels[audience.type]}
                              </p>
                              {isToday && (
                                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0 text-[10px] px-1.5">
                                  Aujourd'hui
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {formatDateCourte(audience.date)} · {audience.heure}
                            </p>
                          </div>
                          <span className={`shrink-0 text-xs font-semibold ${cfg.texte}`}>
                            {cfg.label}
                          </span>
                        </div>

                        <Separator className="my-2.5 opacity-40" />

                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            {audience.tribunal}
                            {audience.salle && ` — ${audience.salle}`}
                          </div>
                          {audience.notes && (
                            <div className="mt-2 rounded-lg bg-muted/60 px-3 py-2 text-xs italic">
                              {audience.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </TabsContent>

      {/* ─── TAB DOCUMENTS ────────────────────────────────────────────────────── */}
      <TabsContent value="documents" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {documents.length} document{documents.length > 1 ? "s" : ""}
          </p>
          <Button size="sm">
            <Upload className="mr-1.5 h-3.5 w-3.5" />
            Ajouter
          </Button>
        </div>

        {documents.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card shadow-sm">
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Aucun document rattaché.
              </p>
              <Button size="sm" variant="outline" className="mt-3">
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Importer le premier document
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="divide-y divide-border/40">
              {documents.map((doc) => {
                const IconeDoc = iconeDocument(doc.nom);
                const ext = getExtension(doc.nom);
                return (
                  <div
                    key={doc.id}
                    className="group flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 group-hover:bg-muted transition-colors">
                      <IconeDoc className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {doc.nom}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {doc.type}
                        {" · "}
                        {formatTaille(doc.taille)}
                        {" · "}
                        {formatDateCourte(doc.createdAt)}
                      </p>
                    </div>
                    {ext && (
                      <span
                        className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${
                          formatCouleurs[ext] ?? "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ext}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </TabsContent>

      {/* ─── TAB NOTES ───────────────────────────────────────────────────────── */}
      <TabsContent value="notes" className="space-y-4">
        {/* Zone de saisie */}
        <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Ajouter une note
            </h3>
          </div>
          <div className="p-5 space-y-3">
            <textarea
              value={nouvelleNote}
              onChange={(e) => setNouvelleNote(e.target.value)}
              placeholder="Observations, instructions, informations confidentielles…"
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Me. Rachid Amrani</p>
              <Button
                size="sm"
                onClick={ajouterNote}
                disabled={!nouvelleNote.trim()}
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Publier la note
              </Button>
            </div>
          </div>
        </div>

        {/* Fil chronologique */}
        {notesLocales.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card shadow-sm">
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <StickyNote className="h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Aucune note pour ce dossier.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {[...notesLocales]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-border/60 overflow-hidden"
                >
                  <div className="bg-card p-4 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[9px] font-medium">
                            {note.auteur.replace("Me. ", "").split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{note.auteur}</span>
                      </div>
                      <span
                        className="text-xs text-muted-foreground shrink-0"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {formatDateHeure(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{note.contenu}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </TabsContent>

      {/* ─── TAB FACTURATION ──────────────────────────────────────────────────── */}
      <TabsContent value="facturation" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {factures.length} facture{factures.length > 1 ? "s" : ""} liée
            {factures.length > 1 ? "s" : ""} à ce dossier
          </p>
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Nouvelle facture
          </Button>
        </div>

        {factures.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card shadow-sm">
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Receipt className="h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Aucune facture pour ce dossier.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Total facturé",
                  value: factures.reduce((s, f) => s + f.totalTTC, 0),
                  delay: "0s",
                },
                {
                  label: "Encaissé",
                  value: factures.filter((f) => f.statut === "payee").reduce((s, f) => s + f.totalTTC, 0),
                  delay: "0.05s",
                },
                {
                  label: "Non payé",
                  value: factures
                    .filter((f) => f.statut !== "payee" && f.statut !== "brouillon")
                    .reduce((s, f) => s + f.totalTTC, 0),
                  delay: "0.1s",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-card p-4 shadow-sm"
                  style={{ animationDelay: stat.delay }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                  <p
                    className="mt-2 text-xl font-semibold tracking-tight"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {stat.value.toLocaleString("fr-FR")} MAD
                  </p>
                </div>
              ))}
            </div>

            {/* Liste factures */}
            <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
              <div className="divide-y divide-border/40">
                {factures.map((facture) => {
                  const cfg = factureStatutConfig[facture.statut];
                  return (
                    <div key={facture.id} className="p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p
                              className="font-semibold text-sm"
                              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                            >
                              {facture.numero}
                            </p>
                            <span className={`flex items-center gap-1 text-xs font-medium ${cfg.couleur}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Émise le {formatDateCourte(facture.dateEmission)}
                            {" · "}Échéance : {formatDateCourte(facture.dateEcheance)}
                          </p>
                        </div>
                        <p
                          className="text-lg font-semibold shrink-0"
                          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                        >
                          {facture.totalTTC.toLocaleString("fr-FR")} MAD
                        </p>
                      </div>

                      <Separator className="my-3 opacity-40" />

                      <div className="space-y-1">
                        {facture.lignes.map((ligne) => (
                          <div
                            key={ligne.id}
                            className="flex items-center justify-between text-xs text-muted-foreground"
                          >
                            <span className="truncate pr-4">{ligne.description}</span>
                            <span
                              className="shrink-0 font-medium"
                              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                            >
                              {(ligne.prixUnitaire * ligne.quantite).toLocaleString("fr-FR")} MAD
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
