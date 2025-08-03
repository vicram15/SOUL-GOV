import { useState, useEffect } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  UserPlus, 
  Shield, 
  Trash2, 
  Edit, 
  Eye, 
  Lock, 
  AlertTriangle, 
  Activity, 
  Users, 
  Settings,
  FileText,
  BarChart3,
  MapPin,
  Building,
  Smartphone,
  Database,
  Key,
  LogOut,
  Plus,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

interface UserWithRoles {
  id: string;
  email: string;
  full_name?: string;
  state?: string;
  district?: string;
  roles: UserRole[];
  created_at: string;
  last_login?: string;
  status: 'active' | 'suspended' | 'pending';
  permissions: string[];
}

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

interface SecurityRule {
  id: string;
  role: UserRole;
  resource: string;
  permissions: string[];
  conditions: string[];
  created_at: string;
}

interface AccessAttempt {
  id: string;
  user_id?: string;
  email: string;
  ip_address: string;
  user_agent: string;
  attempted_resource: string;
  success: boolean;
  timestamp: string;
  reason?: string;
}

export default function RoleManagement() {
  const { hasRole, user } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  // Enhanced state for comprehensive role management
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [securityRules, setSecurityRules] = useState<SecurityRule[]>([]);
  const [accessAttempts, setAccessAttempts] = useState<AccessAttempt[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedSecurityRule, setSelectedSecurityRule] = useState<SecurityRule | null>(null);

  const roleOptions: { value: UserRole; label: string; description: string; icon: any; color: string }[] = [
    { 
      value: 'super_admin', 
      label: 'Super Administrator', 
      description: 'Full access to all modules and settings',
      icon: Shield,
      color: 'text-red-600'
    },
    { 
      value: 'state_admin', 
      label: 'State Administrator', 
      description: 'Access limited to assigned state',
      icon: Building,
      color: 'text-blue-600'
    },
    { 
      value: 'district_admin', 
      label: 'District Administrator', 
      description: 'Access limited to assigned district',
      icon: MapPin,
      color: 'text-green-600'
    },
    { 
      value: 'auditor', 
      label: 'Auditor', 
      description: 'Read-only access to audit trails and reports',
      icon: Eye,
      color: 'text-purple-600'
    },
    { 
      value: 'csr_partner', 
      label: 'CSR Partner', 
      description: 'View CSR module, contribution logs, reports',
      icon: BarChart3,
      color: 'text-orange-600'
    },
    { 
      value: 'volunteer', 
      label: 'Volunteer', 
      description: 'Limited access via mobile app only',
      icon: Smartphone,
      color: 'text-gray-600'
    }
  ];

  // Module access configuration
  const moduleAccess: Record<UserRole, string[]> = {
    super_admin: ['dashboard', 'volunteers', 'children', 'schools', 'identity', 'csr', 'reports', 'mapping', 'data-processing', 'roles', 'audit'],
    state_admin: ['dashboard', 'volunteers', 'children', 'schools', 'identity', 'reports', 'mapping', 'data-processing'],
    district_admin: ['dashboard', 'volunteers', 'children', 'schools', 'identity', 'reports', 'mapping'],
    auditor: ['dashboard', 'reports', 'audit'],
    csr_partner: ['dashboard', 'csr', 'reports'],
    volunteer: ['mobile-app-only']
  };

  // Security rules for different resources
  const defaultSecurityRules: SecurityRule[] = [
    {
      id: '1',
      role: 'super_admin',
      resource: '*',
      permissions: ['read', 'write', 'delete', 'admin'],
      conditions: ['always'],
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      role: 'state_admin',
      resource: 'children',
      permissions: ['read', 'write'],
      conditions: ['state_match'],
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      role: 'district_admin',
      resource: 'children',
      permissions: ['read', 'write'],
      conditions: ['district_match'],
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      role: 'auditor',
      resource: 'reports',
      permissions: ['read'],
      conditions: ['always'],
      created_at: new Date().toISOString()
    }
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Simulate fetching users with enhanced data
      const mockUsers: UserWithRoles[] = [
        {
          id: '1',
          email: 'admin@government.gov.in',
          full_name: 'Super Administrator',
          roles: ['super_admin'],
          created_at: '2024-01-01T00:00:00Z',
          last_login: '2024-01-15T10:30:00Z',
          status: 'active',
          permissions: ['*']
        },
        {
          id: '2',
          email: 'bihar.admin@government.gov.in',
          full_name: 'Bihar State Admin',
          state: 'Bihar',
          roles: ['state_admin'],
          created_at: '2024-01-02T00:00:00Z',
          last_login: '2024-01-14T15:45:00Z',
          status: 'active',
          permissions: ['dashboard', 'volunteers', 'children', 'schools', 'identity', 'reports', 'mapping', 'data-processing']
        },
        {
          id: '3',
          email: 'patna.district@government.gov.in',
          full_name: 'Patna District Admin',
          state: 'Bihar',
          district: 'Patna',
          roles: ['district_admin'],
          created_at: '2024-01-03T00:00:00Z',
          last_login: '2024-01-13T09:20:00Z',
          status: 'active',
          permissions: ['dashboard', 'volunteers', 'children', 'schools', 'identity', 'reports', 'mapping']
        },
        {
          id: '4',
          email: 'auditor@government.gov.in',
          full_name: 'System Auditor',
          roles: ['auditor'],
          created_at: '2024-01-04T00:00:00Z',
          last_login: '2024-01-12T14:10:00Z',
          status: 'active',
          permissions: ['dashboard', 'reports', 'audit']
        },
        {
          id: '5',
          email: 'csr.partner@company.com',
          full_name: 'CSR Partner',
          roles: ['csr_partner'],
          created_at: '2024-01-05T00:00:00Z',
          last_login: '2024-01-11T11:30:00Z',
          status: 'active',
          permissions: ['dashboard', 'csr', 'reports']
        }
      ];
      
      setUsers(mockUsers);
      setSecurityRules(defaultSecurityRules);
      
      // Simulate audit logs
      const mockAuditLogs: AuditLog[] = [
        {
          id: '1',
          user_id: '1',
          action: 'role_assigned',
          resource: 'user_management',
          details: 'Assigned state_admin role to bihar.admin@government.gov.in',
          timestamp: '2024-01-15T10:30:00Z',
          ip_address: '192.168.1.100',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        {
          id: '2',
          user_id: '1',
          action: 'user_suspended',
          resource: 'user_management',
          details: 'Suspended user: unauthorized.access@example.com',
          timestamp: '2024-01-14T16:45:00Z',
          ip_address: '192.168.1.100',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      ];
      
      setAuditLogs(mockAuditLogs);
      
      // Simulate access attempts
      const mockAccessAttempts: AccessAttempt[] = [
        {
          id: '1',
          email: 'unauthorized.access@example.com',
          ip_address: '203.0.113.1',
          user_agent: 'Mozilla/5.0 (Unknown)',
          attempted_resource: '/admin/roles',
          success: false,
          timestamp: '2024-01-15T09:30:00Z',
          reason: 'Insufficient permissions'
        },
        {
          id: '2',
          user_id: '3',
          email: 'patna.district@government.gov.in',
          ip_address: '192.168.1.50',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          attempted_resource: '/children',
          success: true,
          timestamp: '2024-01-15T08:15:00Z'
        }
      ];
      
      setAccessAttempts(mockAccessAttempts);
      
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUser) return;
    
    try {
      // Simulate role assignment
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, roles: [...user.roles, selectedRole] }
          : user
      );
      
      setUsers(updatedUsers);
      
      // Log the action
      const auditLog: AuditLog = {
        id: Date.now().toString(),
        user_id: user?.id || 'unknown',
        action: 'role_assigned',
        resource: 'user_management',
        details: `Assigned ${selectedRole} role to ${selectedUser.email}`,
        timestamp: new Date().toISOString(),
        ip_address: '192.168.1.100', // In real app, get from request
        user_agent: navigator.userAgent
      };
      
      setAuditLogs(prev => [auditLog, ...prev]);
      
      toast({
        title: "Role Assigned",
        description: `Successfully assigned ${selectedRole} role to ${selectedUser.email}`,
        variant: "default"
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive"
      });
    }
  };

  const handleRemoveRole = async (userId: string, role: UserRole) => {
    try {
      const userToUpdate = users.find(u => u.id === userId);
      if (!userToUpdate) return;
      
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, roles: user.roles.filter(r => r !== role) }
          : user
      );
      
      setUsers(updatedUsers);
      
      // Log the action
      const auditLog: AuditLog = {
        id: Date.now().toString(),
        user_id: user?.id || 'unknown',
        action: 'role_removed',
        resource: 'user_management',
        details: `Removed ${role} role from ${userToUpdate.email}`,
        timestamp: new Date().toISOString(),
        ip_address: '192.168.1.100',
        user_agent: navigator.userAgent
      };
      
      setAuditLogs(prev => [auditLog, ...prev]);
      
      toast({
        title: "Role Removed",
        description: `Successfully removed ${role} role from ${userToUpdate.email}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive"
      });
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      const userToSuspend = users.find(u => u.id === userId);
      if (!userToSuspend) return;
      
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, status: 'suspended' as const }
          : user
      );
      
      setUsers(updatedUsers);
      
      // Log the action
      const auditLog: AuditLog = {
        id: Date.now().toString(),
        user_id: user?.id || 'unknown',
        action: 'user_suspended',
        resource: 'user_management',
        details: `Suspended user: ${userToSuspend.email}`,
        timestamp: new Date().toISOString(),
        ip_address: '192.168.1.100',
        user_agent: navigator.userAgent
      };
      
      setAuditLogs(prev => [auditLog, ...prev]);
      
      toast({
        title: "User Suspended",
        description: `Successfully suspended ${userToSuspend.email}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suspend user",
        variant: "destructive"
      });
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      const userToActivate = users.find(u => u.id === userId);
      if (!userToActivate) return;
      
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, status: 'active' as const }
          : user
      );
      
      setUsers(updatedUsers);
      
      // Log the action
      const auditLog: AuditLog = {
        id: Date.now().toString(),
        user_id: user?.id || 'unknown',
        action: 'user_activated',
        resource: 'user_management',
        details: `Activated user: ${userToActivate.email}`,
        timestamp: new Date().toISOString(),
        ip_address: '192.168.1.100',
        user_agent: navigator.userAgent
      };
      
      setAuditLogs(prev => [auditLog, ...prev]);
      
      toast({
        title: "User Activated",
        description: `Successfully activated ${userToActivate.email}`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate user",
        variant: "destructive"
      });
    }
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.roles.includes(filterRole);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: UserRole) => {
    const roleOption = roleOptions.find(r => r.value === role);
    const IconComponent = roleOption?.icon || Shield;
    return <IconComponent className={`w-4 h-4 ${roleOption?.color}`} />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const openAssignDialog = (user: UserWithRoles) => {
    setSelectedUser(user);
    setSelectedRole('volunteer');
    setSelectedState(user.state || '');
    setSelectedDistrict(user.district || '');
    setIsDialogOpen(true);
  };

  if (!hasRole('super_admin')) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              Only Super Administrators can access role management.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Secure Role Management</h1>
          <p className="text-muted-foreground">
            Comprehensive role-based access control for government data security
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowSecurityModal(true)}>
            <Shield className="mr-2 h-4 w-4" />
            Security Rules
          </Button>
          <Button variant="outline" onClick={() => setShowAuditModal(true)}>
            <Activity className="mr-2 h-4 w-4" />
            Audit Trail
          </Button>
          <Button onClick={() => window.location.href = '/auth'}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Security Alert */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Notice:</strong> All role changes are logged and monitored. Unauthorized access attempts are tracked and reported.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security Rules
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Access Attempts
          </TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user roles, permissions, and access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterRole} onValueChange={(value) => setFilterRole(value as UserRole | 'all')}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(role.value)}
                          {role.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading users...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {user.full_name || 'Unnamed User'}
                            {getStatusBadge(user.status)}
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell>
                          {user.state && user.district ? `${user.district}, ${user.state}` :
                           user.state ? user.state :
                           user.district ? user.district :
                           'Not assigned'}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <Badge 
                                key={role} 
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => handleRemoveRole(user.id, role)}
                                title="Click to remove role"
                              >
                                <div className="flex items-center gap-1">
                                  {getRoleIcon(role)}
                                  {roleOptions.find(r => r.value === role)?.label || role}
                                  <Trash2 className="w-3 h-3" />
                                </div>
                              </Badge>
                            ))}
                            {user.roles.length === 0 && (
                              <Badge variant="outline">No roles assigned</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openAssignDialog(user)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Assign Role
                            </Button>
                            {user.status === 'active' ? (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleSuspendUser(user.id)}
                              >
                                <Lock className="mr-2 h-4 w-4" />
                                Suspend
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleActivateUser(user.id)}
                              >
                                <Key className="mr-2 h-4 w-4" />
                                Activate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
                </TabsContent>

        {/* Security Rules Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Rules Configuration
              </CardTitle>
              <CardDescription>
                Define and manage access control rules for different resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityRules.map((rule) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getRoleIcon(rule.role)}
                        <div>
                          <h4 className="font-medium">{roleOptions.find(r => r.value === rule.role)?.label}</h4>
                          <p className="text-sm text-muted-foreground">Resource: {rule.resource}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{rule.permissions.join(', ')}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Conditions: {rule.conditions.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Monitor all role changes and administrative actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {users.find(u => u.id === log.user_id)?.email || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {log.ip_address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Attempts Tab */}
        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Access Attempts
              </CardTitle>
              <CardDescription>
                Monitor unauthorized access attempts and security incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessAttempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="text-sm">
                        {new Date(attempt.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">{attempt.email}</TableCell>
                      <TableCell>{attempt.attempted_resource}</TableCell>
                      <TableCell>
                        {attempt.success ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {attempt.ip_address}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {attempt.reason || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Assign a new role to {selectedUser?.full_name || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedRole === 'state_admin' || selectedRole === 'district_admin') && (
              <>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    placeholder="Enter state name"
                  />
                </div>
                
                {selectedRole === 'district_admin' && (
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      placeholder="Enter district name"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignRole}>
              Assign Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}