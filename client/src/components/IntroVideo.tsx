import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface IntroVideoProps {
  onFinish: () => void;
}

export function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoId = "1168641077";

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full pointer-events-none">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&muted=0&byline=0&title=0&portrait=0&playsinline=1&dnt=1`}
          className="absolute inset-0 w-full h-full scale-[1.15]"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Intro Video"
        />
      </div>
      
      {/* Skip Button - discretely positioned and styled */}
      <div className="absolute bottom-10 right-10 z-[110] animate-in fade-in duration-1000 delay-500">
        <Button 
          onClick={onFinish}
          variant="ghost"
          className="text-white/40 hover:text-white/80 hover:bg-white/5 transition-all text-xs uppercase tracking-[0.2em]"
        >
          Pular Introdução <X className="ml-2 size-3" />
        </Button>
      </div>
    </div>
  );
}

