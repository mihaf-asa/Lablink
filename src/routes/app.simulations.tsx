import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/simulations")({ component: SimPage });

const SIMS = [
  "Physics Simulator",
  "Chemistry Lab Simulator",
  "Biology Cell Simulator",
  "Mathematical Modeling",
  "Statistical Analysis Engine",
  "Climate & Environmental",
  "Circuit Simulator",
  "Fluid Dynamics",
  "Genetic Algorithm",
  "Astronomical Simulator",
];

function SimPage() {
  const [angle, setAngle] = useState([45]);
  const [speed, setSpeed] = useState([25]);
  const [gravity, setGravity] = useState([9.8]);
  const [data, setData] = useState("group,value\nA,12\nA,15\nB,22\nB,19");

  const trajectory = useMemo(() => {
    const rad = (angle[0] * Math.PI) / 180;
    const v = speed[0];
    const g = gravity[0];
    const flight = (2 * v * Math.sin(rad)) / g;
    return Array.from({ length: 40 }, (_, i) => {
      const t = (flight * i) / 39;
      return {
        x: +(v * Math.cos(rad) * t).toFixed(2),
        y: +Math.max(0, v * Math.sin(rad) * t - 0.5 * g * t * t).toFixed(2),
      };
    });
  }, [angle, speed, gravity]);

  const range = trajectory[trajectory.length - 1]?.x ?? 0;
  const peak = Math.max(...trajectory.map((p) => p.y));

  const rows = data
    .trim()
    .split("\n")
    .slice(1)
    .map((r) => r.split(","));
  const groups = Array.from(new Set(rows.map((r) => r[0])));
  const means = groups.map((g) => {
    const vals = rows.filter((r) => r[0] === g).map((r) => Number(r[1]) || 0);
    return { g, mean: vals.reduce((a, b) => a + b, 0) / (vals.length || 1), n: vals.length };
  });

  return (
    <div>
      <PageHeader
        module={5}
        title="Simulation & Data Tools"
        subtitle="Run simulations, analyse datasets and build publication-quality figures."
      />

      <Tabs defaultValue="physics">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="physics">Physics simulator</TabsTrigger>
          <TabsTrigger value="stats">Statistical engine</TabsTrigger>
          <TabsTrigger value="catalog">All simulators</TabsTrigger>
        </TabsList>

        <TabsContent value="physics" className="mt-5 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Projectile parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label>Launch angle: {angle[0]}°</Label>
                <Slider value={angle} onValueChange={setAngle} min={5} max={85} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Initial velocity: {speed[0]} m/s</Label>
                <Slider value={speed} onValueChange={setSpeed} min={5} max={60} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Gravity: {gravity[0]} m/s²</Label>
                <Slider value={gravity} onValueChange={setGravity} min={1.6} max={24.8} step={0.1} className="mt-2" />
              </div>
              <div className="rounded-xl border border-border p-3 text-sm">
                <p>Range: <span className="font-bold">{range.toFixed(1)} m</span></p>
                <p>Peak height: <span className="font-bold">{peak.toFixed(1)} m</span></p>
              </div>
              <Button className="w-full" onClick={() => toast.success("Simulation saved to your workspace")}>
                Save & export results
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trajectory</CardTitle>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="x" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <RTooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="y" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-5 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dataset (CSV)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea value={data} onChange={(e) => setData(e.target.value)} className="min-h-[200px] font-mono text-xs" />
              <Button onClick={() => toast.success("Analysis complete — t-test recommended")}>Run analysis</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Group summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {means.map((m) => (
                <div key={m.g} className="flex justify-between rounded-lg border border-border p-3 text-sm">
                  <span className="font-semibold">Group {m.g}</span>
                  <span className="text-muted-foreground">
                    n = {m.n} · mean = {m.mean.toFixed(2)}
                  </span>
                </div>
              ))}
              <p className="pt-2 text-xs text-muted-foreground">
                Suggested test: independent-samples t-test (two groups, continuous outcome).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SIMS.map((s) => (
            <Card key={s}>
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{s}</p>
                  <Badge variant="outline" className="mt-1 text-[10px]">
                    Shared workspace ready
                  </Badge>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success(`${s} launched`)}>
                  Launch
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
