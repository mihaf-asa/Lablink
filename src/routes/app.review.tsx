import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { reviewQueue } from "@/lib/mock-data";

export const Route = createFileRoute("/app/review")({ component: ReviewPage });

const DIMENSIONS = ["Methodology", "Results", "Clarity", "Contribution"];

function ReviewPage() {
  const [scores, setScores] = useState<Record<string, number[]>>(
    Object.fromEntries(DIMENSIONS.map((d) => [d, [7]])),
  );
  const [blind, setBlind] = useState(true);
  const [comments, setComments] = useState("");

  const overall = (
    DIMENSIONS.reduce((s, d) => s + scores[d][0], 0) / DIMENSIONS.length
  ).toFixed(1);

  return (
    <div>
      <PageHeader
        module={8}
        title="Peer Review System"
        subtitle="Matched review assignments, structured scoring and reviewer reputation."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Structured review form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border border-border p-3">
              <p className="text-sm font-semibold">{reviewQueue[0].title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{reviewQueue[0].matchReason}</p>
            </div>
            {DIMENSIONS.map((d) => (
              <div key={d}>
                <Label>
                  {d}: {scores[d][0]} / 10
                </Label>
                <Slider
                  value={scores[d]}
                  onValueChange={(v) => setScores((s) => ({ ...s, [d]: v }))}
                  min={1}
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-semibold">Blind review</p>
                <p className="text-xs text-muted-foreground">Hide your identity from the authors.</p>
              </div>
              <Switch checked={blind} onCheckedChange={setBlind} />
            </div>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Constructive comments and requested revisions…"
              className="min-h-[120px]"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  if (!comments.trim()) return toast.error("Add written feedback before submitting");
                  toast.success(`Review submitted — overall score ${overall}/10 (+40 RP)`);
                }}
              >
                Submit review
              </Button>
              <Button variant="outline" onClick={() => toast.success("Revision request sent to authors")}>
                Request revisions
              </Button>
              <Button variant="ghost" onClick={() => toast.success("Conflict of interest declared")}>
                Declare conflict
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your review queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reviewQueue.map((r) => (
                <div key={r.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-semibold leading-snug">{r.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {r.field}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {r.blind ? "Blind" : "Open"}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      Due in {r.due}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reviewer reputation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-display text-3xl font-extrabold text-foreground">4.8 / 5</p>
              <p className="mt-1">32 completed reviews · 96% on time · Top Reviewer badge earned</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
