"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  Scale,
  Receipt,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const avocat = {
  prenom: "Rachid",
  nom: "Amrani",
  email: "r.amrani@cabinet-amrani.ma",
};

const navigationPrincipale = [
  { titre: "Tableau de bord", href: "/dashboard", icone: LayoutDashboard },
  { titre: "Dossiers", href: "/dossiers", icone: FolderOpen, badge: 8 },
  { titre: "Clients", href: "/clients", icone: Users },
  { titre: "Calendrier", href: "/calendrier", icone: Calendar, badge: 3 },
  { titre: "Documents", href: "/documents", icone: FileText },
];

const navigationSecondaire = [
  { titre: "Facturation", href: "/facturation", icone: Receipt, badge: 4 },
  { titre: "Messagerie", href: "/messagerie", icone: MessageSquare, badge: 3 },
  { titre: "Notifications", href: "/notifications", icone: Bell },
  { titre: "Assistant IA", href: "/ia", icone: Sparkles },
];

const navigationParametres = [
  { titre: "Paramètres", href: "/parametres", icone: Settings },
];

function estActif(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AppSidebar() {
  const pathname = usePathname();
  const notificationsNonLues = 0;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              isActive={estActif(pathname, "/dashboard")}
              tooltip="Tableau de bord"
              render={
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Scale className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">LegalTech Maroc</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Cabinet juridique
                    </span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation principale</SidebarGroupLabel>
          <SidebarMenu>
            {navigationPrincipale.map((item) => {
              const Icone = item.icone;
              const actif = estActif(pathname, item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={actif}
                    tooltip={item.titre}
                    render={
                      <Link href={item.href}>
                        <Icone />
                        <span>{item.titre}</span>
                      </Link>
                    }
                  />
                  {item.badge && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarMenu>
            {navigationSecondaire.map((item) => {
              const Icone = item.icone;
              const actif = estActif(pathname, item.href);
              const badgeVal =
                item.href === "/notifications" ? notificationsNonLues : item.badge;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={actif}
                    tooltip={item.titre}
                    render={
                      <Link href={item.href}>
                        <Icone />
                        <span>{item.titre}</span>
                      </Link>
                    }
                  />
                  {badgeVal && badgeVal > 0 && (
                    <SidebarMenuBadge>{badgeVal}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarMenu>
            {navigationParametres.map((item) => {
              const Icone = item.icone;
              const actif = estActif(pathname, item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={actif}
                    tooltip={item.titre}
                    render={
                      <Link href={item.href}>
                        <Icone />
                        <span>{item.titre}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              isActive={estActif(pathname, "/profil")}
              tooltip="Profil"
              render={
                <Link href="/profil">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {avocat.prenom[0]}
                      {avocat.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Me. {avocat.prenom} {avocat.nom}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {avocat.email}
                    </span>
                  </div>
                  <ChevronRight className="ml-auto size-4" />
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
