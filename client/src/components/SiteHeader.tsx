import { useState } from "react";
import { Link } from "wouter";
import { Menu as MenuIcon } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 supports-[backdrop-filter]:bg-background/40 bg-background/30 backdrop-blur-md border-b border-border no-print">
      <div className="container max-w-6xl mx-auto px-3 md:px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg md:text-xl font-bold text-blue-400/90 hover:text-blue-400 transition-colors">
          DMS Security
        </Link>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-border/60 size-9 text-foreground/80 hover:bg-muted/30 hover:text-foreground transition-colors"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Abrir menu"
          onClick={() => setOpen(v => !v)}
        >
          <MenuIcon className="size-5" />
        </button>
        <nav className="hidden md:flex items-center gap-5 justify-end text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Início</Link>
          <Link href="/sobre" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Sobre</Link>
          <Link href="/seguranca-tecnologia" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Segurança da Informação</Link>
          <Link href="/dicas-seguranca" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Dicas Essenciais</Link>
          <Link href="/dicas-redes-sociais" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Segurança em Redes Sociais</Link>
          <Link href="/pais-e-filhos" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Para Pais e Filhos</Link>
          <Link href="/jogo-si" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Jogos Interativos</Link>
          <Link href="/guia-pme" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">Guia PMEs</Link>
        </nav>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-border/60 ${open ? "block" : "hidden"}`}
      >
        <nav className="container max-w-6xl mx-auto px-4 py-2 grid gap-2 text-sm bg-background/80 backdrop-blur">
          <Link href="/" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Início</Link>
          <Link href="/sobre" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Sobre</Link>
          <Link href="/seguranca-tecnologia" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Segurança da Informação</Link>
          <Link href="/dicas-seguranca" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Dicas Essenciais</Link>
          <Link href="/dicas-redes-sociais" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Segurança em Redes Sociais</Link>
          <Link href="/pais-e-filhos" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Para Pais e Filhos</Link>
          <Link href="/jogo-si" className="opacity-90 hover:text-blue-400 transition-colors py-1.5" onClick={() => setOpen(false)}>Jogos Interativos</Link>
          <Link href="/guia-pme" className="opacity-90 hover:text-blue-400 transition-colors py-1.5 font-semibold text-blue-400" onClick={() => setOpen(false)}>Guia PMEs</Link>
        </nav>
      </div>
    </header>
  );
}
