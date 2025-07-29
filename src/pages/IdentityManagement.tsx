import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { IdCard, FileText, AlertTriangle, CheckCircle, Clock, Download } from "lucide-react";

// Sample data
const identityStats = [
  { type: "Aadhaar Card", total: 24847, available: 17123, percentage: 68.9 },
  { type: "Ration Card", total: 24847, available: 15234, percentage: 61.3 },
  { type: "Birth Certificate", total: 24847, available: 19567, percentage: 78.7 },
  { type: "School ID", total: 24847, available: 12456, percentage: 50.1 }
];

const identityDistribution = [
  { name: "Complete Documentation", value: 12456, color: "hsl(var(--success))" },
  { name: "Partial Documentation", value: 8934, color: "hsl(var(--secondary))" },
  { name: "Missing Critical IDs", value: 3457, color: "hsl(var(--destructive))" }
];

const regionalIdentityStatus = [
  { region: "Maharashtra", aadhaar: 89, ration: 76, birth: 92, school: 65 },
  { region: "Karnataka", aadhaar: 85, ration: 71, birth: 88, school: 59 },
  { region: "Uttar Pradesh", aadhaar: 71, ration: 68, birth: 79, school: 45 },
  { region: "Gujarat", aadhaar: 92, ration: 84, birth: 95, school: 72 },
  { region: "Bihar", aadhaar: 58, ration: 52, birth: 61, school: 34 }
];

const pendingEnrollments = [
  { id: "CH-001", name: "Ananya Verma", age: 8, district: "Mumbai", missingDocs: ["Aadhaar", "School ID"], priority: "High", enrollmentCenter: "Mumbai Central" },
  { id: "CH-002", name: "Rahul Kumar", age: 10, district: "Bangalore", missingDocs: ["Ration Card"], priority: "Medium", enrollmentCenter: "Bangalore South" },
  { id: "CH-003", name: "Priya Singh", age: 7, district: "Lucknow", missingDocs: ["Birth Certificate", "Aadhaar"], priority: "High", enrollmentCenter: "Lucknow East" },
  { id: "CH-004", name: "Arjun Patel", age: 9, district: "Ahmedabad", missingDocs: ["School ID"], priority: "Low", enrollmentCenter: "Ahmedabad West" }
];

export default function IdentityManagement() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-secondary";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Identity Management</h1>
          <p className="text-muted-foreground">Aadhaar, ID tracking, and enrollment management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Missing IDs
          </Button>
          <Button>
            <IdCard className="w-4 h-4 mr-2" />
            Bulk Enrollment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">12,456</p>
                <p className="text-sm text-muted-foreground">Complete Documentation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">8,934</p>
                <p className="text-sm text-muted-foreground">Partial Documentation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">3,457</p>
                <p className="text-sm text-muted-foreground">Missing Critical IDs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">147</p>
                <p className="text-sm text-muted-foreground">Pending Enrollments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Identity Type Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Identity Document Coverage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {identityStats.map((stat) => (
            <div key={stat.type} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  <span className="font-medium">{stat.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{stat.available.toLocaleString()} / {stat.total.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-2">({stat.percentage}%)</span>
                </div>
              </div>
              <Progress value={stat.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Documentation Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={identityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {identityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {identityDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm">{entry.name}: {entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Identity Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalIdentityStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="aadhaar" fill="hsl(var(--primary))" />
                <Bar dataKey="ration" fill="hsl(var(--child-care))" />
                <Bar dataKey="birth" fill="hsl(var(--volunteer))" />
                <Bar dataKey="school" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">Aadhaar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-child-care" />
                <span className="text-sm">Ration Card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-volunteer" />
                <span className="text-sm">Birth Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm">School ID</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle>Pending ID Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Missing Documents</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Enrollment Center</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.id}</TableCell>
                  <TableCell>{enrollment.name}</TableCell>
                  <TableCell>{enrollment.age}</TableCell>
                  <TableCell>{enrollment.district}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {enrollment.missingDocs.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(enrollment.priority)}>
                      {enrollment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{enrollment.enrollmentCenter}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        Initiate
                      </Button>
                      <Button size="sm" variant="outline">
                        Generate Form
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="w-6 h-6" />
              <span>Alert for Missing Aadhaar</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span>Generate Enrollment Forms</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="w-6 h-6" />
              <span>Export Regional Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="w-6 h-6" />
              <span>Mark as Completed</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}