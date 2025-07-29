// app/editor/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [outline, setOutline] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // User kontrolü ekleyin
    if (!user) {
      setError("Kullanıcı oturumu bulunamadı!");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.from("posts").insert({
        user_id: user.id,
        title,
        content,
        created_at: new Date().toISOString(),
      }).select();

      if (error) {
        console.error("Supabase error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        if (error.code === '42P01') {
          setError("Posts table not found. Please create the table in your Supabase database.");
        } else if (error.code === '23505') {
          setError("A post with this title already exists.");
        } else {
          setError(error.message || "Database error occurred");
        }
        return;
      }

      console.log("Post created successfully:", data);
      // Başarılı olduğunda dashboard'a yönlendir
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Post oluşturma hatası:", error);
      setError(error?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, outline }),
      });
      const data = await res.json();
      if (data.content) {
        setContent(data.content);
      } else {
        setAiError(data.error || "Failed to generate content");
      }
    } catch (err) {
      setAiError("Failed to generate content");
    }
    setAiLoading(false);
  };

  // Kullanıcı girişi yapılmamışsa
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Lütfen önce giriş yapın</p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yeni Post Oluştur</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={loading || aiLoading}
          />
        </div>
        <div>
          <textarea
            placeholder="Ana hat (Outline) - örn: Giriş, Ana Noktalar, Sonuç"
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            className="w-full p-2 border rounded h-24"
            disabled={loading || aiLoading}
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={handleAIGenerate}
            className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
            disabled={aiLoading || !title || !outline}
          >
            {aiLoading ? "AI Generating..." : "Generate with AI"}
          </button>
          {aiError && <span className="text-red-500 text-sm">{aiError}</span>}
        </div>
        <div>
          <textarea
            placeholder="İçerik"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-48"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}