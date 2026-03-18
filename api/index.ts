import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { randomUUID } from "crypto";
import axios from "axios";

const app = express();
app.use(express.json());

// Rota para buscar notícias da NewsAPI
app.get("/api/news", async (req: Request, res: Response) => {
  try {
    const { NEWSAPI_KEY, GNEWS_API_KEY } = process.env;
    
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "O parâmetro de busca 'q' é obrigatório." });
    }

    const language = req.query.language || "pt";
    const pageSize = req.query.pageSize || "10";
    const sortBy = req.query.sortBy || "publishedAt";

    // Tentar usar GNews primeiro se a chave estiver disponível, pois costuma ser melhor para PT-BR
    if (GNEWS_API_KEY) {
      try {
        const gnewsUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query as string)}&lang=${language}&max=${pageSize}&apikey=${GNEWS_API_KEY}`;
        const response = await axios.get(gnewsUrl);
        
        if (response.data.articles) {
          const articles = response.data.articles.map((article: any) => ({
            id: article.url,
            titulo: article.title,
            imagem: article.image || article.urlToImage || 'https://placehold.co/600x400/1e293b/white?text=DMS+Security',
            categoria: article.source.name,
            data: new Date(article.publishedAt).toLocaleDateString('pt-BR'),
            resumo: article.description,
            url: article.url,
            fonte: article.source.name,
          }));
          return res.json(articles);
        }
      } catch (gnewsError: any) {
        console.warn("GNews falhou, tentando NewsAPI:", gnewsError.message);
      }
    }

    // Fallback para NewsAPI
    if (!NEWSAPI_KEY) {
      console.error("Nenhuma chave de API de notícias configurada.");
      return res.status(500).json({ error: "Erro interno do servidor." });
    }

    const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query as string
    )}&language=${language}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${NEWSAPI_KEY}`;

    const response = await axios.get(newsUrl);

    if (response.data.status !== "ok") {
      console.error("Erro da NewsAPI:", response.data.message);
      return res.status(500).json({ error: response.data.message || "Erro na NewsAPI" });
    }

    // Mapear os dados para um formato consistente
    const articles = response.data.articles.map((article: any) => ({
      id: article.url, // Usar URL como ID único
      titulo: article.title,
      imagem: article.urlToImage || 'https://placehold.co/600x400/1e293b/white?text=DMS+Security',
      categoria: article.source.name,
      data: new Date(article.publishedAt).toLocaleDateString('pt-BR'),
      resumo: article.description,
      url: article.url,
      fonte: article.source.name,
    }));

    res.json(articles);

  } catch (error: any) {
    if (error.response) {
      console.error("Erro ao buscar notícias (resposta da API):", error.response.data);
      res.status(error.response.status).json({ error: "Falha ao buscar notícias", details: error.response.data });
    } else {
      console.error("Erro ao buscar notícias:", error.message);
      res.status(500).json({ error: "Falha ao buscar notícias", details: error.message });
    }
  }
});

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Função genérica para criar rotas CRUD usando Supabase
function createCrudRoutes(resource: string, table: string) {
  const router = express.Router();

  router.get("/", async (_req: any, res: any) => {
    try {
      const { data, error } = await supabase.from(table).select("*").order('id', { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      console.error(`Error reading ${resource}:`, error.message || error);
      res.status(500).json({ error: `Erro ao ler ${resource}`, details: error.message });
    }
  });

  router.get("/:id", async (req: any, res: any) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", req.params.id)
        .single();

      if (error) throw error;
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: `${resource} não encontrado` });
      }
    } catch (error: any) {
      console.error(`Error reading ${resource}:`, error.message || error);
      res.status(500).json({ error: `Erro ao ler ${resource}`, details: error.message });
    }
  });

  router.post("/", async (req: any, res: any) => {
      try {
        // Garante que temos um ID se não for auto-gerado pelo banco
        // Preferimos randomUUID para compatibilidade com o tipo UUID do Supabase
        const payload = { 
          id: req.body.id || randomUUID(),
          ...req.body 
        };

      const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error: any) {
      console.error(`Error saving ${resource}:`, error.message || error);
      res.status(500).json({ error: `Erro ao salvar ${resource}`, details: error.message });
    }
  });

  router.put("/:id", async (req: any, res: any) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(req.body)
        .eq("id", req.params.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: `${resource} não encontrado` });
      }
    } catch (error: any) {
      console.error(`Error updating ${resource}:`, error.message || error);
      res.status(500).json({ error: `Erro ao atualizar ${resource}`, details: error.message });
    }
  });

  router.delete("/:id", async (req: any, res: any) => {
    try {
      const { error } = await supabase.from(table).delete().eq("id", req.params.id);

      if (error) throw error;
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting ${resource}:`, error);
      res.status(500).json({ error: `Erro ao excluir ${resource}` });
    }
  });

  return router;
}

// API Routes
app.use("/api/noticias", createCrudRoutes("noticias", "noticias"));
app.use("/api/dicas-essenciais", createCrudRoutes("dicas-essenciais", "dicas_essenciais"));
app.use("/api/dicas-redes-sociais", createCrudRoutes("dicas-redes-sociais", "dicas_redes_sociais"));
app.use("/api/dicas-pme", createCrudRoutes("dicas-pme", "dicas_pme"));
app.use("/api/dicas-pais-e-filhos", createCrudRoutes("dicas-pais-e-filhos", "dicas_pais_filhos"));
app.use("/api/notes", createCrudRoutes("notes", "notes"));

// User Auth & Management
app.post("/api/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token: "mock-token-" + nanoid() });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error: any) {
    console.error("Login error:", error.message || error);
    res.status(500).json({ error: "Erro no servidor", details: error.message });
  }
});

app.get("/api/users", async (_req: any, res: any) => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, role, canPublish");

    if (error) throw error;
    res.json(users);
  } catch (error: any) {
    console.error("Fetch users error:", error.message || error);
    res.status(500).json({ error: "Erro ao ler usuários", details: error.message });
  }
});

app.post("/api/users", async (req: any, res: any) => {
  try {
    const { username, password, role, canPublish } = req.body;

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const newUser = {
      id: randomUUID(),
      username,
      password,
      role: role || "editor",
      canPublish: canPublish ?? true,
    };

    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select()
      .single();

    if (error) throw error;

    const { password: _, ...userWithoutPassword } = data;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    console.error("Create user error:", error.message || error);
    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
});

app.patch("/api/users/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("users")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const { password: _, ...userWithoutPassword } = data;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error: any) {
    console.error("Update user error:", error.message || error);
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
});

app.delete("/api/users/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Prevent deleting the last admin
    const { data: userToDelete } = await supabase
      .from("users")
      .select("role")
      .eq("id", id)
      .single();

    if (userToDelete?.role === "admin") {
      const { count } = await supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");

      if (count && count <= 1) {
        return res.status(400).json({ error: "Não é possível excluir o último administrador" });
      }
    }

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

export default app;
