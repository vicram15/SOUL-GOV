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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={fallbackTo} replace />;
  }

  if (requiredRoles.length > 0 && !canAccess(requiredRoles)) {
    return <AccessDenied requiredRoles={requiredRoles} />;
  }

  return <>{children}</>;
}