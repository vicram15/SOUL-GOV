import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, UserCheck, UserX, Activity, Search, Filter } from "lucide-react";

// Sample data
const volunteers = [
  { id: "V-001", name: "Rajesh Kumar", state: "Maharashtra", district: "Mumbai", kycStatus: "Approved", childrenAdded: 12, joinDate: "2024-01-15", phone: "+91 98765 43210" },
  { id: "V-002", name: "Priya Sharma", state: "Karnataka", district: "Bangalore", kycStatus: "Pending", childrenAdded: 8, joinDate: "2024-02-20", phone: "+91 87654 32109" },
  { id: "V-003", name: "Amit Singh", state: "Uttar Pradesh", district: "Lucknow", kycStatus: "Approved", childrenAdded: 15, joinDate: "2024-01-10", phone: "+91 76543 21098" },
  { id: "V-004", name: "Sunita Devi", state: "Bihar", district: "Patna", kycStatus: "Rejected", childrenAdded: 0, joinDate: "2024-03-05", phone: "+91 65432 10987" },
  { id: "V-005", name: "Vikram Patel", state: "Gujarat", district: "Ahmedabad", kycStatus: "Approved", childrenAdded: 20, joinDate: "2023-12-01", phone: "+91 54321 09876" }
];

const volunteerActivityData = [
  { name: "Rajesh Kumar", children: 12 },
  { name: "Priya Sharma", children: 8 },
  { name: "Amit Singh", children: 15 },
  { name: "Vikram Patel", children: 20 },
];

export default function VolunteerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-success text-success-foreground";
      case "Pending": return "bg-secondary text-secondary-foreground";
      case "Rejected": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || volunteer.kycStatus.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Volunteer Management</h1>
          <p className="text-muted-foreground">Manage KYC, profiles, and volunteer activities</p>
        </div>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add Volunteer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">1,256</p>
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">1,089</p>
                <p className="text-sm text-muted-foreground">KYC Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">144</p>
                <p className="text-sm text-muted-foreground">KYC Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserX className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">KYC Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volunteer Activity Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Top Volunteers by Children Added</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volunteerActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="children" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Volunteer Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Volunteer Directory</CardTitle>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search volunteers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Volunteer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Children Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">{volunteer.id}</TableCell>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell>{volunteer.district}, {volunteer.state}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(volunteer.kycStatus)}>
                        {volunteer.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{volunteer.childrenAdded}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {volunteer.kycStatus === "Pending" && (
                          <Button size="sm" variant="default">Approve</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}