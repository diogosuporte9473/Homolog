import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function GameMenu() {
  const [playerName, setPlayerName] = useState("");
  const { startGame } = useGame();

  const handleStart = () => {
    if (playerName.trim()) startGame(playerName.trim());
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center relative overflow-x-hidden px-4">
      <div className="text-center mb-8 animate-pulse">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400" strokeWidth={1.5} />
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-lime-400 absolute bottom-0 right-0 animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ fontFamily: "Orbitron" }}>
          CYBERGUARD
        </h1>
        <p className="text-lg sm:text-xl font-bold" style={{ color: "#ff006e", fontFamily: "Orbitron" }}>
          O Desafio da Privacidade
        </p>
      </div>

      <Card className="p-6 border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm w-full max-w-md">
        <div className="mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">Bem-vindo! Aprenda jogando sobre:</p>
          <ul className="text-left space-y-2 text-sm text-gray-300 mt-3">
            <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Senhas seguras e proteção de contas</li>
            <li className="flex items-center gap-2"><span className="text-lime-400">✓</span> Identificar phishing e fraudes</li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Privacidade em redes sociais</li>
            <li className="flex items-center gap-2"><span className="text-lime-400">✓</span> Proteção de dados pessoais</li>
          </ul>
        </div>
        <label className="block text-sm font-semibold text-cyan-400 mb-2" style={{ fontFamily: "Orbitron" }}>
          DIGITE SEU NOME
        </label>
        <Input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Ex: Alex, Maria, João..."
          className="bg-slate-900 border-cyan-400/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/50"
          maxLength={20}
        />
        <Button
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          onClick={handleStart}
          disabled={!playerName.trim()}
          style={{ fontFamily: "Orbitron" }}
        >
          INICIAR JOGO
        </Button>
        <p className="text-xs text-gray-500 mt-6 text-center">Aprenda segurança digital de forma divertida!</p>
      </Card>
    </div>
  );
}
