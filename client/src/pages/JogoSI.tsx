import PageLayout from "@/components/PageLayout";
import { GameProvider } from "@/contexts/GameContext";
import Game from "@/game/Game";
import { AudioControl } from "@/components/AudioControl";

export default function JogoSI() {
  return (
    <PageLayout>
      <div className="relative overflow-x-hidden">
        <div className="absolute inset-0 opacity-20 -z-10" style={{ backgroundImage: "url(https://private-us-east-1.manuscdn.com/sessionFile/0lNfTONX6kGIzQ4b8izD3r/sandbox/LezUyj24jBosGPvZtvwXRL-img-3_1771953322000_na1fn_Y3liZXJndWFyZC1wYXR0ZXJu.png)", backgroundSize: "400px 400px" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950" />
        <AudioControl />
        <GameProvider>
          <Game />
        </GameProvider>
      </div>
    </PageLayout>
  );
}
