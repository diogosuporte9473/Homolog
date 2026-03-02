import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Shield, Award, Lock, Server, BarChart3, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/**
 * Tech Forward Design - Dark theme with cyan and purple accents
 * Playfair Display for titles, Montserrat for subtitles, Roboto for body
 * Hero background with gradient, glassmorphism cards, glow effects
 */

export default function Home() {

  const formations = [
    {
      category: "Graduação",
      items: [
        { name: "Tecnologia em Gestão da Tecnologia da Informação", institution: "Uninove" }
      ]
    },
    {
      category: "Pós-Graduação / MBA",
      items: [
        { name: "MBA em Cybersecurity e Cybercrimes", institution: "Anhanguera Educacional" },
        { name: "MBA em Privacidade e Proteção de Dados", institution: "Anhanguera Educacional" }
      ]
    },
    {
      category: "Extensões e Especializações",
      items: [
        { name: "Perícia Forense Computacional: Segurança da Informação", institution: "Universidade Cruzeiro do Sul", year: "Junho - Dezembro 2025", status: "Concluído" },
        { name: "Curso de Extensão em Compliance Criminal", institution: "PUCRS", year: "2024", status: "Concluído", description: "Lei anticorrupção, Avaliação de riscos, Conceitos LGPD, Compliance e proteção de dados, Responsabilidade penal, Compliance officer, Advocacia e deveres de Compliance" },
        { name: "Curso de Extensão Tributação, Inovação e Economia Digital", institution: "PUCRS", year: "2024", status: "Concluído", description: "Economia digital, Mudança no mercado e capitalismo, Tributação de renda, Tributação de grandes empresas, Modelos e pilares de tributação, DST versus Adicional de Imposto de Renda, Tributação sobre o consumo, Tributação da importação, Exportações de intangíveis digitais, Diferença entre bens e serviços, ISS, Reforma Tributária, Marketplace, Inovação e tributação, Tributação e criptografia" }
      ]
    },
    {
      category: "Cursos",
      items: [
        { name: "Microsoft Cybersecurity Architect (SC-100)", institution: "Uni Academy", year: "2024" },
        { name: "Microsoft 365 Administrator (MS-102)", institution: "Uni Academy", year: "2024" },
        { name: "Microsoft Cloud Security Expert", institution: "Uni Academy", year: "2025" },
        { name: "Fundamentos de Segurança, Conformidade e Identidade (SC-900)", institution: "Uni Academy", year: "2024" },
        { name: "Especialista em Microsoft Defender para Office 365", institution: "Academy", year: "2024" },
        { name: "Information Security Foundation (ISO/IEC 27001)", institution: "Udemy", year: "2024" },
        { name: "Transformação Digital MIT", institution: "MIT - Santander Open Academy", year: "2025" },
        { name: "Prompting Responsável: Maximizar a IA no seu negócio", institution: "Santander Open Academy", year: "2025" },
        { name: "Segurança em Tecnologia da Informação", institution: "Fundação Bradesco", year: "2023" },
        { name: "Designer Arte Vetorial (Illustrator)", institution: "Escola SAGA", year: "2023" },
        { name: "Montagem e Manutenção de Computadores", institution: "SOS Tecnologia e Educação", year: "2008" }
      ]
    }
  ];

  const skills = [
    { category: "Segurança", items: ["LGPD", "OWASP", "ISO/IEC 27001", "Firewall Sophos", "Data Loss Prevention"] },
    { category: "Microsoft", items: ["Microsoft 365", "Azure", "SharePoint", "Microsoft Defender", "Cloud Security"] },
    { category: "Infraestrutura", items: ["Windows Server", "Linux", "Administração de Sistemas", "Manutenção de Hardware", "Backup & Recovery"] },
    { category: "Gestão", items: ["Gestão de Projetos", "Conformidade Regulatória", "Políticas de Segurança", "Auditoria de TI", "Business Continuity"] },
    { category: "Ferramentas", items: ["Sophos Central", "Microsoft 365 Admin", "Google Workspace", "Gopliance", "Pipedrive", "Movidesk", "Bling ERP", "Power BI", "Trello", "Automação de Processos"] }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="heading-hero mb-4">
                  Diogo <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Martins</span>
                </h1>
                <p className="lead text-muted-foreground font-semibold">Especialista em Segurança da Informação & Gestão de Tecnologia</p>
              </div>
              <p className="lead text-foreground/80">
                Profissional de Segurança da Informação com mais de 3 anos de experiência na implementação de políticas de conformidade, gestão de infraestrutura Microsoft 365 e Azure, e proteção de dados corporativos. Possui 15 anos de experiência em suporte técnico de software, com atuação focada na resolução de incidentes e no atendimento ao usuário. Vivência sólida em segurança física, incluindo monitoramento, gestão e implementação de sistemas de CFTV, garantindo a integridade de ambientes e ativos organizacionais.
              </p>
              <div className="flex gap-4 pt-4 flex-wrap">
                <a href="mailto:diogo@dmssecurity.com.br" className="inline-block">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-4 text-base sm:px-8 sm:py-6 sm:text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50">
                    <Mail className="mr-2" /> E-mail
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative hidden">
           <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 shadow-xl">
            <iframe
            src="https://player.vimeo.com/video/1166670189?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&playsinline=1&dnt=1&controls=0"
             allow="autoplay; fullscreen; picture-in-picture"
             allowFullScreen
             title="Apresentação DMS"
                className="absolute inset-0 w-full h-full"
              />
          </div>
          </div>
        </div>
       </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="heading-section mb-8 md:mb-12 text-center">Sobre Mim</h2>
          <div className="space-y-8">
            <Card className="bg-card border-border p-8 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <p className="lead text-foreground/80 mb-6">
                Sou um profissional apaixonado por tecnologia, segurança da informação, controle e privacidade. Minha trajetória começou aos 22 anos na área de segurança física, atuando como Vigilante, onde desenvolvi uma base sólida nos principais conceitos de proteção, prevenção, controle de acesso e gestão de riscos.
              </p>
              <p className="lead text-foreground/80 mb-6">
                Paralelamente, atuei nos bastidores do setor de e-commerce e concluí o curso técnico em manutenção e atualização de software e hardware, ingressando de vez no mercado digital. Também atuei como designer após formação técnica na área, sempre movido pela curiosidade e pelo interesse constante em tecnologia.
              </p>
              <p className="lead text-foreground/80 mb-6">
                Buscando evolução profissional, graduei-me em Gestão de Tecnologia, seguido de uma Pós-Graduação em Cyber Segurança e um MBA em Privacidade e Proteção de Dados, além de diversos cursos de extensão na área de Segurança da Informação.
              </p>
              <p className="lead text-foreground/80">
                Hoje, com sólida experiência de mercado, atuo na implementação de políticas de segurança, gestão de tecnologia e proteção de dados, ajudando empresas a se desenvolverem e amadurecerem tecnologicamente com segurança, credibilidade e conformidade.
              </p>
            </Card>
          </div>
        </div>
      </section>

      

      {/* Certifications Section */}
      <section id="certificacoes" className="py-20 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="heading-section mb-8 md:mb-12 text-center">Cursos e Formações</h2>
          <div className="space-y-12">
            {formations.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-2xl font-bold text-blue-400 mb-6 pb-4 border-b border-border">{section.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
                  {section.items.map((item, idx) => (
                    <Card key={idx} className="bg-card border-border p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                          <Award className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.institution}</p>
                          {"year" in item && item.year && <p className="text-xs text-blue-400 mt-2">{item.year}</p>}
                          {"status" in item && item.status && <p className="text-xs text-blue-300 mt-1 italic">{item.status}</p>}
                          {"description" in item && item.description && <p className="text-xs text-gray-400 mt-3 leading-relaxed">{item.description}</p>}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 border-t border-border bg-background/50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="heading-section mb-8 md:mb-12 text-center">Habilidades & Competências</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {skills.map((skillGroup, idx) => (
              <Card key={idx} className="bg-card border-border p-6 hover:border-blue-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-blue-400 mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="heading-section mb-6">Vamos Conversar?</h2>
          <p className="lead text-foreground/80 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades, projetos desafiadores e colaborações. Sinta-se livre para entrar em contato!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
            <a href="mailto:diogo@dmssecurity.com.br" className="inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-4 text-base sm:px-8 sm:py-6 sm:text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50">
                <Mail className="mr-2" /> diogo@dmssecurity.com.br
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
