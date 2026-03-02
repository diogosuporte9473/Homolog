import SiteHeader from "@/components/SiteHeader";
import { useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Share2, ShieldAlert, AlertTriangle, ShieldCheck, Zap, Lock } from "lucide-react";

const NOTICIAS_CONTENT = {
  "loganything-vulnerability": {
    categoria: "Vulnerabilidades",
    titulo: "Nova falha crítica no 'LogAnything' afeta milhões de servidores",
    data: "15 de Março de 2026",
    autor: "Redação DMS Security",
    imagem: "https://images.unsplash.com/photo-1544890225-2fde0e66ea9c?q=80&w=1935&auto=format&fit=crop",
    conteudo: [
      {
        tipo: "paragrafo",
        texto: "Uma vulnerabilidade de execução remota de código (RCE) de dia zero, apelidada de 'LogAnything', foi descoberta na biblioteca de logging mais utilizada no ecossistema Java e Node.js. A falha, catalogada como CVE-2026-12345, recebeu a pontuação máxima de 10.0 no CVSS."
      },
      {
        tipo: "subtitulo",
        texto: "Impacto e Riscos"
      },
      {
        tipo: "paragrafo",
        texto: "A falha permite que atacantes não autenticados executem comandos arbitrários em servidores vulneráveis apenas enviando uma string formatada especificamente em logs de aplicação. Isso pode levar ao comprometimento total do sistema, roubo de dados e instalação de ransomware."
      },
      {
        tipo: "lista",
        itens: [
          "Exposição total de bancos de dados",
          "Movimentação lateral na rede interna",
          "Interrupção de serviços críticos",
          "Vazamento de chaves de API e segredos"
        ]
      },
      {
        tipo: "alerta",
        texto: "Recomenda-se a atualização imediata para a versão 3.4.2 do LogAnything. Se a atualização não for possível, desative as substituições de mensagens de log via configurações de ambiente."
      }
    ]
  },
  "cyberlions-ransomware": {
    categoria: "Ataques",
    titulo: "Grupo 'CyberLions' utiliza IA para criar phishing personalizado",
    data: "12 de Março de 2026",
    autor: "Equipe de Inteligência",
    imagem: "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=2069&auto=format&fit=crop",
    conteudo: [
      {
        tipo: "paragrafo",
        texto: "O grupo de ransomware CyberLions está elevando o nível dos ataques de engenharia social. Utilizando modelos avançados de linguagem (LLMs), eles agora geram e-mails de phishing que imitam perfeitamente o tom de voz e o estilo de escrita de executivos reais."
      },
      {
        tipo: "subtitulo",
        texto: "Como o ataque funciona"
      },
      {
        tipo: "paragrafo",
        texto: "Os atacantes primeiro coletam dados públicos e vazados sobre a empresa alvo. A IA então processa essas informações para criar uma narrativa convincente, muitas vezes citando projetos internos reais ou eventos corporativos recentes."
      },
      {
        tipo: "paragrafo",
        texto: "O objetivo é induzir o funcionário a clicar em um link malicioso ou baixar um anexo 'urgente' que instala o payload do ransomware LionsGate."
      },
      {
        tipo: "dica",
        texto: "Sempre verifique solicitações de transferência de fundos ou envio de dados sensíveis por um segundo canal de comunicação (telefone ou chat interno)."
      }
    ]
  },
  "anpd-fine-retail": {
    categoria: "LGPD",
    titulo: "ANPD multa empresa de varejo por vazamento de dados",
    data: "10 de Março de 2026",
    autor: "Departamento Jurídico",
    imagem: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
    conteudo: [
      {
        tipo: "paragrafo",
        texto: "A Autoridade Nacional de Proteção de Dados (ANPD) aplicou uma multa histórica de R$ 5 milhões a uma grande rede de varejo após a confirmação de um vazamento que expôs dados pessoais de mais de 2 milhões de clientes."
      },
      {
        tipo: "subtitulo",
        texto: "Negligência Técnica"
      },
      {
        tipo: "paragrafo",
        texto: "Segundo o relatório da ANPD, a empresa falhou em implementar medidas básicas de segurança, como criptografia em repouso e controle de acesso rigoroso. O vazamento ocorreu através de um banco de dados de teste deixado exposto na internet sem senha."
      },
      {
        tipo: "paragrafo",
        texto: "Este caso serve como um lembrete severo de que a conformidade com a LGPD não é apenas burocrática, mas exige segurança técnica real."
      }
    ]
  },
  "microsoft-zero-trust": {
    categoria: "Tecnologia",
    titulo: "Microsoft anuncia novas ferramentas baseadas em Zero Trust",
    data: "08 de Março de 2026",
    autor: "Novas Tecnologias",
    imagem: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop",
    conteudo: [
      {
        tipo: "paragrafo",
        texto: "A Microsoft revelou uma nova suite de ferramentas de segurança integradas ao Azure e Windows, focadas inteiramente na arquitetura Zero Trust (Confiança Zero). A novidade promete simplificar a gestão de identidades e acessos para empresas de todos os tamanhos."
      },
      {
        tipo: "subtitulo",
        texto: "Principais Inovações"
      },
      {
        tipo: "paragrafo",
        texto: "As novas ferramentas utilizam telemetria em tempo real para avaliar o risco de cada tentativa de login, considerando localização, saúde do dispositivo e comportamento do usuário antes de conceder acesso a qualquer recurso da rede."
      },
      {
        tipo: "lista",
        itens: [
          "Acesso condicional adaptativo",
          "Segmentação automática de rede baseada em identidade",
          "Detecção de anomalias por IA",
          "Integração nativa com dispositivos móveis"
        ]
      }
    ]
  },
  "cybersecurity-market-growth": {
    categoria: "Mercado",
    titulo: "Demanda por profissionais de segurança cresce 35%",
    data: "05 de Março de 2026",
    autor: "Carreiras & Mercado",
    imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    conteudo: [
      {
        tipo: "paragrafo",
        texto: "O mercado de cibersegurança no Brasil continua em franca expansão. Um novo estudo da Brasscom indica que a demanda por especialistas em proteção de dados e resposta a incidentes cresceu 35% no último ano, superando a média do setor de TI."
      },
      {
        tipo: "subtitulo",
        texto: "Habilidades mais Procuradas"
      },
      {
        tipo: "paragrafo",
        texto: "As empresas estão buscando profissionais que combinem conhecimento técnico profundo com habilidades de gestão e compreensão regulatória (LGPD)."
      },
      {
        tipo: "lista",
        itens: [
          "Segurança em Nuvem (AWS, Azure, GCP)",
          "Arquitetura Zero Trust",
          "Análise de Malware",
          "Gestão de Conformidade e Privacidade"
        ]
      },
      {
        tipo: "paragrafo",
        texto: "O déficit de profissionais qualificados ainda é o maior desafio para as empresas brasileiras, o que tem impulsionado os salários e benefícios na área."
      }
    ]
  }
};

