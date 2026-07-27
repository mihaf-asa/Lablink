import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/assistant")({ component: AssistantPage });

const TOOLS = [
  { name: "Research topic generator", reply: "Three gap-driven topics in your field:\n1. Thermal tolerance of chaperone-bound ribosomal intermediates in extremophiles.\n2. Benchmarking cryo-EM motion correction across low-dose regimes.\n3. Open-data reproducibility audit of 2020–2025 imaging papers." },
  { name: "Literature search", reply: "12 highly relevant papers found. Top matches: Osei & Weber (2025), Nair (2025), Ferrari & Adeyemi (2025). Two of them are open access and citable immediately." },
  { name: "Writing assistant", reply: "Your abstract is passive-heavy. Suggested edit: lead with the finding, state the method in one clause, and close with the quantified result and its implication." },
  { name: "Methodology advisor", reply: "For a repeated-measures design with dropout, use a linear mixed-effects model with random intercepts per subject; report marginal and conditional R²." },
  { name: "Statistical advisor", reply: "Two independent groups with a continuous, right-skewed outcome: use Mann–Whitney U, or log-transform and run Welch's t-test. Report effect size (rank-biserial or Hedges' g)." },
  { name: "Summary generator", reply: "Key points: (1) novel chaperone-bound state observed; (2) reproducible across three preps; (3) stabilises assembly above 42°C; (4) raw micrographs released open access." },
  { name: "Research gap identifier", reply: "Across 340 indexed papers, replication studies represent under 4% of output in your subfield — a clear, fundable gap." },
  { name: "Hypothesis generator", reply: "Testable hypothesis: chaperone occupancy increases monotonically with temperature up to 45°C, after which assembly intermediates aggregate irreversibly." },
  { name: "Citation finder", reply: "For your methods claim, cite Osei & Weber (2025) and Volkova & Nair (2024); both are directly on-point and open access." },
  { name: "Paper review assistant", reply: "Pre-review flags: sample size justification missing, one figure lacks error bars, and the limitations section does not address selection bias." },
];

type Msg = { role: "user" | "ai"; text: string };

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "I'm your LabLink research assistant. Pick a tool or ask me anything about your research." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string, reply?: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            reply ??
            "Here's how I'd approach that: narrow the question to one measurable outcome, check the three most recent reviews in your field for existing coverage, then design the smallest experiment that could falsify your hypothesis.",
        },
      ]);
    }, 500);
  };

  return (
    <div>
      <PageHeader
        module={12}
        title="AI Research Assistant"
        subtitle="Topic generation, literature search, writing help, statistics advice and pre-review feedback."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="flex min-h-[520px] flex-col">
          <CardContent className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex-1 space-y-3 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about methods, statistics, writing or literature…"
                className="min-h-[44px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
              />
              <Button size="icon" onClick={() => send(input)} aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-4">
            <Badge variant="secondary" className="mb-1">
              <Sparkles className="mr-1 h-3 w-3" /> AI tools
            </Badge>
            {TOOLS.map((t) => (
              <button
                key={t.name}
                onClick={() => send(t.name, t.reply)}
                className="w-full rounded-lg border border-border p-2.5 text-left text-sm transition-colors hover:bg-secondary"
              >
                {t.name}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
