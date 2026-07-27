import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/app/learn")({ component: LearnPage });

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const QUIZ = {
  q: "Which statistic best summarises the spread of a skewed dataset?",
  options: ["Standard deviation", "Interquartile range", "Mean", "Sample size"],
  answer: 1,
};

function LearnPage() {
  const [level, setLevel] = useState("All");
  const [picked, setPicked] = useState<number | null>(null);
  const list = level === "All" ? courses : courses.filter((c) => c.level === level);

  return (
    <div>
      <PageHeader
        module={6}
        title="Learning Hub"
        subtitle="Courses, lab technique videos, quizzes and certifications built by working scientists."
      />

      <Tabs value={level} onValueChange={setLevel}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          {LEVELS.map((l) => (
            <TabsTrigger key={l} value={l}>
              {l}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={level} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-5">
                <Badge variant="secondary" className="text-[10px]">
                  {c.level}
                </Badge>
                <h3 className="mt-2 font-bold leading-snug">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.instructor} · {c.lessons} lessons · {c.hours}h
                </p>
                <Progress value={c.progress} className="mt-3 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">{c.progress}% complete</p>
                <Button
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => toast.success(c.progress > 0 ? "Resuming course…" : "Enrolled — first lesson unlocked")}
                >
                  <PlayCircle className="mr-1.5 h-4 w-4" />
                  {c.progress > 0 ? "Continue" : "Enroll free"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card className="mt-6 max-w-2xl">
        <CardContent className="p-5">
          <h3 className="font-bold">Interactive quiz</h3>
          <p className="mt-1 text-sm text-muted-foreground">{QUIZ.q}</p>
          <div className="mt-3 grid gap-2">
            {QUIZ.options.map((o, i) => (
              <button
                key={o}
                onClick={() => {
                  setPicked(i);
                  toast[i === QUIZ.answer ? "success" : "error"](
                    i === QUIZ.answer ? "Correct — +10 RP" : "Not quite, try again",
                  );
                }}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  picked === i
                    ? i === QUIZ.answer
                      ? "border-primary bg-primary/10"
                      : "border-destructive bg-destructive/10"
                    : "border-border hover:bg-secondary"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
