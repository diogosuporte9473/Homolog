import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, Plus, LogOut, FileText, Users, Edit, Trash2, Home, Newspaper, Lightbulb, Share2, Building, Key } from "lucide-react";

interface ContentItem {
  id: string;
  titulo: string;
  categoria: string;
  data: string;
  autor: string;
}

interface UserData {
  id: string;
  username: string;
  role: string;
  canPublish: boolean;
}

const contentTypes = {
  noticias: { title: "Notícias", icon: Newspaper, endpoint: "/api/noticias" },
  dicasEssenciais: { title: "Dicas Essenciais", icon: Lightbulb, endpoint: "/api/dicas-essenciais" },
  dicasRedesSociais: { title: "Dicas Redes Sociais", icon: Share2, endpoint: "/api/dicas-redes-sociais" },
  dicasPME: { title: "Dicas PMEs", icon: Building, endpoint: "/api/dicas-pme" },
  dicasPaisEFilhos: { title: "Pais e Filhos", icon: Users, endpoint: "/api/dicas-pais-e-filhos" },
};

function ContentManager({ type }: { type: keyof typeof contentTypes }) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(contentTypes[type].endpoint);
      setItems(response.data);
    } catch (error) {
      toast.error(`Erro ao carregar ${contentTypes[type].title}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string, autor: string) => {
    // Permissão: Admin apaga tudo. Editor apaga apenas o que ele criou.
    if (user?.role !== 'admin' && user?.username !== autor) {
      toast.error("Você só pode excluir suas próprias publicações.");
      return;
    }

    if (window.confirm(`Deseja realmente excluir este item?`)) {
      try {
        await axios.delete(`${contentTypes[type].endpoint}/${id}`);
        setItems(items.filter(item => item.id !== id));
        toast.success("Item excluído com sucesso");
      } catch (error) {
        toast.error("Erro ao excluir item");
      }
    }
  };

  const canEdit = (autor: string) => {
    return user?.role === 'admin' || user?.username === autor;
  };

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciar {contentTypes[type].title}</CardTitle>
          <CardDescription>Lista de todos os itens publicados nesta seção</CardDescription>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setLocation(`/admin/content/new?type=${type}`)}>
          <Plus className="h-4 w-4 mr-2" /> Novo Item
        </Button>
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
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Nenhum conteúdo encontrado
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.titulo}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {item.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.data}</TableCell>
                    <TableCell className="text-sm">{item.autor}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {canEdit(item.autor) && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-400 hover:bg-blue-400/10"
                            onClick={() => setLocation(`/admin/content/edit/${item.id}?type=${type}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                          onClick={() => deleteItem(item.id, item.autor)}
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
  );
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const { user, logout, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  
  // Form states for new/edit user
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("editor");
  const [newCanPublish, setNewCanPublish] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/admin/login");
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const usersRes = await axios.get("/api/users");
      setUsers(usersRes.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
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

  const handleSaveUser = async () => {
    if (!newUsername || (!selectedUser && !newPassword)) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    try {
      if (selectedUser) {
        // Edit existing user
        const updateData: any = { 
          username: newUsername, 
          role: newRole, 
          canPublish: newCanPublish 
        };
        if (newPassword) updateData.password = newPassword;
        
        await axios.patch(`/api/users/${selectedUser.id}`, updateData);
        toast.success("Usuário atualizado com sucesso");
      } else {
        // Create new user
        await axios.post("/api/users", {
          username: newUsername,
          password: newPassword,
          role: newRole,
          canPublish: newCanPublish
        });
        toast.success("Usuário criado com sucesso");
      }
      
      fetchUsers();
      closeUserModal();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao salvar usuário");
    }
  };

  const deleteUser = async (userId: string) => {
    if (userId === user?.id) {
      toast.error("Você não pode excluir a si mesmo.");
      return;
    }

    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await axios.delete(`/api/users/${userId}`);
        setUsers(users.filter(u => u.id !== userId));
        toast.success("Usuário excluído com sucesso");
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Erro ao excluir usuário");
      }
    }
  };

  const openUserModal = (userData?: UserData) => {
    if (userData) {
      setSelectedUser(userData);
      setNewUsername(userData.username);
      setNewPassword(""); // Don't show old password
      setNewRole(userData.role);
      setNewCanPublish(userData.canPublish);
    } else {
      setSelectedUser(null);
      setNewUsername("");
      setNewPassword("");
      setNewRole("editor");
      setNewCanPublish(true);
    }
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
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
        </div>

        <Tabs defaultValue="noticias" className="space-y-6">
          <TabsList className="bg-card/50 border border-border/40 p-1 grid grid-cols-2 md:grid-cols-6 gap-1 h-auto">
            <TabsTrigger value="noticias" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Newspaper className="h-4 w-4 mr-2" /> Notícias
            </TabsTrigger>
            <TabsTrigger value="dicasEssenciais" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Lightbulb className="h-4 w-4 mr-2" /> Dicas Essenciais
            </TabsTrigger>
            <TabsTrigger value="dicasRedesSociais" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Share2 className="h-4 w-4 mr-2" /> Redes Sociais
            </TabsTrigger>
            <TabsTrigger value="dicasPME" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Building className="h-4 w-4 mr-2" /> Dicas PMEs
            </TabsTrigger>
            <TabsTrigger value="dicasPaisEFilhos" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" /> Pais e Filhos
            </TabsTrigger>
            {user?.role === 'admin' && (
              <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-2" /> Usuários
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="noticias"><ContentManager type="noticias" /></TabsContent>
          <TabsContent value="dicasEssenciais"><ContentManager type="dicasEssenciais" /></TabsContent>
          <TabsContent value="dicasRedesSociais"><ContentManager type="dicasRedesSociais" /></TabsContent>
          <TabsContent value="dicasPME"><ContentManager type="dicasPME" /></TabsContent>
          <TabsContent value="dicasPaisEFilhos"><ContentManager type="dicasPaisEFilhos" /></TabsContent>

          {user?.role === 'admin' && (
            <TabsContent value="users">
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gerenciar Usuários</CardTitle>
                    <CardDescription>Controle quem pode acessar e publicar no site</CardDescription>
                  </div>
                  <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openUserModal()}>
                        <Plus className="h-4 w-4 mr-2" /> Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-white">
                      <DialogHeader>
                        <DialogTitle>{selectedUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          {selectedUser ? "Atualize as informações do usuário." : "Crie uma nova conta de acesso para o painel."}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="username">Usuário</Label>
                          <Input 
                            id="username" 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="bg-slate-800 border-slate-700"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Senha {selectedUser && "(Deixe em branco para manter a atual)"}</Label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input 
                              id="password" 
                              type="password"
                              value={newPassword} 
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-slate-800 border-slate-700 pl-10"
                              placeholder={selectedUser ? "••••••••" : "Digite a senha"}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="role">Papel</Label>
                          <Select value={newRole} onValueChange={setNewRole}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue placeholder="Selecione o papel" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="admin">Administrador</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2 py-2">
                          <Switch 
                            id="can-publish" 
                            checked={newCanPublish} 
                            onCheckedChange={setNewCanPublish}
                          />
                          <Label htmlFor="can-publish">Pode publicar conteúdos?</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={closeUserModal} className="text-slate-400">Cancelar</Button>
                        <Button onClick={handleSaveUser} className="bg-blue-600 hover:bg-blue-700">
                          {selectedUser ? "Salvar Alterações" : "Criar Usuário"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border/40">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuário</TableHead>
                          <TableHead>Papel</TableHead>
                          <TableHead>Pode Publicar?</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.username}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`capitalize ${u.role === 'admin' ? 'border-blue-500 text-blue-400' : 'border-slate-500 text-slate-400'}`}>
                                {u.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Switch 
                                  checked={u.canPublish} 
                                  onCheckedChange={() => toggleUserPublish(u.id, u.canPublish)}
                                  disabled={u.role === "admin" || user?.role !== 'admin'}
                                />
                                <span className="text-sm text-muted-foreground">
                                  {u.canPublish ? "Sim" : "Não"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-blue-400 hover:bg-blue-400/10"
                                  onClick={() => openUserModal(u)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-400 hover:bg-red-400/10"
                                  onClick={() => deleteUser(u.id)}
                                  disabled={u.id === user?.id}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
