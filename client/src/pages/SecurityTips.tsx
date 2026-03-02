import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Shield, Users, Cloud, Smartphone, Lock, Zap, Brain } from "lucide-react";

export default function SecurityTips() {
  const tips = [
    {
      id: 1,
      title: "Phishing e Engenharia Social",
      icon: AlertCircle,
      risks: [
        "E-mails falsos simulando bancos, lojas ou serviços",
        "Links maliciosos em mensagens",
        "Roubo de senhas e dados pessoais",
      ],
      practices: [
        "Verifique sempre o remetente antes de clicar em links",
        "Desconfie de mensagens urgentes ou alarmistas",
        "Nunca informe senhas ou códigos por e-mail ou mensagem",
        "Confirme solicitações diretamente com a empresa",
      ],
    },
    {
      id: 2,
      title: "Proteção de Senhas e Autenticação",
      icon: Lock,
      risks: [
        "Senhas fracas continuam sendo uma porta de entrada comum para invasões",
      ],
      practices: [
        "Use senhas longas e complexas",
        "Não reutilize a mesma senha em vários serviços",
        "Ative a autenticação em dois fatores (2FA)",
        "Utilize gerenciadores de senhas",
      ],
    },
    {
      id: 3,
      title: "Ransomware e Sequestro de Dados",
      icon: Shield,
      risks: [
        "Ataques que bloqueiam sistemas e exigem pagamento para liberar informações",
      ],
      practices: [
        "Faça backup frequente dos dados",
        "Mantenha sistemas sempre atualizados",
        "Evite baixar arquivos de fontes desconhecidas",
        "Tenha um plano de resposta a incidentes",
      ],
    },
    {
      id: 4,
      title: "Segurança no Trabalho Remoto",
      icon: Users,
      risks: [
        "O home office ampliou a superfície de ataque das empresas",
      ],
      practices: [
        "Usar VPN corporativa",
        "Evitar redes Wi-Fi públicas",
        "Proteger dispositivos pessoais com senha",
        "Separar uso profissional e pessoal",
      ],
    },
    {
      id: 5,
      title: "Vazamento e Proteção de Dados Pessoais",
      icon: AlertCircle,
      risks: [
        "Compartilhamento excessivo em redes sociais",
        "Armazenamento inseguro de informações",
        "Falta de controle de acesso",
      ],
      practices: [
        "Compartilhe apenas o necessário",
        "Revise permissões de aplicativos",
        "Armazene dados sensíveis com criptografia",
      ],
    },
    {
      id: 6,
      title: "Segurança em Dispositivos Móveis",
      icon: Smartphone,
      risks: [
        "Celulares se tornaram um dos principais alvos de ataques",
      ],
      practices: [
        "Instale aplicativos apenas de lojas oficiais",
        "Use bloqueio por biometria ou senha",
        "Mantenha o sistema atualizado",
        "Evite clicar em links desconhecidos recebidos por SMS ou mensagens",
      ],
    },
    {
      id: 7,
      title: "Atualizações e Vulnerabilidades",
      icon: Zap,
      risks: [
        "Sistemas desatualizados são um dos maiores pontos de entrada para ataques",
      ],
      practices: [
        "Atualizar sistemas operacionais regularmente",
        "Manter antivírus ativo",
        "Atualizar aplicativos e navegadores",
        "Corrigir falhas assim que possível",
      ],
    },
    {
      id: 8,
      title: "Cultura de Segurança nas Empresas",
      icon: Users,
      risks: [
        "A maioria dos incidentes ocorre por erro humano",
      ],
      practices: [
        "Treinamentos periódicos de conscientização",
        "Simulações de ataques de phishing",
        "Políticas claras de segurança",
        "Incentivo à comunicação de incidentes",
      ],
    },
    {
      id: 9,
      title: "Inteligência Artificial e Novos Golpes Digitais",
      icon: Brain,
      risks: [
        "Voz e vídeos falsos (deepfakes)",
        "E-mails personalizados automatizados",
        "Perfis falsos altamente convincentes",
      ],
      practices: [
        "Confirmar pedidos sensíveis por outros canais",
        "Desconfiar de mensagens muito personalizadas",
        "Verificar identidade antes de transferências financeiras",
      ],
    },
    {
      id: 10,
      title: "Segurança na Nuvem",
      icon: Cloud,
      risks: [
        "Cada vez mais empresas armazenam dados em serviços online",
      ],
      practices: [
        "Controlar quem pode acessar os dados",
        "Usar autenticação forte",
        "Monitorar acessos suspeitos",
        "Configurar backups automáticos",
      ],
    },
  ];

  return (
    <PageLayout>
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Segurança da Informação: Temas Essenciais
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          A segurança da informação tornou-se um dos pilares mais importantes para empresas e usuários. Com o aumento de ataques digitais, vazamentos de dados e golpes online, manter-se informado sobre as principais ameaças e práticas de proteção é fundamental.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16">
        {tips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <Card
              key={tip.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <IconComponent className="text-blue-400" size={24} />
                </div>
                <h2 className="text-xl font-bold text-white flex-1">{tip.title}</h2>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Principais Riscos
                </h3>
                <ul className="space-y-1">
                  {tip.risks.map((risk, idx) => (
                    <li key={idx} className="text-sm text-slate-300">
                      • {risk}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Boas Práticas
                </h3>
                <ul className="space-y-1">
                  {tip.practices.map((practice, idx) => (
                    <li key={idx} className="text-sm text-slate-300">
                      ✓ {practice}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-900/20 to-slate-900/20 border border-blue-500/20 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Conclusão</h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          A segurança da informação não depende apenas de tecnologia, mas também de comportamento. Pequenas atitudes diárias reduzem significativamente os riscos de ataques e vazamentos.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mt-4">
          Manter-se atualizado, adotar boas práticas e promover a conscientização contínua são as melhores formas de proteção no cenário digital atual.
        </p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Precisa de Consultoria?</h2>
        <p className="text-slate-300 mb-6">
          Implemente essas práticas na sua empresa ou instituição com suporte profissional
        </p>
        <a
          href="mailto:diogo@dmssecurity.com.br"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Entre em Contato
        </a>
      </div>
    </PageLayout>
  );
}
