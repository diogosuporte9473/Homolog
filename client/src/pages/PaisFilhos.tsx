import PageLayout from "@/components/PageLayout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight, ShieldCheck, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PaisFilhos() {
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

  const riscos = [
    {
      titulo: "Compartilhar demais",
      regra: "Nada que identifique onde estuda, mora ou passa o dia.",
    },
    {
      titulo: "Aceitar desconhecidos",
      regra: "Se não conhece na vida real, não aceita amizade nem conversa.",
    },
    {
      titulo: "Cyberbullying",
      regra: "Se algo machuca, não responda. Salve e mostre para um adulto.",
    },
    {
      titulo: "Desafios perigosos",
      regra: "Antes de participar, pergunte: isso é seguro?",
    },
    {
      titulo: "Conteúdo sexual precoce",
      regra: "Se aparecer algo desconfortável, mostrar a um adulto sem medo.",
    },
    {
      titulo: "Golpes e phishing",
      regra: "Nunca clicar em link que promete presente, dinheiro ou nudez.",
    },
    {
      titulo: "Vício/uso excessivo",
      regra: "Sem celular no quarto após 21h/22h; preservar o sono.",
    },
    {
      titulo: "Pegada digital permanente",
      regra: "O que posta hoje pode impactar estudos, emprego e relações.",
    },
  ];

  return (
    <PageLayout>
      <main className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        <section className="mb-10">
          <h1 className="heading-section mb-4">
            Navegar Juntos e com Segurança – Guia Prático de Segurança da Informação para Pais de Crianças e Adolescentes
          </h1>
          <p className="lead text-muted-foreground">
            A internet faz parte da vida de 93% das crianças e adolescentes brasileiros de 9 a 17 anos. Ela traz aprendizado, conexão e diversão, mas também riscos reais: cyberbullying, aliciamento, vazamento de dados pessoais, conteúdos inadequados e vício em telas. O melhor antivírus é a conversa com regras claras e ferramentas de apoio. Não se trata de proibir, mas de educar para usar bem.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Módulo 1 – Regras de Idade e Recomendações Oficiais (2025/2026)</h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faixa Etária</TableHead>
                  <TableHead>Recomendação Principal</TableHead>
                  <TableHead>Exemplos Práticos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>0–2 anos</TableCell>
                  <TableCell>Quase zero exposição a telas</TableCell>
                  <TableCell>Sem tablet/celular próprio; videochamada com adulto presente</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2–5 anos</TableCell>
                  <TableCell>Uso muito limitado e sempre acompanhado</TableCell>
                  <TableCell>Vídeos educativos curtos juntos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6–11 anos</TableCell>
                  <TableCell>Sem smartphone próprio idealmente; redes com supervisão forte</TableCell>
                  <TableCell>Tablet da família com controle parental</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>12–17 anos</TableCell>
                  <TableCell>Uso com mediação ativa; respeitar idade mínima das plataformas</TableCell>
                  <TableCell>Combinar horários e conversar sobre o que veem</TableCell>
                </TableRow>
              </TableBody>
              <TableCaption>Fontes: Gov.br, UNICEF, SaferNet, Childhood</TableCaption>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Frase para pais: Quanto mais tarde o primeiro smartphone próprio, melhor para o desenvolvimento cerebral e emocional.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Módulo 2 – Os 8 Maiores Riscos Atuais e Como Conversar</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {riscos.map((r, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <div className="font-semibold">{r.titulo}</div>
                <div className="text-sm text-muted-foreground mt-2">{r.regra}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Módulo 3 – Combo de Proteção Prática</h2>
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">A – Diálogo</div>
              <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                <li>Pergunte mais do que proíba: O que você mais gosta no TikTok/Instagram/Roblox?</li>
                <li>Crie o momento sem julgamento semanal para falar sobre o que viram online.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">B – Configurações Básicas de Segurança</div>
              <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                <li>Ativar autenticação em dois fatores em todas as contas</li>
                <li>Configurar perfil como privado em redes sociais</li>
                <li>Desativar localização em posts e stories</li>
                <li>Usar SafeSearch no Google e YouTube restrito</li>
                <li>Ativar controle parental nativo: Google Family Link, Screen Time, TikTok Family Pairing, Instagram Supervision</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">C – Ferramentas Recomendadas 2026</div>
              <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                <li>Family Link / Google Family (Android)</li>
                <li>Screen Time e Restrições de Conteúdo (iPhone/iPad)</li>
                <li>Qustodio ou Kaspersky Safe Kids</li>
                <li>Navegador com filtro: YouTube Kids em modo restrito</li>
                <li>Gerenciador de senhas familiar, como Bitwarden</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">D – Regras de Casa</div>
              <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
                <li>Celular na sala/cozinha à noite</li>
                <li>Senhas compartilhadas com os pais até certa idade</li>
                <li>Relatar qualquer coisa estranha sem medo de punição</li>
                <li>Tempo máximo diário combinado, como 2h recreativo em dias de escola</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Módulo 4 – Frases Prontas para Conversa</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">6–10 anos</div>
              <p className="text-sm text-foreground/80">
                A internet é como uma praça: tem gente legal, mas também tem gente que faz mal. Vamos aprender a escolher quem deixar entrar?
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">11–14 anos</div>
              <p className="text-sm text-foreground/80">
                Você já viu alguém sendo grosso ou ameaçando outro no jogo/redes? O que faria se fosse com você?
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold mb-2">15+ anos</div>
              <p className="text-sm text-foreground/80">
                Tudo que você posta forma sua marca digital. Como quer ser visto daqui a 5 anos?
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Fechamento – Mensagem Final</h2>
          <p className="text-foreground/90">
            Você não precisa ser expert em tecnologia. Basta ser presente, curioso e firme. A criança mais protegida não é a com mais bloqueios, mas a que tem um adulto de confiança para contar qualquer coisa sem medo.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Newspaper className="h-7 w-7 text-blue-500" />
            Notícias e Alertas Recentes
          </h2>
          
          {noticiasCarrossel.length > 0 ? (
            <div className="relative px-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {noticiasCarrossel.map((noticia) => (
                    <CarouselItem key={noticia.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden border-border/40 bg-card/50 hover:border-blue-500/50 transition-all group h-full flex flex-col">
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
                            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                              {noticia.titulo}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {noticia.data}
                              </span>
                            </div>
                          </div>
                          <Link href={`/noticia/${noticia.id}`}>
                            <Button variant="outline" size="sm" className="w-full border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 group/btn">
                              Ler Notícia <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 bg-background/80 hover:bg-blue-600 hover:text-white border-border" />
                <CarouselNext className="-right-4 bg-background/80 hover:bg-blue-600 hover:text-white border-border" />
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">Carregando notícias...</p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Onde buscar ajuda</h2>
          <div className="flex flex-wrap gap-3">
            <a href="https://new.safernet.org.br" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">SaferNet Brasil</a>
            <a href="https://www.childhood.org.br/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">Childhood Brasil</a>
            <a href="https://www.gov.br/mdh/pt-br/assuntos/noticias/2022/junho/disque-100-e-ligue-180-funcionam-24-horas-por-dia-nos-sete-dias-da-semana" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">Disque 100</a>
            <a href="https://www.gov.br/pt-br/temas/saude-mental-no-ambiente-digital" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">Guia do Governo Federal</a>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Referências para aprofundar</h2>
          <div className="flex flex-wrap gap-3">
            <a href="https://cetic.br/pt/pesquisa/kids-online/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">TIC Kids Online</a>
            <a href="https://www.unicef.org/brazil/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">UNICEF Brasil</a>
            <a href="https://new.safernet.org.br/guia" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">Guia SaferNet</a>
            <a href="https://www.gov.br/pt-br/temas/seguranca-na-internet" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">Gov.br Segurança na Internet</a>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
