import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "@/components/Layout";
import VolunteerManagement from "./pages/VolunteerManagement";
import ChildData from "./pages/ChildData";
import GeoMapping from "./pages/GeoMapping";
import SchoolDirectory from "./pages/SchoolDirectory";
import IdentityManagement from "./pages/IdentityManagement";
import CSRContributions from "./pages/CSRContributions";
import AnalyticsReports from "./pages/AnalyticsReports";
import DataProcessing from "./pages/DataProcessing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/volunteers" element={<Layout><VolunteerManagement /></Layout>} />
          <Route path="/children" element={<Layout><ChildData /></Layout>} />
          <Route path="/mapping" element={<Layout><GeoMapping /></Layout>} />
          <Route path="/schools" element={<Layout><SchoolDirectory /></Layout>} />
          <Route path="/identity" element={<Layout><IdentityManagement /></Layout>} />
          <Route path="/csr" element={<Layout><CSRContributions /></Layout>} />
          <Route path="/reports" element={<Layout><AnalyticsReports /></Layout>} />
          <Route path="/data-processing" element={<Layout><DataProcessing /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
