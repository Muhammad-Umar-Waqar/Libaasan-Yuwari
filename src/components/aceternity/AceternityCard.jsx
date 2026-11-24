import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Aceternity UI spotlight effect component - ready for upcoming pages
 */
export const AceternityCard = ({
  children,
  className,
  spotlightColor = "rgba(180, 138, 74, 0.15)",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[rgba(217,188,134,0.3)] bg-cream p-6 transition-all duration-300",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AceternityCard;
