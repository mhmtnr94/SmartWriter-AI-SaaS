"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function UsageQuota() {
  const { user } = useAuth();
  const [quota, setQuota] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchQuota = async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("user_quotas")
        .select("remaining_quota")
        .eq("user_id", user.id)
        .single();
      if (error) setError("Failed to fetch quota");
      else setQuota(data?.remaining_quota ?? 0);
      setLoading(false);
    };
    fetchQuota();
  }, [user]);

  if (!user) return null;
  if (loading) return <div className="text-sm text-gray-500">Loading quota...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;

  return (
    <div className="text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded px-3 py-1 inline-block">
      OpenAI quota left: <span className="font-bold">{quota}</span>
    </div>
  );
} 