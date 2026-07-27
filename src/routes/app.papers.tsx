import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BookMarked, CheckCircle2, Clock, Search, Upload } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FIELDS, papers as seedPapers, type Paper } from "@/lib/mock-data";

export const Route = createFileRoute("/app/papers")({ component: PapersPage });

const CATEGORIES = [
  "Natural Sciences",
  "Engineering & Technology",
  "Medical & Health Sciences",
  "Computer Science & AI",
  "Social Sciences",
  "Mathematics & Statistics",
  "Environmental Science",
  "Psychology & Behavioural Science",
  "Economics & Business Research",
  "Interdisciplinary Research",
];

const STYLES = ["APA", "MLA", "Chicago", "Harvard"] as const;

function formatCitation(p: Paper, style: (typeof STYLES)[number]) {
  const authors = p.authors.join(", ");
  switch (style) {
    case "APA":
      return `${authors} (${p.year}). ${p.title}. LabLink Pre-prints. https://doi.org/${p.doi}`;
    case "MLA":
      return `${authors}. "${p.title}." LabLink Pre-prints, ${p.year}, doi:${p.doi}.`;
    case "Chicago":
      return `${authors}. "${p.title}." LabLink Pre-prints (${p.year}). https://doi.org/${p.doi}.`;
    case "Harvard":
      return `${authors} ${p.year}, '${p.title}', LabLink Pre-prints, doi: ${p.doi}.`;
  }
}

