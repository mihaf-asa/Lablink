import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveSession, type LabUser } from "@/lib/session";
import { FIELDS } from "@/lib/mock-data";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Log in or join LabLink" },
      { name: "description", content: "Sign in to LabLink to access your research feed, papers, mentors and tools." },
      { property: "og:title", content: "Log in or join LabLink" },
      { property: "og:description", content: "Access your scientific profile, papers, mentors and research tools." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Ayesha Rahman");
  const [email, setEmail] = useState("ayesha@university.edu");
  const [institution, setInstitution] = useState("University of Dhaka");
  const [role, setRole] = useState<LabUser["role"]>("Student");
  const [field, setField] = useState("Biology");

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      toast.error("Please fill in your name and email");
      return;
    }
    saveSession({ name, email, role, institution, field });
    toast.success(`Welcome to LabLink, ${name.split(" ")[0]}!`);
    navigate({ to: "/app/feed" });
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 grid-lab opacity-[0.15]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 surface-hero" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div className="hidden lg:block">
          <h1 className="text-4xl font-extrabold leading-tight">
            One account for your <span className="text-gradient">entire research life.</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Papers, mentorship, simulations, peer review, funding and collaboration — all connected to one verified
            scientific identity.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>• Instant DOI for every pre-print you publish</li>
            <li>• Mentor matching with verified professors</li>
            <li>• Research Points, badges and a grant-ready portfolio</li>
          </ul>
        </div>

        <Card className="mx-auto w-full max-w-md shadow-glow">
          <CardContent className="p-6">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Log in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-5">
                <form onSubmit={signIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="li-email">Academic email</Label>
                    <Input id="li-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="li-pass">Password</Label>
                    <Input id="li-pass" type="password" defaultValue="demo1234" />
                  </div>
                  <Button type="submit" className="w-full">
                    Log in to LabLink
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Demo mode — any details will sign you into the full platform.
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-5">
                <form onSubmit={signIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="su-name">Full name</Label>
                    <Input id="su-name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-email">Academic email</Label>
                    <Input id="su-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-inst">Institution</Label>
                    <Input id="su-inst" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>I am a</Label>
                      <Select value={role} onValueChange={(v) => setRole(v as LabUser["role"])}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Researcher">Researcher</SelectItem>
                          <SelectItem value="Professor">Professor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Field</Label>
                      <Select value={field} onValueChange={setField}>
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
                  <Button type="submit" className="w-full">
                    Create my scientific profile
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
