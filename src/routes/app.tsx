import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Atom,
  Banknote,
  BookOpen,
  Bell,
  CalendarDays,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearSession, useSession } from "@/lib/session";

export const Route = createFileRoute("/app")({
  ssr: false,
  component: AppLayout,
});

const NAV = [
  { to: "/app/feed", label: "Research Feed", icon: Home, mod: 4 },
  { to: "/app/profile", label: "My Profile", icon: UserRound, mod: 1 },
  { to: "/app/network", label: "Network", icon: Users, mod: 1 },
  { to: "/app/papers", label: "Papers & Publishing", icon: FileText, mod: 2 },
  { to: "/app/professors", label: "Professors & Mentors", icon: GraduationCap, mod: 3 },
  { to: "/app/community", label: "Groups & Community", icon: MessagesSquare, mod: 4 },
  { to: "/app/simulations", label: "Simulations & Data", icon: Atom, mod: 5 },
  { to: "/app/learn", label: "Learning Hub", icon: BookOpen, mod: 6 },
  { to: "/app/projects", label: "Projects", icon: FolderKanban, mod: 7 },
  { to: "/app/review", label: "Peer Review", icon: ShieldCheck, mod: 8 },
  { to: "/app/recognition", label: "Recognition", icon: Trophy, mod: 9 },
  { to: "/app/events", label: "Events", icon: CalendarDays, mod: 10 },
  { to: "/app/funding", label: "Funding & Grants", icon: Banknote, mod: 11 },
  { to: "/app/assistant", label: "AI Assistant", icon: Sparkles, mod: 12 },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5 p-2">
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
            }`}
          >
            <item.icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
            <span className="truncate">{item.label}</span>
            <span className="ml-auto text-[10px] text-muted-foreground/70">M{item.mod}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AppLayout() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/auth" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Loading your lab…</p>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="border-b border-border p-4">
                  <Logo />
                </div>
                <NavList onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <Logo className="hidden sm:flex" />
          </div>

          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search papers, researchers, institutions…"
              className="pl-9"
              aria-label="Global search"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 rounded-full" aria-label="Account menu">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-brand text-xs font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-xs font-normal text-muted-foreground">{user.institution}</p>
                  <Badge variant="secondary" className="mt-2 text-[10px]">
                    Verified {user.role}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile">View profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/recognition">Research points</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    clearSession();
                    navigate({ to: "/" });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-72 shrink-0 overflow-y-auto border-r border-sidebar-border bg-sidebar lg:block">
          <NavList />
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
