import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  BarChart3, 
  Download,
  Share,
  Filter,
  Calendar,
  FileText,
  PieChart,
  LineChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line } from 'recharts';
import { PDFService, generateStateWiseReport, generateMonthlyTrendsReport, generateImpactAssessmentReport } from "@/services/pdfService";

// Sample data
const customReportFilters = [
  { id: 'age-group', label: 'Age Group', checked: true },
  { id: 'gender', label: 'Gender Distribution', checked: true },
  { id: 'state', label: 'State-wise Data', checked: false },
  { id: 'verification', label: 'Verification Status', checked: true },
  { id: 'school', label: 'School Enrollment', checked: false },
  { id: 'timeline', label: 'Timeline Analysis', checked: true }
];

const stateReportsData = [
  { state: 'Uttar Pradesh', children: 4200, verified: 3360, enrolled: 3150 },
  { state: 'Maharashtra', children: 3800, verified: 3040, enrolled: 2850 },
  { state: 'Bihar', children: 3200, verified: 2400, enrolled: 2240 },
  { state: 'West Bengal', children: 2800, verified: 2240, enrolled: 2100 },
  { state: 'Rajasthan', children: 2400, verified: 1920, enrolled: 1800 }
];

const trendsData = [
  { month: 'Jan', children: 1200, verified: 960, enrolled: 900 },
  { month: 'Feb', children: 1450, verified: 1160, enrolled: 1088 },
  { month: 'Mar', children: 1600, verified: 1280, enrolled: 1200 },
  { month: 'Apr', children: 1750, verified: 1400, enrolled: 1313 },
  { month: 'May', children: 1900, verified: 1520, enrolled: 1425 },
  { month: 'Jun', children: 2100, verified: 1680, enrolled: 1575 }
];

const insightsData = [
  { category: 'Completed Process', value: 68, fill: 'hsl(var(--success))' },
  { category: 'In Progress', value: 22, fill: 'hsl(var(--secondary))' },
  { category: 'Not Started', value: 10, fill: 'hsl(var(--destructive))' }
];

export default function AnalyticsReports() {
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    toast({
      title: "Generating Report",
      description: "Custom report is being generated based on your filters...",
    });
    
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Your custom report has been generated successfully!",
      });
    }, 2000);
  };

  const handleDownloadPDF = async (type: 'custom' | 'state' | 'trends' | 'impact') => {
    try {
      toast({
        title: "Generating PDF",
        description: "Your detailed PDF report is being prepared...",
      });

      const pdfService = new PDFService();
      let reportData;

      switch (type) {
        case 'state':
          reportData = generateStateWiseReport();
          break;
        case 'trends':
          reportData = generateMonthlyTrendsReport();
          break;
        case 'impact':
          reportData = generateImpactAssessmentReport();
          break;
        default:
          // Custom report based on current filters
          reportData = generateStateWiseReport(); // Default for now
      }

      await pdfService.generateDetailedReport(reportData);
      
      toast({
        title: "PDF Downloaded",
        description: "Your detailed report has been downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportExcel = () => {
    toast({
      title: "Excel Export",
      description: "Excel file is being prepared for download...",
    });
    
    // Simulate Excel download
    setTimeout(() => {
      toast({
        title: "Excel Downloaded",
        description: "Your data has been exported to Excel successfully!",
      });
    }, 1500);
  };

  const handleShareView = () => {
    const shareUrl = `${window.location.origin}/reports/shared/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Share Link Copied",
      description: "The shareable link has been copied to your clipboard!",
    });
  };
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Insights & Trends</p>
        </div>
        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 w-full xs:w-auto">
          <Button 
            variant="outline" 
            className="w-full xs:w-auto"
            onClick={() => handleDownloadPDF('custom')}
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">Download Summary</span>
            <span className="xs:hidden">Download</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full xs:w-auto"
            onClick={handleShareView}
          >
            <Share className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">Share View</span>
            <span className="xs:hidden">Share</span>
          </Button>
        </div>
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Custom Report Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold">Select Filters</h3>
              <div className="space-y-3">
                {customReportFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox id={filter.id} defaultChecked={filter.checked} />
                    <label htmlFor={filter.id} className="text-sm font-medium">
                      {filter.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="font-semibold">Date Range</h3>
              <div className="space-y-3">
                <Select defaultValue="last-6-months">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all-states">
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-states">All States</SelectItem>
                    <SelectItem value="up">Uttar Pradesh</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="br">Bihar</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-districts">
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-districts">All Districts</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <Button 
                  className="w-full justify-start h-12 sm:h-14" 
                  variant="outline"
                  onClick={handleGenerateReport}
                >
                  <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">Generate Report</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14" 
                  variant="outline"
                  onClick={() => handleDownloadPDF('custom')}
                >
                  <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">Download as PDF</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14" 
                  variant="outline"
                  onClick={handleExportExcel}
                >
                  <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">Export to Excel</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14" 
                  variant="outline"
                  onClick={handleShareView}
                >
                  <Share className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">Share View Link</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State-wise Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              State-wise Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent data-chart-title="State-wise Performance Analysis">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateReportsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="children" fill="hsl(var(--primary))" name="Total Children" />
                <Bar dataKey="verified" fill="hsl(var(--success))" name="Verified" />
                <Bar dataKey="enrolled" fill="hsl(var(--volunteer))" name="School Enrolled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Process Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Process Completion Status
            </CardTitle>
          </CardHeader>
          <CardContent data-chart-title="Process Completion Status">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={insightsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {insightsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {insightsData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.category}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            Monthly Activity Trends
          </CardTitle>
        </CardHeader>
        <CardContent data-chart-title="Monthly Activity Trends">
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="children" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Children Added"
              />
              <Line 
                type="monotone" 
                dataKey="verified" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Verified"
              />
              <Line 
                type="monotone" 
                dataKey="enrolled" 
                stroke="hsl(var(--volunteer))" 
                strokeWidth={2}
                name="School Enrolled"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-success">78%</h3>
              <p className="text-sm text-muted-foreground">Verification Rate</p>
              <Badge variant="outline" className="mt-2">↑ 8.2% from last month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-volunteer">73%</h3>
              <p className="text-sm text-muted-foreground">School Enrollment</p>
              <Badge variant="outline" className="mt-2">↑ 5.1% from last month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">487</h3>
              <p className="text-sm text-muted-foreground">Districts Active</p>
              <Badge variant="outline" className="mt-2">↑ 12 new districts</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-child-care">92%</h3>
              <p className="text-sm text-muted-foreground">ID Completion</p>
              <Badge variant="outline" className="mt-2">↑ 3.7% from last month</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exportable Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Exportable Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">State-wise Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive analysis of all states with verification and enrollment data
              </p>
              <div className="flex flex-col xs:flex-row gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full xs:w-auto"
                  onClick={() => handleDownloadPDF('state')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="truncate">PDF</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full xs:w-auto"
                  onClick={handleExportExcel}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="truncate">Excel</span>
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Monthly Trends</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Time-based analysis showing growth patterns and seasonal trends
              </p>
              <div className="flex flex-col xs:flex-row gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full xs:w-auto"
                  onClick={() => handleDownloadPDF('trends')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="truncate">PDF</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full xs:w-auto"
                  onClick={handleExportExcel}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="truncate">Excel</span>
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Impact Assessment</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Detailed impact analysis with CSR contribution correlation
              </p>
              <div className="flex flex-col xs:flex-row gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full xs:w-auto"
                  onClick={() => handleDownloadPDF('impact')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="truncate">PDF</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full xs:w-auto"
                  onClick={handleExportExcel}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="truncate">Excel</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}