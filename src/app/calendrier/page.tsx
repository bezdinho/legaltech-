import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Plus,
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
import type { TypeAudience } from "@/types";

const typeAudienceLabels: Record<TypeAudience, string> = {
  audience: "Audience",
  delibere: "Délibéré",
  prononce: "Prononcé",
};

const typeAudienceBadge: Record<TypeAudience, string> = {
  audience: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  delibere: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  prononce: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
};

export default function PageCalendrier() {
  const allAudiences = mockDossiers.flatMap((d) =>
    d.audiences.map((a) => ({ audience: a, dossier: d }))
  );
  const audiencesProgrammees = allAudiences.filter(
    ({ audience }) => audience.statut === "programmee"
  );

  const tribunauxUniques = new Set(audiencesProgrammees.map(({ audience }) => audience.tribunal))
    .size;

  const evenementsParDate: Record<
    string,
    { audience: (typeof allAudiences)[0]["audience"]; dossier: (typeof allAudiences)[0]["dossier"] }[]
  > = {};

  audiencesProgrammees.forEach(({ audience, dossier }) => {
    if (!evenementsParDate[audience.date]) evenementsParDate[audience.date] = [];
    evenementsParDate[audience.date].push({ audience, dossier });
  });

  const datesTries = Object.keys(evenementsParDate).sort();

  const stats = [
    {
      label: "Audiences planifiées",
      value: audiencesProgrammees.length,
      sub: "à venir",
      delay: "0.05s",
    },
    {
      label: "Prochaine audience",
      value: datesTries.length > 0
        ? new Date(datesTries[0]).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
        : "—",
      sub: "date la plus proche",
      delay: "0.1s",
    },
    {
      label: "Tribunaux",
      value: tribunauxUniques,
      sub: "différents concernés",
      delay: "0.15s",
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
            <BreadcrumbPage>Calendrier</BreadcrumbPage>
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
            Agenda & audiences
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Calendrier
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Vos audiences à venir, organisées par date.
          </p>
        </div>
        <Button className="self-start sm:self-auto shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Planifier une audience
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

      {/* ─── Timeline ────────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up space-y-5"
        style={{ animationDelay: "0.2s" }}
      >
        {datesTries.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card shadow-sm">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Calendar className="h-8 w-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Aucune audience planifiée.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Les audiences programmées apparaîtront ici.
              </p>
            </div>
          </div>
        ) : (
          datesTries.map((date, dateIdx) => {
            const evenements = evenementsParDate[date];
            const jourLabel = new Date(date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            });
            const day = new Date(date).getDate();
            const month = new Date(date).toLocaleDateString("fr-FR", { month: "short" });

            return (
              <div
                key={date}
                className="animate-slide-up"
                style={{ animationDelay: `${0.22 + dateIdx * 0.06}s` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-shrink-0 flex flex-col items-center w-10 text-center">
                    <span
                      className="text-2xl font-semibold text-primary leading-none"
                      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                    >
                      {day}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mt-0.5">
                      {month}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium capitalize">{jourLabel}</p>
                    <p className="text-xs text-muted-foreground">
                      {evenements.length} audience{evenements.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-border/60 ml-2" />
                </div>

                <div className="space-y-2 pl-14">
                  {evenements.map(({ audience, dossier }, i) => (
                    <div
                      key={`aud-${i}`}
                      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="absolute left-0 top-0 h-full w-[3px] bg-purple-500 rounded-l-xl" />
                      <div className="px-5 py-3.5 pl-6">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                                {dossier.description.split(".")[0]}
                              </p>
                              <span
                                className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeAudienceBadge[audience.type]}`}
                              >
                                {typeAudienceLabels[audience.type]}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {dossier.numero}
                            </p>
                          </div>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                            <Clock className="h-3 w-3" />
                            {audience.heure}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>
                            {audience.tribunal}
                            {audience.salle && ` — ${audience.salle}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

void Building2;
