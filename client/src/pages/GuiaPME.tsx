import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { 
  ShieldCheck, 
  ListChecks, 
  Activity, 
  Bot, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  ChevronDown, 
  Mail, 
  Shield, 
  Lock, 
  CheckCircle, 
  XCircle, 
  Info, 
  Star,
  Check,
  Minus,
  X,
  Newspaper,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import axios from "axios";

export default function GuiaPME() {
  const [noticiasCarrossel, setNoticiasCarrossel] = useState<any[]>([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get("/api/posts");
        setNoticiasCarrossel(response.data);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
      }
    };
    fetchNoticias();
  }, []);
  // Estados para os questionários
  const [maturityAnswers, setMaturityAnswers] = useState<Record<number, string>>({});
  const [iaAnswers, setIaAnswers] = useState<Record<number, string>>({});

  // Cálculo da pontuação de Maturidade
  const calculateMaturityScore = () => {
    let score = 0;
    Object.values(maturityAnswers).forEach(val => {
      if (val === "Sim") score += 2;
      if (val === "Parcial") score += 1;
    });
    return score;
  };

  const getMaturityDiagnosis = (score: number) => {
    if (Object.keys(maturityAnswers).length < 12) return "Responda a todos os itens para ver o diagnóstico.";
    if (score >= 20) return "EXCELENTE: Sua empresa possui uma maturidade robusta. Continue atualizando seus protocolos.";
    if (score >= 12) return "MÉDIO: Existem proteções, mas há lacunas críticas que podem ser exploradas.";
    return "CRÍTICO: Sua empresa está altamente vulnerável. Recomenda-se ação imediata nos itens marcados como 'Não'.";
  };

  // Cálculo da pontuação de IA Ofensiva
  const calculateIaScore = () => {
    return Object.values(iaAnswers).filter(val => val === "Não").length;
  };

  const getIaDiagnosis = (score: number) => {
    if (Object.keys(iaAnswers).length < 8) return "Responda a todas as perguntas.";
    if (score > 3) return "ALTO RISCO: Sua empresa é um alvo fácil para golpes de IA ofensiva.";
    if (score > 0) return "RISCO MODERADO: Algumas defesas estão ativas, mas a equipe ainda está exposta.";
    return "PROTEGIDO: Suas defesas contra IA estão bem estruturadas.";
  };

  return (
    <PageLayout>

      {/* Hero Section */}
      <header className="relative py-12 md:py-20 lg:py-32 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
            <ShieldCheck size={16} />
            <span>Guia Atualizado 2026-2027</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white">
            Ferramentas Gratuitas: Checklists de <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Cibersegurança + LGPD</span> para PMEs
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-slate-400 max-w-3xl mx-auto px-2">
            Baixe modelos prontos, checklists de maturidade, políticas de IA e dicas práticas – tudo alinhado com CERT.br, ANPD e Brasscom.
          </p>
          <div className="flex justify-center px-4">
            <a 
              href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-vf.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:scale-[1.02] text-sm sm:text-base"
            >
              <ShieldCheck size={20} />
              Baixar Guia Oficial ANPD (PDF)
            </a>
          </div>
        </div>
        
        {/* Decorative Background Icons */}
        <Shield className="absolute top-20 left-10 text-blue-500/10 w-32 h-32 -rotate-12 hidden lg:block" />
        <Lock className="absolute bottom-20 right-10 text-emerald-500/10 w-32 h-32 rotate-12 hidden lg:block" />
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-16 space-y-32">

        {/* #checklist-maturidade */}
        <section id="checklist-maturidade" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
              <ListChecks size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Checklist de Maturidade em Cibersegurança 2026</h2>
          </div>
          
          <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/60 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-300">Item de Controle</th>
                    <th className="px-6 py-4 font-semibold text-center text-slate-300">Sim</th>
                    <th className="px-6 py-4 font-semibold text-center text-slate-300">Parcial</th>
                    <th className="px-6 py-4 font-semibold text-center text-slate-300">Não</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    "Autenticação de dois fatores (MFA) em todos os acessos?",
                    "Política de backups offline e imutáveis testada?",
                    "Inventário de ativos (hardware e software) atualizado?",
                    "Treinamento periódico contra Phishing para funcionários?",
                    "Gestão de patches e atualizações em menos de 48h?",
                    "Monitoramento de logs e acessos suspeitos 24/7?",
                    "Criptografia de dados sensíveis em repouso e trânsito?",
                    "Plano de Resposta a Incidentes formalizado?",
                    "Controle de privilégios mínimos (Least Privilege)?",
                    "Proteção de Endpoint (EDR/XDR) moderna?",
                    "Revisão de segurança de fornecedores (Third-party)?",
                    "Auditoria de acessos de ex-colaboradores imediata?"
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 text-slate-300">{idx + 1}. {item}</td>
                      <td className="text-center">
                        <button 
                          onClick={() => setMaturityAnswers(prev => ({...prev, [idx]: "Sim"}))}
                          className={`p-2 rounded-full transition-all ${maturityAnswers[idx] === "Sim" ? "bg-emerald-500 text-slate-900 scale-110 shadow-lg shadow-emerald-500/20" : "text-slate-600 hover:text-emerald-400"}`}
                        >
                          <Check size={20} />
                        </button>
                      </td>
                      <td className="text-center">
                        <button 
                          onClick={() => setMaturityAnswers(prev => ({...prev, [idx]: "Parcial"}))}
                          className={`p-2 rounded-full transition-all ${maturityAnswers[idx] === "Parcial" ? "bg-amber-500 text-slate-900 scale-110 shadow-lg shadow-amber-500/20" : "text-slate-600 hover:text-amber-400"}`}
                        >
                          <Minus size={20} />
                        </button>
                      </td>
                      <td className="text-center">
                        <button 
                          onClick={() => setMaturityAnswers(prev => ({...prev, [idx]: "Não"}))}
                          className={`p-2 rounded-full transition-all ${maturityAnswers[idx] === "Não" ? "bg-rose-500 text-slate-900 scale-110 shadow-lg shadow-rose-500/20" : "text-slate-600 hover:text-rose-400"}`}
                        >
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resultado Maturidade */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/60 rounded-2xl border-l-4 border-blue-500 shadow-xl">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Exemplo Real:</h4>
              <p className="text-slate-300 italic">"Uma corretora de seguros PME em SP reduziu tentativas de invasão em 85% após implementar o item 1 (MFA) e o item 4 (Treinamento)."</p>
            </div>
            <div className={`p-6 rounded-2xl border-l-4 shadow-xl transition-all ${Object.keys(maturityAnswers).length === 12 ? "bg-slate-800/80 border-emerald-500" : "bg-slate-800/40 border-slate-600 opacity-60"}`}>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Seu Resultado:</h4>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-black text-white">{calculateMaturityScore()}</span>
                <span className="text-slate-500 mb-1">/ 24 pontos</span>
              </div>
              <p className="text-sm font-medium text-slate-300">{getMaturityDiagnosis(calculateMaturityScore())}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 items-center text-sm">
            <span className="font-bold text-slate-400 uppercase tracking-widest">Recursos:</span>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.cert.br/docs/seg-adm/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 underline underline-offset-4">CERT.br (Guias)</a>
              <a href="https://www.anbima.com.br" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 underline underline-offset-4">Anbima</a>
              <a href="https://brasscom.org.br" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 underline underline-offset-4">Brasscom</a>
            </div>
          </div>
        </section>

        {/* #plano-continuidade */}
        <section id="plano-continuidade" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
              <Activity size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Plano de Continuidade Mínimo para PMEs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "01", title: "Identificar Críticos", desc: "Liste o que não pode parar (ex: faturamento, e-mail)." },
              { id: "02", title: "Backup Redundante", desc: "Regra 3-2-1: 3 cópias, 2 mídias, 1 fora do local." },
              { id: "03", title: "Contatos de Emergência", desc: "Lista física de provedores, TI e jurídico." },
              { id: "04", title: "Infra Alternativa", desc: "Acesso via 4G/5G ou local de trabalho remoto." },
              { id: "05", title: "Papéis e Responsáveis", desc: "Quem faz o quê durante uma crise." },
              { id: "06", title: "Comunicação Externa", desc: "Template de aviso para clientes e fornecedores." },
              { id: "07", title: "Restauração de Dados", desc: "Passo a passo para subir backups rapidamente." },
              { id: "08", title: "Revisão Pós-Incidente", desc: "Aprenda com as falhas e atualize o plano." }
            ].map((step) => (
              <div key={step.id} className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all group">
                <span className="text-2xl font-black text-emerald-500/30 group-hover:text-emerald-500/50 transition-colors mb-2 block">{step.id}</span>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-slate-800/60 rounded-2xl border-l-4 border-emerald-500">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Exemplo Real:</h4>
            <p className="text-slate-300 italic">"Uma gráfica rápida recuperou 100% das operações em 4h após um ransomware, graças ao plano de redundância em nuvem."</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 items-center text-sm">
            <span className="font-bold text-slate-400 uppercase tracking-widest">Recursos:</span>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.centralserver.com.br/blog/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4">CentralServer</a>
              <a href="https://pdcati.com.br" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4">PDCA TI</a>
            </div>
          </div>
        </section>

        {/* #politica-ia */}
        <section id="politica-ia" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20">
              <Bot size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Modelo de Política de Uso de IA Generativa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <CheckCircle size={24} /> Regras Permitidas
              </h3>
              <ul className="space-y-4">
                {[
                  "Revisão de textos públicos e e-mails.",
                  "Geração de ideias para marketing.",
                  "Auxílio em programação (sem dados sensíveis).",
                  "Resumo de documentos de domínio público."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-rose-400 mb-6 flex items-center gap-2">
                <XCircle size={24} /> Regras Proibidas
              </h3>
              <ul className="space-y-4">
                {[
                  "Input de dados pessoais de clientes (LGPD).",
                  "Upload de segredos industriais ou financeiros.",
                  "Uso de IA para decisões contratuais sem revisão humana.",
                  "Geração de Deepfakes ou conteúdo ofensivo."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-800/60 rounded-2xl border-l-4 border-purple-500">
            <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Info size={16} /> Consequências:
            </h4>
            <p className="text-slate-300 italic">"O descumprimento pode levar a advertências formais e riscos de multas pela ANPD devido ao vazamento de dados em chats de IA."</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 items-center text-sm">
            <span className="font-bold text-slate-400 uppercase tracking-widest">Fontes:</span>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.tce.sp.gov.br" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">TCE-SP</a>
              <a href="https://www.gov.br/governodigital/pt-br/ia" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Gov.br</a>
              <a href="https://www.fiesp.com.br" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Fiesp</a>
            </div>
          </div>
        </section>

        {/* #teste-ia-ofensiva */}
        <section id="teste-ia-ofensiva" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 border border-rose-500/20 flex-shrink-0">
              <Zap size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Vulnerável a IA Ofensiva? Teste Rápido</h2>
          </div>

          <div className="bg-slate-800/40 p-4 sm:p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
            <p className="mb-8 text-slate-400 font-medium text-sm sm:text-base">Avalie sua prontidão contra as novas ameaças digitais:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Seus funcionários sabem identificar áudios/vídeos gerados por IA (Deepfakes)?",
                "Você utiliza MFA em TODAS as contas corporativas?",
                "Sua empresa tem uma 'palavra-passe' interna para autorizar transferências?",
                "Existe monitoramento de comportamentos anômalos na rede?",
                "Os softwares são atualizados automaticamente em menos de 24h?",
                "Você realiza testes de intrusão (Pentests) anualmente?",
                "Há filtros de e-mail que detectam phishing gerado por IA?",
                "A equipe sabe agir se receber comando de voz do 'CEO' pedindo PIX?"
              ].map((q, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 bg-slate-900/40 rounded-xl border border-slate-800 group hover:border-rose-500/30 transition-colors">
                  <span className="text-slate-300 text-sm flex-1 leading-relaxed">{i + 1}. {q}</span>
                  <div className="flex gap-2 shrink-0 self-end sm:self-center">
                    <button 
                      onClick={() => setIaAnswers(prev => ({...prev, [i]: "Sim"}))}
                      className={`px-4 py-2 sm:px-3 sm:py-1 rounded-lg text-[10px] font-black uppercase transition-all ${iaAnswers[i] === "Sim" ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20" : "bg-slate-800 text-slate-500 hover:text-emerald-400"}`}
                    >
                      Sim
                    </button>
                    <button 
                      onClick={() => setIaAnswers(prev => ({...prev, [i]: "Não"}))}
                      className={`px-4 py-2 sm:px-3 sm:py-1 rounded-lg text-[10px] font-black uppercase transition-all ${iaAnswers[i] === "Não" ? "bg-rose-500 text-slate-900 shadow-lg shadow-rose-500/20" : "bg-slate-800 text-slate-500 hover:text-rose-400"}`}
                    >
                      Não
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-8 p-6 rounded-2xl border transition-all text-center ${Object.keys(iaAnswers).length === 8 ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-800/40 border-slate-700 opacity-60"}`}>
              <h4 className="font-bold text-rose-400 mb-2">Diagnóstico:</h4>
              <p className="text-slate-300 font-medium">{getIaDiagnosis(calculateIaScore())}</p>
              {Object.keys(iaAnswers).length === 8 && (
                <p className="text-xs text-slate-500 mt-2">Sua pontuação de risco: {calculateIaScore()} de 8 vulnerabilidades detectadas.</p>
              )}
            </div>
          </div>
        </section>

        {/* #tendencias-2027 */}
        <section id="tendencias-2027" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20">
              <TrendingUp size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Tendências de Cibersegurança 2027</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Cibercrime Industrializado", desc: "Ataques automatizados por IA que miram milhares de PMEs simultaneamente com baixo custo." },
              { title: "IA Ofensiva (Vishing)", desc: "Golpes via telefone e vídeo que imitam perfeitamente a voz de diretores para fraudes financeiras." },
              { title: "Zero Trust Everywhere", desc: "O conceito de 'nunca confiar, sempre verificar' será o padrão obrigatório para qualquer acesso." },
              { title: "Segurança Human-Centric", desc: "Ferramentas focadas em UX: segurança que não atrapalha a produtividade do funcionário." }
            ].map((trend, i) => (
              <div key={i} className="flex items-start gap-6 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
                <div className="bg-amber-500/10 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center font-black flex-shrink-0 border border-amber-500/20">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{trend.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{trend.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dicas Curtas de Prevenção */}
          <div className="mt-12 p-8 bg-slate-800/40 rounded-3xl border border-slate-700/50">
            <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
              <ShieldCheck size={24} /> Dicas Rápidas de Prevenção
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Anti-Automação</h4>
                <p className="text-xs text-slate-400">Implemente CAPTCHAs modernos e limites de taxa (rate limiting) em todos os formulários.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Verificação Vocal</h4>
                <p className="text-xs text-slate-400">Crie códigos de segurança verbais para autorizar transações solicitadas por voz ou vídeo.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Acesso Segmentado</h4>
                <p className="text-xs text-slate-400">Divida sua rede em setores. Um computador infectado não deve acessar o servidor financeiro.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Cultura de Dúvida</h4>
                <p className="text-xs text-slate-400">Treine a equipe para SEMPRE confirmar solicitações atípicas por um segundo canal de comunicação.</p>
              </div>
            </div>
          </div>
        </section>

        {/* #lgpd-dicas */}
        <section id="lgpd-dicas" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">LGPD: Práticas para PMEs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "1. Mapeamento", d: "Identifique onde estão os dados pessoais (planilhas, CRM, e-mails)." },
              { t: "2. Base Legal", d: "Defina por que você coleta cada dado (Consentimento, Contrato, etc.)." },
              { t: "3. Aviso de Privacidade", d: "Crie um texto claro no site explicando o uso dos dados." },
              { t: "4. Direitos do Titular", d: "Crie um canal (e-mail) para clientes pedirem exclusão de dados." },
              { t: "5. Segurança Mínima", d: "Use senhas fortes e antivírus em todas as máquinas com dados." },
              { t: "6. Gestão de Crise", d: "Saiba como notificar a ANPD em caso de vazamento em até 48h." }
            ].map((tip, i) => (
              <div key={i} className="p-6 bg-slate-800/40 rounded-3xl border border-slate-700/50 border-t-4 border-t-blue-500 hover:bg-slate-800/60 transition-colors">
                <h3 className="font-bold text-white mb-3">{tip.t}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{tip.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-500/10 p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Star size={80} className="text-blue-400" />
            </div>
            <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2 relative z-10">
              <Star size={20} className="text-amber-400 fill-amber-400" /> 
              Flexibilização para PMEs (Resolução CD/ANPD nº 2):
            </h4>
            <p className="text-slate-300 relative z-10 leading-relaxed">
              PMEs têm prazos em dobro e não precisam obrigatoriamente de um DPO (Encarregado) se o tratamento não for de alto risco. 
              Isso reduz drasticamente os custos de conformidade inicial.
            </p>
          </div>
        </section>

        {/* #contato */}
        <section id="contato" className="scroll-mt-24">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Pronto para elevar o nível da sua segurança?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                Não espere um incidente acontecer para agir. Comece hoje mesmo a proteger seu maior patrimônio: seus dados e sua reputação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 h-14 rounded-2xl text-lg shadow-xl">
                  Falar com Especialista
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400 text-white hover:bg-blue-700/50 font-bold px-10 h-14 rounded-2xl text-lg">
                  Ver Cases de Sucesso
                </Button>
              </div>
            </div>
            <Zap className="absolute -bottom-10 -left-10 text-white/10 w-64 h-64 -rotate-12" />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
            <Newspaper className="h-8 w-8 text-blue-500" />
            Alertas e Insights para PMEs
          </h2>
          
          {noticiasCarrossel.length > 0 ? (
            <div className="relative px-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {noticiasCarrossel.map((noticia) => (
                    <CarouselItem key={noticia.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all group h-full flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={noticia.imagem} 
                            alt={noticia.titulo}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                              {noticia.categoria}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-3 line-clamp-2 text-white group-hover:text-blue-400 transition-colors">
                              {noticia.titulo}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {noticia.data}
                              </span>
                            </div>
                          </div>
                          <Link href={`/noticia/${noticia.id}`}>
                            <Button variant="outline" size="sm" className="w-full border-blue-500/20 text-blue-400 hover:bg-blue-500/10 group/btn">
                              Saiba Mais <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 bg-slate-800/80 hover:bg-blue-600 hover:text-white border-slate-700" />
                <CarouselNext className="-right-4 bg-slate-800/80 hover:bg-blue-600 hover:text-white border-slate-700" />
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-400">Carregando conteúdos...</p>
            </div>
          )}
        </section>

      </main>

    </PageLayout>
  );
}
