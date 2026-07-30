// src/components/logo.tsx
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/app/feed" className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 p-1">
        <img 
          src="/favicon.ico" 
          alt="Lablink Logo" 
          className="h-5 w-5 object-contain" 
        />
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">
        Lablink
      </span>
    </Link>
  );
}
