import { useEffect, useState } from "react";
import EUStars from "./EUStars";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onDone, 600);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-label="Loading page"
      className={`fixed inset-0 z-[100] bg-dark flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <EUStars size={100} className="mx-auto mb-6" />
        <p className="font-mono text-sm text-eu-gold tracking-[0.3em] uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
