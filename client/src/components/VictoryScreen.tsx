import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { Trophy } from "lucide-react";

export function VictoryScreen() {
  const { state, showCertificate, resetGame } = useGame();
  return (
    <div className="max-w-xl mx-auto text-center">
      <Trophy className="mx-auto text-yellow-400 mb-3" size={48} />
      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Orbitron" }}>Parabéns, {state.playerName}!</h2>
      <p className="text-muted-foreground mb-6">
        Você concluiu os desafios e aprendeu práticas essenciais de segurança. Pontuação final: {state.score}
      </p>
      <div className="flex gap-3 justify-center">
        <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold w-full sm:w-auto" onClick={showCertificate}>
          Gerar Certificado
        </Button>
        <Button variant="outline" className="border-cyan-400/50 w-full sm:w-auto" onClick={resetGame}>
          Jogar novamente
        </Button>
      </div>
    </div>
  );
}
