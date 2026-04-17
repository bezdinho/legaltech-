import Link from "next/link";
import {
  FileText,
  FileImage,
  File,
  Upload,
  Filter,
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
import { mockDossiers } from "@/lib/mock-data";

function formatTaille(octets: number): string {
  if (octets < 1024) return `${octets} o`;
  if (octets < 1024 * 1024) return `${(octets / 1024).toFixed(0)} Ko`;
  return `${(octets / 1024 / 1024).toFixed(1)} Mo`;
}

function getExt(nom: string): string {
  return nom.split(".").pop()?.toLowerCase() ?? "";
}

function iconeDocument(nom: string) {
  const ext = getExt(nom);
  if (ext === "jpg" || ext === "png") return FileImage;
  if (ext === "pdf") return FileText;
  return File;
}

const formatCouleurs: Record<string, string> = {
  pdf: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  docx: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  xlsx: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  jpg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  png: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function PageDocuments() {
  const allDocuments = mockDossiers.flatMap((d) =>
    d.documents.map((doc) => ({ doc, dossier: d }))
  );

  const stats = [
    { label: "Total", value: allDocuments.length, sub: "documents archivés", delay: "0.05s" },
    {
      label: "PDF",
      value: allDocuments.filter(({ doc }) => getExt(doc.nom) === "pdf").length,
      sub: "fichiers PDF",
      delay: "0.1s",
    },
    {
      label: "Word / Excel",
      value: allDocuments.filter(({ doc }) => {
        const ext = getExt(doc.nom);
        return ext === "docx" || ext === "xlsx";
      }).length,
      sub: "documents bureautique",
      delay: "0.15s",
    },
    {
      label: "Images",
      value: allDocuments.filter(({ doc }) => {
        const ext = getExt(doc.nom);
        return ext === "jpg" || ext === "png";
      }).length,
      sub: "fichiers image",
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
            <BreadcrumbPage>Documents</BreadcrumbPage>
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
            Gestion documentaire
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Documents
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tous les documents liés à vos dossiers en un seul endroit.
          </p>
        </div>
        <Button className="self-start sm:self-auto shrink-0">
          <Upload className="mr-2 h-4 w-4" />
          Importer un document
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

      {/* ─── Liste des documents ──────────────────────────────────────────────────── */}
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
              Tous les documents
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {allDocuments.length} document{allDocuments.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filtrer
          </Button>
        </div>

        <div className="divide-y divide-border/40">
          {allDocuments.map(({ doc, dossier }, i) => {
            const IconeDoc = iconeDocument(doc.nom);
            const ext = getExt(doc.nom);

            return (
              <div
                key={doc.id}
                className="animate-slide-right group flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors cursor-pointer"
                style={{ animationDelay: `${0.28 + i * 0.03}s` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/60 group-hover:bg-muted transition-colors">
                  <IconeDoc className="h-4.5 w-4.5 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {doc.nom}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {doc.type}
                        {" · "}
                        {dossier.numero}
                        {" · "}
                        {formatTaille(doc.taille)}
                        {" · "}
                        {new Date(doc.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase ${
                        formatCouleurs[ext] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {ext || "—"}
                    </span>
                  </div>
                </div>

                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
