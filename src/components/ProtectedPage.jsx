'use client';

import { useSession } from "next-auth/react";

export default function ProtectedPage({ children }) {
  const { data: session, status } = useSession();

  // Temporairement, retourner directement le contenu sans vérification
  return <>{children}</>;

  // Code original commenté
  /*
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return <>{children}</>;
  */
}