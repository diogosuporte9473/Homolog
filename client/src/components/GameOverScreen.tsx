import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { XCircle } from "lucide-react";

export function GameOverScreen() {
  const { state, resetGame } = useGame();
  return (
    <div className="max-w-xl mx-auto text-center">
      <XCircle className="mx-auto text-red-400 mb-3" size={48} />
      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Orbitron" }}>Fim do jogo</h2>
      <p className="text-muted-foreground mb-6">Pontos: {state.score}. Vidas esgotadas. Tente novamente e refine suas práticas.</p>
      <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold" onClick={resetGame}>
        Recomeçar
      </Button>
    </div>
  );
}
