import { useState, useEffect, useCallback } from "react";

export function useTypewriter(
  text: string,
  options: { speed?: number; startDelay?: number; enabled?: boolean } = {}
) {
  const { speed = 50, startDelay = 500, enabled = true } = options;
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  const reset = useCallback(() => {
    setDisplayed("");
    setIsDone(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    reset();

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed + Math.random() * 30);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, enabled, reset]);

  return { displayed, isDone, reset };
}
