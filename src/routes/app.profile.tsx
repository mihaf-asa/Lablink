import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Award, BadgeCheck, Download, Plus, Quote } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { citationTrend, papers } from "@/lib/mock-data";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

const TIMELINE = [
  { year: "2019", text: "High school science olympiad — national finalist" },
  { year: "2021", text: "BSc started · first lab assistantship" },
  { year: "2023", text: "First co-authored pre-print published on LabLink" },
  { year: "2025", text: "MSc research on molecular imaging began" },
  { year: "2026", text: "Peer reviewer for two LabLink field journals" },
];

const OPEN_TO = ["Collaboration", "Mentorship", "Internships", "Co-authorship"];

function ProfilePage() {
  const { user } = useSession();
  const [skills, setSkills] = useState(["PCR", "Python", "Microscopy", "Statistical Analysis", "Literature Review"]);
  const [newSkill, setNewSkill] = useState("");
  const [endorsed, setEndorsed] = useState<string[]>([]);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills((s) => [...s, newSkill.trim()]);
    setNewSkill("");
    toast.success("Skill added to your profile");
  };

  return (
    <div>
      <PageHeader
        module={1}
        title="Scientific Profile"
        subtitle="Your verified research identity — credentials, portfolio and impact metrics."
        action={
          <Button variant="outline" onClick={() => toast.success("Portfolio exported as PDF")}>
            <Download className="mr-2 h-4 w-4" /> Export portfolio
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <div className="h-24 bg-brand sm:h-32" />
        <CardContent className="p-4 sm:p-6">
          <div className="-mt-14 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-4 sm:flex sm:items-end sm:justify-between">
            <Avatar className="h-24 w-24 shrink-0 border-4 border-card">
              <AvatarFallback className="bg-secondary text-xl font-extrabold">
                {(user?.name ?? "LL").split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2 sm:mb-1">
              <Button variant="outline" size="sm" onClick={() => toast.success("Profile link copied")}>
                Share
              </Button>
              <Button size="sm" onClick={() => toast.success("Profile editor opened")}>
                Edit profile
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold">{user?.name}</h2>
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground">
              {user?.role} · {user?.field} · {user?.institution}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>Verified {user?.role}</Badge>
              <Badge variant="secondary">{user?.field}</Badge>
              <Badge variant="outline">Open Science Advocate</Badge>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Citations", value: "902" },
              { label: "h-index", value: "14" },
              { label: "Publications", value: "11" },
              { label: "Followers", value: "1,264" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-border p-3 text-center">
                <p className="font-display text-xl font-extrabold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="portfolio" className="mt-6">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="skills">Skills & endorsements</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="open">Open to</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="mt-4 space-y-3">
          {papers.slice(0, 4).map((p) => (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={p.status === "Community Reviewed" ? "default" : "secondary"}>{p.status}</Badge>
                  <span className="text-xs text-muted-foreground">DOI {p.doi}</span>
                </div>
                <h3 className="mt-2 font-bold leading-snug">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.abstract}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{p.year}</span>
                  <span>{p.citations} citations</span>
                  <span>{p.reads.toLocaleString()} reads</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-auto h-7 px-2 text-primary"
                    onClick={() => toast.success("APA citation copied")}
                  >
                    <Quote className="mr-1 h-3 w-3" /> Cite
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="impact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Citations over time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={citationTrend}>
                  <defs>
                    <linearGradient id="cit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <RTooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="citations"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    fill="url(#cit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setEndorsed((e) => (e.includes(s) ? e.filter((x) => x !== s) : [...e, s]));
                      toast.success(endorsed.includes(s) ? `Endorsement removed` : `Endorsed ${s}`);
                    }}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      endorsed.includes(s)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {s} <span className="text-xs text-muted-foreground">+{endorsed.includes(s) ? 13 : 12}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a lab skill, language or method"
                />
                <Button onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="mt-4">
          <Card>
            <CardContent className="space-y-4 p-5">
              {TIMELINE.map((t) => (
                <div key={t.year} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <div className="flex flex-col items-center">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold">
                      {t.year}
                    </span>
                    <span className="mt-1 w-px flex-1 bg-border" />
                  </div>
                  <p className="pb-3 pt-2 text-sm">{t.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="open" className="mt-4">
          <Card>
            <CardContent className="p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {OPEN_TO.map((o) => (
                  <div key={o} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <Award className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{o}</span>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="text-sm font-semibold">Profile completeness</p>
                <Progress value={82} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">82% — add two more publications to reach 100%.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
