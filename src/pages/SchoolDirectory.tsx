import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  School, 
  MapPin, 
  Users, 
  Search,
  UserPlus,
  Edit,
  Eye,
  PieChart
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const schools = [
  { 
    id: 'SCH-001', 
    name: 'Government Primary School, Bandra', 
    type: 'Primary', 
    state: 'Maharashtra', 
    district: 'Mumbai',
    pincode: '400050',
    capacity: 500,
    enrolled: 380,
    available: 120,
    childrenAssigned: 45
  },
  { 
    id: 'SCH-002', 
    name: 'Rajkiya Prathmik Vidyalaya', 
    type: 'Primary', 
    state: 'Uttar Pradesh', 
    district: 'Lucknow',
    pincode: '226001',
    capacity: 300,
    enrolled: 280,
    available: 20,
    childrenAssigned: 12
  },
  { 
    id: 'SCH-003', 
    name: 'Government High School, Patna', 
    type: 'Secondary', 
    state: 'Bihar', 
    district: 'Patna',
    pincode: '800001',
    capacity: 800,
    enrolled: 650,
    available: 150,
    childrenAssigned: 78
  }
];

const matchingData = [
  { name: 'Matched to Schools', value: 73, fill: 'hsl(var(--success))' },
  { name: 'Unmatched', value: 27, fill: 'hsl(var(--destructive))' }
];

export default function SchoolDirectory() {
  const getCapacityBadge = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) {
      return <Badge variant="destructive">Nearly Full</Badge>;
    } else if (percentage >= 70) {
      return <Badge variant="secondary">Moderate</Badge>;
    } else {
      return <Badge variant="default" className="bg-success text-success-foreground">Available</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">School Directory</h1>
          <p className="text-muted-foreground">Government Schools & Matching</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <School className="w-4 h-4 mr-2" />
            Add School
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-volunteer/10 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-volunteer" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-muted-foreground">Total Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">18,234</p>
                <p className="text-sm text-muted-foreground">Children Matched</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">6,613</p>
                <p className="text-sm text-muted-foreground">Unmatched Children</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">487</p>
                <p className="text-sm text-muted-foreground">Districts Covered</p>
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
                <Input placeholder="Search schools..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="up">Uttar Pradesh</SelectItem>
                  <SelectItem value="bihar">Bihar</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="School Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="higher">Higher Secondary</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  <SelectItem value="available">Available Seats</SelectItem>
                  <SelectItem value="full">Nearly Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schools Table */}
      <Card>
        <CardHeader>
          <CardTitle>School Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School ID</TableHead>
                  <TableHead>School Name</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">District</TableHead>
                  <TableHead className="hidden sm:table-cell">Capacity</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="hidden lg:table-cell">Children Assigned</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{school.name}</p>
                        <p className="text-sm text-muted-foreground">{school.pincode}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{school.type}</TableCell>
                    <TableCell className="hidden lg:table-cell">{school.district}</TableCell>
                    <TableCell className="hidden sm:table-cell">{school.capacity}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getCapacityBadge(school.enrolled, school.capacity)}
                        <p className="text-xs text-muted-foreground">{school.available} seats</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{school.childrenAssigned}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
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

      {/* Charts and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matching Ratio Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Children to Schools Matching Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={matchingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {matchingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {matchingData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Assign Child to School
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Update School Data
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <School className="w-4 h-4 mr-2" />
                Bulk School Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Find Nearby Schools
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View School Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}