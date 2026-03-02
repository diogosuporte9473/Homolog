import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { RobotAvatar } from "@/components/RobotAvatar";

export function ChallengeScreen() {
  const { state, selectAnswer, submitAnswer } = useGame();
  const ch = state.currentChallenge!;

  const gearLevel = state.streak >= 2 ? 2 : state.streak >= 1 ? 1 : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="text-cyan-400" />
          <div className="text-sm" style={{ fontFamily: "Orbitron" }}>
            Jogador: {state.playerName}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-4 text-sm" style={{ fontFamily: "Orbitron" }}>
            <div className="text-cyan-400">Pontos: <span className="font-semibold text-white">{state.score}</span></div>
            <div className="text-lime-400">Vidas: <span className="font-semibold text-white">{state.lives}</span></div>
          </div>
          <div className="p-1 rounded-full ring-2 ring-cyan-400/40 glow-effect">
            <RobotAvatar level={gearLevel as 0 | 1 | 2} size={64} />
          </div>
        </div>
      </div>
      <Card className="p-6 border border-cyan-400/30 bg-slate-900/60">
        <div className="text-xs text-cyan-400 mb-2 uppercase" style={{ fontFamily: "Orbitron" }}>{ch.type}</div>
        <h2 className="text-2xl font-black mb-1" style={{ fontFamily: "Orbitron" }}>{ch.title}</h2>
        <p className="text-sm text-gray-300 mb-6">{ch.description}</p>
        <p className="font-semibold mb-4 break-words">{ch.question}</p>
        <div className="grid gap-3">
          {ch.options.map((opt) => (
            <Button
              key={opt.id}
              variant={state.selectedAnswer === opt.id ? "default" : "outline"}
              className={cn(
                "w-full text-left whitespace-normal break-words hyphens-auto h-auto min-h-12 leading-snug",
                state.selectedAnswer === opt.id
                  ? "bg-cyan-500 text-black font-bold"
                  : "border-cyan-400/50"
              )}
              onClick={() => selectAnswer(opt.id)}
            >
              {opt.text}
            </Button>
          ))}
        </div>
        <Button
          className="mt-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold w-full sm:w-auto"
          onClick={submitAnswer}
          disabled={!state.selectedAnswer}
        >
          Confirmar
        </Button>
      </Card>
    </div>
  );
}
