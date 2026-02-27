import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTypewriter } from "../hooks/useTypewriter";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const teaserRef = useRef<HTMLParagraphElement>(null);

  const quote = '"We cannot in good conscience accede to their request."';
  const { displayed, isDone } = useTypewriter(quote, { speed: 45, startDelay: 800 });

  useEffect(() => {
    if (isDone) {
      const t = setTimeout(() => setShowSubtitle(true), 400);
      return () => clearTimeout(t);
    }
  }, [isDone]);

  useEffect(() => {
    if (showSubtitle && subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      const t = setTimeout(() => setShowTeaser(true), 1200);
      return () => clearTimeout(t);
    }
  }, [showSubtitle]);

  useEffect(() => {
    if (showTeaser && teaserRef.current) {
      gsap.fromTo(
        teaserRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [showTeaser]);

  return (
    <section
      ref={sectionRef}
      className="section-full bg-dark grid-bg flex flex-col items-center justify-center px-6 text-center ambient-glow"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Attribution */}
        <p className="font-mono text-sm text-anthropic-terra/70 mb-8 tracking-widest uppercase">
          Dario Amodei, CEO of Anthropic
        </p>

        {/* Typewriter quote */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-5xl leading-tight">
          <span>{displayed}</span>
          {!isDone && <span className="typewriter-cursor" />}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl font-sans leading-relaxed"
          style={{ opacity: 0 }}
        >
          The world's leading AI safety lab just told the most powerful military on Earth:{" "}
          <span className="text-anthropic-terra font-semibold">No.</span>
        </p>

        {/* Teaser */}
        <p
          ref={teaserRef}
          className="mt-12 text-2xl sm:text-3xl md:text-4xl font-serif italic gold-shimmer"
          style={{ opacity: 0 }}
        >
          Europe, this is your moment.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 scroll-arrow" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/30"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
