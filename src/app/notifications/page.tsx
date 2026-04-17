import Link from "next/link";
import {
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  CreditCard,
  FolderOpen,
  Clock,
  CheckCheck,
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

type TypeNotif = "audience" | "document" | "message" | "paiement" | "dossier" | "rappel";

interface Notif {
  id: string;
  type: TypeNotif;
  titre: string;
  message: string;
  dateCreation: string;
  lu: boolean;
}

const typeConfig: Record<
  TypeNotif,
  { icone: React.ElementType; couleur: string; bg: string; accent: string }
> = {
  audience: {
    icone: Calendar,
    couleur: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    accent: "bg-purple-500",
  },
  document: {
    icone: FileText,
    couleur: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/20",
    accent: "bg-blue-500",
  },
  message: {
    icone: MessageSquare,
    couleur: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/20",
    accent: "bg-emerald-500",
  },
  paiement: {
    icone: CreditCard,
    couleur: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/20",
    accent: "bg-amber-500",
  },
  dossier: {
    icone: FolderOpen,
    couleur: "text-primary",
    bg: "bg-primary/10",
    accent: "bg-primary",
  },
  rappel: {
    icone: Clock,
    couleur: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/20",
    accent: "bg-orange-500",
  },
};

const notifications: Notif[] = [
  {
    id: "n1",
    type: "audience",
    titre: "Audience dans 5 jours",
    message:
      "Audience programmée le 22 avril 2026 à 09h00 au Tribunal Administratif de Casablanca — dossier DOS-2026-003.",
    dateCreation: "2026-04-17T08:00:00Z",
    lu: false,
  },
  {
    id: "n2",
    type: "paiement",
    titre: "Facture en retard",
    message:
      "La facture FAC-2026-001 est en retard de paiement. Échéance dépassée depuis 15 jours.",
    dateCreation: "2026-04-16T10:30:00Z",
    lu: false,
  },
  {
    id: "n3",
    type: "message",
    titre: "Nouveau message reçu",
    message: "Ahmed Benali vous a envoyé un message concernant son dossier DOS-2026-001.",
    dateCreation: "2026-04-15T14:20:00Z",
    lu: false,
  },
  {
    id: "n4",
    type: "document",
    titre: "Nouveau document déposé",
    message:
      "Un jugement a été ajouté au dossier DOS-2026-007. Veuillez en prendre connaissance.",
    dateCreation: "2026-04-14T09:15:00Z",
    lu: true,
  },
  {
    id: "n5",
    type: "dossier",
    titre: "Dossier mis à jour",
    message:
      "Le statut du dossier DOS-2026-005 a été modifié : passage de « En attente » à « En cours ».",
    dateCreation: "2026-04-13T16:00:00Z",
    lu: true,
  },
  {
    id: "n6",
    type: "rappel",
    titre: "Rappel : délai de réponse",
    message:
      "Le délai de réponse pour le dossier DOS-2026-011 expire dans 48h. Pensez à soumettre vos conclusions.",
    dateCreation: "2026-04-12T07:00:00Z",
    lu: true,
  },
];

function tempsRelatif(dateIso: string): string {
  const diff = Date.now() - new Date(dateIso).getTime();
  const min = Math.floor(diff / 60000);
  const h = Math.floor(min / 60);
  const j = Math.floor(h / 24);
  if (j > 0) return `Il y a ${j}j`;
  if (h > 0) return `Il y a ${h}h`;
  return `Il y a ${min}min`;
}

export default function PageNotifications() {
  const nonLues = notifications.filter((n) => !n.lu);
  const lues = notifications.filter((n) => n.lu);

  return (
    <div className="space-y-7 max-w-3xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard" />}>
              Tableau de bord
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Notifications</BreadcrumbPage>
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
            Alertes & rappels
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Restez informé des dernières actualités de vos dossiers.
          </p>
        </div>
        {nonLues.length > 0 && (
          <Button variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
            <CheckCheck className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* ─── Non lues ────────────────────────────────────────────────────────────── */}
      {nonLues.length > 0 && (
        <div
          className="animate-slide-up rounded-xl border border-primary/20 bg-primary/[0.02] dark:bg-primary/5 shadow-sm overflow-hidden"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <h2
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Non lues
              </h2>
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                {nonLues.length}
              </span>
            </div>
          </div>

          <div className="divide-y divide-primary/10">
            {nonLues.map((notif, i) => {
              const config = typeConfig[notif.type];
              const Icone = config.icone;
              return (
                <div
                  key={notif.id}
                  className="animate-slide-right group relative flex items-start gap-4 px-5 py-4 hover:bg-primary/[0.03] transition-colors cursor-pointer"
                  style={{ animationDelay: `${0.08 + i * 0.04}s` }}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}
                  >
                    <Icone className={`h-4 w-4 ${config.couleur}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold leading-snug">{notif.titre}</p>
                      <span
                        className="text-xs text-muted-foreground shrink-0"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {tempsRelatif(notif.dateCreation)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  <div className={`mt-2 h-2 w-2 rounded-full shrink-0 ${config.accent}`} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Déjà lues ───────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-border/40">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Déjà lues
          </h2>
        </div>

        {lues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-7 w-7 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">Aucune notification lue.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {lues.map((notif, i) => {
              const config = typeConfig[notif.type];
              const Icone = config.icone;
              return (
                <div
                  key={notif.id}
                  className="animate-slide-right group flex items-start gap-4 px-5 py-4 opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
                  style={{ animationDelay: `${0.13 + i * 0.03}s` }}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}
                  >
                    <Icone className={`h-4 w-4 ${config.couleur}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium leading-snug">{notif.titre}</p>
                      <span
                        className="text-xs text-muted-foreground shrink-0"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {tempsRelatif(notif.dateCreation)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
