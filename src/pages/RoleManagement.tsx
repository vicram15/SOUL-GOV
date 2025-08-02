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
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Shield, Trash2, Edit } from 'lucide-react';

interface UserWithRoles {
  id: string;
  email: string;
  full_name?: string;
  state?: string;
  district?: string;
  roles: UserRole[];
  created_at: string;
}

export default function RoleManagement() {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const roleOptions: { value: UserRole; label: string; description: string }[] = [
    { value: 'super_admin', label: 'Super Administrator', description: 'Full access to all modules and settings' },
    { value: 'state_admin', label: 'State Administrator', description: 'Access limited to assigned state' },
    { value: 'district_admin', label: 'District Administrator', description: 'Access limited to assigned district' },
    { value: 'auditor', label: 'Auditor', description: 'Read-only access to audit trails and reports' },
    { value: 'csr_partner', label: 'CSR Partner', description: 'View CSR module, contribution logs, reports' },
    { value: 'volunteer', label: 'Volunteer', description: 'Limited access via mobile app only' }
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles for each user
      const usersWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: roles, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);

          if (rolesError) throw rolesError;

          return {
            ...profile,
            roles: roles.map(r => r.role as UserRole)
          };
        })
      );

      setUsers(usersWithRoles);
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
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUser.id,
          role: selectedRole
        });

      if (error) throw error;

      // Update profile with state/district if needed
      if (selectedState || selectedDistrict) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            state: selectedState || null,
            district: selectedDistrict || null
          })
          .eq('id', selectedUser.id);

        if (updateError) throw updateError;
      }

      toast({
        title: "Success",
        description: `Role ${selectedRole} assigned successfully`
      });

      fetchUsers();
      setIsDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive"
      });
    }
  };

  const handleRemoveRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Role ${role} removed successfully`
      });

      fetchUsers();
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive"
      });
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
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground">
            Manage user roles and permissions across the platform
          </p>
        </div>
        <Button onClick={() => window.location.href = '/auth'}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
          <CardDescription>
            Assign and manage user roles to control access to different modules
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
                  <TableHead>Region</TableHead>
                  <TableHead>Roles</TableHead>
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
                            className="cursor-pointer"
                            onClick={() => handleRemoveRole(user.id, role)}
                          >
                            {roleOptions.find(r => r.value === role)?.label || role}
                            <Trash2 className="ml-1 h-3 w-3" />
                          </Badge>
                        ))}
                        {user.roles.length === 0 && (
                          <Badge variant="outline">No roles assigned</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAssignDialog(user)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Assign Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

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