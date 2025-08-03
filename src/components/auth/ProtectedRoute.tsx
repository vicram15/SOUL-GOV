import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { AccessDenied } from './AccessDenied';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [],
  fallbackTo = '/auth' 
}: ProtectedRouteProps) {
  const { user, profile, loading, canAccess } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to={fallbackTo} replace />;
  }

  // Wait for profile to load before checking access
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Check role-based access if required roles are specified
  if (requiredRoles.length > 0 && !canAccess(requiredRoles)) {
    return <AccessDenied requiredRoles={requiredRoles} />;
  }

  return <>{children}</>;
}