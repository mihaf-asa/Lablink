import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Medal, Star } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { badges, leaderboard } from "@/lib/mock-data";

export const Route = createFileRoute("/app/recognition")({ component: RecognitionPage });

const RANKS = [
  "Curious Learner",
  "Student Researcher",
  "Rising Scientist",
  "Established Researcher",
  "Scientific Leader",
];

function RecognitionPage() {
  return (
    <div>
      <PageHeader
        module={9}
        title="Recognition & Research Points"
        subtitle="Points, badges, ranks and leaderboards that make your contributions verifiable."
        action={
          <Button variant="outline" onClick={() => toast.success("Research record exported as PDF")}>
            Export research record
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Your rank progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-extrabold">6,480 RP</p>
            <p className="text-sm text-muted-foreground">Rising Scientist · 1,520 RP to Established Researcher</p>
            <Progress value={68} className="mt-3 h-2" />
            <div className="mt-5 grid gap-2 sm:grid-cols-5">
              {RANKS.map((r, i) => (
                <div
                  key={r}
                  className={`rounded-lg border p-2 text-center text-[11px] ${
                    i <= 2 ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {r}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Badges</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {badges.map((b) => (
              <div
                key={b.name}
                className={`rounded-lg border p-3 text-center text-xs ${
                  b.earned ? "border-primary/40 bg-primary/5" : "border-dashed border-border opacity-60"
                }`}
              >
                <Medal className={`mx-auto h-5 w-5 ${b.earned ? "text-accent" : "text-muted-foreground"}`} />
                <p className="mt-1 font-medium">{b.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Field leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {leaderboard.map((l, i) => (
              <div key={l.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{l.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{l.field}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  <Star className="mr-1 h-3 w-3" /> {l.rp.toLocaleString()} RP
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
