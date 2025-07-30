import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Baby, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Edit,
  Eye,
  School,
  MapPin,
  PieChart
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const children = [
  { 
    id: 'CH-001', 
    name: 'Priya Sharma', 
    age: 8, 
    gender: 'Female', 
    state: 'Uttar Pradesh', 
    district: 'Lucknow',
    schoolStatus: 'enrolled',
    idStatus: 'verified',
    addedBy: 'V-001'
  },
  { 
    id: 'CH-002', 
    name: 'Rahul Kumar', 
    age: 10, 
    gender: 'Male', 
    state: 'Maharashtra', 
    district: 'Mumbai',
    schoolStatus: 'pending',
    idStatus: 'pending',
    addedBy: 'V-002'
  },
  { 
    id: 'CH-003', 
    name: 'Anjali Singh', 
    age: 7, 
    gender: 'Female', 
    state: 'Bihar', 
    district: 'Patna',
    schoolStatus: 'enrolled',
    idStatus: 'verified',
    addedBy: 'V-003'
  }
];

const regionalData = [
  { name: 'North', value: 35, fill: 'hsl(var(--primary))' },
  { name: 'South', value: 28, fill: 'hsl(var(--child-care))' },
  { name: 'East', value: 20, fill: 'hsl(var(--volunteer))' },
  { name: 'West', value: 17, fill: 'hsl(var(--success))' }
];

const verificationStatusData = [
  { name: 'Verified', value: 72, fill: 'hsl(var(--success))' },
  { name: 'Pending', value: 20, fill: 'hsl(var(--secondary))' },
  { name: 'Incomplete', value: 8, fill: 'hsl(var(--destructive))' }
];

export default function ChildData() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
      case 'enrolled':
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'incomplete':
        return <Badge variant="destructive">Incomplete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Child Data Management</h1>
          <p className="text-muted-foreground">Profiles & Regional Listings</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Baby className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-child-care/10 rounded-lg flex items-center justify-center">
                <Baby className="w-6 h-6 text-child-care" />
              </div>
              <div>
                <p className="text-2xl font-bold">24,847</p>
                <p className="text-sm text-muted-foreground">Total Children</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">19,381</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-volunteer/10 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-volunteer" />
              </div>
              <div>
                <p className="text-2xl font-bold">18,234</p>
                <p className="text-sm text-muted-foreground">School Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">5,466</p>
                <p className="text-sm text-muted-foreground">Pending Assignment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search children..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="up">Uttar Pradesh</SelectItem>
                <SelectItem value="mh">Maharashtra</SelectItem>
                <SelectItem value="br">Bihar</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-15">11-15 years</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="ID Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Table/Card View */}
      <Tabs defaultValue="table" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Children Listing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Child ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Age</TableHead>
                      <TableHead className="hidden md:table-cell">Gender</TableHead>
                      <TableHead className="hidden lg:table-cell">District</TableHead>
                      <TableHead>School Status</TableHead>
                      <TableHead>ID Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {children.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell className="font-medium">{child.id}</TableCell>
                        <TableCell>{child.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{child.age}</TableCell>
                        <TableCell className="hidden md:table-cell">{child.gender}</TableCell>
                        <TableCell className="hidden lg:table-cell">{child.district}</TableCell>
                        <TableCell>{getStatusBadge(child.schoolStatus)}</TableCell>
                        <TableCell>{getStatusBadge(child.idStatus)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <School className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child) => (
              <Card key={child.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">{child.id}</p>
                    </div>
                    <Badge variant="outline">{child.age} years</Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Gender:</span>
                      <span>{child.gender}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Location:</span>
                      <span>{child.district}, {child.state}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>School:</span>
                      {getStatusBadge(child.schoolStatus)}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ID Status:</span>
                      {getStatusBadge(child.idStatus)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Regional Child Count Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Child Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={verificationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {verificationStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
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
              <span className="text-sm">Verify Entry</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Edit className="w-5 h-5" />
              <span className="text-sm">Edit Details</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Eye className="w-5 h-5" />
              <span className="text-sm">View Timeline</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <School className="w-5 h-5" />
              <span className="text-sm">Assign School</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}