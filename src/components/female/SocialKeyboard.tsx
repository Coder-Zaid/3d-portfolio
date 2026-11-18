"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { usePreloader } from "../preloader";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface KeyDef {
  id: string;
  label: string;
  shortDesc: string;
  icon: React.ReactNode;
  color: "sakura" | "white" | "glitter";
  action?: () => void;
}

type ActiveSection = "hero" | "skills" | "experience" | "projects" | "contact";

/* ------------------------------------------------------------------ */
/*  Color Map                                                          */
/* ------------------------------------------------------------------ */
// Dual-tone color mapping: Pink keycaps (sakura) with white legends, White keycaps (white) with pink legends, and Glitter gradient keycaps (glitter)
const COLORS: Record<string, { bg: string; shadow: string; glow: string; text: string; gradient?: string }> = {
  sakura: { bg: "#FFAEC9", shadow: "#db8ca0", glow: "rgba(255,174,201,0.5)", text: "#ffffff" },
  white:  { bg: "#FFFFFF", shadow: "#ebd8dc", glow: "rgba(255,255,255,0.4)", text: "#d65e7a" },
  glitter: { 
    bg: "#FF9ebb", 
    shadow: "#db8ca0", 
    glow: "rgba(255,158,187,0.7)", 
    text: "#ffffff", 
    gradient: "linear-gradient(135deg, #FFC0CB 0%, #FFAEC9 50%, #FF69B4 100%)" 
  },
};

