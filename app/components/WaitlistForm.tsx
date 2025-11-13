"use client";

import { useState } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          type: "waitlist"
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Success! You're on the waitlist.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to submit. Please check your connection.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center space-y-4">
        <div className="font-sans text-[18px] text-[#30A46C] font-semibold">
          ✓ {message}
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="font-sans text-[14px] text-[#595959] underline underline-offset-4"
        >
          Submit another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="w-full sm:w-[280px] px-5 py-3 font-sans text-[16px] bg-white border-2 border-[#DCDCDC] rounded-full focus:border-[#30A46C] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <ShinyButton
          type="submit"
          disabled={status === "loading"}
          className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full border-0 hover:scale-105 transition-all duration-200 [&>span]:normal-case [&>span]:tracking-normal [&>span]:text-[18px] [&>span]:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </ShinyButton>
      </div>
      {status === "error" && (
        <p className="font-sans text-[14px] text-red-600 text-center">
          {message}
        </p>
      )}
    </form>
  );
}
