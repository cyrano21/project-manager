"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthChecker({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return children;
}
