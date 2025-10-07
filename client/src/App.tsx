import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StreakDashboardExample from "@/components/examples/StreakDashboard";
import Standings from "@/pages/standings";
import TopScorers from "@/pages/top-scorers";
import H2H from "@/pages/h2h";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={StreakDashboardExample} />
      <Route path="/standings/:leagueId" component={Standings} />
      <Route path="/top-scorers/:leagueId" component={TopScorers} />
      <Route path="/h2h/:teamId/:opponentId" component={H2H} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
