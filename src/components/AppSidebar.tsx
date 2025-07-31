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
  Map
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

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    description: "Overview & Analytics"
  },
  {
    title: "Volunteer Management",
    url: "/volunteers",
    icon: Users,
    description: "KYC, Profiles & Activity"
  },
  {
    title: "Child Data",
    url: "/children",
    icon: Baby,
    description: "Profiles & Regional Listings"
  },
  {
    title: "Geo Mapping",
    url: "/mapping",
    icon: Map,
    description: "Regional Density & Locations"
  },
  {
    title: "School Directory",
    url: "/schools",
    icon: School,
    description: "Government Schools & Matching"
  },
  {
    title: "Identity Management",
    url: "/identity",
    icon: IdCard,
    description: "Aadhaar & ID Tracking"
  },
  {
    title: "CSR Contributions",
    url: "/csr",
    icon: Heart,
    description: "Corporate Funding & Reports"
  },
  {
    title: "Analytics & Reports",
    url: "/reports",
    icon: TrendingUp,
    description: "Insights & Trends"
  }
];

const adminItems = [
  {
    title: "Access Control",
    url: "/admin/access",
    icon: Shield,
    description: "Role-based permissions"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "text-muted-foreground hover:bg-muted hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-card border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 from-primary to-primary-glow rounded-lg flex items-center justify-center">
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
            <SidebarMenu>
              {navigationItems.map((item) => (
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

        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 py-2">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
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
      </SidebarContent>
    </Sidebar>
  );
}