import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthPage } from "@/components/auth/AuthPage";
import VolunteerManagement from "./pages/VolunteerManagement";
import ChildData from "./pages/ChildData";
import GeoMapping from "./pages/GeoMapping";
import SchoolDirectory from "./pages/SchoolDirectory";
import IdentityManagement from "./pages/IdentityManagement";
import CSRContributions from "./pages/CSRContributions";
import AnalyticsReports from "./pages/AnalyticsReports";
import DataProcessing from "./pages/DataProcessing";
import RoleManagement from "./pages/RoleManagement";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/volunteers" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin', 'district_admin']}>
                <Layout><VolunteerManagement /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/children" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin', 'district_admin']}>
                <Layout><ChildData /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/mapping" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin', 'district_admin']}>
                <Layout><GeoMapping /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/schools" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin', 'district_admin']}>
                <Layout><SchoolDirectory /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/identity" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin', 'district_admin']}>
                <Layout><IdentityManagement /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/csr" element={
              <ProtectedRoute requiredRoles={['super_admin', 'csr_partner']}>
                <Layout><CSRContributions /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin', 'district_admin', 'auditor']}>
                <Layout><AnalyticsReports /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/data-processing" element={
              <ProtectedRoute requiredRoles={['super_admin', 'state_admin']}>
                <Layout><DataProcessing /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/roles" element={
              <ProtectedRoute requiredRoles={['super_admin']}>
                <Layout><RoleManagement /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/access" element={
              <ProtectedRoute requiredRoles={['super_admin']}>
                <Layout><RoleManagement /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/user-management" element={
              <ProtectedRoute requiredRoles={['super_admin']}>
                <Layout><UserManagement /></Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
