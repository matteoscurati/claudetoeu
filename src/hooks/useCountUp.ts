import { useState, useEffect, useRef } from "react";

export function useCountUp(
  end: number,
  options: {
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    enabled?: boolean;
  } = {}
) {
  const { duration = 2000, decimals = 1, prefix = "", suffix = "", enabled = false } = options;
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, enabled]);

  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`;
  return { value, formatted };
}
