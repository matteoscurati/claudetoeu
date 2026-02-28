import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: "eye",
    title: "No mass surveillance",
    desc: "Anthropic refused to build AI systems for domestic mass surveillance programs.",
  },
  {
    icon: "crosshair",
    title: "No autonomous weapons",
    desc: "They said no to removing safeguards that prevent AI from making lethal decisions.",
  },
  {
    icon: "building",
    title: "The threat",
    desc: "The US government threatened to invoke the Defense Production Act to compel compliance.",
  },
];

function CardIcon({ type }: { type: string }) {
  if (type === "eye") {
    return (
      <svg viewBox="0 0 48 48" className="w-12 h-12 icon-draw" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-label="No surveillance">
        <ellipse cx="24" cy="24" rx="18" ry="12" />
        <circle cx="24" cy="24" r="6" />
        {/* Strike-through */}
        <line x1="8" y1="8" x2="40" y2="40" strokeWidth="3" className="text-red-500" stroke="currentColor" />
      </svg>
    );
  }
  if (type === "crosshair") {
    return (
      <svg viewBox="0 0 48 48" className="w-12 h-12 icon-draw" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-label="No autonomous weapons">
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="8" />
        <line x1="24" y1="4" x2="24" y2="16" />
        <line x1="24" y1="32" x2="24" y2="44" />
        <line x1="4" y1="24" x2="16" y2="24" />
        <line x1="32" y1="24" x2="44" y2="24" />
        <line x1="8" y1="8" x2="40" y2="40" strokeWidth="3" className="text-red-500" stroke="currentColor" />
      </svg>
    );
  }
  // building / pentagon
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 icon-draw" fill="none" stroke="currentColor" strokeWidth="2" role="img" aria-label="Government threat">
      <polygon points="24,4 44,18 38,40 10,40 4,18" />
      <rect x="18" y="26" width="12" height="14" />
    </svg>
  );
}

export default function Context() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cardEls = cardsRef.current.querySelectorAll(".context-card");

    gsap.set(cardEls, { opacity: 0, y: 60, rotateX: 15 });
    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(cardEls, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
        });
        // Stagger SVG stroke-draw animation
        const svgs = cardsRef.current!.querySelectorAll(".icon-draw");
        svgs.forEach((svg, i) => {
          setTimeout(() => svg.classList.add("drawn"), 200 + i * 250);
        });
      },
      once: true,
    });

    if (closingRef.current) {
      gsap.set(closingRef.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: closingRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(closingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full bg-navy flex flex-col items-center justify-center px-6 py-24"
    >
      <h2 className="font-mono text-sm text-eu-gold tracking-[0.3em] uppercase mb-16">
        What happened
      </h2>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        {cards.map((card) => (
          <div
            key={card.icon}
            className="context-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center glass-card"
          >
            <div className="flex justify-center mb-6 text-eu-gold">
              <CardIcon type={card.icon} />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-3">
              {card.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <p
        ref={closingRef}
        className="mt-20 text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl text-center leading-relaxed font-serif italic"
      >
        Anthropic chose principle over power.
        <br />
        <span className="text-anthropic-terra">
          Now they need a home that shares their values.
        </span>
      </p>
    </section>
  );
}
