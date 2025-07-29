import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BarChart3, Download, FileText, Share2, Calendar, Filter } from "lucide-react";

// Sample data
const ageDistribution = [
  { age: "5-7", count: 8234 },
  { age: "8-10", count: 9567 },
  { age: "11-13", count: 4892 },
  { age: "14-16", count: 2154 }
];

const categoryDistribution = [
  { name: "General", value: 12847, color: "hsl(var(--primary))" },
  { name: "SC/ST", value: 7234, color: "hsl(var(--child-care))" },
  { name: "OBC", value: 3456, color: "hsl(var(--volunteer))" },
  { name: "Minority", value: 1310, color: "hsl(var(--success))" }
];

const districtProgress = [
  { district: "Mumbai", verified: 95, kycComplete: 89, idComplete: 78 },
  { district: "Bangalore", verified: 92, kycComplete: 85, idComplete: 82 },
  { district: "Delhi", verified: 88, kycComplete: 91, idComplete: 75 },
  { district: "Chennai", verified: 90, kycComplete: 87, idComplete: 80 },
  { district: "Pune", verified: 94, kycComplete: 83, idComplete: 76 }
];

const monthlyTrends = [
  { month: "Jan", children: 1234, volunteers: 89, schools: 23 },
  { month: "Feb", children: 1567, volunteers: 92, schools: 28 },
  { month: "Mar", children: 1890, volunteers: 105, schools: 31 },
  { month: "Apr", children: 1456, volunteers: 87, schools: 25 },
  { month: "May", children: 1789, volunteers: 98, schools: 29 },
  { month: "Jun", children: 2134, volunteers: 112, schools: 34 }
];

const stateComparison = [
  { state: "Maharashtra", children: 5847, volunteers: 234, districts: 36 },
  { state: "Karnataka", children: 4231, volunteers: 189, districts: 30 },
  { state: "Uttar Pradesh", children: 6124, volunteers: 267, districts: 75 },
  { state: "Gujarat", children: 3456, volunteers: 156, districts: 33 },
  { state: "Bihar", children: 2890, volunteers: 134, districts: 38 }
];

export default function AnalyticsReports() {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [reportType, setReportType] = useState("overview");

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Insights, trends, and exportable reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Dashboard
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview Report</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="comparison">State Comparison</SelectItem>
                <SelectItem value="trends">Trend Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="uttarpradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">24,847</p>
              <p className="text-sm text-muted-foreground">Total Children</p>
              <Badge variant="secondary" className="mt-1">+8.2%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">1,256</p>
              <p className="text-sm text-muted-foreground">Active Volunteers</p>
              <Badge variant="secondary" className="mt-1">+12.5%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">487</p>
              <p className="text-sm text-muted-foreground">Districts</p>
              <Badge variant="secondary" className="mt-1">+4.1%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">73.4%</p>
              <p className="text-sm text-muted-foreground">Verification Rate</p>
              <Badge variant="secondary" className="mt-1">+2.8%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">68.9%</p>
              <p className="text-sm text-muted-foreground">ID Completion</p>
              <Badge variant="secondary" className="mt-1">+5.2%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age-wise Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category-wise Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {categoryDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm">{entry.name}: {entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="children" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="volunteers" stroke="hsl(var(--volunteer))" strokeWidth={2} />
                <Line type="monotone" dataKey="schools" stroke="hsl(var(--success))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">Children Added</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-volunteer" />
                <span className="text-sm">Volunteers Joined</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm">Schools Mapped</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* District Performance */}
        <Card>
          <CardHeader>
            <CardTitle>District-wise Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="verified" fill="hsl(var(--success))" />
                <Bar dataKey="kycComplete" fill="hsl(var(--volunteer))" />
                <Bar dataKey="idComplete" fill="hsl(var(--child-care))" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-volunteer" />
                <span className="text-sm">KYC Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-child-care" />
                <span className="text-sm">ID Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>State-wise Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stateComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="children" fill="hsl(var(--primary))" />
              <Bar dataKey="volunteers" fill="hsl(var(--volunteer))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <FileText className="w-5 h-5" />
              <span>PDF Summary</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Excel Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}