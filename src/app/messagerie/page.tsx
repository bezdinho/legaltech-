"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const conversations = [
  {
    id: "conv-1",
    nom: "Ahmed Benali",
    initiales: "AB",
    dossier: "DOS-2026-001",
    dernierMessage: "Merci pour votre réponse rapide.",
    nonLus: 2,
  },
  {
    id: "conv-2",
    nom: "Société Atlas SARL",
    initiales: "SA",
    dossier: "DOS-2026-004",
    dernierMessage: "Quand peut-on prévoir une réunion ?",
    nonLus: 0,
  },
  {
    id: "conv-3",
    nom: "Fatima Zahra Idrissi",
    initiales: "FI",
    dossier: "DOS-2026-007",
    dernierMessage: "J'ai envoyé les documents demandés.",
    nonLus: 1,
  },
  {
    id: "conv-4",
    nom: "Mohamed Tazi",
    initiales: "MT",
    dossier: "DOS-2026-010",
    dernierMessage: "Bonne continuation.",
    nonLus: 0,
  },
];

const messagesParConv: Record<
  string,
  { id: string; moi: boolean; contenu: string; heure: string }[]
> = {
  "conv-1": [
    {
      id: "m1",
      moi: false,
      contenu: "Bonjour Maître, avez-vous reçu les documents que j'ai envoyés ?",
      heure: "09:14",
    },
    {
      id: "m2",
      moi: true,
      contenu:
        "Bonjour M. Benali, oui je les ai bien reçus. Je vais les examiner aujourd'hui et vous reviens rapidement.",
      heure: "09:32",
    },
    {
      id: "m3",
      moi: false,
      contenu: "Merci pour votre réponse rapide.",
      heure: "09:35",
    },
  ],
  "conv-2": [
    {
      id: "m4",
      moi: false,
      contenu: "Bonjour, nous souhaitons faire le point sur le dossier.",
      heure: "14:00",
    },
    {
      id: "m5",
      moi: true,
      contenu: "Bonjour, bien sûr. Je suis disponible jeudi ou vendredi.",
      heure: "14:20",
    },
    {
      id: "m6",
      moi: false,
      contenu: "Quand peut-on prévoir une réunion ?",
      heure: "14:22",
    },
  ],
  "conv-3": [
    {
      id: "m7",
      moi: false,
      contenu: "J'ai envoyé les documents demandés par email.",
      heure: "11:05",
    },
  ],
  "conv-4": [
    {
      id: "m8",
      moi: true,
      contenu: "Le dossier a été clôturé. N'hésitez pas si vous avez des questions.",
      heure: "16:30",
    },
    { id: "m9", moi: false, contenu: "Bonne continuation.", heure: "16:45" },
  ],
};

export default function PageMessagerie() {
  const [convActive, setConvActive] = useState(conversations[0].id);

  const convSelectionnee = conversations.find((c) => c.id === convActive);
  const messagesActifs = messagesParConv[convActive] ?? [];

  return (
    <div className="space-y-7 max-w-7xl">
      {/* ─── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="animate-fade-scale" style={{ animationDelay: "0s" }}>
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
          Communication sécurisée
        </p>
        <h1
          className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Messagerie
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Communiquez avec vos clients en toute confidentialité.
        </p>
      </div>

      {/* ─── Layout messagerie ─────────────────────────────────────────────────── */}
      <div
        className="animate-slide-up grid gap-0 lg:grid-cols-3 rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden"
        style={{ animationDelay: "0.05s", height: "600px" }}
      >
        {/* Liste des conversations */}
        <div className="flex flex-col border-r border-border/40">
          <div className="px-5 pt-5 pb-4 border-b border-border/40 shrink-0">
            <h2
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Conversations
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {conversations.length} conversation{conversations.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-border/40">
            {conversations.map((conv) => {
              const actif = conv.id === convActive;
              return (
                <button
                  key={conv.id}
                  onClick={() => setConvActive(conv.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40 ${
                    actif ? "bg-muted/50 border-l-2 border-l-primary" : ""
                  }`}
                >
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="text-xs font-medium">
                      {conv.initiales}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${actif ? "font-semibold" : "font-medium"}`}>
                        {conv.nom}
                      </p>
                      {conv.nonLus > 0 && (
                        <span
                          className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground"
                          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                        >
                          {conv.nonLus}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {conv.dossier}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {conv.dernierMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fenêtre de messages */}
        <div className="lg:col-span-2 flex flex-col">
          {convSelectionnee ? (
            <>
              <div className="px-5 py-4 border-b border-border/40 shrink-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-medium">
                      {convSelectionnee.initiales}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{convSelectionnee.nom}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <p className="text-xs text-muted-foreground">En ligne</p>
                    </div>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-5">
                <div className="space-y-3">
                  {messagesActifs.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.moi ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.moi
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted rounded-bl-sm"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.contenu}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            msg.moi ? "text-primary-foreground/60" : "text-muted-foreground"
                          }`}
                          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                        >
                          {msg.heure}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-border/40 p-4 shrink-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Écrire un message…"
                    className="flex-1 bg-muted/40 border-transparent focus:border-border focus:bg-background transition-all"
                  />
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <Send className="h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Sélectionnez une conversation
              </p>
              <p className="text-xs text-muted-foreground mt-1">pour consulter les messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
