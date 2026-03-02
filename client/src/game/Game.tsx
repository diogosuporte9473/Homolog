import { useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { GameMenu } from "@/components/GameMenu";
import { ChallengeScreen } from "@/components/ChallengeScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { VictoryScreen } from "@/components/VictoryScreen";
import { GameOverScreen } from "@/components/GameOverScreen";
import { CertificateScreen } from "@/components/CertificateScreen";

export default function Game() {
  const { state, showCertificate } = useGame();

  useEffect(() => {
    const handler = () => showCertificate();
    window.addEventListener("showCertificate", handler);
    return () => window.removeEventListener("showCertificate", handler);
  }, [showCertificate]);

  return (
    <div className="w-full min-h-[60vh] text-white">
      {state.phase === "menu" && <GameMenu />}
      {state.phase === "playing" && <ChallengeScreen />}
      {state.phase === "result" && <ResultScreen />}
      {state.phase === "victory" && <VictoryScreen />}
      {state.phase === "gameover" && <GameOverScreen />}
      {state.phase === "certificate" && <CertificateScreen />}
    </div>
  );
}
