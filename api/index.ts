import fs from "fs/promises";
import path from "path";
import express from "express";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());

// Caminho para o db.json original (somente leitura no deploy)
const SOURCE_DB_PATH = path.resolve(process.cwd(), "server", "db.json");
// Caminho para a cópia gravável do db.json na pasta /tmp
const TMP_DB_PATH = path.join("/tmp", "db.json");

let isDbInitialized = false;

// Função para garantir que o DB temporário exista
async function ensureDbIsInitialized() {
  if (isDbInitialized) return;

  try {
    // Tenta acessar o arquivo em /tmp. Se existir, está tudo pronto.
    await fs.access(TMP_DB_PATH);
    isDbInitialized = true;
  } catch {
    // Se não existir, copia o original para /tmp
    try {
      const initialData = await fs.readFile(SOURCE_DB_PATH, "utf-8");
      await fs.writeFile(TMP_DB_PATH, initialData, "utf-8");
      isDbInitialized = true;
    } catch (copyError) {
      console.error("Falha ao inicializar o banco de dados em /tmp:", copyError);
      // Se a cópia falhar, lança um erro para que as operações não continuem
      throw new Error("Não foi possível inicializar o banco de dados.");
    }
  }
}

async function getDB() {
  await ensureDbIsInitialized();
  const data = await fs.readFile(TMP_DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function saveDB(data: any) {
  await ensureDbIsInitialized();
  await fs.writeFile(TMP_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// API Routes
app.get("/api/posts", async (_req, res) => {
  try {
    const db = await getDB();
    res.json(db.posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler banco de dados" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const db = await getDB();
    const post = db.posts.find((p: any) => p.id === req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler banco de dados" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const db = await getDB();
    const newPost = { id: nanoid(), ...req.body };
    db.posts.push(newPost);
    await saveDB(db);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar post" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const db = await getDB();
    const index = db.posts.findIndex((p: any) => p.id === req.params.id);
    if (index !== -1) {
      db.posts[index] = { ...db.posts[index], ...req.body };
      await saveDB(db);
      res.json(db.posts[index]);
    } else {
      res.status(404).json({ error: "Post não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar post" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const db = await getDB();
    db.posts = db.posts.filter((p: any) => p.id !== req.params.id);
    await saveDB(db);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir post" });
  }
});

// User Auth & Management
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = await getDB();
    const user = db.users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token: "mock-token-" + nanoid() });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.get("/api/users", async (_req, res) => {
  try {
    const db = await getDB();
    res.json(db.users.map(({ password, ...u }: any) => u));
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler usuários" });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const db = await getDB();
    const index = db.users.findIndex((u: any) => u.id === req.params.id);
    if (index !== -1) {
      db.users[index] = { ...db.users[index], ...req.body };
      await saveDB(db);
      const { password, ...userWithoutPassword } = db.users[index];
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

export default app;
