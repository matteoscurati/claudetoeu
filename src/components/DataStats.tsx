import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "../hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    end: 1.6,
    decimals: 1,
    prefix: "",
    suffix: "M",
    label: "AI professionals in Europe",
    desc: "35% of all AI master's graduates worldwide. More AI talent per capita than the US.",
    source: "Euronews, 2026",
  },
  {
    end: 892,
    decimals: 0,
    prefix: "€",
    suffix: "B",
    label: "Projected EU AI market by 2033",
    desc: "From €78B today to nearly a trillion. 450 million consumers who value privacy.",
    source: "Dimension Market Research",
  },
  {
    end: 900,
    decimals: 0,
    prefix: "+",
    suffix: "%",
    label: "Anthropic's European revenue growth",
    desc: "EMEA team tripled. New offices in Paris and Munich. London, Dublin, Zurich already active.",
    source: "Anthropic, Nov 2025",
  },
];

function StatCard({
  stat,
  enabled,
}: {
  stat: (typeof stats)[number];
  enabled: boolean;
}) {
  const { formatted } = useCountUp(stat.end, {
    decimals: stat.decimals,
    prefix: stat.prefix,
    suffix: stat.suffix,
    enabled,
  });

  return (
    <div className="data-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-eu-gold/30 transition-colors duration-300">
      <p className="font-mono text-4xl sm:text-5xl font-bold text-eu-gold mb-3">
        {formatted}
      </p>
      <h3 className="font-serif text-xl font-bold text-white mb-3">
        {stat.label}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed mb-4">{stat.desc}</p>
      <p className="font-mono text-xs text-white/30">{stat.source}</p>
    </div>
  );
}

export default function DataStats() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const [countersEnabled, setCountersEnabled] = useState(false);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cardEls = cardsRef.current.querySelectorAll(".data-card");

    gsap.set(cardEls, { opacity: 0, y: 60, rotateX: 15 });
    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: "top 75%",
      onEnter: () => {
        setCountersEnabled(true);
        gsap.to(cardEls, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
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
    <section className="section-full bg-navy flex flex-col items-center justify-center px-6 py-24">
      <h2 className="font-mono text-sm text-eu-gold tracking-[0.3em] uppercase mb-16">
        The Numbers
      </h2>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} enabled={countersEnabled} />
        ))}
      </div>

      <p
        ref={closingRef}
        className="mt-20 font-serif italic text-white/60 text-lg sm:text-xl max-w-3xl text-center leading-relaxed"
      >
        Anthropic has already voted with its feet.{" "}
        <span className="text-eu-gold">
          Now it's time to vote with its headquarters.
        </span>
      </p>
    </section>
  );
}
