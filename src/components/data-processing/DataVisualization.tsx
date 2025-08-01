import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface DataVisualizationProps {
  data: any[];
}

export function DataVisualization({ data }: DataVisualizationProps) {
  const childrenPerDistrict = [
    { district: "Mumbai", children: 2845, enrolled: 2203 },
    { district: "Delhi", children: 3221, enrolled: 2544 },
    { district: "Bangalore", children: 1987, enrolled: 1678 },
    { district: "Chennai", children: 2156, enrolled: 1834 },
    { district: "Kolkata", children: 2654, enrolled: 1987 },
    { district: "Hyderabad", children: 1843, enrolled: 1523 },
    { district: "Pune", children: 1654, enrolled: 1432 },
    { district: "Ahmedabad", children: 1432, enrolled: 1198 }
  ];

  const idStatus = [
    { name: "Aadhaar Issued", value: 67, color: "#22c55e" },
    { name: "Birth Certificate", value: 18, color: "#3b82f6" },
    { name: "Pending Verification", value: 10, color: "#f59e0b" },
    { name: "No ID", value: 5, color: "#ef4444" }
  ];

  const schoolMapping = [
    { month: "Jan", completed: 45, target: 60 },
    { month: "Feb", completed: 52, target: 60 },
    { month: "Mar", completed: 58, target: 60 },
    { month: "Apr", completed: 61, target: 70 },
    { month: "May", completed: 67, target: 70 },
    { month: "Jun", completed: 73, target: 80 },
    { month: "Jul", completed: 78, target: 80 },
    { month: "Aug", completed: 82, target: 90 }
  ];

  const beforeAfterComparison = [
    { metric: "Missing Values", before: 23, after: 3 },
    { metric: "Outliers", before: 15, after: 2 },
    { metric: "Duplicates", before: 28, after: 0 },
    { metric: "Invalid Ages", before: 12, after: 1 },
    { metric: "Incomplete Records", before: 35, after: 5 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualization Dashboard</CardTitle>
        <CardDescription>
          Visual insights from processed data with before/after cleaning comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demographics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="identification">ID Status</TabsTrigger>
            <TabsTrigger value="schools">School Mapping</TabsTrigger>
            <TabsTrigger value="comparison">Data Quality</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Children per District</h4>
              <div className="flex gap-2">
                <Badge variant="outline">Total: {childrenPerDistrict.reduce((sum, d) => sum + d.children, 0).toLocaleString()}</Badge>
                <Badge variant="outline">Enrolled: {childrenPerDistrict.reduce((sum, d) => sum + d.enrolled, 0).toLocaleString()}</Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={childrenPerDistrict}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="children" fill="hsl(var(--primary))" name="Total Children" />
                <Bar dataKey="enrolled" fill="hsl(var(--secondary))" name="School Enrolled" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="identification" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">ID Document Status Distribution</h4>
              <div className="flex gap-2">
                <Badge variant="outline">Coverage: 95%</Badge>
                <Badge variant="outline">Verification Rate: 87%</Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={idStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {idStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="schools" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">School Mapping Completeness Progress</h4>
              <div className="flex gap-2">
                <Badge variant="outline">Current: 82%</Badge>
                <Badge variant="outline">Target: 90%</Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={schoolMapping}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Completed %" 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--destructive))" 
                  strokeDasharray="5 5"
                  name="Target %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Before vs After Data Cleaning</h4>
              <div className="flex gap-2">
                <Badge variant="destructive">Issues Resolved: 87%</Badge>
                <Badge variant="secondary">Quality Score: 94/100</Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={beforeAfterComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="before" fill="hsl(var(--destructive))" name="Before Cleaning" />
                <Bar dataKey="after" fill="hsl(var(--primary))" name="After Cleaning" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}