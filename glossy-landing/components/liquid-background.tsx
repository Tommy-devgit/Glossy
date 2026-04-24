"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type LiquidBackgroundProps = {
  className?: string;
};

export function LiquidBackground({ className = "" }: LiquidBackgroundProps) {
  const orbsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      orbsRef.current.forEach((orb, index) => {
        if (!orb) {
          return;
        }

        gsap.to(orb, {
          x: `${index % 2 === 0 ? "+=" : "-="}${130 + index * 20}`,
          y: `${index % 2 === 0 ? "-=" : "+="}${90 + index * 18}`,
          duration: 15 + index * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        ref={(element) => {
          orbsRef.current[0] = element;
        }}
        className="liquid-orb h-[32rem] w-[32rem] -left-32 top-24 bg-[radial-gradient(circle_at_30%_20%,rgba(128,101,255,.55),rgba(11,11,12,.2)_60%)]"
      />
      <div
        ref={(element) => {
          orbsRef.current[1] = element;
        }}
        className="liquid-orb h-[28rem] w-[28rem] right-[-9rem] top-36 bg-[radial-gradient(circle_at_60%_30%,rgba(24,215,255,.42),rgba(11,11,12,.2)_62%)]"
      />
      <div
        ref={(element) => {
          orbsRef.current[2] = element;
        }}
        className="liquid-orb h-[34rem] w-[34rem] left-[28%] -bottom-60 bg-[radial-gradient(circle_at_60%_40%,rgba(150,118,255,.48),rgba(11,11,12,.2)_60%)]"
      />
      <div className="grain-overlay" />
    </div>
  );
}
