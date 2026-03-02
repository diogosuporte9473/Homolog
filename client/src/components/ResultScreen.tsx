import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { CheckCircle2, XCircle } from "lucide-react";

export function ResultScreen() {
  const { state, nextChallenge } = useGame();
  const ch = state.currentChallenge!;
  const isCorrect = state.selectedAnswer === ch.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 border border-cyan-400/30 bg-slate-900/60">
        <div className="flex items-center gap-3 mb-2">
          {isCorrect ? <CheckCircle2 className="text-green-400" /> : <XCircle className="text-red-400" />}
          <h2 className="text-xl font-bold" style={{ fontFamily: "Orbitron" }}>
            {isCorrect ? "Resposta correta!" : "Resposta incorreta"}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{ch.explanation}</p>
        {ch.tips && (
          <div className="text-sm">
            {ch.tips.map((t, i) => (
              <div key={i} className="text-muted-foreground">• {t}</div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm" style={{ fontFamily: "Orbitron" }}>
            Pontos: <span className="font-semibold">{state.score}</span>
          </div>
          <Button variant="outline" className="border-cyan-400/50" onClick={nextChallenge}>Próximo desafio</Button>
        </div>
      </Card>
    </div>
  );
}
