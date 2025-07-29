import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { School, MapPin, Users, Search, UserPlus } from "lucide-react";
import { useState } from "react";

// Sample data
const schools = [
  { id: "SCH-001", name: "Government Primary School Andheri", district: "Mumbai", state: "Maharashtra", capacity: 500, enrolled: 387, availableSeats: 113, pincode: "400058" },
  { id: "SCH-002", name: "Sarvodaya Vidyalaya", district: "Bangalore", state: "Karnataka", capacity: 400, enrolled: 356, availableSeats: 44, pincode: "560001" },
  { id: "SCH-003", name: "Kendriya Vidyalaya", district: "Lucknow", state: "Uttar Pradesh", capacity: 600, enrolled: 542, availableSeats: 58, pincode: "226001" },
  { id: "SCH-004", name: "Government High School", district: "Ahmedabad", state: "Gujarat", capacity: 450, enrolled: 398, availableSeats: 52, pincode: "380001" },
  { id: "SCH-005", name: "Municipal School", district: "Pune", state: "Maharashtra", capacity: 350, enrolled: 289, availableSeats: 61, pincode: "411001" }
];

const matchingData = [
  { name: "Matched to Schools", value: 15678, color: "hsl(var(--success))" },
  { name: "Awaiting Assignment", value: 6234, color: "hsl(var(--secondary))" },
  { name: "No Nearby School", value: 2935, color: "hsl(var(--destructive))" }
];

const districtSchools = [
  { district: "Mumbai", schools: 87, capacity: 43500, enrolled: 38920 },
  { district: "Bangalore", schools: 64, capacity: 32000, enrolled: 29340 },
  { district: "Delhi", schools: 92, capacity: 46000, enrolled: 42180 },
  { district: "Chennai", schools: 58, capacity: 29000, enrolled: 26450 },
  { district: "Pune", schools: 45, capacity: 22500, enrolled: 19890 }
];

const pendingAssignments = [
  { id: "CH-001", name: "Ananya Verma", age: 8, district: "Mumbai", nearbySchools: 3, preferredSchool: "Government Primary School Andheri" },
  { id: "CH-002", name: "Rahul Kumar", age: 10, district: "Bangalore", nearbySchools: 2, preferredSchool: "Sarvodaya Vidyalaya" },
  { id: "CH-003", name: "Priya Singh", age: 7, district: "Lucknow", nearbySchools: 4, preferredSchool: "Kendriya Vidyalaya" },
  { id: "CH-004", name: "Arjun Patel", age: 9, district: "Ahmedabad", nearbySchools: 1, preferredSchool: "Government High School" }
];

export default function SchoolDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === "all" || school.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 75) return "text-secondary";
    return "text-success";
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">School Directory</h1>
          <p className="text-muted-foreground">Government schools mapping and child assignment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            View Map
          </Button>
          <Button>
            <School className="w-4 h-4 mr-2" />
            Add School
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">2,347</p>
                <p className="text-sm text-muted-foreground">Total Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">15,678</p>
                <p className="text-sm text-muted-foreground">Children Matched</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold">6,234</p>
                <p className="text-sm text-muted-foreground">Pending Assignment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-child-care" />
              <div>
                <p className="text-2xl font-bold">487</p>
                <p className="text-sm text-muted-foreground">Districts Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>School Assignment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={matchingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {matchingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {matchingData.map((entry, index) => (
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
            <CardTitle>District-wise School Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtSchools}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="hsl(var(--primary))" />
                <Bar dataKey="enrolled" fill="hsl(var(--child-care))" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">Total Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-child-care" />
                <span className="text-sm">Currently Enrolled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* School Directory */}
      <Card>
        <CardHeader>
          <CardTitle>School Directory</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Lucknow">Lucknow</SelectItem>
                <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School ID</TableHead>
                <TableHead>School Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Available Seats</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell className="font-medium">{school.id}</TableCell>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.district}, {school.state}</TableCell>
                  <TableCell>{school.capacity}</TableCell>
                  <TableCell className={getCapacityColor(school.enrolled, school.capacity)}>
                    {school.enrolled}
                  </TableCell>
                  <TableCell>
                    <Badge variant={school.availableSeats > 50 ? "default" : school.availableSeats > 0 ? "secondary" : "destructive"}>
                      {school.availableSeats} seats
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="default" disabled={school.availableSeats === 0}>
                        Assign
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Pending School Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Nearby Schools</TableHead>
                <TableHead>Preferred School</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.id}</TableCell>
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell>{assignment.age}</TableCell>
                  <TableCell>{assignment.district}</TableCell>
                  <TableCell>{assignment.nearbySchools} schools</TableCell>
                  <TableCell className="text-sm">{assignment.preferredSchool}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        Assign
                      </Button>
                      <Button size="sm" variant="outline">
                        View Options
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