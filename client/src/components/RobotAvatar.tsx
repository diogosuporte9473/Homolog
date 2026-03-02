import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sword } from "lucide-react";
import React from "react";

interface RobotAvatarProps {
  level: 0 | 1 | 2; // 0: none, 1: shield, 2: shield + sword
  size?: number; // pixel size
}

export function RobotAvatar({ level, size = 80 }: RobotAvatarProps) {
  const s = size;
  const colorBody = "#0ea5e9"; // cyan-500
  const colorAccent = "#84cc16"; // lime-500

  return (
    <div
      style={{ width: s, height: s }}
      className="relative select-none"
      aria-label="Estado do robô"
      title={
        level === 0
          ? "Robô sem equipamentos"
          : level === 1
          ? "Robô com escudo"
          : "Robô com escudo e espada"
      }
    >
      {/* Corpo do robô (SVG simples) */}
      <svg width={s} height={s} viewBox="0 0 100 100" aria-hidden="true">
        {/* Cabeça */}
        <rect x="32" y="10" width="36" height="24" rx="6" fill={colorBody} />
        {/* Olhos */}
        <circle cx="44" cy="22" r="3" fill="white" />
        <circle cx="56" cy="22" r="3" fill="white" />
        {/* Antena */}
        <line x1="50" y1="10" x2="50" y2="2" stroke={colorAccent} strokeWidth="2" />
        <circle cx="50" cy="2" r="2.5" fill={colorAccent} />
        {/* Tronco */}
        <rect x="26" y="36" width="48" height="34" rx="8" fill={colorBody} />
        {/* Detalhe tronco */}
        <rect x="32" y="42" width="36" height="8" rx="4" fill="white" opacity="0.25" />
        {/* Pernas */}
        <rect x="32" y="72" width="12" height="20" rx="4" fill={colorBody} />
        <rect x="56" y="72" width="12" height="20" rx="4" fill={colorBody} />
        {/* Braços */}
        <rect x="16" y="40" width="10" height="24" rx="4" fill={colorBody} />
        <rect x="74" y="40" width="10" height="24" rx="4" fill={colorBody} />
      </svg>

      {/* Equipamentos com animação */}
      <AnimatePresence>
        {level >= 1 && (
          <motion.div
            key="shield"
            initial={{ scale: 0.6, opacity: 0, x: -10, y: 10 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute left-[2%] top-[40%] text-cyan-400"
          >
            <Shield className="w-8 h-8 sm:w-9 sm:h-9" />
          </motion.div>
        )}
        {level >= 2 && (
          <motion.div
            key="sword"
            initial={{ rotate: -30, opacity: 0, x: 10, y: -10 }}
            animate={{ rotate: 0, opacity: 1, x: 0, y: 0 }}
            exit={{ rotate: -30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="absolute right-[4%] top-[32%] text-lime-400"
          >
            <Sword className="w-8 h-8 sm:w-9 sm:h-9" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

