// app/components/ClientAuthProvider.tsx
"use client";

import { AuthProvider } from "../context/AuthContext";

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
