import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import { Shield, ArrowRight, BookOpen, Users } from "lucide-react";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background video (blurred) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0">
            <iframe
              src="https://player.vimeo.com/video/1166795283?autoplay=1&muted=1&loop=1&autopause=0&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1"
              className="absolute inset-0 w-full h-full [filter:blur(6px)] scale-[1.2]"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
              title="Background Video"
            />
          </div>
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="heading-hero">
                Bem-vindo à <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">DMS Security</span>
              </h1>
              <p className="lead text-muted-foreground">
                Segurança da Informação, privacidade e tecnologia com foco em conscientização, boas práticas e proteção de dados.
                (Fala verdade em amor; guarda o que é confidencial.
                (Efésios 4:15 + Provérbios 11:13)
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/sobre">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Users className="mr-2 h-4 w-4" /> Sobre
                  </Button>
                </Link>
                <Link href="/seguranca-tecnologia">
                  <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                    <Shield className="mr-2 h-4 w-4" /> Segurança da Informação
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold mb-4">Acesse Conteúdos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/dicas-seguranca" className="group rounded-lg border border-border p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Dicas Essenciais</div>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Práticas recomendadas para o dia a dia</p>
                </Link>
                <Link href="/dicas-redes-sociais" className="group rounded-lg border border-border p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Segurança em Redes</div>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Cuidados com contas e golpes online</p>
                </Link>
                <Link href="/seguranca-tecnologia" className="group rounded-lg border border-border p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Tecnologia e Segurança</div>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Tendências e referências técnicas</p>
                </Link>
                <Link href="/pais-e-filhos" className="group rounded-lg border border-border p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Para Pais e Filhos</div>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Guia prático para famílias</p>
                </Link>
                <Link href="/jogo-si" className="group rounded-lg border border-border p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Jogos Interativos</div>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Aprenda segurança jogando</p>
                </Link>
                <Link href="/guia-pme" className="group rounded-lg border border-blue-500/50 bg-blue-500/5 p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-blue-400">Guia Prático PMEs</div>
                    <ArrowRight className="text-blue-400 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Checklists e ferramentas de Cibersegurança e LGPD</p>
                </Link>
                <Link href="/sobre" className="group rounded-lg border border-border p-4 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Sobre</div>
                    <BookOpen className="transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Conheça minha trajetória</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

