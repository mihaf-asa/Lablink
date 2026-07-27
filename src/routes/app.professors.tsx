import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarClock, MessageCircleQuestion, Video } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professors, researchers } from "@/lib/mock-data";

export const Route = createFileRoute("/app/professors")({ component: ProfessorsPage });

const SLOTS = ["Mon 10:00", "Tue 14:30", "Wed 09:00", "Thu 16:00", "Fri 11:30"];

const QUESTIONS = [
  {
    q: "How do I choose between a mixed-effects model and repeated-measures ANOVA?",
    asker: "Samuel Adeyemi",
    answers: 3,
    field: "Statistics",
    answer:
      "If your design has unbalanced groups or missing timepoints, use mixed-effects. RM-ANOVA assumes sphericity and complete cases, which field data rarely satisfies.",
    by: "Prof. Elena Volkova",
  },
  {
    q: "Is a pre-print submission going to hurt my chances with a journal later?",
    asker: "Ayesha Rahman",
    answers: 5,
    field: "Publishing",
    answer:
      "Most major publishers now accept prior pre-prints. Check the journal's policy page, cite your own pre-print DOI, and you're fine.",
    by: "Dr. Amara Osei",
  },
];

function ProfessorsPage() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(QUESTIONS);
  const [topic, setTopic] = useState("");
  const [matched, setMatched] = useState<typeof professors | null>(null);

  const ask = () => {
    if (!question.trim()) {
      toast.error("Write your question first");
      return;
    }
    setAsked((prev) => [
      {
        q: question.trim(),
        asker: "You",
        answers: 0,
        field: "Open",
        answer: "",
        by: "",
      },
      ...prev,
    ]);
    setQuestion("");
    toast.success("Question posted — relevant professors have been notified");
  };

  const match = () => {
    if (!topic.trim()) {
      toast.error("Describe your research topic");
      return;
    }
    setMatched(professors);
    toast.success("Mentor matching complete");
  };

  return (
    <div>
      <PageHeader
        module={3}
        title="Professors & Expert Community"
        subtitle="Verified academics offering mentorship, review, thesis guidance and open Q&A."
      />

      <Tabs defaultValue="mentors">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="mentors">Find a mentor</TabsTrigger>
          <TabsTrigger value="ask">Ask a professor</TabsTrigger>
          <TabsTrigger value="match">Mentor matching</TabsTrigger>
          <TabsTrigger value="sessions">Sessions & webinars</TabsTrigger>
        </TabsList>

        <TabsContent value="mentors" className="mt-5 grid gap-4 md:grid-cols-2">
          {[...professors, ...researchers.filter((r) => r.verified === "Researcher")].map((p) => (
            <Card key={p.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback className="text-sm font-bold">
                      {p.name.split(" ").slice(-2).map((s) => s[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.institution}</p>
                  </div>
                  <Badge className="ml-auto shrink-0 text-[10px]">Verified {p.verified}</Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Mentorship style: 1-on-1, group sessions and async Q&A · {p.hIndex} h-index
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <CalendarClock className="mr-1.5 h-3.5 w-3.5" /> Book session
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book a 1-on-1 with {p.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <Label>Available slots this week</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {SLOTS.map((s) => (
                            <Button
                              key={s}
                              variant="outline"
                              size="sm"
                              onClick={() => toast.success(`Session booked: ${s} with ${p.name}`)}
                            >
                              {s}
                            </Button>
                          ))}
                        </div>
                        <Textarea placeholder="What would you like to discuss?" />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success(`Mentorship request sent to ${p.name}`)}
                  >
                    Request mentorship
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast.success("Draft submitted for research review")}
                  >
                    Submit draft for review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ask" className="mt-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageCircleQuestion className="h-4 w-4 text-primary" /> Post a research question
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask methodology, statistics, publishing or career questions…"
              />
              <Button onClick={ask}>Ask the expert community</Button>
            </CardContent>
          </Card>

          {asked.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {item.field}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    asked by {item.asker} · {item.answers} answers
                  </span>
                </div>
                <p className="mt-2 font-semibold">{item.q}</p>
                {item.answer ? (
                  <div className="mt-3 rounded-xl border-l-2 border-primary bg-secondary/50 p-3">
                    <p className="text-sm">{item.answer}</p>
                    <p className="mt-2 text-xs font-semibold text-primary">— {item.by}</p>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-muted-foreground">Awaiting expert answers…</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="match" className="mt-5">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label htmlFor="topic">Your research topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. protein folding under thermal stress"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Mentorship format</Label>
                  <Select defaultValue="1-on-1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-on-1">1-on-1 sessions</SelectItem>
                      <SelectItem value="group">Group programme</SelectItem>
                      <SelectItem value="async">Async Q&A</SelectItem>
                      <SelectItem value="thesis">Thesis guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Commitment</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="onetime">One-time review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={match}>Run mentor matching</Button>

              {matched && (
                <div className="space-y-3 pt-2">
                  {matched.map((m, i) => (
                    <div
                      key={m.id}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{m.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {m.institution} · {94 - i * 7}% topic overlap
                        </p>
                      </div>
                      <Button size="sm" onClick={() => toast.success(`Request sent to ${m.name}`)}>
                        Request
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            { t: "Monthly AMA: Publishing your first paper", who: "Dr. Amara Osei", when: "Thu 18:00 UTC" },
            { t: "Research Critique Session — live paper review", who: "Prof. Elena Volkova", when: "Fri 15:00 UTC" },
            { t: "Webinar: Reproducible pipelines in Python", who: "Samuel Adeyemi", when: "Mon 12:00 UTC" },
            { t: "Industry Q&A with a DeepMind scientist", who: "Invited expert", when: "Sep 08, 17:00 UTC" },
          ].map((s) => (
            <Card key={s.t}>
              <CardContent className="p-5">
                <Badge variant="secondary" className="text-[10px]">
                  Live session
                </Badge>
                <h3 className="mt-2 font-bold">{s.t}</h3>
                <p className="text-xs text-muted-foreground">
                  {s.who} · {s.when}
                </p>
                <Button size="sm" className="mt-3" onClick={() => toast.success("You're registered — invite sent")}>
                  <Video className="mr-1.5 h-3.5 w-3.5" /> Reserve seat
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
