import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const drawNetworkLines = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const offset = (time * 20 + i * 100) % (width + 200);
        ctx.moveTo(offset - 200, height * 0.3 + i * 50);

        for (let x = offset - 200; x < width + 200; x += 40) {
          const y = height * 0.3 + i * 50 + Math.sin((x + time * 10) / 100) * 30;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(0, 217, 255, 0.6)';
      for (let i = 0; i < 8; i++) {
        const x = (time * 15 + i * 150) % (width + 200);
        const y = height * 0.3 + Math.sin((x + time * 10) / 100) * 30;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 15, y - 15, 30, 30);

        ctx.fillStyle = 'rgba(0, 217, 255, 1)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = 'rgba(176, 0, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        const offset = (time * 25 + i * 200) % (width + 200);
        ctx.moveTo(offset - 200, height * 0.6 + i * 80);

        for (let x = offset - 200; x < width + 200; x += 50) {
          const y = height * 0.6 + i * 80 + Math.cos((x + time * 8) / 120) * 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.016;
      animationFrameId = requestAnimationFrame(drawNetworkLines);
    };

    drawNetworkLines();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#000000] to-[#000000]" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                Segurança em Evolução
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold font-mono leading-tight">
                <span className="text-white">Proteção</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Inteligente
                </span>
                <br />
                <span className="text-white">para um Mundo</span>
                <br />
                <span className="text-white">Conectado</span>
              </h1>
            </div>

            <p className="text-lg text-gray-300 font-light leading-relaxed max-w-md">
              Segurança da informação, privacidade e tecnologia com foco em conscientização e proteção de dados. Acompanhe as tendências de cyber security e mantenha seus dados seguros.
            </p>

            <div className="h-8" />

            <div className="pt-8 border-t border-gray-700/50 space-y-3">
              <p className="text-sm text-gray-400 font-mono">Confiado por:</p>
              <div className="flex items-center gap-6">
                <div className="text-xs text-gray-500 font-mono">
                  <span className="text-cyan-400">→</span> Educação em Segurança
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  <span className="text-purple-400">→</span> Proteção de Dados
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663062064390/4erYpdv8SvHxVkRSjyka5X/hero-network-visualization-C9uJFD72WdeNhWgtzQZqyt.webp"
                alt="Network visualization"
                className="w-full h-full object-contain opacity-90 animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-lg blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer select-none"
        onClick={() => setLocation("/inicio")}
        aria-label="Abrir página inicial"
        role="button"
      >
        <div className="text-center">
          <p className="text-xs text-gray-500 font-mono mb-2">SCROLL</p>
          <svg className="w-5 h-5 text-cyan-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
