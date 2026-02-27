import { useState, useCallback, useEffect, useRef } from "react";
import Preloader from "./components/Preloader";
import ProgressBar from "./components/ProgressBar";
import Hero from "./components/Hero";
import Context from "./components/Context";
import Opportunity from "./components/Opportunity";
import Equation from "./components/Equation";
import DataStats from "./components/DataStats";
import TheAsk from "./components/TheAsk";
import Close from "./components/Close";
import ShareBar from "./components/ShareBar";
import Footer from "./components/Footer";
import { trackSectionView } from "./lib/analytics";

const sectionNames = [
  "hero",
  "context",
  "opportunity",
  "equation",
  "data_stats",
  "the_ask",
  "close",
  "share",
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  const handlePreloaderDone = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading || !mainRef.current) return;
    const sections = mainRef.current.querySelectorAll("section");
    const tracked = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Array.from(sections).indexOf(entry.target as HTMLElement);
          const name = sectionNames[idx];
          if (name && !tracked.has(name)) {
            tracked.add(name);
            trackSectionView(name);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {loading && <Preloader onDone={handlePreloaderDone} />}
      <ProgressBar />
      <main ref={mainRef}>
        <Hero />
        <Context />
        <Opportunity />
        <Equation />
        <DataStats />
        <TheAsk />
        <Close />
        <ShareBar />
      </main>
      <Footer />
    </>
  );
}
