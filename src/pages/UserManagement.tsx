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
import { toast } from '@/hooks/use-toast';
import { UserPlus, Plus, Settings, Trash2, Edit, Shield, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UserWithRoles {
  id: string;
  email: string;
  full_name?: string;
  state?: string;
  district?: string;
  roles: UserRole[];
  created_at: string;
  last_login?: string;
  status: 'active' | 'inactive' | 'suspended';
}

export default function UserManagement() {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newUserData, setNewUserData] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'volunteer' as UserRole,
    state: '',
    district: ''
  });

  const roleOptions: { value: UserRole; label: string; description: string; scope: string }[] = [
    { 
      value: 'super_admin', 
      label: 'Super Administrator', 
      description: 'Full access to all modules and settings',
      scope: 'Global'
    },
    { 
      value: 'state_admin', 
      label: 'State Administrator', 
      description: 'Access limited to their assigned state',
      scope: 'State-level'
    },
    { 
      value: 'district_admin', 
      label: 'District Administrator', 
      description: 'Access limited to their assigned district',
      scope: 'District-level'
    },
    { 
      value: 'auditor', 
      label: 'Auditor', 
      description: 'Read-only access to audit trails and reports',
      scope: 'Read-only'
    },
    { 
      value: 'csr_partner', 
      label: 'CSR Partner', 
      description: 'View CSR modules, contribution logs, reports',
      scope: 'CSR-focused'
    },
    { 
      value: 'volunteer', 
      label: 'Volunteer', 
      description: 'Limited access via mobile app only',
      scope: 'Mobile-only'
    }
  ];

  const mockUsers: UserWithRoles[] = [
    {
      id: '1',
      email: 'admin@childimpact.gov',
      full_name: 'System Administrator',
      roles: ['super_admin'],
      created_at: '2024-01-15T00:00:00Z',
      last_login: '2024-01-20T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      email: 'maharashtra.admin@childimpact.gov',
      full_name: 'Maharashtra State Admin',
      state: 'Maharashtra',
      roles: ['state_admin'],
      created_at: '2024-01-16T00:00:00Z',
      last_login: '2024-01-19T14:15:00Z',
      status: 'active'
    },
    {
      id: '3',
      email: 'mumbai.admin@childimpact.gov',
      full_name: 'Mumbai District Admin',
      state: 'Maharashtra',
      district: 'Mumbai',
      roles: ['district_admin'],
      created_at: '2024-01-17T00:00:00Z',
      last_login: '2024-01-20T09:45:00Z',
      status: 'active'
    },
    {
      id: '4',
      email: 'audit@childimpact.gov',
      full_name: 'Internal Auditor',
      roles: ['auditor'],
      created_at: '2024-01-18T00:00:00Z',
      last_login: '2024-01-19T16:20:00Z',
      status: 'active'
    },
    {
      id: '5',
      email: 'tata.csr@company.com',
      full_name: 'Tata CSR Representative',
      roles: ['csr_partner'],
      created_at: '2024-01-19T00:00:00Z',
      last_login: '2024-01-20T11:00:00Z',
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate loading users
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateUser = async () => {
    // TODO: Implement user creation after database setup
    const newUser: UserWithRoles = {
      id: Date.now().toString(),
      email: newUserData.email,
      full_name: newUserData.full_name,
      state: newUserData.state || undefined,
      district: newUserData.district || undefined,
      roles: [newUserData.role],
      created_at: new Date().toISOString(),
      status: 'active'
    };

    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    setNewUserData({
      email: '',
      full_name: '',
      password: '',
      role: 'volunteer',
      state: '',
      district: ''
    });

    toast({
      title: "User Created",
      description: `User ${newUserData.email} has been created successfully.`
    });
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' as const }
        : user
    ));
    
    toast({
      title: "User Status Updated",
      description: "User status has been changed successfully."
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleBadge = (role: UserRole) => {
    const colors = {
      super_admin: 'bg-red-100 text-red-800',
      state_admin: 'bg-blue-100 text-blue-800',
      district_admin: 'bg-green-100 text-green-800',
      auditor: 'bg-purple-100 text-purple-800',
      csr_partner: 'bg-orange-100 text-orange-800',
      volunteer: 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={colors[role]}>
        {roleOptions.find(r => r.value === role)?.label || role}
      </Badge>
    );
  };

  if (!hasRole('super_admin')) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              Only Super Administrators can access user management.
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and monitor user accounts across the platform
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Create New User
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Role Overview</TabsTrigger>
          <TabsTrigger value="audit">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>
                Manage all user accounts and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading users...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.full_name || 'Unnamed User'}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => getRoleBadge(role))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.state && user.district ? `${user.district}, ${user.state}` :
                           user.state ? user.state :
                           user.district ? user.district :
                           'Global'}
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSuspendUser(user.id)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
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

        <TabsContent value="roles" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleOptions.map((role) => {
              const userCount = users.filter(u => u.roles.includes(role.value)).length;
              return (
                <Card key={role.value}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {role.label}
                      <Badge variant="secondary">{userCount} users</Badge>
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <strong>Scope:</strong> {role.scope}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Monitor user activities and access attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  Activity logging will be available after the database migration is completed.
                  All user actions, login attempts, and access denials will be tracked here.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system with appropriate role and permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={newUserData.full_name}
                  onChange={(e) => setNewUserData({...newUserData, full_name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Temporary Password</Label>
              <Input
                id="password"
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
                placeholder="User will be required to change on first login"
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newUserData.role} onValueChange={(value) => setNewUserData({...newUserData, role: value as UserRole})}>
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

            {(newUserData.role === 'state_admin' || newUserData.role === 'district_admin') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newUserData.state}
                    onChange={(e) => setNewUserData({...newUserData, state: e.target.value})}
                    placeholder="Enter state name"
                  />
                </div>
                
                {newUserData.role === 'district_admin' && (
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={newUserData.district}
                      onChange={(e) => setNewUserData({...newUserData, district: e.target.value})}
                      placeholder="Enter district name"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}