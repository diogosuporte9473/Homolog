import PageLayout from "@/components/PageLayout";
import { useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Share2, ShieldAlert, AlertTriangle, ShieldCheck, Zap, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NoticiaDetalhe() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [noticia, setNoticia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        setLoading(true);
        // Tentar primeiro em noticias
        try {
          const response = await axios.get(`/api/noticias/${id}`);
          if (response.data) {
            setNoticia(response.data);
            return;
          }
        } catch (e) {}

        // Se não achar, tentar em todas as outras categorias de dicas
        const endpoints = [
          "/api/dicas-essenciais",
          "/api/dicas-redes-sociais",
          "/api/dicas-pme",
          "/api/dicas-pais-e-filhos"
        ];

        for (const endpoint of endpoints) {
          try {
            const response = await axios.get(`${endpoint}/${id}`);
            if (response.data) {
              setNoticia(response.data);
              return;
            }
          } catch (e) {
            continue;
          }
        }
      } catch (error) {
        console.error("Erro ao carregar notícia:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchNoticia();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-slate-400">Carregando...</p>
        </div>
      </PageLayout>
    );
  }

  if (!noticia) {
    return (
      <PageLayout>
        <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Notícia não encontrada</h1>
          <Button onClick={() => setLocation("/seguranca-tecnologia")}>
            Voltar para Notícias
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
          onClick={() => setLocation("/seguranca-tecnologia")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Notícias
        </Button>

        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 uppercase tracking-wider">
                {noticia.categoria}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              {noticia.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {noticia.data}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {noticia.autor}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800">
            <img 
              src={noticia.imagem} 
              alt={noticia.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {noticia.conteudo.map((bloco: any, index: number) => {
              if (bloco.tipo === "paragrafo") {
                return <p key={index} className="text-lg text-slate-300 leading-relaxed">{bloco.texto}</p>;
              }
              if (bloco.tipo === "subtitulo") {
                return <h2 key={index} className="text-2xl font-bold mt-12 mb-6 text-white">{bloco.texto}</h2>;
              }
              if (bloco.tipo === "lista") {
                return (
                  <ul key={index} className="space-y-4 my-8">
                    {bloco.itens.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <ShieldCheck className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (bloco.tipo === "alerta") {
                return (
                  <div key={index} className="bg-rose-500/10 border-l-4 border-rose-500 p-6 rounded-r-xl my-8 flex gap-4">
                    <ShieldAlert className="h-6 w-6 text-rose-500 shrink-0" />
                    <p className="text-rose-200 font-medium">{bloco.texto}</p>
                  </div>
                );
              }
              if (bloco.tipo === "dica") {
                return (
                  <div key={index} className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-xl my-8 flex gap-4">
                    <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                    <p className="text-emerald-100 font-medium">{bloco.texto}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Footer */}
          <div className="pt-12 border-t border-slate-800 mt-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">Compartilhe:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 border-slate-700 hover:bg-blue-500/10 hover:text-blue-400 text-slate-400">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
