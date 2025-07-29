// app/auth/signout/page.tsx
"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error('SignOut hatası:', error);
        // Hata durumunda da signin sayfasına yönlendir
        router.push('/auth/signin');
      }
    };

    handleSignOut();
  }, [signOut, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Çıkış yapılıyor...</p>
      </div>
    </div>
  );
}