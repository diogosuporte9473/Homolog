import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, Cloud, Brain, Users, CheckCircle2, Zap, Lock, Bell, Database, Mail, Newspaper, BookOpenIcon, TrendingUpIcon, WrenchIcon } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SegurancaTecnologia() {
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

  const publicoAlvo = [
    "Profissionais de TI e Segurança",
    "CISOs, Gestores e Líderes",
    "Analistas e Especialistas",
    "Estudantes e Iniciantes",
    "Desenvolvedores e SRE/DevOps",
  ];

  const noticiasRecentes = [
    {
      titulo: "Vulnerabilidades críticas",
      itens: [
        "Exploits ativos em bibliotecas populares e componentes de supply chain",
        "Novas falhas em serviços gerenciados de nuvem com impacto global",
        "Explorações de privilege escalation em sistemas operacionais modernos",
      ],
      refs: [
        { label: "NVD (NIST)", url: "https://nvd.nist.gov/" },
        { label: "CVE (MITRE)", url: "https://cve.mitre.org/" },
        { label: "CISA KEV", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog" },
      ],
    },
    {
      titulo: "Ameaças emergentes",
      itens: [
        "Campanhas de phishing com uso de IA e deepfakes",
        "Ataques a MFA por push fatigue e token theft",
        "Golpes de engenharia social com automação generativa",
      ],
      refs: [
        { label: "CISA Alerts", url: "https://www.cisa.gov/news-events/alerts" },
        { label: "Microsoft Security Blog", url: "https://www.microsoft.com/security/blog/" },
        { label: "Cisco Talos Blog", url: "https://blog.talosintelligence.com/" },
      ],
    },
    {
      titulo: "Vazamentos de dados",
      itens: [
        "Exposição de buckets e repositórios públicos mal configurados",
        "Credenciais vazadas em repositórios e pacotes de terceiros",
        "Incidentes decorrentes de integrações SaaS sem governança",
      ],
      refs: [
        { label: "Krebs on Security", url: "https://krebsonsecurity.com/" },
        { label: "BleepingComputer", url: "https://www.bleepingcomputer.com/" },
        { label: "Troy Hunt (HIBP Blog)", url: "https://www.troyhunt.com/" },
      ],
    },
    {
      titulo: "Novas tecnologias",
      itens: [
        "Controles de Zero Trust integrados a plataformas de identidade",
        "Sistemas de detecção baseados em comportamento e IA",
        "Ferramentas de SBOM e verificação de integridade de builds",
      ],
      refs: [
        { label: "NIST SP 800-207 (Zero Trust)", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" },
        { label: "OWASP SAMM", url: "https://owaspsamm.org/" },
        { label: "CycloneDX (SBOM)", url: "https://cyclonedx.org/" },
      ],
    },
  ];

  const educacional = [
    {
      titulo: "Conceitos fundamentais",
      itens: [
        "Confidencialidade, Integridade, Disponibilidade, Autenticidade e Não Repúdio",
        "Gestão de riscos, ameaça, vulnerabilidade e probabilidade",
        "Criptografia, hashing, assinatura digital e PKI",
      ],
      refs: [
        { label: "NIST Glossary", url: "https://csrc.nist.gov/glossary" },
        { label: "SANS Whitepapers", url: "https://www.sans.org/white-papers/" },
        { label: "OWASP Cheat Sheets", url: "https://cheatsheetseries.owasp.org/" },
      ],
    },
    {
      titulo: "Boas práticas",
      itens: [
        "Políticas de senha, MFA e gestão de identidades",
        "Princípio do menor privilégio e segregação de funções",
        "Backup 3-2-1, testes de restauração e plano de resposta a incidentes",
      ],
      refs: [
        { label: "CIS Controls", url: "https://www.cisecurity.org/controls" },
        { label: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
        { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
      ],
    },
    {
      titulo: "Guias e tutoriais",
      itens: [
        "Checklists de hardening para sistemas e serviços de nuvem",
        "Guia de segurança para desenvolvedores: validação, autenticação e logs",
        "Passo a passo para inventário de ativos e avaliação de risco",
      ],
      refs: [
        { label: "OWASP ASVS", url: "https://owasp.org/ASVS/" },
        { label: "Microsoft Learn Security", url: "https://learn.microsoft.com/security/" },
        { label: "Google Cloud Security", url: "https://cloud.google.com/security" },
      ],
    },
    {
      titulo: "Frameworks e padrões",
      itens: [
        "NIST CSF, ISO/IEC 27001, CIS Controls",
        "OWASP ASVS, Top 10 e SAMM",
        "MITRE ATT&CK para mapeamento de táticas e técnicas",
      ],
      refs: [
        { label: "NIST CSF", url: "https://www.nist.gov/cyberframework" },
        { label: "ISO/IEC 27001 (Overview)", url: "https://www.iso.org/isoiec-27001-information-security.html" },
        { label: "MITRE ATT&CK", url: "https://attack.mitre.org/" },
      ],
    },
  ];

  const tendencias = [
    {
      titulo: "Zero Trust",
      itens: [
        "Verificação contínua de identidade e contexto",
        "Microsegmentação e políticas dinâmicas",
        "Telemetria e avaliação de postura de dispositivos",
      ],
      refs: [
        { label: "NIST SP 800-207", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" },
        { label: "Microsoft Zero Trust", url: "https://www.microsoft.com/security/business/zero-trust" },
        { label: "Google BeyondCorp", url: "https://cloud.google.com/beyondcorp" },
      ],
    },
    {
      titulo: "Cloud Security",
      itens: [
        "CSPM, CWPP e CNAPP para visibilidade e proteção",
        "Segurança em pipelines e imagens de contêiner",
        "Gestão de chaves, segredos e acesso federado",
      ],
      refs: [
        { label: "CIS Benchmarks", url: "https://www.cisecurity.org/cis-benchmarks" },
        { label: "Cloud Security Alliance", url: "https://cloudsecurityalliance.org/" },
        { label: "CNCF TAG Security", url: "https://tag-security.cncf.io/" },
      ],
    },
    {
      titulo: "IA aplicada à segurança",
      itens: [
        "Detecção de anomalias comportamentais",
        "Análise de ameaças e priorização de alertas",
        "Automação de playbooks e SOAR",
      ],
      refs: [
        { label: "NIST AI RMF", url: "https://www.nist.gov/ai/rmf" },
        { label: "Google Secure AI Framework", url: "https://saf.google/" },
        { label: "Microsoft AI Security", url: "https://learn.microsoft.com/azure/security/fundamentals/ai-security" },
      ],
    },
    {
      titulo: "Threat Intelligence",
      itens: [
        "Feeds de IOCs e correlação com telemetria interna",
        "Hunters e mapeamento com ATT&CK",
        "Compartilhamento de inteligência entre equipes",
      ],
      refs: [
        { label: "MISP Project", url: "https://www.misp-project.org/" },
        { label: "OASIS STIX/TAXII", url: "https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cti" },
        { label: "CISA Resources", url: "https://www.cisa.gov/resources-tools/services/free-cybersecurity-services-resources" },
      ],
    },
    {
      titulo: "DevSecOps",
      itens: [
        "Shift-left com SAST, DAST e SCA",
        "SBOM, assinaturas e verificação de supply chain",
        "Políticas como código e gate de qualidade",
      ],
      refs: [
        { label: "NIST SP 800-218 (SSDF)", url: "https://csrc.nist.gov/publications/detail/sp/800-218/final" },
        { label: "SLSA Supply Chain", url: "https://slsa.dev/" },
        { label: "OWASP SAMM", url: "https://owaspsamm.org/" },
      ],
    },
  ];

  const ferramentas = [
    {
      titulo: "Recomendadas",
      itens: [
        "Gerenciadores de senhas com MFA",
        "Plataformas de EDR/XDR integradas",
        "WAF, IDS/IPS e proteção de API",
      ],
      refs: [
        { label: "OWASP API Security", url: "https://owasp.org/www-project-api-security/" },
        { label: "OWASP CRS (WAF)", url: "https://coreruleset.org/" },
        { label: "Passkeys/MFA (FIDO)", url: "https://fidoalliance.org/" },
      ],
    },
    {
      titulo: "Monitoramento",
      itens: [
        "SIEM com ingestão de logs e UEBA",
        "Observabilidade de aplicações e infraestrutura",
        "Dashboards de postura de segurança",
      ],
      refs: [
        { label: "MITRE D3FEND", url: "https://d3fend.mitre.org/" },
        { label: "OpenTelemetry", url: "https://opentelemetry.io/" },
        { label: "Sigma Rules", url: "https://sigmahq.io/" },
      ],
    },
    {
      titulo: "Open source",
      itens: [
        "Ferramentas de varredura SAST/SCA",
        "Coletas de logs e pipelines de dados",
        "Ambientes de análise de malware e sandbox",
      ],
      refs: [
        { label: "OSQuery", url: "https://osquery.io/" },
        { label: "Zeek", url: "https://zeek.org/" },
        { label: "Suricata", url: "https://suricata.io/" },
      ],
    },
    {
      titulo: "Labs e prática",
      itens: [
        "Ambientes vulneráveis controlados para estudo",
        "Desafios de pentest e CTFs",
        "Laboratórios de nuvem com créditos gratuitos",
      ],
      refs: [
        { label: "TryHackMe", url: "https://tryhackme.com/" },
        { label: "Hack The Box", url: "https://www.hackthebox.com/" },
        { label: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/" },
      ],
    },
  ];

  const alertas = [
    {
      titulo: "CVEs recentes",
      itens: [
        "Priorizar CVSS e contexto de exposição",
        "Correção baseada em risco e impacto no negócio",
        "Acompanhamento de exploração ativa e PoCs",
      ],
      refs: [
        { label: "NVD (NIST)", url: "https://nvd.nist.gov/" },
        { label: "CISA KEV", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog" },
        { label: "Exploit DB", url: "https://www.exploit-db.com/" },
      ],
    },
    {
      titulo: "Alertas globais",
      itens: [
        "Comunicados de agências e fornecedores",
        "Boletins de vulnerabilidade em larga escala",
        "Campanhas ativas contra setores específicos",
      ],
      refs: [
        { label: "CISA Alerts", url: "https://www.cisa.gov/news-events/alerts" },
        { label: "MSRC", url: "https://msrc.microsoft.com/" },
        { label: "Google TAG", url: "https://blog.google/threat-analysis-group/" },
      ],
    },
    {
      titulo: "Recomendações",
      itens: [
        "Mitigações temporárias e compensatórias",
        "Janela de manutenção e rollback plano",
        "Validação pós-correção e auditoria",
      ],
      refs: [
        { label: "NIST SP 800-61 (CSIRT)", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" },
        { label: "CISA Mitigations", url: "https://www.cisa.gov/resources-tools/resources" },
        { label: "SANS Incident Handlers", url: "https://www.sans.org/cyber-security-courses/incident-handler/" },
      ],
    },
  ];

  const fontes = [
    "OWASP",
    "NIST",
    "CISA",
    "Krebs on Security",
    "The Hacker News",
    "BleepingComputer",
    "Microsoft Security Blog",
    "Google Security Blog",
    "Cisco Talos",
    "Kaspersky Threat Intelligence",
    "SANS Institute",
    "MITRE ATT&CK",
  ];

  const seo = {
    palavras: [
      "Segurança da Informação",
      "Cibersegurança",
      "Zero Trust",
      "Cloud Security",
      "DevSecOps",
      "Threat Intelligence",
      "Vulnerabilidades",
      "CVE",
      "Boas práticas de segurança",
      "Privacidade e conformidade",
    ],
    descricao:
      "Portal de Segurança da Informação e Tecnologia com notícias, educação, tendências e recursos práticos para profissionais, estudantes e líderes.",
    tags: ["segurança", "cibersegurança", "cloud", "devsecops", "zero trust", "cve", "threat intel"],
  };

  const automacao = [
    "Ingestão diária de RSS de fontes confiáveis com deduplicação",
    "Enriquecimento de CVEs via APIs públicas e priorização por risco",
    "Geração de boletins semanais automatizados e envio por e-mail",
    "Publicação programada com verificação de links e revisão",
  ];

  return (
    <PageLayout>
      <main className="container py-8 sm:py-12">
        <section className="mb-12">
          <h2 className="heading-section text-center mb-4">Centro de Segurança da Informação e Tecnologia</h2>
          <p className="lead text-slate-300 max-w-4xl mx-auto text-center">
            Conteúdo atualizado sobre ameaças, vulnerabilidades, tendências, educação e recursos práticos para apoiar
            decisões técnicas e estratégicas em cibersegurança.
          </p>
        </section>

        {/* Seção de Notícias Recentes com Carrossel */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="text-blue-400" size={28} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Notícias Recentes</h2>
          </div>
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {noticiasCarrossel.map((noticia, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors group">
                      <div className="relative h-40">
                        <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{noticia.categoria}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-2 h-12">{noticia.titulo}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">{noticia.fonte}</span>
                          <Link href={`/noticia/${noticia.id}`}>
                            <a className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                              Ler mais
                            </a>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </section>

        <section className="mb-12">
          <Card className="bg-slate-900/60 border-slate-700 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">Propósito</h3>
                <p className="text-slate-300">
                  Consolidar notícias, educar profissionais e orientar estratégias com base em boas práticas e
                  frameworks reconhecidos, promovendo maturidade em segurança.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">Público-Alvo</h3>
                <ul className="text-slate-300 space-y-1">
                  {publicoAlvo.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-amber-400" size={22} />
            <h3 className="text-2xl font-bold">Notícias Recentes</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {noticiasRecentes.map((g, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-slate-700 p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-3">{g.titulo}</h4>
                <ul className="text-slate-300 space-y-2">
                  {g.itens.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Zap size={16} className="text-cyan-400 mt-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {("refs" in g) && Array.isArray((g as any).refs) && (
                  <div className="pt-3">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Referências</div>
                    <div className="flex flex-wrap gap-2">
                      {(g as any).refs.map((r: any, i: number) => (
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                          {r.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="text-blue-400" size={22} />
            <h3 className="text-2xl font-bold">Conteúdos Educacionais</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {educacional.map((g, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-slate-700 p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-3">{g.titulo}</h4>
                <ul className="text-slate-300 space-y-2">
                  {g.itens.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Shield size={16} className="text-blue-400 mt-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {("refs" in g) && Array.isArray((g as any).refs) && (
                  <div className="pt-3">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Referências</div>
                    <div className="flex flex-wrap gap-2">
                      {(g as any).refs.map((r: any, i: number) => (
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                          {r.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUpIcon className="text-purple-400" size={22} />
            <h3 className="text-2xl font-bold">Tendências e Inovação</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tendencias.map((g, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-slate-700 p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-3">{g.titulo}</h4>
                <ul className="text-slate-300 space-y-2">
                  {g.itens.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Brain size={16} className="text-purple-400 mt-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {("refs" in g) && Array.isArray((g as any).refs) && (
                  <div className="pt-3">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Referências</div>
                    <div className="flex flex-wrap gap-2">
                      {(g as any).refs.map((r: any, i: number) => (
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                          {r.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <WrenchIcon className="text-cyan-400" size={22} />
            <h3 className="text-2xl font-bold">Ferramentas e Recursos</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ferramentas.map((g, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-slate-700 p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-3">{g.titulo}</h4>
                <ul className="text-slate-300 space-y-2">
                  {g.itens.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Cloud size={16} className="text-cyan-400 mt-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {("refs" in g) && Array.isArray((g as any).refs) && (
                  <div className="pt-3">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Referências</div>
                    <div className="flex flex-wrap gap-2">
                      {(g as any).refs.map((r: any, i: number) => (
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                          {r.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-rose-400" size={22} />
            <h3 className="text-2xl font-bold">Alertas e Vulnerabilidades</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {alertas.map((g, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-slate-700 p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-3">{g.titulo}</h4>
                <ul className="text-slate-300 space-y-2">
                  {g.itens.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Lock size={16} className="text-rose-400 mt-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {("refs" in g) && Array.isArray((g as any).refs) && (
                  <div className="pt-3">
                    <div className="text-xs uppercase text-muted-foreground mb-1">Referências</div>
                    <div className="flex flex-wrap gap-2">
                      {(g as any).refs.map((r: any, i: number) => (
                        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                          {r.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
            <Card className="bg-slate-900/60 border-slate-700 p-6">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Frequência de atualização</h4>
              <ul className="text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Database size={16} className="text-blue-400 mt-1" />
                  <span>Daily: ingestão de CVEs e alertas, priorização por risco</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database size={16} className="text-blue-400 mt-1" />
                  <span>Weekly: boletim consolidado com recomendações e impactos</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-emerald-400" size={22} />
            <h3 className="text-2xl font-bold">Fontes confiáveis de referência</h3>
          </div>
          <Card className="bg-slate-900/60 border-slate-700 p-6">
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {fontes.map((f, i) => (
                <li key={i} className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

             <section className="mb-16">
          <h2 className="heading-section text-center mb-6">Vamos Conversar?</h2>
          <p className="lead text-slate-300 text-center max-w-2xl mx-auto mb-8">
            Estou sempre aberto a novas oportunidades, projetos desafiadores e colaborações. Sinta-se livre para entrar em contato!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
            <a href="mailto:diogo@dmssecurity.com.br" className="inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
                <Mail className="mr-2" /> diogo@dmssecurity.com.br
              </Button>
            </a>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
