"use client";

import { useState, useEffect } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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
          type: "demo",
          institution,
          notes: notes.trim() || undefined
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Demo request received!");
        setEmail("");
        setInstitution("");
        setNotes("");

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setMessage("");
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to submit. Please check your connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#595959] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="space-y-6">
          <div>
            <h2 className="font-sans font-bold text-[28px] text-[#1A1A1A] mb-2">
              Request a Demo
            </h2>
            <p className="font-sans text-[16px] text-[#595959]">
              For institutions interested in structured phonics at scale.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="font-sans text-[18px] text-[#30A46C] font-semibold mb-2">
                ✓ {message}
              </div>
              <p className="font-sans text-[14px] text-[#595959]">
                Closing in a moment...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-sans text-[14px] font-medium text-[#1A1A1A] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 font-sans text-[16px] bg-white border-2 border-[#DCDCDC] rounded-lg focus:border-[#30A46C] focus:outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="institution" className="block font-sans text-[14px] font-medium text-[#1A1A1A] mb-2">
                  Institution Name
                </label>
                <input
                  id="institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Your school or organization"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 font-sans text-[16px] bg-white border-2 border-[#DCDCDC] rounded-lg focus:border-[#30A46C] focus:outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block font-sans text-[14px] font-medium text-[#1A1A1A] mb-2">
                  Notes <span className="text-[#8C8C8C] font-normal">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Suggest a date and time that works well for you..."
                  disabled={status === "loading"}
                  rows={3}
                  className="w-full px-4 py-3 font-sans text-[16px] bg-white border-2 border-[#DCDCDC] rounded-lg focus:border-[#30A46C] focus:outline-none disabled:opacity-50 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="font-sans text-[14px] text-red-600">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[16px] px-6 py-3 rounded-full transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "loading" ? "Submitting..." : "Request Demo"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
