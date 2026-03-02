import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { Shield, Zap } from "lucide-react";
import { useState } from "react";

export function CertificateScreen() {
  const { state, resetGame } = useGame();
  const today = new Date().toLocaleDateString("pt-BR");
  const [sigError, setSigError] = useState(false);
  const sigSrc = "/signature.png";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto print-container">
      <Card className="p-8 bg-white text-black rounded-2xl shadow-lg certificate-card">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="w-14 h-14 text-cyan-700" strokeWidth={1.5} />
              <Zap className="w-6 h-6 text-lime-600 absolute bottom-0 right-0" />
            </div>
          </div>
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ fontFamily: "Orbitron", letterSpacing: "0.04em" }}
          >
            CYBERGUARD
          </h1>
          <p
            className="text-sm font-semibold"
            style={{ color: "#ff006e", fontFamily: "Orbitron" }}
          >
            O Desafio da Privacidade
          </p>
          <p className="text-sm mt-4">Certificado de Conclusão — Programa educativo de Segurança da Informação</p>
        </div>

        <p className="text-lg text-center mb-6">
          Certificamos que <span className="font-bold">{state.playerName}</span> concluiu com sucesso os desafios do jogo
          “CyberGuard – O Desafio da Privacidade”, demonstrando conhecimento em senhas seguras, identificação de phishing,
          privacidade em redes sociais e proteção de dados pessoais.
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="border p-3 rounded-lg">
            <div className="font-semibold">Pontuação final</div>
            <div>{state.score} pontos</div>
          </div>
          <div className="border p-3 rounded-lg">
            <div className="font-semibold">Data</div>
            <div>{today}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">DMS Security</div>
            <div className="text-xs">www.dmssecurity.com.br</div>
          </div>
          <div className="text-right">
            <div className="font-semibold mb-1">Assinatura</div>
            {sigError ? (
              <div className="h-16 flex items-end justify-end">
                <div className="text-xs">______________________________</div>
              </div>
            ) : (
              <img
                src={sigSrc}
                alt="Assinatura"
                className="h-16 inline-block"
                onError={() => setSigError(true)}
              />
            )}
            <div className="text-xs mt-1">Aluno</div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center mt-6 no-print">
        <Button variant="outline" onClick={handlePrint}>Imprimir</Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold" onClick={resetGame}>
          Jogar novamente
        </Button>
      </div>
    </div>
  );
}
