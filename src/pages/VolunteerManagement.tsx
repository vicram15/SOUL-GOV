import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  UserCheck,
  Eye,
  UserX,
  BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const volunteers = [
  { id: 'V-001', name: 'Rajesh Kumar', state: 'Maharashtra', district: 'Mumbai', kycStatus: 'verified', childrenAdded: 15, joinDate: '2024-01-15' },
  { id: 'V-002', name: 'Priya Sharma', state: 'Uttar Pradesh', district: 'Lucknow', kycStatus: 'pending', childrenAdded: 8, joinDate: '2024-02-10' },
  { id: 'V-003', name: 'Amit Singh', state: 'Bihar', district: 'Patna', kycStatus: 'verified', childrenAdded: 22, joinDate: '2024-01-20' },
  { id: 'V-004', name: 'Sunita Devi', state: 'West Bengal', district: 'Kolkata', kycStatus: 'incomplete', childrenAdded: 5, joinDate: '2024-03-05' }
];

const volunteerActivityData = [
  { name: 'Rajesh Kumar', children: 15 },
  { name: 'Amit Singh', children: 22 },
  { name: 'Priya Sharma', children: 8 },
  { name: 'Sunita Devi', children: 5 },
  { name: 'Others', children: 35 }
];

export default function VolunteerManagement() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'incomplete':
        return <Badge variant="destructive">Incomplete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Volunteer Management</h1>
          <p className="text-muted-foreground">KYC, Profiles & Activity Management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Add Volunteer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Verified Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Pending KYC</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Incomplete Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">304</p>
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search volunteers..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="KYC Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="up">Uttar Pradesh</SelectItem>
                  <SelectItem value="bihar">Bihar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Listing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Volunteer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">State</TableHead>
                  <TableHead className="hidden lg:table-cell">District</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Children Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">{volunteer.id}</TableCell>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{volunteer.state}</TableCell>
                    <TableCell className="hidden lg:table-cell">{volunteer.district}</TableCell>
                    <TableCell>{getStatusBadge(volunteer.kycStatus)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{volunteer.childrenAdded}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Child Entries per Volunteer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volunteerActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="children" fill="hsl(var(--volunteer))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <UserCheck className="w-4 h-4 mr-2" />
                Approve KYC Applications
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Added Children
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <UserX className="w-4 h-4 mr-2" />
                Suspend Volunteer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Bulk KYC Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}