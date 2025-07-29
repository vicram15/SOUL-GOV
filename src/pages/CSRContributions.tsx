import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Heart, Building2, TrendingUp, Download, FileText, Mail } from "lucide-react";

// Sample data
const corporateContributions = [
  { company: "TechCorp Foundation", amount: 25000000, year: "2024" },
  { company: "Global Industries", amount: 18000000, year: "2024" },
  { company: "Future Finance", amount: 15000000, year: "2024" },
  { company: "Green Energy Ltd", amount: 12000000, year: "2024" },
  { company: "Digital Solutions", amount: 8000000, year: "2024" }
];

const districtFunding = [
  { district: "Mumbai", education: 15000000, healthcare: 8000000, nutrition: 5000000 },
  { district: "Bangalore", education: 12000000, healthcare: 6000000, nutrition: 4000000 },
  { district: "Delhi", education: 10000000, healthcare: 7000000, nutrition: 3000000 },
  { district: "Pune", education: 8000000, healthcare: 5000000, nutrition: 3000000 },
  { district: "Chennai", education: 7000000, healthcare: 4000000, nutrition: 2000000 }
];

const fundingTrends = [
  { month: "Jan", amount: 5000000 },
  { month: "Feb", amount: 7000000 },
  { month: "Mar", amount: 8500000 },
  { month: "Apr", amount: 6000000 },
  { month: "May", amount: 9000000 },
  { month: "Jun", amount: 12000000 }
];

const recentContributions = [
  { id: "CSR-001", company: "TechCorp Foundation", amount: 2500000, purpose: "Education Infrastructure", date: "2024-01-15", status: "Disbursed" },
  { id: "CSR-002", company: "Global Industries", amount: 1800000, purpose: "Healthcare Initiative", date: "2024-01-20", status: "Processing" },
  { id: "CSR-003", company: "Future Finance", amount: 1500000, purpose: "Nutrition Program", date: "2024-01-25", status: "Received" },
  { id: "CSR-004", company: "Green Energy Ltd", amount: 1200000, purpose: "Digital Learning", date: "2024-01-28", status: "Disbursed" }
];

export default function CSRContributions() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disbursed": return "bg-success text-success-foreground";
      case "Processing": return "bg-secondary text-secondary-foreground";
      case "Received": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CSR Contributions</h1>
          <p className="text-muted-foreground">Corporate funding, reports, and impact tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Building2 className="w-4 h-4 mr-2" />
            Add Contributor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">₹2.4Cr</p>
                <p className="text-sm text-muted-foreground">Total Contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-volunteer" />
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-muted-foreground">Corporate Partners</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">₹1.8Cr</p>
                <p className="text-sm text-muted-foreground">Funds Disbursed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-child-care" />
              <div>
                <p className="text-2xl font-bold">18,247</p>
                <p className="text-sm text-muted-foreground">Children Benefited</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Corporate-wise Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={corporateContributions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Funding Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fundingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* District-wise Funding Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>District-wise Funding Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={districtFunding}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="education" stackId="a" fill="hsl(var(--primary))" />
              <Bar dataKey="healthcare" stackId="a" fill="hsl(var(--child-care))" />
              <Bar dataKey="nutrition" stackId="a" fill="hsl(var(--volunteer))" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm">Education</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-child-care" />
              <span className="text-sm">Healthcare</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-volunteer" />
              <span className="text-sm">Nutrition</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Contributions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contribution ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentContributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell className="font-medium">{contribution.id}</TableCell>
                  <TableCell>{contribution.company}</TableCell>
                  <TableCell>{formatCurrency(contribution.amount)}</TableCell>
                  <TableCell>{contribution.purpose}</TableCell>
                  <TableCell>{new Date(contribution.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contribution.status)}>
                      {contribution.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}