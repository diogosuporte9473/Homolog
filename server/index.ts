import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "db.json");

async function getDB() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function saveDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const server = createServer(app);

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
        // Simple auth for now, in real app use JWT
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

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
    // Content Security Policy tuned for this SPA (Vite build + Vimeo iframe + remote images)
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https:",
      "frame-src 'self' player.vimeo.com vimeo.com",
      "media-src 'self' https: blob:",
      "upgrade-insecure-requests",
    ].join("; ");
    res.setHeader("Content-Security-Policy", csp);
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
