import SiteHeader from "@/components/SiteHeader";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F1419] text-slate-200 font-sans relative">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="w-full h-full object-cover bg-[#0F1419]" />
        <div className="fixed inset-0 bg-[#0F1419]/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow container max-w-6xl mx-auto px-4 py-12 sm:py-16">
          {children}
        </main>
        <footer className="bg-transparent py-12">
          <div className="container max-w-6xl mx-auto px-4 border-t border-slate-800 pt-12">
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-500 text-sm font-medium tracking-wide text-center">
                © 2025 Diogo Martins. Todos os direitos reservados. Integridade guia; mentira e vazamento destroem. (Provérbios 11:3).
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
