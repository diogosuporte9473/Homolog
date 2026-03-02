/**
 * CyberGuard Game Challenges
 * Desafios educativos sobre segurança digital, privacidade e redes sociais
 */
import { Challenge } from "@/types/game";

export const challenges: Challenge[] = [
  // FASE 1: SENHAS SEGURAS
  {
    id: "pwd-001",
    type: "password",
    title: "Criando uma Senha Forte",
    description: "Aprenda a criar senhas que protegem suas contas",
    question: "Qual é a senha MAIS segura?",
    options: [
      { id: "opt-1", text: "123456", isCorrect: false },
      { id: "opt-2", text: "senha123", isCorrect: false },
      { id: "opt-3", text: "Tr0pic@l#Sunset2024!", isCorrect: true },
      { id: "opt-4", text: "abcdef", isCorrect: false },
    ],
    correctAnswer: "opt-3",
    explanation:
      "Uma senha forte deve ter: MAIÚSCULAS, minúsculas, números e símbolos especiais. Evite datas de nascimento ou palavras comuns!",
    points: 100,
    difficulty: "easy",
    tips: ["Mínimo 12 caracteres", "Misture tipos de caracteres", "Não use informações pessoais"],
  },
  {
    id: "pwd-002",
    type: "password",
    title: "Reutilização de Senhas",
    description: "Entenda os riscos de usar a mesma senha em vários sites",
    question: "Por que NÃO devo usar a mesma senha em vários sites?",
    options: [
      { id: "opt-1", text: "Porque é chato lembrar de muitas senhas", isCorrect: false },
      { id: "opt-2", text: "Se um site vazar, hackers podem acessar TODAS suas contas", isCorrect: true },
      { id: "opt-3", text: "Porque a internet não permite", isCorrect: false },
      { id: "opt-4", text: "Não há problema em reutilizar senhas", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Se um site é hackeado, criminosos tentam usar sua senha em outros sites. Use senhas DIFERENTES para cada conta importante!",
    points: 100,
    difficulty: "easy",
  },
  {
    id: "pwd-003",
    type: "password",
    title: "Gerenciador de Senhas",
    description: "Descubra como guardar senhas com segurança",
    question: "Qual é a melhor forma de guardar muitas senhas diferentes?",
    options: [
      { id: "opt-1", text: "Anotar em um caderno na mesa", isCorrect: false },
      { id: "opt-2", text: "Guardar em um arquivo de texto no computador", isCorrect: false },
      { id: "opt-3", text: "Usar um gerenciador de senhas criptografado (como Bitwarden)", isCorrect: true },
      { id: "opt-4", text: "Enviar por email para si mesmo", isCorrect: false },
    ],
    correctAnswer: "opt-3",
    explanation:
      "Gerenciadores de senhas criptografados armazenam suas senhas de forma segura. Você só precisa lembrar UMA senha mestra!",
    points: 150,
    difficulty: "medium",
  },

  // FASE 2: PHISHING E FRAUDES
  {
    id: "phishing-001",
    type: "phishing",
    title: "Identificando Phishing",
    description: "Aprenda a reconhecer emails fraudulentos",
    question: "Qual destes emails é provavelmente PHISHING?",
    options: [
      { id: "opt-1", text: "Email do seu banco com logo oficial e link para domínio correto", isCorrect: false },
      { id: "opt-2", text: 'Email pedindo para "confirmar dados" com link para site que parece seu banco', isCorrect: true },
      { id: "opt-3", text: "Email de confirmação de compra que você fez", isCorrect: false },
      { id: "opt-4", text: "Email de notificação de entrega do correio", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Phishing é quando criminosos fingem ser empresas legítimas para roubar seus dados. Bancos NUNCA pedem senhas por email!",
    points: 100,
    difficulty: "easy",
    tips: ["Verifique o email do remetente", "Passe o mouse sobre links para ver o URL real", "Desconfie de urgência artificial"],
  },
  {
    id: "phishing-002",
    type: "phishing",
    title: "Links Suspeitos",
    description: "Entenda como os criminosos disfarçam links maliciosos",
    question: "Qual link é SEGURO?",
    options: [
      { id: "opt-1", text: 'https://www.paypa1.com/verify (note o "1" no lugar do "l")', isCorrect: false },
      { id: "opt-2", text: "https://www.paypal.com/login", isCorrect: true },
      { id: "opt-3", text: "http://paypal-verify.tk/account", isCorrect: false },
      { id: "opt-4", text: "https://bit.ly/paypal-login", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Criminosos usam domínios parecidos (paypa1.com em vez de paypal.com) para enganar. Sempre verifique a URL completa!",
    points: 150,
    difficulty: "medium",
  },
  {
    id: "phishing-003",
    type: "phishing",
    title: "Anexos Perigosos",
    description: "Saiba quando desconfiar de arquivos anexados",
    question: "Qual anexo é MAIS perigoso?",
    options: [
      { id: "opt-1", text: "Um PDF de uma empresa conhecida que você confia", isCorrect: false },
      { id: "opt-2", text: "Um arquivo .exe de um remetente desconhecido", isCorrect: true },
      { id: "opt-3", text: "Uma imagem .jpg de um amigo", isCorrect: false },
      { id: "opt-4", text: "Um documento .docx de um colega de trabalho", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Arquivos .exe, .bat e .com podem conter vírus. Nunca execute anexos de remetentes desconhecidos!",
    points: 100,
    difficulty: "easy",
  },

  // FASE 3: PRIVACIDADE E DADOS PESSOAIS
  {
    id: "privacy-001",
    type: "privacy",
    title: "Informações Pessoais Online",
    description: "Descubra quais dados você deve proteger",
    question: "Qual informação é MAIS perigosa compartilhar online?",
    options: [
      { id: "opt-1", text: "Seu nome completo", isCorrect: false },
      { id: "opt-2", text: "Seu número de CPF ou RG", isCorrect: true },
      { id: "opt-3", text: "Sua cidade", isCorrect: false },
      { id: "opt-4", text: "Sua escola", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "CPF e RG são documentos de identidade. Compartilhá-los pode levar a roubo de identidade e fraude financeira!",
    points: 100,
    difficulty: "easy",
    tips: ["Nunca compartilhe CPF, RG ou número de cartão", "Desconfie de sites que pedem muitos dados", "Leia as políticas de privacidade"],
  },
  {
    id: "privacy-002",
    type: "privacy",
    title: "Localização e Segurança",
    description: "Entenda os riscos de compartilhar sua localização",
    question: "Por que compartilhar sua localização em tempo real é perigoso?",
    options: [
      { id: "opt-1", text: "Consome muita bateria do celular", isCorrect: false },
      { id: "opt-2", text: "Criminosos podem saber quando você está fora de casa", isCorrect: true },
      { id: "opt-3", text: "Deixa o WiFi mais lento", isCorrect: false },
      { id: "opt-4", text: "Não há problema em compartilhar localização", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Se criminosos sabem que você saiu de casa, podem roubar seus pertences. Compartilhe localização apenas com pessoas confiáveis!",
    points: 150,
    difficulty: "medium",
  },
  {
    id: "privacy-003",
    type: "privacy",
    title: "Cookies e Rastreamento",
    description: "Aprenda sobre cookies e como proteger sua privacidade",
    question: "O que são cookies?",
    options: [
      { id: "opt-1", text: "Arquivos que websites armazenam no seu navegador para rastrear seu comportamento", isCorrect: true },
      { id: "opt-2", text: "Biscoitos digitais que você pode comer", isCorrect: false },
      { id: "opt-3", text: "Vírus que infectam seu computador", isCorrect: false },
      { id: "opt-4", text: "Uma forma de criptografia", isCorrect: false },
    ],
    correctAnswer: "opt-1",
    explanation:
      "Cookies rastreiam seus hábitos online para publicidade direcionada. Você pode desativar cookies nas configurações do navegador!",
    points: 100,
    difficulty: "easy",
  },

  // FASE 4: REDES SOCIAIS
  {
    id: "social-001",
    type: "social_media",
    title: "Privacidade em Redes Sociais",
    description: "Proteja sua privacidade no Instagram, TikTok e outras plataformas",
    question: "Qual é a configuração MAIS segura para sua conta?",
    options: [
      { id: "opt-1", text: "Perfil público com todos os posts visíveis para estranhos", isCorrect: false },
      { id: "opt-2", text: "Perfil privado onde você aprova seguidores", isCorrect: true },
      { id: "opt-3", text: "Compartilhar sua localização em cada post", isCorrect: false },
      { id: "opt-4", text: "Aceitar seguidor de qualquer pessoa", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Um perfil privado permite que você controle quem vê seus posts e informações. Sempre aprove novos seguidores!",
    points: 100,
    difficulty: "easy",
    tips: ["Faça seu perfil privado", "Não aceite seguidor de estranhos", "Cuidado com o que compartilha"],
  },
  {
    id: "social-002",
    type: "social_media",
    title: "Cyberbullying e Segurança",
    description: "Proteja-se contra cyberbullying e comportamentos prejudiciais",
    question: "O que você deve fazer se receber mensagens ofensivas online?",
    options: [
      { id: "opt-1", text: 'Responder com agressividade para "dar uma lição"', isCorrect: false },
      { id: "opt-2", text: "Bloquear o usuário e relatar para a plataforma", isCorrect: true },
      { id: "opt-3", text: "Compartilhar as mensagens para humilhar o outro", isCorrect: false },
      { id: "opt-4", text: "Ignorar e continuar como se nada tivesse acontecido", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Bloquear e relatar é a forma segura de lidar com cyberbullying. Converse com um adulto de confiança se precisar!",
    points: 150,
    difficulty: "medium",
  },
  {
    id: "social-003",
    type: "social_media",
    title: "Conteúdo Enganoso",
    description: "Aprenda a identificar fake news e conteúdo falso",
    question: "Como você identifica se uma informação viral é verdadeira?",
    options: [
      { id: "opt-1", text: "Se muitas pessoas compartilharam, deve ser verdade", isCorrect: false },
      { id: "opt-2", text: "Verificar a fonte, ler artigos completos e pesquisar em sites confiáveis", isCorrect: true },
      { id: "opt-3", text: "Se tem muitos likes, é verdadeiro", isCorrect: false },
      { id: "opt-4", text: "Acreditar no primeiro que você vê", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Fake news se espalham rápido! Sempre verifique a fonte e pesquise em sites confiáveis antes de compartilhar.",
    points: 150,
    difficulty: "medium",
  },

  // FASE 5: PROTEÇÃO DE DADOS
  {
    id: "data-001",
    type: "data_protection",
    title: "WiFi Público",
    description: "Entenda os riscos de usar WiFi público",
    question: "Por que WiFi público é perigoso?",
    options: [
      { id: "opt-1", text: "Criminosos podem interceptar seus dados (senhas, mensagens)", isCorrect: true },
      { id: "opt-2", text: "Porque é mais lento que WiFi privado", isCorrect: false },
      { id: "opt-3", text: "Porque consome mais bateria", isCorrect: false },
      { id: "opt-4", text: "Não há risco em usar WiFi público", isCorrect: false },
    ],
    correctAnswer: "opt-1",
    explanation:
      "Em WiFi público, criminosos podem espiar seus dados. Use VPN ou evite acessar contas importantes em WiFi público!",
    points: 100,
    difficulty: "easy",
    tips: ["Use VPN em WiFi público", "Evite acessar bancos em WiFi aberto", "Desative compartilhamento de arquivos"],
  },
  {
    id: "data-002",
    type: "data_protection",
    title: "Backup e Segurança",
    description: "Proteja seus arquivos importantes",
    question: "Qual é a melhor forma de proteger seus arquivos importantes?",
    options: [
      { id: "opt-1", text: "Guardar apenas no computador", isCorrect: false },
      { id: "opt-2", text: "Fazer backup em nuvem criptografada e em um disco externo", isCorrect: true },
      { id: "opt-3", text: "Compartilhar com vários amigos", isCorrect: false },
      { id: "opt-4", text: "Não fazer backup", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Backup em múltiplos locais protege contra perda de dados. Use nuvem criptografada e disco externo!",
    points: 150,
    difficulty: "medium",
  },
  {
    id: "data-003",
    type: "data_protection",
    title: "Atualização de Software",
    description: "Entenda a importância de manter tudo atualizado",
    question: "Por que é importante atualizar seu sistema operacional e aplicativos?",
    options: [
      { id: "opt-1", text: "Apenas para ter novos recursos", isCorrect: false },
      { id: "opt-2", text: "Para corrigir vulnerabilidades de segurança", isCorrect: true },
      { id: "opt-3", text: "Porque o computador fica mais lindo", isCorrect: false },
      { id: "opt-4", text: "Não é necessário atualizar", isCorrect: false },
    ],
    correctAnswer: "opt-2",
    explanation:
      "Atualizações corrigem brechas de segurança que hackers exploram. Sempre atualize seu sistema!",
    points: 100,
    difficulty: "easy",
  },
];

// Embaralhar desafios para ordem aleatória
export const getRandomChallenges = (count: number = 5): Challenge[] => {
  const shuffled = [...challenges].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Obter desafio por ID
export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find((c) => c.id === id);
};

// Obter desafios por tipo
export const getChallengesByType = (type: string): Challenge[] => {
  return challenges.filter((c) => c.type === type);
};
