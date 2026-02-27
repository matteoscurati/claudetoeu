import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: "Europe was built on the idea that power must have limits.", highlight: false },
  { text: "Now add the world's leading AI safety lab.", highlight: false },
  { text: "And you have the foundation for a new era of responsible AI.", highlight: false },
  {
    text: "America punishes principle. Europe should reward it.",
    highlight: true,
  },
];

export default function Opportunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = linesContainerRef.current;
    if (!section || !container) return;

    const lineEls = container.querySelectorAll(".manifesto-line");

    // Pin the section
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        lineEls.forEach((el, i) => {
          const lineStart = i / lines.length;
          const lineEnd = (i + 0.8) / lines.length;
          const lineProgress = Math.max(0, Math.min(1, (progress - lineStart) / (lineEnd - lineStart)));

          // Reveal words
          const words = el.querySelectorAll(".word");
          words.forEach((word, wi) => {
            const wordProgress = Math.max(
              0,
              Math.min(1, (lineProgress - wi / words.length) * words.length)
            );
            (word as HTMLElement).style.opacity = String(wordProgress);
            (word as HTMLElement).style.transform = `translateY(${(1 - wordProgress) * 15}px)`;
          });
        });

        // Background color transition: dark -> warm cream
        const bgProgress = Math.min(1, progress * 1.5);
        section.style.backgroundColor = lerpColor("#0A0A12", "#EEECE2", bgProgress);

        // Text color transition
        lineEls.forEach((el) => {
          (el as HTMLElement).style.color = lerpColor("#ffffff", "#0A0A12", bgProgress);
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#0A0A12" }}
    >
      <h2 className="font-mono text-sm text-eu-gold tracking-[0.3em] uppercase mb-16">
        The Manifesto
      </h2>

      <div ref={linesContainerRef} className="max-w-5xl w-full space-y-10">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`manifesto-line font-serif leading-snug ${
              line.highlight
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                : "text-2xl sm:text-3xl md:text-4xl font-bold"
            }`}
          >
            {line.text.split(" ").map((word, wi) => (
              <span
                key={wi}
                className={`word inline-block mr-[0.3em] ${
                  line.highlight ? "text-eu-blue" : ""
                }`}
                style={{ opacity: 0, transition: "none" }}
              >
                {word}
              </span>
            ))}
          </p>
        ))}
      </div>

      {/* Hashtag watermark for screenshot */}
      <div className="absolute bottom-6 right-6 font-mono text-xs opacity-30">
        claudetoeu.com &middot; #ClaudeToEU
      </div>
    </section>
  );
}

function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.replace("#", ""), 16);
  const bh = parseInt(b.replace("#", ""), 16);

  const ar = (ah >> 16) & 0xff;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;

  const br = (bh >> 16) & 0xff;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;

  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);

  return `rgb(${rr},${rg},${rb})`;
}
