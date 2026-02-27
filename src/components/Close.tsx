import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EUStars from "./EUStars";

gsap.registerPlugin(ScrollTrigger);

export default function Close() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const answerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Line 1 fade in
    if (line1Ref.current) {
      gsap.set(line1Ref.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: line1Ref.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
        },
        once: true,
      });
    }

    // Line 2 fade in
    if (line2Ref.current) {
      gsap.set(line2Ref.current, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: line2Ref.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" });
        },
        once: true,
      });
    }

    // Final answer - dramatic scale up
    if (answerRef.current) {
      gsap.set(answerRef.current, { opacity: 0, scale: 0.5 });
      ScrollTrigger.create({
        trigger: answerRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(answerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
          });
        },
        once: true,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-full bg-dark grid-bg flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p
        ref={line1Ref}
        className="text-xl sm:text-2xl md:text-3xl text-white/70 max-w-3xl font-serif italic leading-relaxed"
      >
        This isn't just about one company.
      </p>

      <p
        ref={line2Ref}
        className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed"
      >
        It's about whether the future of AI is shaped by those who build weapons, or those who build guardrails.
      </p>

      <div className="mt-16 relative">
        <EUStars size={240} className="mx-auto opacity-20" />
        <h2
          ref={answerRef}
          className="absolute inset-0 flex items-center justify-center font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
        >
          <span className="text-eu-gold">Europe.</span>
        </h2>
      </div>

      <p className="mt-8 text-xl sm:text-2xl text-white/60 font-serif italic">
        The answer is <span className="text-eu-gold font-bold">Europe</span>.
      </p>
    </section>
  );
}
