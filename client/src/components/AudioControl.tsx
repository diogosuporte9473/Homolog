import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC = "/audio/nastelbom-action-440170.mp3";

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = false;
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
        setReady(true);
        setAutoplayBlocked(false);
      } catch {
        // Autoplay foi bloqueado; aguardará interação do usuário
        setAutoplayBlocked(true);
      }
    };

    tryPlay();
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (autoplayBlocked && audio.paused) {
      try {
        await audio.play();
        setAutoplayBlocked(false);
      } catch {
        /* ignore */
      }
    }
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  };

  return (
    <div className="absolute left-3 top-2 z-40 no-print">
      <Button
        variant="outline"
        size="icon"
        aria-label={muted ? "Ativar som" : "Silenciar som"}
        title={
          autoplayBlocked
            ? "Clique para ativar a trilha sonora"
            : muted
            ? "Ativar som"
            : "Silenciar som"
        }
        onClick={toggleMute}
        className="border-border/60 bg-background/60 backdrop-blur data-[state=on]:bg-muted"
        data-state={muted ? "on" : "off"}
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </Button>
      {/* Elemento de áudio gerenciado por ref; opcionalmente podemos renderizar oculto */}
      {ready === false && <span className="sr-only">Carregando áudio…</span>}
    </div>
  );
}
