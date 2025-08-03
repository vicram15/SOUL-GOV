import { useEffect } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AccessDeniedProps {
  requiredRoles: UserRole[];
}

export function AccessDenied({ requiredRoles }: AccessDeniedProps) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Log the access denial attempt
    const logAccessDenial = async () => {
      if (user) {
        try {
          // TODO: Enable after migration is executed
          // await supabase.from('access_logs').insert({
          //   user_id: user.id,
          //   resource: window.location.pathname,
          //   success: false,
          //   ip_address: 'unknown',
          //   user_agent: navigator.userAgent
          // });
          console.log('Access denied:', { 
            user_id: user.id, 
            resource: window.location.pathname 
          });
        } catch (error) {
          console.error('Failed to log access denial:', error);
        }
      }
    };

    logAccessDenial();
  }, [user]);

  const roleDisplayNames: Record<UserRole, string> = {
    super_admin: 'Super Administrator',
    state_admin: 'State Administrator',
    district_admin: 'District Administrator',
    auditor: 'Auditor',
    csr_partner: 'CSR Partner',
    volunteer: 'Volunteer'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <ShieldX className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this resource
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              This page requires one of the following roles: {' '}
              <strong>
                {requiredRoles.map(role => roleDisplayNames[role]).join(', ')}
              </strong>
            </AlertDescription>
          </Alert>

          {profile && (
            <Alert>
              <AlertDescription>
                Your current roles: {' '}
                <strong>
                  {profile.roles.length > 0 
                    ? profile.roles.map(role => roleDisplayNames[role]).join(', ')
                    : 'None assigned'
                  }
                </strong>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground text-center">
            If you believe this is an error, please contact your system administrator.
            This attempt has been logged for security purposes.
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}