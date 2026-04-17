import Link from "next/link";
import { Sparkles, Send, FileText, Scale, BookOpen, MessageSquare } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const suggestions = [
  {
    icone: FileText,
    titre: "Rédiger un acte",
    description: "Générez un contrat, une mise en demeure ou une requête adaptée à votre dossier.",
    tags: ["Contrat", "Mise en demeure", "Requête"],
    accentColor: "oklch(0.58 0.19 255)",
  },
  {
    icone: Scale,
    titre: "Analyser une jurisprudence",
    description: "Obtenez un résumé et l'analyse d'une décision de justice marocaine.",
    tags: ["Jurisprudence", "Analyse", "Résumé"],
    accentColor: "oklch(0.55 0.20 305)",
  },
  {
    icone: BookOpen,
    titre: "Recherche juridique",
    description: "Posez une question de droit marocain et obtenez une réponse sourcée.",
    tags: ["Droit marocain", "Code de procédure", "Doctrine"],
    accentColor: "oklch(0.55 0.17 145)",
  },
  {
    icone: MessageSquare,
    titre: "Préparer une audience",
    description: "Structurez vos arguments et anticipez les questions du juge.",
    tags: ["Plaidoirie", "Arguments", "Préparation"],
    accentColor: "oklch(0.75 0.16 70)",
  },
];

export default function PageAssistantIA() {
  return (
    <div className="space-y-7 max-w-4xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Assistant IA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Hero ────────────────────────────────────────────────────────────────── */}
      <div
        className="animate-fade-scale flex items-start gap-4"
        style={{ animationDelay: "0s" }}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
            Intelligence artificielle
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Assistant juridique IA
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Formé sur le droit marocain — vérifiez toujours les réponses avec les textes officiels.
          </p>
        </div>
      </div>

      {/* ─── Zone de saisie ───────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-primary/20 bg-primary/[0.02] dark:bg-primary/5 shadow-sm overflow-hidden"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-primary/10">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Posez votre question
          </h2>
        </div>
        <div className="p-5">
          <div className="flex gap-3">
            <Input
              placeholder="Rédigez un acte, analysez une jurisprudence, posez une question de droit…"
              className="flex-1 h-11 bg-background"
            />
            <Button size="lg" className="px-5 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2.5">
            Droit des affaires, droit civil, droit de la famille, procédure civile et pénale marocaine.
          </p>
        </div>
      </div>

      {/* ─── Suggestions ──────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-4">
          Que voulez-vous faire ?
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {suggestions.map((item, i) => {
            const Icone = item.icone;
            return (
              <div
                key={item.titre}
                className="animate-slide-up group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                style={{ animationDelay: `${0.12 + i * 0.05}s` }}
              >
                <div
                  className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
                  style={{ background: item.accentColor }}
                />
                <div className="pl-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg opacity-80"
                      style={{ background: `${item.accentColor}20` }}
                    >
                      <Icone className="h-3.5 w-3.5" style={{ color: item.accentColor }} />
                    </div>
                    <h3
                      className="text-sm font-semibold group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      {item.titre}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Historique vide ─────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Historique des conversations
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/60 mb-3">
            <Sparkles className="h-5 w-5 text-muted-foreground/40" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Aucune conversation pour l'instant.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Posez votre première question pour commencer.
          </p>
        </div>
      </div>
    </div>
  );
}
