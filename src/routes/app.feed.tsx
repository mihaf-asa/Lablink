import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MessageSquare, Send, Share2, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { feedPosts, papers, REACTIONS, researchers, type FeedPost } from "@/lib/mock-data";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/app/feed")({ component: FeedPage });

const POST_TYPES: FeedPost["type"][] = ["Research Post", "Lab Update", "Hypothesis", "Article", "Poll"];

function FeedPage() {
  const { user } = useSession();
  const [posts, setPosts] = useState<FeedPost[]>(feedPosts);
  const [draft, setDraft] = useState("");
  const [type, setType] = useState<FeedPost["type"]>("Research Post");
  const [filter, setFilter] = useState("All");
  const [reacted, setReacted] = useState<Record<string, string>>({});
  const [voted, setVoted] = useState<Record<string, string>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});

  const visible = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.type === filter)),
    [posts, filter],
  );

  const publish = () => {
    if (!draft.trim()) {
      toast.error("Write something before posting");
      return;
    }
    setPosts((prev) => [
      {
        id: `new-${Date.now()}`,
        author: user?.name ?? "You",
        role: `${user?.role ?? "Researcher"} · ${user?.institution ?? "LabLink"}`,
        time: "now",
        type,
        body: draft.trim(),
        tags: [user?.field ?? "Science"],
        reactions: { Insightful: 0, Groundbreaking: 0, "Needs Review": 0, Agree: 0, Disagree: 0 },
        comments: [],
      },
      ...prev,
    ]);
    setDraft("");
    toast.success("Posted to your research feed (+15 RP)");
  };

  const react = (postId: string, r: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const next = { ...p.reactions };
        const previous = reacted[postId];
        if (previous === r) {
          next[r] = Math.max(0, next[r] - 1);
        } else {
          if (previous) next[previous] = Math.max(0, next[previous] - 1);
          next[r] = (next[r] ?? 0) + 1;
        }
        return { ...p, reactions: next };
      }),
    );
    setReacted((prev) => ({ ...prev, [postId]: prev[postId] === r ? "" : r }));
  };

  const comment = (postId: string) => {
    const text = (commentDraft[postId] ?? "").trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, { author: user?.name ?? "You", text }] } : p,
      ),
    );
    setCommentDraft((prev) => ({ ...prev, [postId]: "" }));
    toast.success("Comment added");
  };

  const vote = (postId: string, option: string) => {
    if (voted[postId]) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId && p.poll
          ? {
              ...p,
              poll: {
                ...p.poll,
                options: p.poll.options.map((o) => (o.label === option ? { ...o, votes: o.votes + 1 } : o)),
              },
            }
          : p,
      ),
    );
    setVoted((prev) => ({ ...prev, [postId]: option }));
    toast.success("Vote recorded");
  };

  return (
    <div>
      <PageHeader
        module={4}
        title="Research Feed"
        subtitle="Personalised updates from your field, your institution and the people you follow."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-brand text-xs font-bold text-primary-foreground">
                    {(user?.name ?? "LL").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <Textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Share a finding, a lab update or a hypothesis…"
                    className="min-h-[80px] resize-none"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {POST_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                          type === t
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                    <Button size="sm" className="ml-auto" onClick={publish}>
                      <Send className="mr-1.5 h-3.5 w-3.5" /> Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
              {["All", ...POST_TYPES].map((t) => (
                <TabsTrigger key={t} value={t} className="text-xs">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {visible.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="text-xs font-bold">
                      {p.author.split(" ").slice(-2).map((s) => s[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <p className="truncate font-semibold">{p.author}</p>
                      <Badge variant="secondary" className="text-[10px]">
                        {p.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {p.role} · {p.time}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed">{p.body}</p>

                {p.poll && (
                  <div className="mt-4 space-y-2 rounded-xl border border-border p-3">
                    <p className="text-sm font-semibold">{p.poll.question}</p>
                    {p.poll.options.map((o) => {
                      const total = p.poll!.options.reduce((s, x) => s + x.votes, 0);
                      const pct = Math.round((o.votes / total) * 100);
                      return (
                        <button
                          key={o.label}
                          onClick={() => vote(p.id, o.label)}
                          className="block w-full text-left"
                          disabled={Boolean(voted[p.id])}
                        >
                          <div className="flex justify-between text-xs">
                            <span className={voted[p.id] === o.label ? "font-semibold text-primary" : ""}>
                              {o.label}
                            </span>
                            <span className="text-muted-foreground">{pct}%</span>
                          </div>
                          <Progress value={pct} className="mt-1 h-2" />
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px]">
                      #{t}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="flex flex-wrap gap-1.5">
                  {REACTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => react(p.id, r)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                        reacted[p.id] === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r} · {p.reactions[r] ?? 0}
                    </button>
                  ))}
                  <button
                    onClick={() => toast.success("Link copied to clipboard")}
                    className="ml-auto flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-3 w-3" /> Share
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {p.comments.map((c, i) => (
                    <div key={i} className="rounded-lg bg-secondary/60 p-2.5 text-sm">
                      <span className="font-semibold">{c.author}: </span>
                      <span className="text-muted-foreground">{c.text}</span>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Textarea
                      value={commentDraft[p.id] ?? ""}
                      onChange={(e) => setCommentDraft((prev) => ({ ...prev, [p.id]: e.target.value }))}
                      placeholder="Add a constructive, academic comment…"
                      className="min-h-[38px] resize-none py-2 text-sm"
                    />
                    <Button size="icon" variant="secondary" onClick={() => comment(p.id)} aria-label="Send comment">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" /> Trending papers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {papers.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-semibold leading-snug">{p.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.field} · {p.reads.toLocaleString()} reads · {p.citations} citations
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Suggested collaborators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {researchers.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="text-[10px] font-bold">
                      {r.name.split(" ").slice(-2).map((s) => s[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.field} · {r.match}% match
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Follow request sent to ${r.name}`)}>
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
