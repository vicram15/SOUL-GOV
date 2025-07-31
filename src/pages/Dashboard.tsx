import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  Baby, 
  MapPin, 
  TrendingUp, 
  Heart,
  IdCard,
  School,
  AlertTriangle,
  Download,
  Filter,
  FileText,
  Save,
  Calendar,
  BarChart3,
  Eye,
  Globe,
  Search
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jsPDF from 'jspdf';

// Sample data for charts
const stateData = [
  { name: 'Uttar Pradesh', children: 4200 },
  { name: 'Maharashtra', children: 3800 },
  { name: 'Bihar', children: 3200 },
  { name: 'West Bengal', children: 2800 },
  { name: 'Rajasthan', children: 2400 },
  { name: 'Others', children: 8400 }
];

const genderData = [
  { name: 'Male', value: 52, fill: 'hsl(var(--primary))' },
  { name: 'Female', value: 48, fill: 'hsl(var(--child-care))' }
];

const verificationData = [
  { name: 'Verified', value: 78, fill: 'hsl(var(--success))' },
  { name: 'Pending', value: 15, fill: 'hsl(var(--secondary))' },
  { name: 'Incomplete', value: 7, fill: 'hsl(var(--destructive))' }
];

const monthlyGrowthData = [
  { month: 'Jan', children: 1200 },
  { month: 'Feb', children: 1450 },
  { month: 'Mar', children: 1600 },
  { month: 'Apr', children: 1750 },
  { month: 'May', children: 1900 },
  { month: 'Jun', children: 2100 }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [viewReportsModalOpen, setViewReportsModalOpen] = useState(false);
  const [filterRegionModalOpen, setFilterRegionModalOpen] = useState(false);
  const [downloadSummaryModalOpen, setDownloadSummaryModalOpen] = useState(false);
  const [regionalMapModalOpen, setRegionalMapModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleViewReports = () => {
    navigate('/reports');
  };

  const handleViewReportsModal = () => {
    setViewReportsModalOpen(true);
  };

  const handleFilterRegion = () => {
    setFilterRegionModalOpen(true);
  };

  const handleDownloadSummary = () => {
    setDownloadSummaryModalOpen(true);
  };

  const handleRegionalMap = () => {
    setRegionalMapModalOpen(true);
  };

  const generateAndDownloadPDF = () => {
    try {
      setIsGeneratingPDF(true);
      
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Child Impact Hub - Dashboard Summary', 20, 30);
      
      // Add subtitle
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
      doc.text('Comprehensive platform for child welfare management across India', 20, 50);
      
      // Add key statistics
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Statistics', 20, 70);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Children Onboarded: 24,847', 20, 85);
      doc.text('Verified Children: 19,381', 20, 95);
      doc.text('School Assigned: 18,234', 20, 105);
      doc.text('ID Obtained: 21,456', 20, 115);
      
      // Add regional breakdown
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Regional Breakdown', 20, 140);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('North India: 8,234 children', 20, 155);
      doc.text('South India: 6,847 children', 20, 165);
      doc.text('East India: 5,234 children', 20, 175);
      doc.text('West India: 4,532 children', 20, 185);
      
      // Add verification status
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Verification Status', 20, 210);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Verified: 78%', 20, 225);
      doc.text('Pending: 15%', 20, 235);
      doc.text('Incomplete: 7%', 20, 245);
      
      // Add priority alerts
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Priority Alerts', 20, 270);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('• ID Verification Pending: 147 children missing Aadhaar', 20, 285);
      doc.text('• KYC Incomplete: 23 volunteers require verification', 20, 295);
      doc.text('• School Assignment: 89 children need school placement', 20, 305);
      
      // Add footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text('This report was automatically generated by the Child Impact Hub system.', 20, 320);
      
      // Download the PDF
      const fileName = `dashboard-summary-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      console.log('PDF generated and downloaded successfully:', fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
      setDownloadSummaryModalOpen(false);
    }
  };

  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src={heroDashboard} 
            alt="Child Impact Dashboard" 
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50 flex items-center">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground px-4 md:px-6">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4"> SOUL Child Impact Hub</h1>
              <p className="text-sm md:text-xl opacity-90 mb-4 md:mb-6">
                Comprehensive platform for child welfare management across India
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button variant="secondary" size="sm" className="md:size-lg" onClick={handleViewReports}>
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" size="sm" className="md:size-lg bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Regional Map
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
          <div className="flex-1">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="up">Uttar Pradesh</SelectItem>
                <SelectItem value="mh">Maharashtra</SelectItem>
                <SelectItem value="br">Bihar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
                <SelectItem value="east">East</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="flex-shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Download Summary
          </Button>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatsCard
            title="Children Onboarded"
            value="24,847"
            subtitle="Total registered"
            icon={Baby}
            trend={{ value: 8.2, isPositive: true }}
            variant="child-care"
          />
          <StatsCard
            title="Verified Children"
            value="19,381"
            subtitle="ID & documents complete"
            icon={IdCard}
            trend={{ value: 12.5, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="School Assigned"
            value="18,234"
            subtitle="Successfully matched"
            icon={School}
            trend={{ value: 4.1, isPositive: true }}
            variant="volunteer"
          />
          <StatsCard
            title="ID Obtained"
            value="21,456"
            subtitle="Aadhaar & documents"
            icon={Heart}
            trend={{ value: 18.7, isPositive: true }}
            variant="default"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Children by State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Children by State/District
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="children" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gender Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Gender Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IdCard className="w-5 h-5" />
                Verification & ID Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={verificationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {verificationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {verificationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span>{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Monthly Growth in Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="children" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                  onClick={handleViewReportsModal}
                  aria-label="View reports"
                >
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-primary" />
                  <span className="text-xs sm:text-sm text-center">View Reports</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                  onClick={handleFilterRegion}
                  aria-label="Filter by region"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-success" />
                  <span className="text-xs sm:text-sm text-center">Filter by Region</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                  onClick={handleDownloadSummary}
                  aria-label="Download summary"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-volunteer" />
                  <span className="text-xs sm:text-sm text-center">Download Summary</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                  onClick={handleRegionalMap}
                  aria-label="Regional map"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 text-child-care" />
                  <span className="text-xs sm:text-sm text-center">Regional Map</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Priority Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg border border-secondary/20 bg-secondary-soft">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">ID Verification Pending</p>
                    <p className="text-xs text-muted-foreground">147 children missing Aadhaar</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border border-volunteer/20 bg-success-soft">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-volunteer rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">KYC Incomplete</p>
                    <p className="text-xs text-muted-foreground">23 volunteers require verification</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm">School Assignment</p>
                    <p className="text-xs text-muted-foreground">89 children need school placement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Reports Modal */}
      <Dialog open={viewReportsModalOpen} onOpenChange={setViewReportsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Dashboard Reports Overview
            </DialogTitle>
            <DialogDescription>
              Access comprehensive reports and analytics for child welfare management.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Baby className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Children Overview</h3>
                    <p className="text-sm text-muted-foreground">24,847 total registered</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Verified:</span>
                    <span className="font-medium text-success">19,381</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-medium text-secondary">3,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incomplete:</span>
                    <span className="font-medium text-destructive">2,221</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <School className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Education Status</h3>
                    <p className="text-sm text-muted-foreground">School assignments</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Assigned:</span>
                    <span className="font-medium text-success">18,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-medium text-secondary">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress:</span>
                    <span className="font-medium text-volunteer">6,524</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Available Reports</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="report-overview" defaultChecked />
                  <Label htmlFor="report-overview" className="text-sm">Executive Overview Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="report-regional" defaultChecked />
                  <Label htmlFor="report-regional" className="text-sm">Regional Performance Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="report-verification" />
                  <Label htmlFor="report-verification" className="text-sm">ID Verification Status</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="report-education" />
                  <Label htmlFor="report-education" className="text-sm">Education Progress Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="report-trends" />
                  <Label htmlFor="report-trends" className="text-sm">Growth Trends Analysis</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="report-period" className="text-sm font-medium">Report Period</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="report-format" className="text-sm font-medium">Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="report-notes" className="text-sm font-medium">Additional Notes</Label>
              <Textarea 
                id="report-notes" 
                placeholder="Add any specific requirements or notes for the reports..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewReportsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => navigate('/reports')}>
              <Eye className="w-4 h-4 mr-2" />
              View Full Reports
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter by Region Modal */}
      <Dialog open={filterRegionModalOpen} onOpenChange={setFilterRegionModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-success" />
              Filter Dashboard by Region
            </DialogTitle>
            <DialogDescription>
              Customize your dashboard view by selecting specific regions and criteria.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Regions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="region-north" defaultChecked />
                  <Label htmlFor="region-north" className="text-sm">North India</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="region-south" defaultChecked />
                  <Label htmlFor="region-south" className="text-sm">South India</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="region-east" defaultChecked />
                  <Label htmlFor="region-east" className="text-sm">East India</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="region-west" defaultChecked />
                  <Label htmlFor="region-west" className="text-sm">West India</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="region-central" />
                  <Label htmlFor="region-central" className="text-sm">Central India</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="filter-state" className="text-sm font-medium">Specific State</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up">Uttar Pradesh</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="br">Bihar</SelectItem>
                    <SelectItem value="wb">West Bengal</SelectItem>
                    <SelectItem value="ka">Karnataka</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-status" className="text-sm font-medium">Status Filter</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                    <SelectItem value="incomplete">Incomplete Only</SelectItem>
                    <SelectItem value="all">All Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Data Categories</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-children" defaultChecked />
                  <Label htmlFor="cat-children" className="text-sm">Children Data</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-schools" defaultChecked />
                  <Label htmlFor="cat-schools" className="text-sm">School Assignments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-volunteers" />
                  <Label htmlFor="cat-volunteers" className="text-sm">Volunteer Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-contributions" />
                  <Label htmlFor="cat-contributions" className="text-sm">CSR Contributions</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Filter Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Regions Selected:</span>
                  <span className="font-medium">4 regions</span>
                </div>
                <div className="flex justify-between">
                  <span>Children Count:</span>
                  <span className="font-medium">~18,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Points:</span>
                  <span className="font-medium">~45,000</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterRegionModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Summary Modal */}
      <Dialog open={downloadSummaryModalOpen} onOpenChange={setDownloadSummaryModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-volunteer" />
              Download Dashboard Summary
            </DialogTitle>
            <DialogDescription>
              Export dashboard data and analytics in various formats.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Format</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-pdf" defaultChecked />
                  <Label htmlFor="format-pdf" className="text-sm">PDF Summary Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-excel" />
                  <Label htmlFor="format-excel" className="text-sm">Excel Data Sheet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-csv" />
                  <Label htmlFor="format-csv" className="text-sm">CSV Raw Data</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="format-json" />
                  <Label htmlFor="format-json" className="text-sm">JSON API Data</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Include Sections</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-stats" defaultChecked />
                  <Label htmlFor="section-stats" className="text-sm">Key Statistics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-charts" defaultChecked />
                  <Label htmlFor="section-charts" className="text-sm">Charts & Graphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-alerts" />
                  <Label htmlFor="section-alerts" className="text-sm">Priority Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="section-trends" />
                  <Label htmlFor="section-trends" className="text-sm">Trend Analysis</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="summary-period" className="text-sm font-medium">Time Period</Label>
                <Select defaultValue="current">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="summary-level" className="text-sm font-medium">Detail Level</Label>
                <Select defaultValue="summary">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Only</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="summary-notes" className="text-sm font-medium">Export Notes</Label>
              <Textarea 
                id="summary-notes" 
                placeholder="Add any notes about the export..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDownloadSummaryModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-volunteer hover:bg-volunteer/90"
              onClick={generateAndDownloadPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Summary
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regional Map Modal */}
      <Dialog open={regionalMapModalOpen} onOpenChange={setRegionalMapModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-child-care" />
              Regional Impact Map
            </DialogTitle>
            <DialogDescription>
              Interactive map showing child welfare impact across different regions of India.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium text-sm">North India</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Children:</span>
                    <span className="font-medium">8,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schools:</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-medium">78%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="font-medium text-sm">South India</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Children:</span>
                    <span className="font-medium">6,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schools:</span>
                    <span className="font-medium">134</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-medium">85%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-volunteer/5 rounded-lg border border-volunteer/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-volunteer rounded-full"></div>
                  <span className="font-medium text-sm">East India</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Children:</span>
                    <span className="font-medium">5,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schools:</span>
                    <span className="font-medium">98</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-medium">72%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Interactive Map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on regions to view detailed statistics and impact metrics
                </p>
                <div className="flex gap-2 justify-center">
                  <Button size="sm" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Zoom In
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Map Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-heatmap" defaultChecked />
                  <Label htmlFor="feature-heatmap" className="text-sm">Population Heatmap</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-schools" defaultChecked />
                  <Label htmlFor="feature-schools" className="text-sm">School Locations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-boundaries" />
                  <Label htmlFor="feature-boundaries" className="text-sm">District Boundaries</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feature-trends" />
                  <Label htmlFor="feature-trends" className="text-sm">Growth Trends</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="map-view" className="text-sm font-medium">Map View</Label>
                <Select defaultValue="satellite">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satellite">Satellite</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="street">Street</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="map-zoom" className="text-sm font-medium">Zoom Level</Label>
                <Select defaultValue="state">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="district">District</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegionalMapModalOpen(false)}>
              Close
            </Button>
            <Button className="bg-child-care hover:bg-child-care/90">
              <MapPin className="w-4 h-4 mr-2" />
              Open Full Map
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}