import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio";
import SecurityTips from "./pages/SecurityTips";
import SocialMediaSecurity from "./pages/SocialMediaSecurity";
import SegurancaTecnologia from "./pages/SegurancaTecnologia";
import PaisFilhos from "./pages/PaisFilhos";
import JogoSI from "./pages/JogoSI";
import GuiaPME from "./pages/GuiaPME";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Inicio} />
      <Route path={"/sobre"} component={Home} />
      <Route path={"/dicas-seguranca"} component={SecurityTips} />
      <Route path={"/dicas-redes-sociais"} component={SocialMediaSecurity} />
      <Route path={"/seguranca-tecnologia"} component={SegurancaTecnologia} />
      <Route path={"/noticia/:id"} component={NoticiaDetalhe} />
      <Route path={"/pais-e-filhos"} component={PaisFilhos} />
      <Route path={"/jogo-si"} component={JogoSI} />
      <Route path={"/guia-pme"} component={GuiaPME} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
