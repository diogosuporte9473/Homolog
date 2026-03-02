import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica de email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Por favor, insira um e-mail válido.");
      return;
    }

    setStatus("loading");
    
    try {
      // Simular envio (em produção, seria uma chamada à API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você pode adicionar uma chamada real à sua API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setStatus("success");
      setMessage("E-mail cadastrado com sucesso! Você receberá nossas dicas em breve.");
      setEmail("");
      
      // Limpar mensagem após 5 segundos
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao cadastrar e-mail. Tente novamente.");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900/10 to-blue-800/10 border-t border-b border-blue-200/20">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Receba Dicas de Segurança
          </h2>
          <p className="text-muted-foreground">
            Inscreva-se na nossa newsletter e receba as melhores práticas de segurança da informação direto no seu e-mail.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all"
          >
            {status === "loading" ? "Cadastrando..." : "Inscrever"}
          </Button>
        </form>

        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            status === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {status === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-4">
          Respeitamos sua privacidade. Você pode se desinscrever a qualquer momento.
        </p>
      </div>
    </section>
  );
}
