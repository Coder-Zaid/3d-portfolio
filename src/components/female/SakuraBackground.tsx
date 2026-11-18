"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  rotation: string;
  swayDuration: string;
}

const SakuraBackground = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate random petals
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 12}s`,
      size: `${8 + Math.random() * 14}px`,
      rotation: `${Math.random() * 360}deg`,
      swayDuration: `${4 + Math.random() * 4}s`,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[-15] female-theme bg-[#FAF9F6]">
      {/* Background Soft Pastel Mesh Gradients */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply filter blur-3xl pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #F9C6D4 0%, transparent 40%),
            radial-gradient(circle at 80% 40%, #FAF9F6 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, #F9C6D4 0%, transparent 45%),
            radial-gradient(circle at 70% 90%, #FAF9F6 0%, transparent 35%)
          `
        }}
      />

      {/* Floating Sakura Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: `${petal.duration}, ${petal.swayDuration}`,
            animationName: "sakura-fall, sakura-sway",
            animationIterationCount: "infinite, infinite",
            animationTimingFunction: "linear, ease-in-out",
            top: "-20px",
          }}
        >
          {/* Leaf/Petal Shape */}
          <div
            style={{
              width: petal.size,
              height: `calc(${petal.size} * 1.3)`,
              backgroundColor: "#F9C6D4",
              opacity: 0.75,
              borderRadius: "80% 10% 85% 10%",
              transform: `rotate(${petal.rotation})`,
              boxShadow: "0 2px 5px rgba(249, 198, 212, 0.4)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SakuraBackground;
