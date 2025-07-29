// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

// Supabase istemcisini oluştur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      // Session kontrolü
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Kullanıcı giriş yapmamışsa signin sayfasına yönlendir
        window.location.href = '/signin';
        return;
      }

      // Kullanıcı bilgilerini al
      setUser(session.user);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/signin';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={() => window.location.href = '/editor'}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create New Blog
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <div className="bg-gray-700 p-4 rounded">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>ID:</strong> {user?.id}</p>
              <p><strong>Last Sign In:</strong> {new Date(user?.last_sign_in_at).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-300">No recent activity</p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Account Status</h2>
            <p className="text-green-400">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}