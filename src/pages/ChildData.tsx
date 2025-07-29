import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Baby, MapPin, Search, Filter, Grid, List, School, CheckCircle } from "lucide-react";

// Sample data
const children = [
  { id: "CH-001", name: "Ananya Verma", age: 8, gender: "Female", state: "Maharashtra", district: "Mumbai", schooled: true, idAvailable: true, addedBy: "V-001" },
  { id: "CH-002", name: "Rahul Kumar", age: 10, gender: "Male", state: "Karnataka", district: "Bangalore", schooled: false, idAvailable: false, addedBy: "V-002" },
  { id: "CH-003", name: "Priya Singh", age: 7, gender: "Female", state: "Uttar Pradesh", district: "Lucknow", schooled: true, idAvailable: true, addedBy: "V-003" },
  { id: "CH-004", name: "Arjun Patel", age: 9, gender: "Male", state: "Gujarat", district: "Ahmedabad", schooled: false, idAvailable: true, addedBy: "V-005" },
  { id: "CH-005", name: "Kavya Sharma", age: 6, gender: "Female", state: "Maharashtra", district: "Pune", schooled: true, idAvailable: false, addedBy: "V-001" }
];

const regionalData = [
  { region: "Maharashtra", count: 5847 },
  { region: "Karnataka", count: 4231 },
  { region: "Uttar Pradesh", count: 6124 },
  { region: "Gujarat", count: 3456 },
  { region: "Bihar", count: 2890 }
];

const verificationData = [
  { name: "Verified", value: 18234, color: "hsl(var(--success))" },
  { name: "Pending", value: 4892, color: "hsl(var(--secondary))" },
  { name: "Rejected", value: 1721, color: "hsl(var(--destructive))" }
];

export default function ChildData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === "all" || child.state === stateFilter;
    const matchesGender = genderFilter === "all" || child.gender.toLowerCase() === genderFilter;
    return matchesSearch && matchesState && matchesGender;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Child Data Management</h1>
          <p className="text-muted-foreground">Profiles, regional listings, and verification tracking</p>
        </div>
        <Button>
          <Baby className="w-4 h-4 mr-2" />
          Register Child
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Baby className="w-5 h-5 text-child-care" />
              <div>
                <p className="text-2xl font-bold">24,847</p>
                <p className="text-sm text-muted-foreground">Total Children</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">18,234</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">15,678</p>
                <p className="text-sm text-muted-foreground">In School</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-volunteer" />
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
            <CardTitle>Regional Child Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--child-care))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {verificationData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm">{entry.name}: {entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Child Directory</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search children..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
              </SelectContent>
            </Select>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "table" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Child ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>School Status</TableHead>
                  <TableHead>ID Available</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell className="font-medium">{child.id}</TableCell>
                    <TableCell>{child.name}</TableCell>
                    <TableCell>{child.age}</TableCell>
                    <TableCell>{child.gender}</TableCell>
                    <TableCell>{child.district}, {child.state}</TableCell>
                    <TableCell>
                      <Badge variant={child.schooled ? "default" : "secondary"}>
                        {child.schooled ? "Enrolled" : "Not Enrolled"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={child.idAvailable ? "default" : "destructive"}>
                        {child.idAvailable ? "Available" : "Missing"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="default">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChildren.map((child) => (
                <Card key={child.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{child.name}</h4>
                        <span className="text-sm text-muted-foreground">{child.id}</span>
                      </div>
                      <p className="text-sm">Age: {child.age} • {child.gender}</p>
                      <p className="text-sm text-muted-foreground">{child.district}, {child.state}</p>
                      <div className="flex gap-2">
                        <Badge variant={child.schooled ? "default" : "secondary"} className="text-xs">
                          {child.schooled ? "Enrolled" : "Not Enrolled"}
                        </Badge>
                        <Badge variant={child.idAvailable ? "default" : "destructive"} className="text-xs">
                          {child.idAvailable ? "ID Available" : "ID Missing"}
                        </Badge>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">View</Button>
                        <Button size="sm" variant="default" className="flex-1">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}