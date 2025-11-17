"use client";

import React from "react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-3xl mx-auto space-y-6 text-center text-white">
        <h1 className="text-4xl font-bold mb-2">
          🎮 InnerWords Admin Dashboard
        </h1>
        <p className="text-gray-300">
          The full analytics dashboard (unique IPs, visits, live stats) is
          temporarily disabled in this static build.
        </p>
        <p className="text-gray-300">
          The important bit is live: the daily InnerWords game at the home
          page. Once the core site is stable, we can wire this page back up
          to Convex or another backend.
        </p>

        <div className="mt-10 border border-slate-700 rounded-xl bg-slate-800/60 p-6">
          <h2 className="text-2xl font-semibold mb-2">
            Coming soon…
          </h2>
          <p className="text-gray-300">
            • Visitor analytics<br />
            • Score submissions overview<br />
            • Engagement trends over time
          </p>
        </div>
      </div>
    </main>
  );
}
