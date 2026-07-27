import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground">
        <FlaskConical className="h-5 w-5" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        Lab<span className="text-gradient">Link</span>
      </span>
    </Link>
  );
}
