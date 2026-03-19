"use client";

import { useState, useEffect } from "react";

const SESSION_KEY = "symphony_auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  // Check sessionStorage on mount (avoids flash of gate on reload)
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
    setReady(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const password = process.env.NEXT_PUBLIC_APP_PASSWORD;
    if (input === password) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  // Don't render anything until we've checked sessionStorage
  if (!ready) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f5f5f1] flex items-center justify-center">
      <div className="bg-white border border-[#b9b6ac] rounded-xl shadow-sm p-10 w-full max-w-sm flex flex-col items-center gap-6">
        {/* Recurly logo mark */}
        <div className="flex flex-col items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#FFD706"/>
            <text x="20" y="27" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#141411" fontFamily="sans-serif">R</text>
          </svg>
          <h1 className="font-bold text-[20px] leading-[28px] text-[#141411]" style={{ fontFamily: "sans-serif" }}>
            Payments Symphony
          </h1>
          <p className="text-[#737169] text-[13px] leading-[20px] text-center" style={{ fontFamily: "sans-serif" }}>
            Enter the password to access this prototype.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div>
            <label className="block text-[#737169] text-[11px] font-bold tracking-wide uppercase mb-1" style={{ fontFamily: "sans-serif" }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              autoFocus
              className={`w-full border rounded-lg bg-white text-[#141411] text-[13px] px-3 py-2 focus:outline-none ${
                error ? "border-red-400 focus:border-red-400" : "border-[#b9b6ac] focus:border-[#3077a3]"
              }`}
              placeholder="Enter password"
            />
            {error && (
              <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: "sans-serif" }}>
                Incorrect password. Try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#ffd706] font-bold text-[13px] text-[#141411] py-2 rounded-lg hover:bg-[#f5ce00] transition-colors cursor-pointer"
            style={{ fontFamily: "sans-serif" }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
