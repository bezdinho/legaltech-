import Link from "next/link";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { mockClients, mockDossiers } from "@/lib/mock-data";

export default function PageNouvelleFacture() {
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
            <BreadcrumbLink render={<Link href="/facturation" />}>
              Facturation
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nouvelle facture</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Hero ────────────────────────────────────────────────────────────────── */}
      <div
        className="animate-fade-scale"
        style={{ animationDelay: "0s" }}
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
          Facturation
        </p>
        <h1
          className="text-3xl font-semibold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Nouvelle facture
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Créez et émettez une facture d'honoraires pour votre client.
        </p>
      </div>

      {/* ─── Informations générales ───────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Informations générales
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Client
              </label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                <option value="">Sélectionner un client…</option>
                {mockClients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.prenom} {c.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Dossier lié (optionnel)
              </label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                <option value="">Aucun dossier</option>
                {mockDossiers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.numero} — {d.description.split(".")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Numéro de facture
              </label>
              <Input
                placeholder="FAC-2024-0043"
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date d'émission
              </label>
              <Input type="date" className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date d'échéance
              </label>
              <Input type="date" className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Lignes de facturation ────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Prestations
          </h2>
          <Button size="sm" variant="outline">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Ajouter une ligne
          </Button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-12 gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
            <span className="col-span-5">Description</span>
            <span className="col-span-2 text-right">Qté</span>
            <span className="col-span-2 text-right">P.U. (MAD)</span>
            <span className="col-span-2 text-right">TVA %</span>
            <span className="col-span-1" />
          </div>

          <Separator />

          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-5">
              <Input
                placeholder="Honoraires de représentation…"
                className="h-9 text-sm"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="1"
                className="h-9 text-sm text-right font-mono"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="1 500"
                className="h-9 text-sm text-right font-mono"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="20"
                className="h-9 text-sm text-right font-mono"
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col items-end gap-2 pt-1">
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span>Sous-total HT</span>
              <span
                className="w-32 text-right font-medium text-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                — MAD
              </span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span>TVA (20%)</span>
              <span
                className="w-32 text-right font-medium text-foreground"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                — MAD
              </span>
            </div>
            <Separator className="w-52" />
            <div className="flex items-center gap-8 font-semibold">
              <span>Total TTC</span>
              <span
                className="w-32 text-right text-lg"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                — MAD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Notes ───────────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="px-5 pt-5 pb-4 border-b border-border/40">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Notes (optionnel)
          </h2>
        </div>
        <div className="p-5">
          <textarea
            rows={3}
            placeholder="Conditions de paiement, références, informations complémentaires…"
            className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
      </div>

      {/* ─── Actions ──────────────────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up flex items-center justify-between"
        style={{ animationDelay: "0.2s" }}
      >
        <Button variant="outline" render={<Link href="/facturation" />}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Annuler
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">Enregistrer en brouillon</Button>
          <Button>Émettre la facture</Button>
        </div>
      </div>
    </div>
  );
}
