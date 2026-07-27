import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Check, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/lib/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LabLink — Publish, Collaborate and Grow in Science" },
      {
        name: "description",
        content:
          "LabLink is the professional network and research platform for students, researchers and professors: publishing, mentorship, simulations, peer review and funding in one place.",
      },
      { property: "og:title", content: "LabLink — The Professional Network for Science" },
      {
        property: "og:description",
        content:
          "Publish pre-prints with a DOI, find a mentor, run simulations, review papers and discover grants — all on LabLink.",
      },
    ],
  }),
  component: Landing,
});

const STATS = [
  { value: "128k+", label: "Researchers & students" },
  { value: "46k", label: "Papers published" },
  { value: "3,200", label: "Verified professors" },
  { value: "190", label: "Countries" },
];

const STEPS = [
  {
    title: "Build your scientific identity",
    body: "Create a verified profile with your field tags, skills, citations and h-index — the academic record recruiters and grant bodies actually read.",
  },
  {
    title: "Publish and get reviewed",
    body: "Upload a pre-print, receive a DOI instantly, then let matched reviewers give structured feedback until it earns the Community Reviewed badge.",
  },
  {
    title: "Collaborate without borders",
    body: "Find co-authors by skill, run simulations together in shared workspaces, and manage the whole project from one research hub.",
  },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Logo />
        <div className="flex items-center gap-1">
          <nav className="mr-2 hidden items-center gap-1 lg:flex">
            <a href="#modules" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              Modules
            </a>
            <a href="#how" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              How it works
            </a>
            <a href="#who" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              Who it's for
            </a>
          </nav>
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Log in</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Join LabLink</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <a href="#modules" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm">
              Modules
            </a>
            <a href="#how" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm">
              How it works
            </a>
            <a href="#who" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm">
              Who it's for
            </a>
            <Button asChild className="mt-2">
              <Link to="/auth">Join LabLink</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-lab opacity-[0.18]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 surface-hero" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1 text-xs">
            12 modules · one research platform
          </Badge>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Where science gets <span className="text-gradient">published, reviewed and built together.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            LabLink is the professional network and working platform for the scientific world — students,
            researchers and professors sharing papers, mentorship, simulations, peer review and funding in one
            place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/auth">
                Get started free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#modules">Explore the platform</a>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card/70 p-4 shadow-soft">
                <p className="font-display text-2xl font-extrabold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Everything a scientist needs, in twelve modules</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Each module is live inside the platform. Sign in to open the working demo of any of them.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[m.icon];
              return (
                <Card key={m.id} className="group h-full border-border/80 transition-shadow hover:shadow-glow">
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Module {m.id}
                        </p>
                        <h3 className="truncate text-base font-bold">{m.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.tagline}</p>
                    <ul className="mt-1 space-y-1.5">
                      {m.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="ghost" size="sm" className="mt-auto justify-start px-0 text-primary">
                      <Link to={m.to}>
                        Open module <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border bg-secondary/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">How LabLink works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-4xl font-extrabold text-primary/30">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section id="who" className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Built for every stage of a scientific career</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                who: "Students",
                body: "Publish your first paper, find a professor who answers, and build a verifiable research record before you graduate.",
              },
              {
                who: "Researchers",
                body: "Track citations and h-index, run simulations, manage collaborations and never miss a relevant grant deadline again.",
              },
              {
                who: "Professors",
                body: "Mentor at scale with availability calendars, group programs, AMAs and structured review of student drafts.",
              },
            ].map((c) => (
              <Card key={c.who} className="border-border/80">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold">{c.who}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Your research record starts today</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join LabLink and get a verified scientific profile, DOI-backed publishing and a global network of
            collaborators.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link to="/auth">
              Create your profile <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LabLink · Open science for everyone
          </p>
        </div>
      </footer>
    </div>
  );
}
