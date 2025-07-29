import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VolunteerManagement from "./pages/VolunteerManagement";
import ChildData from "./pages/ChildData";
import GeoMapping from "./pages/GeoMapping";
import SchoolDirectory from "./pages/SchoolDirectory";
import IdentityManagement from "./pages/IdentityManagement";
import CSRContributions from "./pages/CSRContributions";
import AnalyticsReports from "./pages/AnalyticsReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/volunteers" element={<VolunteerManagement />} />
          <Route path="/children" element={<ChildData />} />
          <Route path="/mapping" element={<GeoMapping />} />
          <Route path="/schools" element={<SchoolDirectory />} />
          <Route path="/identity" element={<IdentityManagement />} />
          <Route path="/csr" element={<CSRContributions />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
