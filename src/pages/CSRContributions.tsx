import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Heart, 
  Building, 
  TrendingUp, 
  Download,
  Search,
  Eye,
  Contact,
  BarChart3,
  LineChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts';

// Sample data
const contributions = [
  { 
    id: 'CSR-001', 
    company: 'TechCorp Foundation', 
    amount: 250000, 
    purpose: 'Education Initiative',
    district: 'Mumbai',
    state: 'Maharashtra',
    date: '2024-01-15',
    status: 'disbursed'
  },
  { 
    id: 'CSR-002', 
    company: 'Global Industries Ltd', 
    amount: 150000, 
    purpose: 'Healthcare Support',
    district: 'Delhi',
    state: 'Delhi',
    date: '2024-02-10',
    status: 'pending'
  },
  { 
    id: 'CSR-003', 
    company: 'Future Energy Corp', 
    amount: 300000, 
    purpose: 'ID Documentation',
    district: 'Bangalore',
    state: 'Karnataka',
    date: '2024-01-20',
    status: 'disbursed'
  }
];

const corporateData = [
  { name: 'TechCorp Foundation', amount: 2500000 },
  { name: 'Global Industries', amount: 1800000 },
  { name: 'Future Energy Corp', amount: 1200000 },
  { name: 'Healthcare Partners', amount: 900000 },
  { name: 'Others', amount: 1600000 }
];

const districtUtilizationData = [
  { district: 'Mumbai', education: 800000, healthcare: 400000, documentation: 300000 },
  { district: 'Delhi', education: 600000, healthcare: 500000, documentation: 200000 },
  { district: 'Bangalore', education: 700000, healthcare: 300000, documentation: 400000 },
  { district: 'Chennai', education: 500000, healthcare: 600000, documentation: 250000 },
  { district: 'Kolkata', education: 450000, healthcare: 350000, documentation: 300000 }
];

const fundTrendsData = [
  { month: 'Jan', amount: 1200000 },
  { month: 'Feb', amount: 1450000 },
  { month: 'Mar', amount: 1600000 },
  { month: 'Apr', amount: 1350000 },
  { month: 'May', amount: 1800000 },
  { month: 'Jun', amount: 2100000 }
];

export default function CSRContributions() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disbursed':
        return <Badge variant="default" className="bg-success text-success-foreground">Disbursed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">CSR Contributions</h1>
          <p className="text-muted-foreground">Corporate Funding & Reports</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹2.4Cr</p>
                <p className="text-sm text-muted-foreground">Total Contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-muted-foreground">Contributing Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-volunteer/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-volunteer" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹1.8Cr</p>
                <p className="text-sm text-muted-foreground">Funds Disbursed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">18,234</p>
                <p className="text-sm text-muted-foreground">Children Impacted</p>
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
                <Input placeholder="Search companies..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Purposes</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="disbursed">Disbursed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contributions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fund Disbursements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CSR ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="hidden sm:table-cell">Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Purpose</TableHead>
                  <TableHead className="hidden lg:table-cell">Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions.map((contribution) => (
                  <TableRow key={contribution.id}>
                    <TableCell className="font-medium">{contribution.id}</TableCell>
                    <TableCell>{contribution.company}</TableCell>
                    <TableCell className="hidden sm:table-cell">{formatCurrency(contribution.amount)}</TableCell>
                    <TableCell className="hidden md:table-cell">{contribution.purpose}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {contribution.district}, {contribution.state}
                    </TableCell>
                    <TableCell>{getStatusBadge(contribution.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{contribution.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Contact className="w-4 h-4" />
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
        {/* Corporate Contributions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Corporate-wise Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={corporateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Amount']} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fund Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Time-based Fund Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={fundTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Amount']} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* District-wise Utilization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              District-wise Funding Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), '']} />
                <Bar dataKey="education" stackId="a" fill="hsl(var(--primary))" name="Education" />
                <Bar dataKey="healthcare" stackId="a" fill="hsl(var(--child-care))" name="Healthcare" />
                <Bar dataKey="documentation" stackId="a" fill="hsl(var(--volunteer))" name="Documentation" />
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
              <Eye className="w-5 h-5" />
              <span className="text-sm">View Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Download className="w-5 h-5" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Contact className="w-5 h-5" />
              <span className="text-sm">Contact Contributor</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}