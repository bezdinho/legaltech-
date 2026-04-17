// ─── Client ────────────────────────────────────────────────────────────────────

export type TypeClient = "physique" | "morale";

export interface Client {
  id: string;
  type: TypeClient;
  nom: string;
  prenom: string;
  cin: string;
  telephone: string;
  email: string;
  adresse: string;
  rc?: string;
  ice?: string;
  notes: string;
  createdAt: string;
}

// ─── Note ──────────────────────────────────────────────────────────────────────

export interface Note {
  id: string;
  contenu: string;
  createdAt: string;
  auteur: string;
}

// ─── Document ──────────────────────────────────────────────────────────────────

export interface Document {
  id: string;
  nom: string;
  type: string;
  taille: number;
  url: string;
  createdAt: string;
}

// ─── Audience ──────────────────────────────────────────────────────────────────

export type TypeAudience = "audience" | "delibere" | "prononce";
export type StatutAudience = "programmee" | "reportee" | "terminee";

export interface Audience {
  id: string;
  dossierId: string;
  date: string;
  heure: string;
  tribunal: string;
  salle?: string;
  type: TypeAudience;
  statut: StatutAudience;
  notes?: string;
}

// ─── Facture ───────────────────────────────────────────────────────────────────

export type StatutFacture = "brouillon" | "envoyee" | "payee" | "en_retard";

export interface LigneFacture {
  id: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
}

export interface Facture {
  id: string;
  numero: string;
  dossierId: string;
  clientId: string;
  lignes: LigneFacture[];
  tva: number;
  totalHT: number;
  totalTTC: number;
  statut: StatutFacture;
  dateEmission: string;
  dateEcheance: string;
}

// ─── Dossier ───────────────────────────────────────────────────────────────────

export type TypeDossier = "civil" | "penal" | "commercial" | "famille" | "administratif";
export type StatutDossier = "en_cours" | "en_attente" | "cloture";

export interface Dossier {
  id: string;
  numero: string;
  clientId: string;
  client: Client;
  partieAdverse: string;
  type: TypeDossier;
  tribunal: string;
  statut: StatutDossier;
  description: string;
  notes: Note[];
  documents: Document[];
  audiences: Audience[];
  factures: Facture[];
  createdAt: string;
}
