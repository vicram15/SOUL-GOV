import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  Building, 
  TrendingUp, 
  Download,
  Search,
  Eye,
  Contact,
  BarChart3,
  LineChart,
  FileText,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts';
import { useState } from "react";

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
  const [viewReportModalOpen, setViewReportModalOpen] = useState(false);
  const [exportDataModalOpen, setExportDataModalOpen] = useState(false);
  const [contactContributorModalOpen, setContactContributorModalOpen] = useState(false);
  const [generateReportModalOpen, setGenerateReportModalOpen] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<any>(null);

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

  const handleViewReport = () => {
    setSelectedContribution(contributions[0]); // For demo, using first contribution
    setViewReportModalOpen(true);
  };

  const handleExportData = () => {
    setExportDataModalOpen(true);
  };

  const handleContactContributor = () => {
    setSelectedContribution(contributions[1]); // For demo, using second contribution
    setContactContributorModalOpen(true);
  };

  const handleGenerateReport = () => {
    setGenerateReportModalOpen(true);
  };

  return (
    <>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleViewReport}
                aria-label="View report"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-primary" />
                <span className="text-xs sm:text-sm text-center">View Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleExportData}
                aria-label="Export data"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-success" />
                <span className="text-xs sm:text-sm text-center">Export Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleContactContributor}
                aria-label="Contact contributor"
              >
                <Contact className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-volunteer" />
                <span className="text-xs sm:text-sm text-center">Contact Contributor</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleGenerateReport}
                aria-label="Generate report"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-child-care" />
                <span className="text-xs sm:text-sm text-center">Generate Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Report Modal */}
      <Dialog open={viewReportModalOpen} onOpenChange={setViewReportModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              CSR Contribution Report
            </DialogTitle>
            <DialogDescription>
              Detailed view of CSR contribution and its impact analysis.
            </DialogDescription>
          </DialogHeader>
          
          {selectedContribution && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedContribution.company}</h3>
                  <p className="text-sm text-muted-foreground">{selectedContribution.id} • {selectedContribution.purpose}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Contribution Amount</Label>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(selectedContribution.amount)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedContribution.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Purpose</Label>
                    <p className="text-sm">{selectedContribution.purpose}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm">{selectedContribution.district}, {selectedContribution.state}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date</Label>
                    <p className="text-sm">{selectedContribution.date}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Impact Metrics</Label>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Children Benefited:</span>
                        <span className="font-medium">~450</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Schools Supported:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Communities Reached:</span>
                        <span className="font-medium">8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Project Timeline</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-background rounded border">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Project Initiated</p>
                      <p className="text-xs text-muted-foreground">January 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-background rounded border">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Funds Disbursed</p>
                      <p className="text-xs text-muted-foreground">February 1, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-background rounded border">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Implementation Phase</p>
                      <p className="text-xs text-muted-foreground">Ongoing</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="report-notes" className="text-sm font-medium">Additional Notes</Label>
                <Textarea 
                  id="report-notes" 
                  placeholder="Add any additional notes or observations..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewReportModalOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Data Modal */}
      <Dialog open={exportDataModalOpen} onOpenChange={setExportDataModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-success" />
              Export CSR Data
            </DialogTitle>
            <DialogDescription>
              Export contribution data in various formats for analysis and reporting.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Format</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-excel" defaultChecked />
                  <Label htmlFor="format-excel" className="text-sm">Excel (.xlsx)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-csv" />
                  <Label htmlFor="format-csv" className="text-sm">CSV (.csv)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-pdf" />
                  <Label htmlFor="format-pdf" className="text-sm">PDF Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-json" />
                  <Label htmlFor="format-json" className="text-sm">JSON Data</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Data Selection</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="data-contributions" defaultChecked />
                  <Label htmlFor="data-contributions" className="text-sm">Contribution Details</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="data-companies" defaultChecked />
                  <Label htmlFor="data-companies" className="text-sm">Company Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="data-impact" defaultChecked />
                  <Label htmlFor="data-impact" className="text-sm">Impact Metrics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="data-analytics" />
                  <Label htmlFor="data-analytics" className="text-sm">Analytics & Trends</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-from" className="text-sm font-medium">Date From</Label>
                <Input id="date-from" type="date" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="date-to" className="text-sm font-medium">Date To</Label>
                <Input id="date-to" type="date" className="mt-1" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="export-notes" className="text-sm font-medium">Export Notes</Label>
              <Textarea 
                id="export-notes" 
                placeholder="Add any notes about the export..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDataModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Contributor Modal */}
      <Dialog open={contactContributorModalOpen} onOpenChange={setContactContributorModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Contact className="w-5 h-5 text-volunteer" />
              Contact Contributor
            </DialogTitle>
            <DialogDescription>
              Get in touch with the contributing company for follow-up or additional information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedContribution && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-volunteer/10 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-volunteer" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedContribution.company}</h3>
                  <p className="text-sm text-muted-foreground">{selectedContribution.id} • {selectedContribution.purpose}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-sm font-medium">Contact Person</Label>
                    <Input id="contact-name" placeholder="Enter contact person name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-sm font-medium">Email Address</Label>
                    <Input id="contact-email" type="email" placeholder="Enter email address" className="mt-1" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-phone" className="text-sm font-medium">Phone Number</Label>
                    <Input id="contact-phone" type="tel" placeholder="Enter phone number" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="contact-role" className="text-sm font-medium">Role/Position</Label>
                    <Input id="contact-role" placeholder="Enter role or position" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="contact-subject" className="text-sm font-medium">Subject</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follow-up">Follow-up on Contribution</SelectItem>
                      <SelectItem value="additional-info">Request Additional Information</SelectItem>
                      <SelectItem value="partnership">Partnership Discussion</SelectItem>
                      <SelectItem value="reporting">Reporting Requirements</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="contact-message" className="text-sm font-medium">Message</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder="Enter your message to the contributor..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contact Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-email" defaultChecked />
                      <Label htmlFor="pref-email" className="text-sm">Email Communication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-phone" />
                      <Label htmlFor="pref-phone" className="text-sm">Phone Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-meeting" />
                      <Label htmlFor="pref-meeting" className="text-sm">Schedule Meeting</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactContributorModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-volunteer hover:bg-volunteer/90">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Report Modal */}
      <Dialog open={generateReportModalOpen} onOpenChange={setGenerateReportModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-child-care" />
              Generate CSR Report
            </DialogTitle>
            <DialogDescription>
              Create comprehensive reports on CSR contributions and their impact.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="report-type" className="text-sm font-medium">Report Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Report</SelectItem>
                    <SelectItem value="detailed">Detailed Analysis</SelectItem>
                    <SelectItem value="impact">Impact Assessment</SelectItem>
                    <SelectItem value="financial">Financial Overview</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="report-period" className="text-sm font-medium">Time Period</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Report Sections</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-overview" defaultChecked />
                  <Label htmlFor="section-overview" className="text-sm">Executive Overview</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-contributions" defaultChecked />
                  <Label htmlFor="section-contributions" className="text-sm">Contribution Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-impact" defaultChecked />
                  <Label htmlFor="section-impact" className="text-sm">Impact Metrics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-trends" defaultChecked />
                  <Label htmlFor="section-trends" className="text-sm">Trends & Patterns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-recommendations" />
                  <Label htmlFor="section-recommendations" className="text-sm">Recommendations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-appendix" />
                  <Label htmlFor="section-appendix" className="text-sm">Appendix & Data</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Visualizations</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="viz-charts" defaultChecked />
                  <Label htmlFor="viz-charts" className="text-sm">Charts & Graphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="viz-tables" defaultChecked />
                  <Label htmlFor="viz-tables" className="text-sm">Data Tables</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="viz-maps" />
                  <Label htmlFor="viz-maps" className="text-sm">Geographic Maps</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="viz-infographics" />
                  <Label htmlFor="viz-infographics" className="text-sm">Infographics</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Report Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Estimated Pages:</span>
                  <span className="font-medium">12-15 pages</span>
                </div>
                <div className="flex justify-between">
                  <span>Generation Time:</span>
                  <span className="font-medium">2-3 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Points:</span>
                  <span className="font-medium">~2,500 records</span>
                </div>
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="font-medium">~3.2 MB</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="report-notes" className="text-sm font-medium">Report Notes</Label>
              <Textarea 
                id="report-notes" 
                placeholder="Add any special instructions or notes for the report..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateReportModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-child-care hover:bg-child-care/90">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}