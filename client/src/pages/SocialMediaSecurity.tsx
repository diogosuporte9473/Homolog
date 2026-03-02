import { Lock, AlertTriangle, Eye, User, Shield, Smartphone, CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function SocialMediaSecurity() {
  const tips = [
    {
      id: 1,
      title: "Proteja Sua Conta com uma Boa Senha",
      icon: Lock,
      description: "Uma senha fraca é a principal porta de entrada para invasões.",
      tips: [
        "Use uma senha com pelo menos 8 a 12 caracteres",
        "Misture letras, números e símbolos",
        "Não use datas de nascimento ou nomes de familiares",
        "Não use a mesma senha em todas as redes",
        "Ative a verificação em duas etapas (2FA) quando possível",
      ],
      refs: [
        { label: "NIST SP 800-63B (Autenticação)", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
        { label: "FIDO Alliance – Passkeys", url: "https://fidoalliance.org/passkeys/" }
      ],
    },
    {
      id: 2,
      title: "Cuidado com Links e Mensagens Suspeitas",
      icon: AlertTriangle,
      description: "Golpistas enviam mensagens fingindo ser amigos, empresas ou suporte.",
      tips: [
        "Desconfie quando a mensagem pede urgência",
        "Nunca compartilhe códigos de verificação",
        "Evite clicar em links estranhos",
        "Desconfie de promessas de prêmios ou dinheiro fácil",
        "Confirme pedidos sensíveis por outros canais",
      ],
      refs: [
        { label: "CISA – Evitando Phishing", url: "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks" },
        { label: "CERT.br – Phishing", url: "https://cartilha.cert.br/phishing/" }
      ],
    },
    {
      id: 3,
      title: "Ajuste as Configurações de Privacidade",
      icon: Eye,
      description: "Você pode controlar quem vê suas informações.",
      tips: [
        "Defina quem pode ver suas fotos e publicações",
        "Controle quem pode comentar",
        "Restrinja quem pode enviar mensagens",
        "Controle quem pode encontrá-lo pelo número de telefone",
        "Deixe seu perfil visível apenas para amigos, se possível",
      ],
      refs: [
        { label: "Facebook – Verificação de Privacidade", url: "https://www.facebook.com/help/443357099140264" },
        { label: "Instagram – Configurações de Privacidade", url: "https://help.instagram.com/196883487377501" }
      ],
    },
    {
      id: 4,
      title: "Evite Expor Informações Pessoais",
      icon: User,
      description: "Muitos golpes começam com informações públicas.",
      tips: [
        "Não compartilhe seu endereço residencial",
        "Evite publicar sua rotina diária (horários e locais)",
        "Não compartilhe documentos",
        "Cuidado com fotos de cartões de embarque ou documentos",
        "Nunca divulgue informações financeiras",
      ],
      refs: [
        { label: "CERT.br – Redes Sociais", url: "https://cartilha.cert.br/redes-sociais/" },
        { label: "SaferNet Brasil – Dicas de Segurança", url: "https://www.safernet.org.br/" }
      ],
    },
    {
      id: 5,
      title: "Cuidado com Perfis Falsos",
      icon: User,
      description: "Nem todo perfil é real. Fique atento aos sinais de alerta.",
      tips: [
        "Fotos muito 'perfeitas' ou de bancos de imagem",
        "Poucos seguidores e pouca interação",
        "Pressa para criar intimidade",
        "Pedidos de dinheiro ou ajuda financeira",
        "Em caso de dúvida, bloqueie e denuncie",
      ],
      refs: [
        { label: "Facebook – Impersonation", url: "https://www.facebook.com/help/159096464162185" },
        { label: "Instagram – Denunciar Falsa Identidade", url: "https://help.instagram.com/285881641526716" }
      ],
    },
    {
      id: 6,
      title: "Atenção a Golpes Comuns nas Redes",
      icon: AlertTriangle,
      description: "Conheça os golpes mais frequentes e como evitá-los.",
      tips: [
        "Falso suporte técnico",
        "Falso investimento",
        "Promoções falsas",
        "Clonagem de conta",
        "Golpe do 'pedido de ajuda' via mensagem - sempre confirme por ligação",
      ],
      refs: [
        { label: "CERT.br – Golpes na Internet", url: "https://cartilha.cert.br/golpes/" },
        { label: "FTC – Scams", url: "https://consumer.ftc.gov/scams" }
      ],
    },
    {
      id: 7,
      title: "Mantenha o Aplicativo Atualizado",
      icon: Smartphone,
      description: "Atualizações corrigem falhas de segurança.",
      tips: [
        "Ative atualizações automáticas",
        "Instale apenas aplicativos das lojas oficiais",
        "Evite instalar aplicativos desconhecidos que pedem acesso à sua conta",
        "Revise permissões solicitadas pelos aplicativos",
        "Desinstale aplicativos que não usa mais",
      ],
      refs: [
        { label: "Google Play – Proteção", url: "https://support.google.com/googleplay/answer/2812853" },
        { label: "Apple – Atualizações do iOS", url: "https://support.apple.com/pt-br/HT204204" }
      ],
    },
    {
      id: 8,
      title: "O Que Fazer se Sua Conta For Invadida",
      icon: Shield,
      description: "Agir rápido faz diferença quando sua conta é comprometida.",
      tips: [
        "Troque a senha imediatamente",
        "Ative a verificação em duas etapas",
        "Avise seus contatos sobre a invasão",
        "Use a opção 'Conta invadida' na própria rede social",
        "Verifique e-mails sobre alterações na conta",
      ],
      refs: [
        { label: "Facebook – Conta Invadida", url: "https://www.facebook.com/hacked" },
        { label: "Instagram – Conta Invadida", url: "https://help.instagram.com/149494825257596" },
        { label: "WhatsApp – Conta Comprometida", url: "https://faq.whatsapp.com/729217830495155/?locale=pt_BR" }
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <SiteHeader />

      {/* Main Content */}
      <main className="container py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="heading-section text-white mb-4">
            Segurança nas Redes Sociais
          </h1>
          <p className="lead text-slate-300 max-w-3xl">
            As redes sociais fazem parte do nosso dia a dia. Com algumas atitudes simples, você pode usar redes sociais com muito mais segurança e evitar golpes, invasões de contas e vazamento de informações pessoais.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {tips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <div
                key={tip.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <IconComponent className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white flex-1">{tip.title}</h2>
                </div>

                <p className="text-sm text-slate-400 mb-4">{tip.description}</p>

                {/* Tips List */}
                <ul className="space-y-2">
                  {tip.tips.map((tipItem, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{tipItem}</span>
                    </li>
                  ))}
                </ul>
                {Array.isArray((tip as any).refs) && (tip as any).refs.length > 0 && (
                  <div className="mt-4">
                    <div className="text-slate-400 text-xs font-semibold mb-2">Referências</div>
                    <div className="flex flex-wrap gap-3">
                      {(tip as any).refs.map((r: { label: string; url: string }, i: number) => (
                        <a
                          key={i}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-4 text-xs"
                        >
                          {r.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Golden Rule */}
        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-amber-500/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-amber-100 mb-4">⭐ Regra de Ouro da Segurança</h2>
          <p className="text-lg text-amber-50">
            <strong>Se algo parecer bom demais para ser verdade, provavelmente é golpe.</strong>
          </p>
        </div>

        {/* Key Message */}
        <div className="bg-gradient-to-r from-blue-900/20 to-slate-900/20 border border-blue-500/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Segurança Digital para Todos</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Segurança digital não exige conhecimento técnico avançado. Pequenas atitudes, feitas todos os dias, já reduzem muito os riscos de invasões, golpes e vazamentos de dados.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mt-4">
            O mais importante é estar atento, desconfiar de mensagens suspeitas e nunca compartilhar informações sensíveis com estranhos.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Dúvidas Sobre Segurança?</h2>
          <p className="text-slate-300 mb-6">
            Entre em contato para orientações personalizadas sobre segurança digital
          </p>
          <a
            href="mailto:diogo@dmssecurity.com.br"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </main>
    </div>
  );
}
