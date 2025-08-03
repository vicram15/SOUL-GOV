import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User, LogOut, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, profile, signOut, hasRole, hasAnyRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getRoleColor = (role: string) => {
    const colors = {
      super_admin: 'bg-red-500',
      state_admin: 'bg-blue-500', 
      district_admin: 'bg-green-500',
      auditor: 'bg-purple-500',
      csr_partner: 'bg-orange-500',
      volunteer: 'bg-gray-500'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-500';
  };

  const formatRoleName = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-muted" />
                <div className="hidden sm:block">
                  <h1 className="font-semibold text-foreground">SOUL CIH ADMIN DASHBOARD</h1>
                  <p className="text-sm text-muted-foreground">Supporting Outreach for Uplifting Lives</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Upload & Process Data Button - Only for authorized roles */}
                {hasAnyRole(['super_admin', 'state_admin']) && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/data-processing">
                      Upload & Process Data
                    </Link>
                  </Button>
                )}

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                    
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium">
                          {profile?.full_name || 'User'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user?.email}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {profile?.roles.slice(0, 2).map((role) => (
                            <Badge 
                              key={role} 
                              variant="secondary" 
                              className={`text-xs px-1 py-0 ${getRoleColor(role)} text-white`}
                            >
                              {formatRoleName(role)}
                            </Badge>
                          ))}
                          {profile && profile.roles.length > 2 && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              +{profile.roles.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>My Account</div>
                      <div className="text-xs font-normal text-muted-foreground">
                        {profile?.state && profile?.district 
                          ? `${profile.district}, ${profile.state}`
                          : profile?.state 
                          ? profile.state
                          : 'Global Access'
                        }
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    
                    {hasRole('super_admin') && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/roles')}>
                          <Shield className="w-4 h-4 mr-2" />
                          Access Control
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/user-management')}>
                          <User className="w-4 h-4 mr-2" />
                          User Management
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Preferences
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}