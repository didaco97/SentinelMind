import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulatorProvider } from "@/context/SimulatorContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SimulatorProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SimulatorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
