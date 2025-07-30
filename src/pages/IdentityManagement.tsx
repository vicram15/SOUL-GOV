import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  IdCard, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Search,
  Edit,
  Eye,
  AlertCircle,
  PieChart,
  BarChart3
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Sample data
const identityData = [
  { 
    id: 'CH-001', 
    name: 'Priya Sharma', 
    age: 8, 
    state: 'Uttar Pradesh', 
    district: 'Lucknow',
    aadhaar: 'verified',
    rationCard: 'verified',
    birthCertificate: 'pending',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'CH-002', 
    name: 'Rahul Kumar', 
    age: 10, 
    state: 'Maharashtra', 
    district: 'Mumbai',
    aadhaar: 'pending',
    rationCard: 'missing',
    birthCertificate: 'verified',
    lastUpdated: '2024-02-10'
  },
  { 
    id: 'CH-003', 
    name: 'Anjali Singh', 
    age: 7, 
    state: 'Bihar', 
    district: 'Patna',
    aadhaar: 'verified',
    rationCard: 'verified',
    birthCertificate: 'verified',
    lastUpdated: '2024-01-20'
  }
];

const idStatusData = [
  { name: 'Aadhaar', percentage: 78, fill: 'hsl(var(--primary))' },
  { name: 'Ration Card', percentage: 65, fill: 'hsl(var(--child-care))' },
  { name: 'Birth Certificate', percentage: 85, fill: 'hsl(var(--volunteer))' }
];

const regionalStatusData = [
  { region: 'North', aadhaar: 75, rationCard: 60, birthCert: 80 },
  { region: 'South', aadhaar: 85, rationCard: 70, birthCert: 90 },
  { region: 'East', aadhaar: 70, rationCard: 55, birthCert: 75 },
  { region: 'West', aadhaar: 80, rationCard: 75, birthCert: 85 }
];

export default function IdentityManagement() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'missing':
        return <Badge variant="destructive">Missing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Identity Management</h1>
          <p className="text-muted-foreground">Aadhaar & ID Tracking</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate ID Form
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <IdCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">19,381</p>
                <p className="text-sm text-muted-foreground">Aadhaar Verified</p>
                <Progress value={78} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-child-care/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-child-care" />
              </div>
              <div>
                <p className="text-2xl font-bold">16,150</p>
                <p className="text-sm text-muted-foreground">Ration Card</p>
                <Progress value={65} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-volunteer/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-volunteer" />
              </div>
              <div>
                <p className="text-2xl font-bold">21,120</p>
                <p className="text-sm text-muted-foreground">Birth Certificate</p>
                <Progress value={85} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">5,466</p>
                <p className="text-sm text-muted-foreground">Pending Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by child ID or name..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="aadhaar">Aadhaar</SelectItem>
                  <SelectItem value="ration">Ration Card</SelectItem>
                  <SelectItem value="birth">Birth Certificate</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="up">Uttar Pradesh</SelectItem>
                  <SelectItem value="mh">Maharashtra</SelectItem>
                  <SelectItem value="br">Bihar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identity Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Identity Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Child ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Age</TableHead>
                  <TableHead className="hidden lg:table-cell">District</TableHead>
                  <TableHead>Aadhaar</TableHead>
                  <TableHead className="hidden sm:table-cell">Ration Card</TableHead>
                  <TableHead className="hidden lg:table-cell">Birth Certificate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {identityData.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell className="font-medium">{child.id}</TableCell>
                    <TableCell>{child.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{child.age}</TableCell>
                    <TableCell className="hidden lg:table-cell">{child.district}</TableCell>
                    <TableCell>{getStatusBadge(child.aadhaar)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{getStatusBadge(child.rationCard)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{getStatusBadge(child.birthCertificate)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertCircle className="w-4 h-4" />
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ID Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Document Completion Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={idStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {idStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {idStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.name}: {item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Region-wise Identity Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="aadhaar" fill="hsl(var(--primary))" name="Aadhaar" />
                <Bar dataKey="rationCard" fill="hsl(var(--child-care))" name="Ration Card" />
                <Bar dataKey="birthCert" fill="hsl(var(--volunteer))" name="Birth Certificate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Mark as Enrolled</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Generate ID Form</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">Alert for Pending</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Edit className="w-5 h-5" />
              <span className="text-sm">Bulk Update</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}