import { NavLink, useLocation } from "react-router-dom";
import {
  Users,
  Baby,
  MapPin,
  School,
  IdCard,
  TrendingUp,
  BarChart3,
  Shield,
  Heart,
  Map,
  UserCheck,
  Settings
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    description: "Overview & Analytics",
    roles: ['super_admin', 'state_admin', 'district_admin', 'auditor', 'csr_partner'] as UserRole[]
  },
  {
    title: "Volunteer Management",
    url: "/volunteers",
    icon: Users,
    description: "KYC, Profiles & Activity",
    roles: ['super_admin', 'state_admin', 'district_admin'] as UserRole[]
  },
  {
    title: "Child Data",
    url: "/children",
    icon: Baby,
    description: "Profiles & Regional Listings",
    roles: ['super_admin', 'state_admin', 'district_admin'] as UserRole[]
  },
  {
    title: "Geo Mapping",
    url: "/mapping",
    icon: Map,
    description: "Regional Density & Locations",
    roles: ['super_admin', 'state_admin', 'district_admin'] as UserRole[]
  },
  {
    title: "School Directory",
    url: "/schools",
    icon: School,
    description: "Government Schools & Matching",
    roles: ['super_admin', 'state_admin', 'district_admin'] as UserRole[]
  },
  {
    title: "Identity Management",
    url: "/identity",
    icon: IdCard,
    description: "Aadhaar & ID Tracking",
    roles: ['super_admin', 'state_admin', 'district_admin'] as UserRole[]
  },
  {
    title: "CSR Contributions",
    url: "/csr",
    icon: Heart,
    description: "Corporate Funding & Reports",
    roles: ['super_admin', 'csr_partner'] as UserRole[]
  },
  {
    title: "Analytics & Reports",
    url: "/reports",
    icon: TrendingUp,
    description: "Insights & Trends",
    roles: ['super_admin', 'state_admin', 'district_admin', 'auditor'] as UserRole[]
  },
  {
    title: "Data Processing",
    url: "/data-processing",
    icon: Settings,
    description: "Upload & Process Data",
    roles: ['super_admin', 'state_admin'] as UserRole[]
  }
];

const adminItems = [
  {
    title: "Access Control",
    url: "/roles",
    icon: Shield,
    description: "Role-based permissions",
    roles: ['super_admin'] as UserRole[]
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: UserCheck,
    description: "Create & manage users",
    roles: ['super_admin'] as UserRole[]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { hasAnyRole, profile } = useAuth();

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium hover:bg-primary/20"
      : "text-muted-foreground hover:bg-muted hover:text-foreground";

  // Filter navigation items based on user roles
  const visibleNavigationItems = navigationItems.filter(item => 
    hasAnyRole(item.roles)
  );

  const visibleAdminItems = adminItems.filter(item => 
    hasAnyRole(item.roles)
  );
  

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-card border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-8 from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <img
                src="/LOGO.png"
                alt="SOUL Logo"
                className="h-25 w-20 object-contain"
              />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Child Impact Hub</h2>
                <p className="text-xs text-muted-foreground">Child Welfare Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 py-2">
            Main Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-y-5">
              {visibleNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section - Only show if user has admin items to see */}
        {visibleAdminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 py-2">
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-y-2">
                {visibleAdminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="group">
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </div>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* User Profile Section */}
        {!collapsed && profile && (
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{profile.full_name || 'User'}</div>
                <div className="text-xs text-muted-foreground">
                  {profile.roles.map(role => role.replace('_', ' ')).join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
