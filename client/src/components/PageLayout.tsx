import SiteHeader from "@/components/SiteHeader";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <iframe
          src="https://player.vimeo.com/video/1169587272?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1&dnt=1&fl=ip&fe=ec"
          className="w-full h-full object-cover"
          allow="autoplay; fullscreen; picture-in-picture"
          frameBorder="0"
          title="DMS Security Background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        ></iframe>
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow container max-w-6xl mx-auto px-4 py-12 sm:py-16">
          {children}
        </main>
        <footer className="bg-transparent py-12">
          <div className="container max-w-6xl mx-auto px-4 text-center border-t border-slate-800 pt-12">
            <p className="text-slate-500 text-sm font-medium tracking-wide">
              © 2025 Diogo Martins. Todos os direitos reservados. Integridade guia; mentira e vazamento destroem. (Provérbios 11:3).
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