export default function NoticiaDetalhe() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const noticiaId = params.id;
  const noticia = noticiaId ? NOTICIAS_CONTENT[noticiaId as keyof typeof NOTICIAS_CONTENT] : null;

  if (!noticia) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-white mb-4">Notícia não encontrada</h1>
        <Button onClick={() => setLocation("/seguranca-tecnologia")}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <SiteHeader />

      <main className="container max-w-4xl py-12 px-4">
        <Button 
          variant="ghost" 
          className="mb-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
          onClick={() => setLocation("/seguranca-tecnologia")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Segurança
        </Button>

        <article>
          {/* Header da Notícia */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-wider mb-4">
              <Tag size={14} />
              {noticia.categoria}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              {noticia.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {noticia.data}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                {noticia.autor}
              </div>
            </div>
          </header>

          {/* Imagem de Destaque */}
          <div className="rounded-2xl overflow-hidden mb-12 border border-slate-800">
            <img 
              src={noticia.imagem} 
              alt={noticia.titulo} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>

          {/* Conteúdo Dinâmico */}
          <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
            {noticia.conteudo.map((bloco, idx) => {
              switch (bloco.tipo) {
                case "paragrafo":
                  return <p key={idx}>{bloco.texto}</p>;
                case "subtitulo":
                  return <h2 key={idx} className="text-2xl font-bold text-white pt-4">{bloco.texto}</h2>;
                case "lista":
                  return (
                    <ul key={idx} className="space-y-3 pl-6">
                      {bloco.itens?.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "alerta":
                  return (
                    <div key={idx} className="bg-rose-500/10 border-l-4 border-rose-500 p-6 rounded-r-xl flex gap-4">
                      <ShieldAlert className="text-rose-500 shrink-0" size={24} />
                      <p className="text-rose-200 text-base">{bloco.texto}</p>
                    </div>
                  );
                case "dica":
                  return (
                    <div key={idx} className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-xl flex gap-4">
                      <ShieldCheck className="text-emerald-500 shrink-0" size={24} />
                      <p className="text-emerald-200 text-base">{bloco.texto}</p>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Footer da Notícia */}
          <footer className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-400 hover:text-white">
                <Share2 className="mr-2 h-4 w-4" /> Compartilhar
              </Button>
            </div>
          </footer>
        </article>
      </main>

      {/* Rodapé Padrão */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 mt-20">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm font-medium tracking-wide mb-2">
            © 2025 Diogo Martins. Todos os direitos reservados. Integridade guia; mentira e vazamento destroem. (Provérbios 11:3).
          </p>
        </div>
      </footer>
    </div>
  );
}
