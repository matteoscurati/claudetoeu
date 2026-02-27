import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shareOnTwitter, shareOnLinkedIn, shareOnBluesky, copyLink } from "../lib/share";

gsap.registerPlugin(ScrollTrigger);

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.set(contentRef.current, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
      },
      once: true,
    });
  }, []);

  const handleCopy = async () => {
    const success = await copyLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-24 px-6"
    >
      <div ref={contentRef} className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-4">
          Spread the word
        </h2>
        <p className="text-dark/60 mb-10 text-lg">
          Share this with your MEPs, your network, and anyone who believes in a
          better future for AI.
        </p>

        {/* Share buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-dark/80 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <XIcon />
            Share on X
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="flex items-center gap-2 bg-[#0077B5] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#0077B5]/80 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <LinkedInIcon />
            Share on LinkedIn
          </button>
          <button
            onClick={shareOnBluesky}
            className="flex items-center gap-2 bg-[#0085FF] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#0085FF]/80 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <BlueskyIcon />
            Share on Bluesky
          </button>
        </div>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 bg-white border border-dark/10 text-dark px-6 py-3 rounded-full font-medium text-sm hover:border-eu-gold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,204,0,0.15)] active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <LinkIcon />
              Copy link
            </>
          )}
        </button>

        {/* Hashtag */}
        <p className="mt-10 font-mono text-2xl font-bold text-eu-blue">
          #ClaudeToEU
        </p>
      </div>
    </section>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function BlueskyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-9v-2h9v2zm0-4h-9v-2h9v2zm0-4h-9v-2h9v2z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
