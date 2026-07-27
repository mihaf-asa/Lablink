import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FIELDS, researchers } from "@/lib/mock-data";

export const Route = createFileRoute("/app/network")({ component: NetworkPage });

function NetworkPage() {
  const [q, setQ] = useState("");
  const [field, setField] = useState("All fields");
  const [following, setFollowing] = useState<string[]>([]);

  const list = useMemo(
    () =>
      researchers.filter(
        (r) =>
          (field === "All fields" || r.field === field) &&
          (r.name.toLowerCase().includes(q.toLowerCase()) ||
            r.institution.toLowerCase().includes(q.toLowerCase()) ||
            r.skills.some((s) => s.toLowerCase().includes(q.toLowerCase()))),
      ),
    [q, field],
  );

  const toggle = (r: (typeof researchers)[number]) => {
    setFollowing((f) => (f.includes(r.id) ? f.filter((x) => x !== r.id) : [...f, r.id]));
    toast.success(following.includes(r.id) ? `Unfollowed ${r.name}` : `Now following ${r.name}`);
  };

  return (
    <div>
      <PageHeader
        module={1}
        title="Global Directory & Network"
        subtitle="Search any researcher, professor or institution worldwide and build your collaboration graph."
      />

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, institution or skill…"
            className="pl-9"
          />
        </div>
        <Select value={field} onValueChange={setField}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All fields">All fields</SelectItem>
            {FIELDS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="text-sm font-bold">
                    {r.name.split(" ").slice(-2).map((s) => s[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-bold">{r.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.institution}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-[10px]">
                  Verified {r.verified}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {r.field}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {r.match}% match
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-secondary/60 p-2">
                  <p className="text-sm font-bold">{r.citations.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Citations</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2">
                  <p className="text-sm font-bold">{r.hIndex}</p>
                  <p className="text-[10px] text-muted-foreground">h-index</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">Open to: {r.openTo.join(", ")}</p>

              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant={following.includes(r.id) ? "secondary" : "default"}
                  className="flex-1"
                  onClick={() => toggle(r)}
                >
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                  {following.includes(r.id) ? "Following" : "Follow"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast.success(`Connection request sent to ${r.name}`)}
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {list.length === 0 && (
          <p className="text-sm text-muted-foreground">No researchers match that search yet.</p>
        )}
      </div>
    </div>
  );
}
