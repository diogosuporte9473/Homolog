import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageLayout from "@/components/PageLayout";

export default function Notes() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      if (!supabase) {
        console.error("Supabase não inicializado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY na Vercel.");
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase.from("notes").select();
      if (error) {
        console.error("Error fetching notes:", error);
      } else {
        setNotes(data);
      }
      setLoading(false);
    }
    fetchNotes();
  }, []);

  if (loading) return <div className="p-8">Carregando notas...</div>;

  return (
    <PageLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Suas Notas (Supabase)</h1>
        <div className="bg-card p-6 rounded-lg border border-border">
          <pre className="p-4 bg-muted rounded overflow-auto">
            {JSON.stringify(notes, null, 2)}
          </pre>
        </div>
      </div>
    </PageLayout>
  );
}
