import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BellRing, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { grants } from "@/lib/mock-data";

export const Route = createFileRoute("/app/funding")({ component: FundingPage });

function FundingPage() {
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      grants.filter(
        (g) =>
          g.name.toLowerCase().includes(q.toLowerCase()) ||
          g.funder.toLowerCase().includes(q.toLowerCase()) ||
          g.field.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <div>
      <PageHeader
        module={11}
        title="Funding & Grants"
        subtitle="A searchable grant database, alerts, application help and research crowdfunding."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search grants, funders, fields…" className="pl-9" />
          </div>
          <div className="mt-4 space-y-3">
            {list.map((g) => (
              <Card key={g.id}>
                <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-bold">{g.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {g.funder} · {g.field} · {g.stage}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge className="text-[10px]">{g.amount}</Badge>
                      <Badge variant="outline" className="text-[10px]">
                        Deadline {g.deadline}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <Button size="sm" onClick={() => toast.success("Application draft created from template")}>
                      Apply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Alert set for this funder")}>
                      <BellRing className="mr-1.5 h-3.5 w-3.5" /> Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Crowdfund your research</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold">Low-cost water testing kits for rural labs</p>
              <Progress value={62} className="mt-3 h-2" />
              <p className="mt-1 text-xs text-muted-foreground">$6,200 raised of $10,000 · 148 backers</p>
              <Button className="mt-3 w-full" onClick={() => toast.success("Campaign builder opened")}>
                Start a campaign
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget planner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Consumables</span><span>$3,400</span></div>
              <div className="flex justify-between"><span>Equipment time</span><span>$2,100</span></div>
              <div className="flex justify-between"><span>Travel & dissemination</span><span>$1,500</span></div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                <span>Total</span><span>$7,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
