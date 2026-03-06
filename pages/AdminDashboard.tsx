import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, Plus, LogOut, FileText, Users, Edit, Trash2, Home } from "lucide-react";

interface Post {
  id: string;
  titulo: string;
  categoria: string;
  data: string;
  autor: string;
}

interface User {
  id: string;
  username: string;
  role: string;
  canPublish: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/admin/login");
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [postsRes, usersRes] = await Promise.all([
        axios.get("/api/posts"),
        axios.get("/api/users")
      ]);
      setPosts(postsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error("Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  const toggleUserPublish = async (userId: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/users/${userId}`, { canPublish: !currentStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, canPublish: !currentStatus } : u));
      toast.success("Permissão de publicação atualizada");
    } catch (error) {
      toast.error("Erro ao atualizar permissão");
    }
  };

  const deletePost = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este post?")) {
      try {
        await axios.delete(`/api/posts/${id}`);
        setPosts(posts.filter(p => p.id !== id));
        toast.success("Post excluído com sucesso");
      } catch (error) {
        toast.error("Erro ao excluir post");
      }
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-lg hidden sm:inline-block">DMS Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.role === "admin" ? "Administrador" : "Editor"}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")} title="Voltar ao Site">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-400 border-red-400/20 hover:bg-red-400/10">
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Painel de Controle</h1>
            <p className="text-muted-foreground">Gerencie o conteúdo e os usuários do site</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setLocation("/admin/content/new")}>
            <Plus className="h-4 w-4 mr-2" /> Novo Conteúdo
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-card/50 border border-border/40 p-1">
            <TabsTrigger value="posts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" /> Conteúdos
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" /> Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Gerenciar Conteúdo</CardTitle>
                <CardDescription>Lista de todas as notícias e dicas publicadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border/40">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            Nenhum conteúdo encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        posts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.titulo}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {post.categoria}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{post.data}</TableCell>
                            <TableCell className="text-sm">{post.autor}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-blue-400 hover:bg-blue-400/10"
                                  onClick={() => setLocation(`/admin/content/edit/${post.id}`)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                                  onClick={() => deletePost(post.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Controle quem pode publicar no site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border/40">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Papel</TableHead>
                        <TableHead>Pode Publicar?</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.username}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {u.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={u.canPublish} 
                                onCheckedChange={() => toggleUserPublish(u.id, u.canPublish)}
                                disabled={u.role === "admin"}
                              />
                              <span className="text-sm text-muted-foreground">
                                {u.canPublish ? "Sim" : "Não"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                              Ativo
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
