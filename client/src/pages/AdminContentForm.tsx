import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Save, Plus, Trash2, ShieldCheck, AlertCircle } from "lucide-react";

interface ContentBlock {
  tipo: "paragrafo" | "subtitulo" | "lista" | "alerta" | "dica";
  texto?: string;
  itens?: string[];
}

export default function AdminContentForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Vulnerabilidades");
  const [imagem, setImagem] = useState("");
  const [autor, setAutor] = useState("");
  const [data, setData] = useState(new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }));
  const [conteudo, setConteudo] = useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/admin/login");
    } else if (user && !user.canPublish && user.role !== "admin") {
      toast.error("Você não tem permissão para publicar");
      setLocation("/admin");
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      const post = response.data;
      setTitulo(post.titulo);
      setCategoria(post.categoria);
      setImagem(post.imagem);
      setAutor(post.autor);
      setData(post.data);
      setConteudo(post.conteudo);
    } catch (error) {
      toast.error("Erro ao carregar post");
      setLocation("/admin");
    }
  };

  const addBlock = (tipo: ContentBlock["tipo"]) => {
    const newBlock: ContentBlock = { tipo, texto: "" };
    if (tipo === "lista") newBlock.itens = [""];
    setConteudo([...conteudo, newBlock]);
  };

  const updateBlock = (index: number, value: string) => {
    const newConteudo = [...conteudo];
    newConteudo[index].texto = value;
    setConteudo(newConteudo);
  };

  const updateListItem = (blockIndex: number, itemIndex: number, value: string) => {
    const newConteudo = [...conteudo];
    if (newConteudo[blockIndex].itens) {
      newConteudo[blockIndex].itens![itemIndex] = value;
      setConteudo(newConteudo);
    }
  };

  const addListItem = (blockIndex: number) => {
    const newConteudo = [...conteudo];
    if (newConteudo[blockIndex].itens) {
      newConteudo[blockIndex].itens!.push("");
      setConteudo(newConteudo);
    }
  };

  const removeBlock = (index: number) => {
    setConteudo(conteudo.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const postData = {
      titulo,
      categoria,
      imagem,
      autor: autor || user?.username,
      data,
      conteudo
    };

    try {
      if (isEditing) {
        await axios.put(`/api/posts/${id}`, postData);
        toast.success("Conteúdo atualizado com sucesso!");
      } else {
        await axios.post("/api/posts", postData);
        toast.success("Conteúdo criado com sucesso!");
      }
      setLocation("/admin");
    } catch (error) {
      toast.error("Erro ao salvar conteúdo");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-bold text-lg">{isEditing ? "Editar Conteúdo" : "Novo Conteúdo"}</h1>
          </div>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" /> {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="border-border/40 bg-card/50">
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vulnerabilidades">Vulnerabilidades</SelectItem>
                      <SelectItem value="Ataques">Ataques</SelectItem>
                      <SelectItem value="LGPD">LGPD</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Mercado">Mercado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagem">URL da Imagem</Label>
                <Input id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} placeholder="https://..." required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="autor">Autor (Opcional)</Label>
                  <Input id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder={user?.username} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input id="data" value={data} onChange={(e) => setData(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Conteúdo da Notícia</h2>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("paragrafo")}>
                  + Parágrafo
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("subtitulo")}>
                  + Subtítulo
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("lista")}>
                  + Lista
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addBlock("alerta")}>
                  + Alerta
                </Button>
              </div>
            </div>

            {conteudo.length === 0 && (
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
                <p className="text-muted-foreground">Adicione blocos de conteúdo para começar</p>
              </div>
            )}

            <div className="space-y-4">
              {conteudo.map((block, index) => (
                <Card key={index} className="border-border/40 bg-card/30 relative group">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeBlock(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {block.tipo}
                      </Badge>
                    </div>
                    
                    {block.tipo !== "lista" ? (
                      <Textarea 
                        value={block.texto} 
                        onChange={(e) => updateBlock(index, e.target.value)}
                        placeholder={`Digite o ${block.tipo}...`}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <div className="space-y-2">
                        {block.itens?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex gap-2">
                            <Input 
                              value={item} 
                              onChange={(e) => updateListItem(index, itemIdx, e.target.value)}
                              placeholder="Item da lista..."
                            />
                          </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => addListItem(index)} className="mt-2">
                          <Plus className="h-4 w-4 mr-2" /> Adicionar Item
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
