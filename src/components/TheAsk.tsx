import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const actions = [
  {
    number: "01",
    title: "Fast-track visas for every Anthropic employee",
    desc: "Show the world that Europe welcomes those who choose responsibility over submission.",
  },
  {
    number: "02",
    title: "Regulation designed for safety-by-design",
    desc: "Europe already leads the world in AI governance. Extend that leadership to welcome safety-first labs.",
  },
  {
    number: "03",
    title: "Investment matching from sovereign funds",
    desc: "Match Anthropic's funding with European sovereign wealth. Make it the best deal on Earth.",
  },
  {
    number: "04",
    title: "An official EU statement of welcome",
    desc: 'A public declaration: "Europe stands with those who put humanity first."',
  },
];

export default function TheAsk() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemsRef.current) return;
    const items = itemsRef.current.querySelectorAll(".ask-item");

    gsap.set(items, { opacity: 0, x: -30 });

    ScrollTrigger.create({
      trigger: itemsRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full bg-eu-blue flex flex-col items-center justify-center px-6 py-24"
    >
      <h2 className="font-mono text-sm text-eu-gold tracking-[0.3em] uppercase mb-6">
        The Ask
      </h2>
      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-16 text-center">
        Roll out the <span className="text-eu-gold">red carpet</span>
      </h3>

      <div ref={itemsRef} className="max-w-3xl w-full space-y-6">
        {actions.map((action) => (
          <div
            key={action.number}
            className="ask-item flex gap-6 items-start bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 glass-card"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-eu-gold/20 flex items-center justify-center">
              <span className="font-mono text-eu-gold font-bold text-sm">
                {action.number}
              </span>
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                {action.title}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">{action.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