function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>(seedPapers);
  const [q, setQ] = useState("");
  const [field, setField] = useState("All fields");
  const [saved, setSaved] = useState<string[]>([]);

  // submission state
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [subField, setSubField] = useState(FIELDS[0]);
  const [coAuthors, setCoAuthors] = useState("");
  const [keywords, setKeywords] = useState("");
  const [openAccess, setOpenAccess] = useState(true);
  const [fileName, setFileName] = useState("");
  const [plagiarism, setPlagiarism] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  // citation
  const [citePaper, setCitePaper] = useState(seedPapers[0].id);
  const [style, setStyle] = useState<(typeof STYLES)[number]>("APA");

  const filtered = useMemo(
    () =>
      papers.filter(
        (p) =>
          (field === "All fields" || p.field === field) &&
          (p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.keywords.some((k) => k.toLowerCase().includes(q.toLowerCase())) ||
            p.authors.some((a) => a.toLowerCase().includes(q.toLowerCase()))),
      ),
    [papers, q, field],
  );

  const runPlagiarism = () => {
    if (!abstract.trim()) {
      toast.error("Add an abstract first");
      return;
    }
    setChecking(true);
    setPlagiarism(null);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 9) + 2;
      setPlagiarism(score);
      setChecking(false);
      toast.success(`Similarity check complete: ${score}% overlap`);
    }, 1200);
  };

  const submit = () => {
    if (!title.trim() || !abstract.trim()) {
      toast.error("Title and abstract are required");
      return;
    }
    if (plagiarism === null) {
      toast.error("Run the plagiarism check before submitting");
      return;
    }
    const id = `new-${Date.now()}`;
    setPapers((prev) => [
      {
        id,
        title: title.trim(),
        authors: ["You", ...coAuthors.split(",").map((c) => c.trim()).filter(Boolean)],
        field: subField,
        abstract: abstract.trim(),
        year: 2026,
        citations: 0,
        reads: 0,
        status: "Pre-print",
        openAccess,
        doi: `10.55921/lablink.2026.${Math.floor(Math.random() * 9000 + 1000)}`,
        keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
      },
      ...prev,
    ]);
    toast.success("Pre-print published — DOI assigned and sent for reviewer matching");
    setTitle("");
    setAbstract("");
    setCoAuthors("");
    setKeywords("");
    setFileName("");
    setPlagiarism(null);
  };

  const cited = papers.find((p) => p.id === citePaper) ?? papers[0];

  return (
    <div>
      <PageHeader
        module={2}
        title="Research Papers & Publishing"
        subtitle="Submit pre-prints with instant DOIs, manage versions and discover the global research library."
      />

      <Tabs defaultValue="library">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="library">Research library</TabsTrigger>
          <TabsTrigger value="submit">Submit a paper</TabsTrigger>
          <TabsTrigger value="cite">Citation generator</TabsTrigger>
          <TabsTrigger value="saved">My collections</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="mt-5">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles, authors, keywords…"
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

          <div className="mt-4 space-y-3">
            {filtered.map((p) => (
              <Card key={p.id}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={p.status === "Community Reviewed" ? "default" : "secondary"}>{p.status}</Badge>
                    {p.openAccess && (
                      <Badge variant="outline" className="text-[10px]">
                        Open Access
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">DOI {p.doi}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {p.authors.join(", ")} · {p.field} · {p.year}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.abstract}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.keywords.map((k) => (
                      <Badge key={k} variant="outline" className="text-[10px]">
                        #{k}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{p.citations} citations</span>
                    <span>· {p.reads.toLocaleString()} reads</span>
                    <div className="ml-auto flex gap-2">
                      <Button
                        size="sm"
                        variant={saved.includes(p.id) ? "secondary" : "outline"}
                        onClick={() => {
                          setSaved((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]));
                          toast.success(saved.includes(p.id) ? "Removed from collection" : "Saved to collection");
                        }}
                      >
                        <BookMarked className="mr-1.5 h-3.5 w-3.5" />
                        {saved.includes(p.id) ? "Saved" : "Save"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success("Added to Read Later queue")}>
                        <Clock className="mr-1.5 h-3.5 w-3.5" /> Read later
                      </Button>
                      <Button size="sm" onClick={() => toast.success("Opening full text…")}>
                        Read paper
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Paper submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="t">Title</Label>
                  <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Paper title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a">Abstract</Label>
                  <Textarea
                    id="a"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Background, methods, results, conclusion…"
                    className="min-h-[140px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    {abstract.trim() ? abstract.trim().split(/\s+/).length : 0} words · aim for 150–250
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Research category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Field</Label>
                    <Select value={subField} onValueChange={setSubField}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELDS.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co">Co-authors (comma separated)</Label>
                  <Input
                    id="co"
                    value={coAuthors}
                    onChange={(e) => setCoAuthors(e.target.value)}
                    placeholder="Amara Osei, Kenji Watanabe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kw">Keywords (comma separated)</Label>
                  <Input
                    id="kw"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="cryo-EM, ribosome"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Manuscript file (PDF, DOCX, LaTeX)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.tex,.zip"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setFileName(f.name);
                        toast.success(`${f.name} attached`);
                      }
                    }}
                  />
                  {fileName && (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Upload className="h-3 w-3" /> {fileName}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-semibold">Open Access</p>
                    <p className="text-xs text-muted-foreground">Make this paper free for everyone to read.</p>
                  </div>
                  <Switch checked={openAccess} onCheckedChange={setOpenAccess} />
                </div>
                <Button className="w-full" onClick={submit}>
                  Publish pre-print & assign DOI
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Plagiarism checker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={runPlagiarism} disabled={checking}>
                    {checking ? "Scanning 92M documents…" : "Run similarity check"}
                  </Button>
                  {checking && <Progress value={66} className="h-2" />}
                  {plagiarism !== null && (
                    <div className="rounded-xl border border-border p-3">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {plagiarism}% similarity
                      </p>
                      <Progress value={plagiarism} className="mt-2 h-2" />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Below the 15% threshold — cleared for peer review.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Version control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {["v3 · current draft", "v2 · reviewer revisions", "v1 · initial submission"].map((v, i) => (
                    <div key={v} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                      <span className={i === 0 ? "font-semibold" : "text-muted-foreground"}>{v}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={() => toast.success(`Restored ${v}`)}
                      >
                        Restore
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cite" className="mt-5">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px]">
                <Select value={citePaper} onValueChange={setCitePaper}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {papers.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title.slice(0, 60)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={style} onValueChange={(v) => setStyle(v as (typeof STYLES)[number])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-xl border border-border bg-secondary/50 p-4 text-sm">
                {formatCitation(cited, style)}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard?.writeText(formatCitation(cited, style));
                  toast.success(`${style} citation copied`);
                }}
              >
                Copy citation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-5 space-y-3">
          {saved.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No saved papers yet — use Save in the library to build your collection.
            </p>
          ) : (
            papers
              .filter((p) => saved.includes(p.id))
              .map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {p.authors.join(", ")} · {p.field}
                    </p>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
