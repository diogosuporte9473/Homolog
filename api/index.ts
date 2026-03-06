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

// Função genérica para criar rotas CRUD
function createCrudRoutes(resource: string) {
  const router = express.Router();

  router.get(`/`, async (_req, res) => {
    try {
      const db = await getDB();
      res.json(db[resource]);
    } catch (error) {
      res.status(500).json({ error: `Erro ao ler ${resource}` });
    }
  });

  router.get(`/:id`, async (req, res) => {
    try {
      const db = await getDB();
      const item = db[resource].find((p: any) => p.id === req.params.id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: `${resource} não encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error: `Erro ao ler ${resource}` });
    }
  });

  router.post(`/`, async (req, res) => {
    try {
      const db = await getDB();
      const newItem = { id: nanoid(), ...req.body };
      db[resource].push(newItem);
      await saveDB(db);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: `Erro ao salvar ${resource}` });
    }
  });

  router.put(`/:id`, async (req, res) => {
    try {
      const db = await getDB();
      const index = db[resource].findIndex((p: any) => p.id === req.params.id);
      if (index !== -1) {
        db[resource][index] = { ...db[resource][index], ...req.body };
        await saveDB(db);
        res.json(db[resource][index]);
      } else {
        res.status(404).json({ error: `${resource} não encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error: `Erro ao atualizar ${resource}` });
    }
  });

  router.delete(`/:id`, async (req, res) => {
    try {
      const db = await getDB();
      db[resource] = db[resource].filter((p: any) => p.id !== req.params.id);
      await saveDB(db);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: `Erro ao excluir ${resource}` });
    }
  });

  return router;
}

// API Routes
app.use("/api/noticias", createCrudRoutes("noticias"));
app.use("/api/dicas-essenciais", createCrudRoutes("dicasEssenciais"));
app.use("/api/dicas-redes-sociais", createCrudRoutes("dicasRedesSociais"));
app.use("/api/dicas-pme", createCrudRoutes("dicasPME"));

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

app.post("/api/users", async (req, res) => {
  try {
    const db = await getDB();
    const { username, password, role, canPublish } = req.body;
    
    if (db.users.find((u: any) => u.username === username)) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const newUser = {
      id: nanoid(),
      username,
      password,
      role: role || "editor",
      canPublish: canPublish ?? true
    };

    db.users.push(newUser);
    await saveDB(db);
    
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const db = await getDB();
    const index = db.users.findIndex((u: any) => u.id === req.params.id);
    if (index !== -1) {
      // Only update fields provided in the body
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

app.delete("/api/users/:id", async (req, res) => {
  try {
    const db = await getDB();
    // Prevent deleting the last admin
    const userToDelete = db.users.find((u: any) => u.id === req.params.id);
    if (userToDelete?.role === 'admin' && db.users.filter((u: any) => u.role === 'admin').length <= 1) {
      return res.status(400).json({ error: "Não é possível excluir o último administrador" });
    }

    db.users = db.users.filter((u: any) => u.id !== req.params.id);
    await saveDB(db);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

export default app;
