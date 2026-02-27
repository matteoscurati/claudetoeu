import { useEffect, useRef } from "react";
import gsap from "gsap";

interface EUStarsProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

export default function EUStars({
  size = 200,
  color = "#FFCC00",
  className = "",
  animate = true,
}: EUStarsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || !svgRef.current) return;
    const stars = svgRef.current.querySelectorAll(".eu-star");

    gsap.set(stars, { scale: 0, transformOrigin: "center center" });
    gsap.to(stars, {
      scale: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "back.out(1.7)",
      delay: 0.3,
    });

    // Slow rotation of the whole group
    gsap.to(svgRef.current.querySelector(".stars-group"), {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center",
    });
  }, [animate]);

  const r = size * 0.38;
  const starSize = size * 0.05;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="European Union stars"
    >
      <g className="stars-group">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <polygon
              key={i}
              className="eu-star"
              points={starPoints(x, y, starSize, starSize * 0.4)}
              fill={color}
            />
          );
        })}
      </g>
    </svg>
  );
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const points: string[] = [];
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 72 - 90) * (Math.PI / 180);
    const innerAngle = ((i * 72 + 36) - 90) * (Math.PI / 180);
    points.push(`${cx + outerR * Math.cos(outerAngle)},${cy + outerR * Math.sin(outerAngle)}`);
    points.push(`${cx + innerR * Math.cos(innerAngle)},${cy + innerR * Math.sin(innerAngle)}`);
  }
  return points.join(" ");
}
