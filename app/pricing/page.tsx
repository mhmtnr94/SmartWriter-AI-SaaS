"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const FREE_PRICE_ID = "price_free_placeholder";
const PRO_PRICE_ID = "price_pro_placeholder";

const features = [
  { label: "AI Blog Generation", free: true, pro: true },
  { label: "Title & Outline Suggestions", free: true, pro: true },
  { label: "Rich Text Editor", free: true, pro: true },
  { label: "Export to Markdown/HTML", free: false, pro: true },
  { label: "Usage Quota", free: "5 posts/mo", pro: "Unlimited" },
  { label: "Priority Support", free: false, pro: true },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [error, setError] = useState("");

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, email: user?.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start checkout");
      }
    } catch (err: any) {
      setError("Failed to start checkout");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-center">Pricing</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-10 text-center max-w-2xl">
        Choose the plan that fits your needs. Upgrade anytime for more features and unlimited AI writing.
      </p>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
          <div className="text-3xl font-extrabold mb-4">$0<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 w-full">
            {features.map(f => (
              <li key={f.label} className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                <span>{f.label}</span>
                <span>{f.free === true ? "✔️" : f.free === false ? "—" : f.free}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full py-2 rounded bg-gray-300 text-gray-700 font-semibold cursor-not-allowed"
            disabled
          >
            Current Plan
          </button>
        </div>
        {/* Pro Plan */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 flex flex-col items-center border-2 border-blue-600">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">Pro</h2>
          <div className="text-3xl font-extrabold mb-4">$19<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 w-full">
            {features.map(f => (
              <li key={f.label} className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                <span>{f.label}</span>
                <span>{f.pro === true ? "✔️" : f.pro === false ? "—" : f.pro}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => handleCheckout(PRO_PRICE_ID)}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Upgrade to Pro"}
          </button>
        </div>
      </div>
    </div>
  );
} 