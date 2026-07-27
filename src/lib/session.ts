import { useEffect, useState } from "react";

export type LabUser = {
  name: string;
  email: string;
  role: "Student" | "Researcher" | "Professor";
  institution: string;
  field: string;
};

const KEY = "lablink-session";

export function readSession(): LabUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LabUser) : null;
  } catch {
    return null;
  }
}

export function saveSession(user: LabUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("lablink-session"));
}

export function clearSession() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("lablink-session"));
}

export function useSession() {
  const [user, setUser] = useState<LabUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setUser(readSession());
    sync();
    setReady(true);
    window.addEventListener("lablink-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("lablink-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, ready };
}
