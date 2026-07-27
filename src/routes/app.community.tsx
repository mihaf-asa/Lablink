import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Globe2, Lock, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/app/community")({ component: CommunityPage });

type Group = { id: string; name: string; kind: string; members: number; joined: boolean; blurb: string };

const SEED: Group[] = [
  { id: "g1", name: "Molecular Biology Circle", kind: "Field", members: 18240, joined: true, blurb: "Wet-lab methods, imaging and protein science." },
  { id: "g2", name: "Quantum Computing Society", kind: "Club", members: 9310, joined: false, blurb: "Algorithms, hardware and error correction." },
  { id: "g3", name: "Astrobiology Club", kind: "Club", members: 5120, joined: false, blurb: "Life beyond Earth, from extremophiles to exoplanets." },
  { id: "g4", name: "University of Dhaka Research Hub", kind: "University", members: 3480, joined: true, blurb: "Official institution group for students and faculty." },
  { id: "g5", name: "South Asia Climate Researchers", kind: "Regional", members: 2740, joined: false, blurb: "Regional monsoon, air quality and adaptation research." },
  { id: "g6", name: "Thermal Ribosome Atlas (private)", kind: "Project", members: 6, joined: true, blurb: "Private workspace group for project collaborators." },
  { id: "g7", name: "NeurIPS 2026 Attendees", kind: "Conference", members: 12400, joined: false, blurb: "Pre-conference networking and paper threads." },
];

const THREADS = [
  { title: "Is replication failing because of incentives, not methods?", replies: 148, tag: "Research Thread" },
  { title: "Open challenge: predict protein aggregation from sequence alone", replies: 62, tag: "Research Challenge" },
  { title: "Annotated reading list: causal inference for observational data", replies: 39, tag: "Citation Sharing" },
];

function CommunityPage() {
  const [groups, setGroups] = useState(SEED);
  const [name, setName] = useState("");
  const [blurb, setBlurb] = useState("");

  const toggle = (id: string) => {
    setGroups((g) => g.map((x) => (x.id === id ? { ...x, joined: !x.joined, members: x.members + (x.joined ? -1 : 1) } : x)));
    const grp = groups.find((g) => g.id === id);
    toast.success(grp?.joined ? `Left ${grp.name}` : `Joined ${grp?.name}`);
  };

  const create = () => {
    if (!name.trim()) {
      toast.error("Name your group");
      return;
    }
    setGroups((g) => [
      { id: `n${Date.now()}`, name: name.trim(), kind: "Project", members: 1, joined: true, blurb: blurb.trim() || "New research group" },
      ...g,
    ]);
    setName("");
    setBlurb("");
    toast.success("Group created");
  };

  return (
    <div>
      <PageHeader
        module={4}
        title="Groups & Community"
        subtitle="Field groups, university hubs, private project spaces and deep research threads."
      />

      <Tabs defaultValue="groups">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="threads">Research threads</TabsTrigger>
          <TabsTrigger value="create">Create a group</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((g) => (
            <Card key={g.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {g.kind}
                  </Badge>
                  {g.kind === "Project" ? (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Globe2 className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <h3 className="mt-2 font-bold leading-snug">{g.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {g.members.toLocaleString()} members
                  </span>
                  <Button size="sm" variant={g.joined ? "secondary" : "default"} onClick={() => toggle(g.id)}>
                    {g.joined ? "Joined" : "Join"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="threads" className="mt-5 space-y-3">
          {THREADS.map((t) => (
            <Card key={t.title}>
              <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
                <div className="min-w-0">
                  <Badge variant="outline" className="text-[10px]">
                    {t.tag}
                  </Badge>
                  <p className="mt-2 font-semibold">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.replies} replies</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success("Thread opened")}>
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="mt-5">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle className="text-base">New group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Group name" />
              <Textarea value={blurb} onChange={(e) => setBlurb(e.target.value)} placeholder="What is this group about?" />
              <Button onClick={create}>Create group</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
