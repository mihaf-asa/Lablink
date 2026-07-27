import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckSquare, MessageSquare, Plus, Video } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/app/projects")({ component: ProjectsPage });

type Task = { id: string; text: string; done: boolean; owner: string; due: string };

function ProjectsPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "t1", text: "Finalise cryo-EM data processing pipeline", done: true, owner: "Amara", due: "Jul 21" },
    { id: "t2", text: "Draft methods section", done: false, owner: "You", due: "Aug 02" },
    { id: "t3", text: "Run replicate experiment #4", done: false, owner: "Kenji", due: "Aug 09" },
    { id: "t4", text: "Prepare figures for submission", done: false, owner: "Lucia", due: "Aug 15" },
  ]);
  const [newTask, setNewTask] = useState("");
  const done = tasks.filter((t) => t.done).length;

  return (
    <div>
      <PageHeader
        module={7}
        title="Collaboration & Projects"
        subtitle="Workspaces, tasks, milestones and the collaboration board for finding co-researchers."
      />

      <Tabs defaultValue="workspace">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="board">Collaboration board</TabsTrigger>
          <TabsTrigger value="comms">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thermal Ribosome Atlas — task board</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={(done / tasks.length) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {done} of {tasks.length} tasks complete
              </p>
              {tasks.map((t) => (
                <div key={t.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3">
                  <Checkbox
                    checked={t.done}
                    onCheckedChange={() =>
                      setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                    }
                  />
                  <span className={`min-w-0 truncate text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>
                    {t.text}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {t.owner} · {t.due}
                  </span>
                </div>
              ))}
              <div className="flex gap-2">
                <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a task…" />
                <Button
                  onClick={() => {
                    if (!newTask.trim()) return;
                    setTasks((p) => [...p, { id: `n${Date.now()}`, text: newTask.trim(), done: false, owner: "You", due: "TBD" }]);
                    setNewTask("");
                    toast.success("Task added");
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.milestone}</p>
                  <Progress value={p.progress} className="mt-2 h-1.5" />
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => toast.success("Progress report generated")}>
                <CheckSquare className="mr-1.5 h-4 w-4" /> Generate progress report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board" className="mt-5 grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Badge variant={p.open ? "default" : "secondary"} className="text-[10px]">
                    {p.open ? "Open to contributors" : "Team full"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{p.members} members</span>
                </div>
                <h3 className="mt-2 font-bold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">Led by {p.lead}</p>
                <p className="mt-2 text-xs text-muted-foreground">Needs: {p.needs.join(", ")}</p>
                <Button
                  size="sm"
                  className="mt-3"
                  disabled={!p.open}
                  onClick={() => toast.success("Application sent to project lead")}
                >
                  Apply to join
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="comms" className="mt-5 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team channel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {[
                { who: "Amara", msg: "Dataset 3 uploaded to the shared drive." },
                { who: "Kenji", msg: "Replicate 4 starts tomorrow at 08:00." },
                { who: "You", msg: "I'll have the methods draft by Friday." },
              ].map((m, i) => (
                <div key={i} className="rounded-lg bg-secondary/60 p-2.5">
                  <span className="font-semibold">{m.who}: </span>
                  <span className="text-muted-foreground">{m.msg}</span>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => toast.success("Message sent")}>
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Send message
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Meetings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">Next: weekly sync, Thursday 15:00 UTC</p>
              <Button onClick={() => toast.success("Video room opened")}>
                <Video className="mr-1.5 h-4 w-4" /> Start video call
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
