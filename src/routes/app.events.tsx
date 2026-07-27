import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";

export const Route = createFileRoute("/app/events")({ component: EventsPage });

function EventsPage() {
  const [registered, setRegistered] = useState<string[]>([]);

  return (
    <div>
      <PageHeader
        module={10}
        title="Events & Conferences"
        subtitle="Virtual conferences, hackathons, journal clubs, poster sessions and local meetups."
        action={
          <Button onClick={() => toast.success("Event creation wizard opened")}>
            <CalendarDays className="mr-2 h-4 w-4" /> Host an event
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-5">
              <Badge variant="secondary" className="text-[10px]">
                {e.type}
              </Badge>
              <h3 className="mt-2 font-bold leading-snug">{e.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {e.date} · hosted by {e.host}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> Online · {e.attendees.toLocaleString()} attending
              </p>
              <Button
                size="sm"
                className="mt-3 w-full"
                variant={registered.includes(e.id) ? "secondary" : "default"}
                onClick={() => {
                  setRegistered((r) => (r.includes(e.id) ? r.filter((x) => x !== e.id) : [...r, e.id]));
                  toast.success(registered.includes(e.id) ? "Registration cancelled" : `Registered for ${e.title}`);
                }}
              >
                {registered.includes(e.id) ? "Registered" : "Register"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
