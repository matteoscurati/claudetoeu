import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Equation() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const equalsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [leftRef.current, plusRef.current, rightRef.current, equalsRef.current, resultRef.current];

    gsap.set(elements, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      onEnter: () => {
        // Left column
        gsap.to(leftRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
        // Plus sign
        gsap.to(plusRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power3.out" });
        // Right column
        gsap.to(rightRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: "power3.out" });
        // Equals
        gsap.to(equalsRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.9, ease: "power3.out" });
        // Result
        gsap.to(resultRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.2,
          ease: "power3.out",
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full bg-cream flex flex-col items-center justify-center px-6 py-24 text-dark"
    >
      <h2 className="font-mono text-sm text-eu-blue tracking-[0.3em] uppercase mb-16">
        The Equation
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 max-w-6xl w-full">
        {/* Anthropic */}
        <div
          ref={leftRef}
          className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center flex-1 max-w-sm border border-anthropic-terra/10"
        >
          <div className="font-mono text-3xl sm:text-4xl font-bold text-anthropic-terra mb-2">
            Safety-First AI
          </div>
          <p className="text-sm text-dark/60 mb-4">Anthropic's Stand</p>
          <p className="font-serif text-lg text-dark/80 italic">
            No mass surveillance. No autonomous weapons. No compromise.
          </p>
          <div className="mt-6 pt-4 border-t border-dark/10">
            <span className="text-2xl font-bold text-anthropic-terra">
              Claude
            </span>
            <p className="text-xs text-dark/50 mt-1">Built to be safe</p>
          </div>
        </div>

        {/* Plus */}
        <div ref={plusRef} className="text-5xl font-bold text-eu-blue/30">+</div>

        {/* Europe */}
        <div
          ref={rightRef}
          className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center flex-1 max-w-sm border border-eu-blue/10"
        >
          <div className="font-mono text-3xl sm:text-4xl font-bold text-eu-blue mb-2">
            Courage to Regulate
          </div>
          <p className="text-sm text-dark/60 mb-4">Europe's Promise</p>
          <p className="font-serif text-lg text-dark/80 italic">
            The only bloc brave enough to put limits on power. Democratic values, not corporate interests.
          </p>
          <div className="mt-6 pt-4 border-t border-dark/10">
            <span className="text-2xl font-bold text-eu-blue">
              27 nations
            </span>
            <p className="text-xs text-dark/50 mt-1">One voice for responsible AI</p>
          </div>
        </div>
      </div>

      {/* Equals */}
      <div ref={equalsRef} className="my-10 text-5xl font-bold text-dark/20">=</div>

      {/* Result */}
      <div
        ref={resultRef}
        className="bg-eu-blue rounded-2xl p-8 sm:p-12 text-center max-w-2xl w-full shadow-2xl"
      >
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
          Global AI <span className="text-eu-gold">Leadership</span>
        </h3>
        <p className="text-white/70 mt-4 text-lg">
          Principle + Courage = Leadership
        </p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-eu-gold/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              ["--duration" as string]: `${3 + Math.random() * 4}s`,
              ["--delay" as string]: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Screenshot watermark */}
      <div className="absolute bottom-6 right-6 font-mono text-xs text-dark/20">
        claudetoeu.com &middot; #ClaudeToEU
      </div>
    </section>
  );
}