/* ------------------------------------------------------------------ */
/*  Bongo Cat Component                                                */
/* ------------------------------------------------------------------ */
const BongoCat = ({ activePaw }: { activePaw: "left" | "right" | null }) => {
  return (
    <div style={{
      position: "absolute",
      top: -65, // sitting perfectly on the top rim
      left: "50%",
      transform: "translateX(-50%)",
      width: 120,
      height: 70,
      pointerEvents: "none",
      zIndex: 10,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 120 70" fill="none">
        {/* Cat Ears */}
        {/* Left Ear */}
        <path
          d="M25 35 L12 10 L38 25 Z"
          fill="white"
          stroke="#7d2d3f"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M23 30 L16 14 L32 23 Z"
          fill="#FFAEC9"
        />
        
        {/* Right Ear */}
        <path
          d="M95 35 L108 10 L82 25 Z"
          fill="white"
          stroke="#7d2d3f"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M97 30 L104 14 L88 23 Z"
          fill="#FFAEC9"
        />

        {/* Cat Body */}
        <path
          d="M15 70 C15 25, 105 25, 105 70"
          fill="white"
          stroke="#7d2d3f"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Face Features */}
        {/* Happy closed eyes */}
        {/* Left eye */}
        <path
          d="M38 42 Q43 38 48 42"
          stroke="#7d2d3f"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right eye */}
        <path
          d="M72 42 Q77 38 82 42"
          stroke="#7d2d3f"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Muzzle / Mouth :3 */}
        <path
          d="M54 48 Q57 51 60 48 Q63 51 66 48"
          stroke="#7d2d3f"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute blush cheeks */}
        <circle cx="28" cy="48" r="5" fill="#FFAEC9" opacity="0.7" />
        <circle cx="92" cy="48" r="5" fill="#FFAEC9" opacity="0.7" />

        {/* Left Paw */}
        <motion.path
          d="M22 68 C22 55, 38 55, 38 68 Z"
          fill="white"
          stroke="#7d2d3f"
          strokeWidth="3.5"
          strokeLinejoin="round"
          animate={{
            y: activePaw === "left" ? 6 : 0,
            rotate: activePaw === "left" ? -8 : 0,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
          style={{ originX: "30px", originY: "68px" }}
        />

        {/* Right Paw */}
        <motion.path
          d="M82 68 C82 55, 98 55, 98 68 Z"
          fill="white"
          stroke="#7d2d3f"
          strokeWidth="3.5"
          strokeLinejoin="round"
          animate={{
            y: activePaw === "right" ? 6 : 0,
            rotate: activePaw === "right" ? 8 : 0,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
          style={{ originX: "90px", originY: "68px" }}
        />
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Keycap                                                             */
/* ------------------------------------------------------------------ */
const Keycap3D = ({
  keyDef,
  size = 64,
  index = 0,
  onHover,
  onLeave,
  onPress,
  floatingIntensity = 1,
}: {
  keyDef: KeyDef;
  size?: number;
  index?: number;
  onHover?: (k: KeyDef) => void;
  onLeave?: () => void;
  onPress?: (k: KeyDef) => void;
  floatingIntensity?: number;
}) => {
  const [pressed, setPressed] = useState(false);
  const { isLoading } = usePreloader();
  const c = COLORS[keyDef.color] || COLORS.sakura;
  const staggerDelay = index * 0.04;
  const floatDuration = 2.8 + (index % 4) * 0.4;
  const floatDelay = (index % 5) * 0.3;
  const floatY = 5 * floatingIntensity;

  const handlePress = useCallback(() => {
    try {
      const audio = new Audio("/assets/keycap-sounds/press.mp3");
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {}
    setPressed(true);
    if (onPress) onPress(keyDef);
    
    setTimeout(() => {
      setPressed(false);
      try {
        const audio = new Audio("/assets/keycap-sounds/release.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch {}
    }, 140);
    if (keyDef.action) keyDef.action();
  }, [keyDef, onPress]);

  const handleMouseEnter = useCallback(() => {
    try {
      const audio = new Audio("/assets/keycap-sounds/press.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch {}
    if (onHover) onHover(keyDef);
  }, [keyDef, onHover]);

  const handleMouseLeave = useCallback(() => {
    try {
      const audio = new Audio("/assets/keycap-sounds/release.mp3");
      audio.volume = 0.2;
      audio.play().catch(() => {});
    } catch {}
    if (onLeave) onLeave();
  }, [onLeave]);

    const keyWidth = 64;
    const keyHeight = 44;
    return (
    <motion.div
      className="relative group"
      style={{ width: keyWidth, height: keyHeight }}
      initial={{ opacity: 0, y: -80, rotateX: -40 }}
      animate={!isLoading ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: -80, rotateX: -40 }}
      transition={{
        delay: 0.8 + staggerDelay,
        duration: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0, floatY * 0.6, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        <motion.button
          onClick={handlePress}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="select-none outline-none border-none cursor-pointer"
          style={{ width: keyWidth, height: keyHeight, position: "relative" }}
          whileHover={{ y: -4, scale: 1.06 }}
          whileTap={{ y: 6, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* Bottom shadow layer — gives the thick 3D side */}
          <div
            style={{
              position: "absolute", inset: 0, borderRadius: 10,
              background: c.shadow,
              transform: pressed ? "translateY(3px)" : "translateY(8px)",
              boxShadow: pressed
                ? `0 2px 3px rgba(0,0,0,0.18)`
                : `0 8px 14px rgba(0,0,0,0.18), 0 3px 5px rgba(0,0,0,0.1)`,
              transition: "all 0.1s ease",
            }}
          />
          {/* Mid depth layer for extra thickness */}
          <div
            style={{
              position: "absolute", inset: 0, borderRadius: 10,
              background: `linear-gradient(180deg, ${c.shadow}cc, ${c.shadow})`,
              transform: pressed ? "translateY(1px)" : "translateY(5px)",
              transition: "all 0.1s ease",
            }}
          />
          {/* Top keycap face */}
          <div
            style={{
              position: "absolute", inset: 0, borderRadius: 10,
              background: c.gradient || `linear-gradient(145deg, ${c.bg}, ${c.shadow}22)`,
              border: `1.5px solid ${c.bg}`,
              boxShadow: pressed
                ? `inset 0 3px 6px rgba(0,0,0,0.1)`
                : `inset 0 -3px 6px rgba(0,0,0,0.08), inset 0 2px 2px rgba(255,255,255,0.8), 0 0 12px ${c.glow}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              color: c.text,
              transform: pressed ? "translateY(3px)" : "translateY(-2px)",
              transition: "all 0.1s ease",
            }}
          >
            {/* Specular highlight */}
            <div style={{
              position: "absolute", top: 2, left: 5, right: 5, height: "38%",
              borderRadius: "8px 8px 50% 50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
              pointerEvents: "none",
            }} />
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {keyDef.icon}
            </span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Hover Info Panel                                                   */
/* ------------------------------------------------------------------ */
const HoverPanel = ({ activeKey }: { activeKey: KeyDef | null }) => (
  <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
    <AnimatePresence mode="wait">
      {activeKey && (
        <motion.div
          key={activeKey.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          style={{
            textAlign: "center",
            color: "#7d2d3f",
            fontFamily: "monospace",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {activeKey.label}
          </div>
          <div style={{ fontSize: 10, opacity: 0.75, marginTop: 1 }}>
            {activeKey.shortDesc}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Section-based transform configs                                    */
/* ------------------------------------------------------------------ */
const SECTION_TRANSFORMS: Record<ActiveSection, { desktop: any; mobile: any }> = {
  hero: {
    desktop: { scale: 1.1, rotateX: 18, rotateY: -15, rotateZ: 2, y: 0, x: 400 },
    mobile:  { scale: 0.7, rotateX: 18, rotateY: -10, rotateZ: 2, y: -200, x: 0 },
  },
  skills: {
    desktop: { scale: 0.95, rotateX: 12, rotateY: 15, rotateZ: 0, y: -20, x: 0 },
    mobile:  { scale: 0.65, rotateX: 12, rotateY: 15, rotateZ: 0, y: -20, x: 0 },
  },
  experience: {
    desktop: { scale: 0.85, rotateX: 15, rotateY: -45, rotateZ: 0, y: 20, x: -200 },
    mobile:  { scale: 0.6,  rotateX: 15, rotateY: -20, rotateZ: 0, y: 20, x: 0 },
  },
  projects: {
    desktop: { scale: 0.8, rotateX: 30, rotateY: 30, rotateZ: 8, y: 40, x: 200 },
    mobile:  { scale: 0.6, rotateX: 20, rotateY: 15, rotateZ: 0, y: 150, x: 0 },
  },
  contact: {
    desktop: { scale: 0.7, rotateX: 20, rotateY: -15, rotateZ: 3, y: 10, x: 480 },
    mobile:  { scale: 0.55, rotateX: 20, rotateY: -10, rotateZ: 2, y: 180, x: 0 },
  },
};

/* ------------------------------------------------------------------ */
/*  Full Keyboard Component                                            */
/* ------------------------------------------------------------------ */
const SocialKeyboard = () => {
  const { isLoading } = usePreloader();
  const [activeKey, setActiveKey] = useState<KeyDef | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>("hero");
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const keyboardControls = useAnimation();
  // Heart key press counter and love message overlay visibility
  const [heartPressCount, setHeartPressCount] = useState(0);
  const [showLoveMessage, setShowLoveMessage] = useState(false);

  // Auto-dismiss the love message overlay after 5 seconds
  useEffect(() => {
    if (showLoveMessage) {
      const timer = setTimeout(() => {
        setShowLoveMessage(false);
        setHeartPressCount(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showLoveMessage]);

  // Bongo Cat tapping state
  const [activePaw, setActivePaw] = useState<"left" | "right" | null>(null);
  const [lastPaw, setLastPaw] = useState<"left" | "right">("left");

  useEffect(() => {
    const sectionIds: ActiveSection[] = ["hero", "skills", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as ActiveSection;
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        }
      },
      { threshold: 0.35 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const t = SECTION_TRANSFORMS[activeSection][isMobile ? "mobile" : "desktop"];
    keyboardControls.start({
      scale: t.scale,
      rotateX: t.rotateX,
      rotateY: t.rotateY,
      rotateZ: t.rotateZ,
      x: t.x,
      y: t.y,
      transition: { duration: 1.2, ease: "easeInOut" },
    });
  }, [activeSection, isMobile, keyboardControls]);

  const fireConfetti = (emoji?: string) => {
    if (emoji) {
      const scalar = 4;
      const shape = confetti.shapeFromText({ text: emoji, scalar });
      confetti({ particleCount: 25, spread: 70, origin: { y: 0.55 }, shapes: [shape], scalar });
    } else {
      confetti({
        particleCount: 60, spread: 90, origin: { y: 0.55 },
        colors: ["#FFAEC9", "#FFFFFF", "#FF8DA1", "#d65e7a"],
      });
    }
  };

  const openLink = (url: string) => { 
    setTimeout(() => window.open(url, "_blank"), 180); 
  };

  const handleKeyHover = useCallback((k: KeyDef) => {
    setActiveKey(k);
    
    // Toggle Bongo Cat paws on key hover
    const nextPaw = lastPaw === "left" ? "right" : "left";
    setActivePaw(nextPaw);
    setLastPaw(nextPaw);
  }, [lastPaw]);

  const handleKeyLeave = useCallback(() => {
    setActiveKey(null);
    setActivePaw(null);
  }, []);

  const handleKeyPress = useCallback((k: KeyDef) => {
    // Alternate Bongo Cat paws on tap
    const nextPaw = lastPaw === "left" ? "right" : "left";
    setActivePaw(nextPaw);
    setLastPaw(nextPaw);
    
    setTimeout(() => {
      setActivePaw(null);
    }, 100);
  }, [lastPaw]);

  /* ---------- Social Key definitions (4x5 rectangular grid - 20 keys) ---------- */
  const row1: KeyDef[] = [
    { 
      id: "instagram", 
      label: "Instagram", 
      shortDesc: "Instagram · Profile", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("📸"); openLink("https://www.instagram.com/_syedalife/"); }
    },
    { 
      id: "linkedin", 
      label: "LinkedIn", 
      shortDesc: "LinkedIn · Profile 🌸", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("🌸"); openLink("https://www.linkedin.com/in/syeda-zubia-areej-9a9198301/"); }
    },
    { 
      id: "github", 
      label: "GitHub", 
      shortDesc: "GitHub · Profile", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("🐈"); openLink("https://github.com"); }
    },
    { 
      id: "twitter", 
      label: "Twitter", 
      shortDesc: "Twitter / X · Profile", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("🐦"); openLink("https://twitter.com"); }
    },
    { 
      id: "youtube", 
      label: "YouTube", 
      shortDesc: "YouTube · Channel", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("📺"); openLink("https://www.youtube.com"); } 
    },
  ];

  const row2: KeyDef[] = [
    { 
      id: "tiktok", 
      label: "TikTok", 
      shortDesc: "TikTok · Profile", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("🎵"); openLink("https://www.tiktok.com"); }
    },
    { 
      id: "facebook", 
      label: "Facebook", 
      shortDesc: "Facebook · Profile", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("👤"); openLink("https://www.facebook.com"); }
    },
    { 
      id: "pinterest", 
      label: "Pinterest", 
      shortDesc: "Pinterest · Boards", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.162 0 7.396 2.965 7.396 6.93 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.63-2.745-1.374l-.749 2.853c-.27 1.029-1.002 2.317-1.492 3.111 1.127.347 2.315.536 3.546.536 6.62 0 11.987-5.366 11.987-11.987C23.999 5.368 18.632 0 12.017 0z"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("📌"); openLink("https://www.pinterest.com"); } 
    },
    { 
      id: "whatsapp", 
      label: "WhatsApp", 
      shortDesc: "WhatsApp · Message", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("💬"); openLink("https://wa.me/919100805104"); } 
    },
    { 
      id: "discord", 
      label: "Discord", 
      shortDesc: "Discord · Server/User", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.078.078 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("🎮"); openLink("https://discord.com"); } 
    },
  ];

  const row3: KeyDef[] = [
    { 
      id: "telegram", 
      label: "Telegram", 
      shortDesc: "Telegram · Contact", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.64-.35-1 .22-1.58.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.64 6.32-2.73 7.59-3.25 3.61-1.48 4.36-1.74 4.85-1.75.11 0 .35.03.51.16.13.11.17.26.19.37.02.12.02.25 0 .37z"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("✈️"); openLink("https://t.me"); } 
    },
    { 
      id: "spotify", 
      label: "Spotify", 
      shortDesc: "Spotify · Playlists", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-1.02-.336.075-.668-.136-.745-.472-.075-.336.136-.668.472-.745 3.847-.88 7.143-.51 9.82 1.13.29.18.387.563.207.86zm1.224-2.722c-.226.367-.707.487-1.074.26-2.717-1.67-6.86-2.154-10.065-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.666-1.112 8.225-.57 11.33 1.343.366.226.486.707.26 1.07zm.106-2.833C14.384 8.78 8.544 8.586 5.16 9.613c-.52.158-1.077-.14-1.235-.662-.158-.52.14-1.077.662-1.235 3.88-1.178 10.334-.954 14.407 1.464.468.278.623.886.345 1.354-.278.468-.886.622-1.354.344z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("🎵"); openLink("https://www.spotify.com"); } 
    },
    { 
      id: "figma", 
      label: "Figma", 
      shortDesc: "Figma · Design Projects", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-3.5 3.5c-1.9 0-3.5-1.6-3.5-3.5z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("🎨"); openLink("https://www.figma.com"); } 
    },
    { 
      id: "dribbble", 
      label: "Dribbble", 
      shortDesc: "Dribbble · Designs", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("🏀"); openLink("https://dribbble.com"); } 
    },
    { 
      id: "behance", 
      label: "Behance", 
      shortDesc: "Behance · Portfolio", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7v1h7V7zm-9.351 3.555c.241-.324.379-.74.379-1.264 0-1.625-1.185-2.291-3.042-2.291H5v11h5.21c2.112 0 3.254-1.063 3.254-2.695 0-.972-.519-1.89-1.815-2.195zm-5.07-2.181h2.001c.907 0 1.352.333 1.352.925 0 .546-.426.88-1.352.88H7.579v-1.805zm2.232 7.234H7.579v-2.176h2.232c1.074 0 1.556.361 1.556 1.074 0 .722-.444 1.102-1.556 1.102zm10.742-3.13c0-2.528-1.52-4.223-4.14-4.223-2.639 0-4.231 1.796-4.231 4.232 0 2.509 1.639 4.232 4.417 4.232 2.111 0 3.426-.972 3.843-2.324l-1.574-.38c-.287.722-.843 1.13-1.898 1.13-1.25 0-1.954-.694-2.037-1.87h5.584c.027-.167.037-.389.037-.597zm-5.593-1.074c.102-1.028.778-1.657 1.833-1.657 1.028 0 1.639.63 1.741 1.657h-3.574z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("💼"); openLink("https://www.behance.net"); } 
    },
  ];

  const row4: KeyDef[] = [
    {
      id: "heart",
      label: "Love",
      shortDesc: "Heart key",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      color: "sakura",
      action: () => {
        setHeartPressCount(prev => {
          const newCount = prev + 1;
          fireConfetti("❤️");
          if (newCount >= 22) {
            setShowLoveMessage(true);
          }
          return newCount;
        });
      }
    },
    { 
      id: "email", 
      label: "Mail", 
      shortDesc: "zubiaareej2@gmail.com", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ), 
      color: "sakura", 
      action: () => { fireConfetti("💌"); openLink("mailto:zubiaareej2@gmail.com"); } 
    },
    { 
      id: "phone", 
      label: "Call", 
      shortDesc: "+91 9100805104", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("📱"); openLink("tel:+919100805104"); } 
    },
    { 
      id: "reddit", 
      label: "Reddit", 
      shortDesc: "Reddit · Profile", 
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.24-1.72l1.37-4.31 3.73.8c.02.95.78 1.71 1.71 1.71 1.05 0 1.9-.85 1.9-1.9s-.85-1.9-1.9-1.9c-.83 0-1.54.55-1.8 1.3l-4.1-.88c-.27-.06-.54.1-.63.36l-1.65 5.18c-2.44.04-4.67.68-6.33 1.7-.56-.75-1.45-1.22-2.39-1.22-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.62-.06.29-.1.59-.1.88 0 3.86 4.7 7 10.5 7s10.5-3.14 10.5-7c0-.29-.04-.59-.1-.88.93-.52 1.56-1.5 1.56-2.62zm-18 1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5zm11 4.5c-1.78 1.78-5.15 1.78-6.93 0-.17-.17-.17-.44 0-.61.17-.17.44-.17.61 0 1.45 1.45 4.28 1.45 5.72 0 .17-.17.44-.17.61 0 .17.17.17.44 0 .61zm-.28-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ), 
      color: "white", 
      action: () => { fireConfetti("👽"); openLink("https://www.reddit.com"); } 
    },
  ];

  const ROWS = [row1, row2, row3, row4];
  let keyIndex = 0;
  const floatingIntensity = activeSection === "contact" ? 2.5 : 1;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 5, perspective: "900px", perspectiveOrigin: "50% 40%", opacity: 0.85 }}
    >
      <motion.div
        animate={{
          rotateX: mousePos.y * -15,
          rotateY: mousePos.x * 15,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={keyboardControls}
          initial={{ scale: 0.15, rotateX: 18, rotateY: -15, rotateZ: 2, y: 0, x: 400 }}
          style={{ transformStyle: "preserve-3d", pointerEvents: "auto" }}
        >
        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={!isLoading ? { scale: 1, opacity: 1 } : { scale: 0.1, opacity: 0 }}
          transition={{
            scale: { duration: 1.0, type: "spring", stiffness: 100, damping: 15 },
            opacity: { duration: 0.4 },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{
              rotateY: [0, 6, 0, -6, 0],
              rotateX: [0, -3, 0, 3, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              transformStyle: "preserve-3d",
              background: "linear-gradient(160deg, #FFAEC9 0%, #F594B0 60%, #E8809A 100%)",
              borderRadius: 18,
              padding: "12px 18px 20px",
              boxShadow: `
                0 35px 70px rgba(200,100,130,0.35),
                0 18px 36px rgba(0,0,0,0.12),
                inset 0 3px 6px rgba(255,255,255,0.6),
                inset 0 -5px 10px rgba(0,0,0,0.12)
              `,
              border: "5px solid #FFF0F3",
              display: "flex",
              flexDirection: "column" as const,
              gap: 4,
              width: "fit-content",
              position: "relative",
            }}
          >
            {/* Solid 3D rim depth layers — thicker for a chunky mechanical look */}
            {[2, 4, 6, 8, 10, 12, 14, 16].map((z) => (
              <div
                key={z}
                style={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: 22,
                  background: z <= 8 ? "#D67A94" : "#C4687F",
                  transform: `translateZ(-${z}px)`,
                  zIndex: -2,
                  border: "1.5px solid #FFF0F3",
                  opacity: z <= 10 ? 0.95 : 0.8,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Bongo Cat sits on top edge */}
            <BongoCat activePaw={activePaw} />

            {/* Decorative doodles on the bottom-right empty casing space */}
            <div style={{
              position: "absolute",
              bottom: 8,
              right: 18,
              display: "flex",
              gap: 6,
              alignItems: "center",
              opacity: 0.55,
              pointerEvents: "none",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg width="6" height="6" viewBox="0 0 24 24" fill="#FFFFFF" style={{ transform: "rotate(15deg)" }}>
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </div>

            {ROWS.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: 5 }}>
                {row.map((k) => {
                  const idx = keyIndex++;
                  return (
                    <Keycap3D
                      key={k.id}
                      keyDef={k}
                      size={54}
                      index={idx}
                      onHover={handleKeyHover}
                      onLeave={handleKeyLeave}
                      onPress={handleKeyPress}
                      floatingIntensity={floatingIntensity}
                    />
                  );
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      </motion.div>

      {/* Love message overlay — frosted glass, auto-dismisses */}
      <AnimatePresence>
        {showLoveMessage && (
          <motion.div
            key="love-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 182, 203, 0.25)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            onClick={() => { setShowLoveMessage(false); setHeartPressCount(0); }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,174,201,0.85) 0%, rgba(214,94,122,0.9) 100%)',
                borderRadius: 24,
                padding: '48px 64px',
                boxShadow: '0 25px 60px rgba(214,94,122,0.4), 0 8px 24px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.5)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                textAlign: 'center' as const,
                maxWidth: 500,
              }}
            >
              {/* Floating hearts */}
              <div style={{ fontSize: 48, marginBottom: 16 }}>💕</div>
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#fff',
                textShadow: '0 2px 12px rgba(214,94,122,0.5)',
                fontFamily: "'Georgia', serif",
                lineHeight: 1.3,
                letterSpacing: '0.02em',
              }}>
                I love you Zubia
              </div>
              <div style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.75)',
                marginTop: 12,
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
              }}>
                ur the love of my life 💗
              </div>
              <div style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.5)',
                marginTop: 20,
                fontFamily: 'monospace',
              }}>
                click anywhere to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialKeyboard;
