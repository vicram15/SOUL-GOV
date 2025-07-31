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
  School, 
  MapPin, 
  Users, 
  Search,
  UserPlus,
  Edit,
  Eye,
  PieChart,
  Calendar,
  FileText,
  Save,
  Download,
  Filter,
  Clock,
  AlertCircle
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";

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
  const [assignChildModalOpen, setAssignChildModalOpen] = useState(false);
  const [updateSchoolModalOpen, setUpdateSchoolModalOpen] = useState(false);
  const [bulkAssignmentModalOpen, setBulkAssignmentModalOpen] = useState(false);
  const [nearbySchoolsModalOpen, setNearbySchoolsModalOpen] = useState(false);
  const [schoolDetailsModalOpen, setSchoolDetailsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);

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

  const handleAssignChild = () => {
    setSelectedSchool(schools[0]); // For demo, using first school
    setAssignChildModalOpen(true);
  };

  const handleUpdateSchool = () => {
    setSelectedSchool(schools[0]); // For demo, using first school
    setUpdateSchoolModalOpen(true);
  };

  const handleBulkAssignment = () => {
    setBulkAssignmentModalOpen(true);
  };

  const handleNearbySchools = () => {
    setNearbySchoolsModalOpen(true);
  };

  const handleSchoolDetails = () => {
    setSelectedSchool(schools[0]); // For demo, using first school
    setSchoolDetailsModalOpen(true);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleAssignChild}
                aria-label="Assign child to school"
              >
                <UserPlus className="w-4 h-4 mr-2 flex-shrink-0 text-success" />
                <span className="truncate text-sm sm:text-base">Assign Child to School</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleUpdateSchool}
                aria-label="Update school data"
              >
                <Edit className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                <span className="truncate text-sm sm:text-base">Update School Data</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleBulkAssignment}
                aria-label="Bulk school assignment"
              >
                <School className="w-4 h-4 mr-2 flex-shrink-0 text-volunteer" />
                <span className="truncate text-sm sm:text-base">Bulk School Assignment</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleNearbySchools}
                aria-label="Find nearby schools"
              >
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-child-care" />
                <span className="truncate text-sm sm:text-base">Find Nearby Schools</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleSchoolDetails}
                aria-label="View school details"
              >
                <Eye className="w-4 h-4 mr-2 flex-shrink-0 text-secondary" />
                <span className="truncate text-sm sm:text-base">View School Details</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assign Child to School Modal */}
      <Dialog open={assignChildModalOpen} onOpenChange={setAssignChildModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-success" />
              Assign Child to School
            </DialogTitle>
            <DialogDescription>
              Select a child and assign them to the selected school with enrollment details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSchool && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <School className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedSchool.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSchool.district}, {selectedSchool.state}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="child" className="text-sm font-medium">Select Child</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a child to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child-1">Priya Sharma (CH-001) - Age 8</SelectItem>
                      <SelectItem value="child-2">Rahul Kumar (CH-002) - Age 10</SelectItem>
                      <SelectItem value="child-3">Anjali Singh (CH-003) - Age 7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="grade" className="text-sm font-medium">Grade/Class</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Class 1</SelectItem>
                      <SelectItem value="2">Class 2</SelectItem>
                      <SelectItem value="3">Class 3</SelectItem>
                      <SelectItem value="4">Class 4</SelectItem>
                      <SelectItem value="5">Class 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="enrollment-date" className="text-sm font-medium">Enrollment Date</Label>
                  <Input id="enrollment-date" type="date" className="mt-1" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Assignment Requirements</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="uniform" />
                      <Label htmlFor="uniform" className="text-sm">School Uniform Provided</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="books" />
                      <Label htmlFor="books" className="text-sm">Textbooks Supplied</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transport" />
                      <Label htmlFor="transport" className="text-sm">Transport Arranged</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Assignment Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any special requirements or notes for this assignment..."
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignChildModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Complete Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update School Data Modal */}
      <Dialog open={updateSchoolModalOpen} onOpenChange={setUpdateSchoolModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Update School Data
            </DialogTitle>
            <DialogDescription>
              Update the school's information, capacity, and operational details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSchool && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="school-name" className="text-sm font-medium">School Name</Label>
                  <Input id="school-name" defaultValue={selectedSchool.name} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="school-type" className="text-sm font-medium">School Type</Label>
                  <Select defaultValue={selectedSchool.type.toLowerCase()}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="higher">Higher Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity" className="text-sm font-medium">Total Capacity</Label>
                  <Input id="capacity" type="number" defaultValue={selectedSchool.capacity} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="enrolled" className="text-sm font-medium">Currently Enrolled</Label>
                  <Input id="enrolled" type="number" defaultValue={selectedSchool.enrolled} className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state" className="text-sm font-medium">State</Label>
                  <Select defaultValue={selectedSchool.state.toLowerCase().replace(' ', '-')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district" className="text-sm font-medium">District</Label>
                  <Input id="district" defaultValue={selectedSchool.district} className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="pincode" className="text-sm font-medium">Pincode</Label>
                <Input id="pincode" defaultValue={selectedSchool.pincode} className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Update Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any notes about the updates made..."
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateSchoolModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk School Assignment Modal */}
      <Dialog open={bulkAssignmentModalOpen} onOpenChange={setBulkAssignmentModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-volunteer" />
              Bulk School Assignment
            </DialogTitle>
            <DialogDescription>
              Assign multiple children to schools based on location and availability.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="region" className="text-sm font-medium">Target Region</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lucknow">Lucknow District</SelectItem>
                    <SelectItem value="mumbai">Mumbai District</SelectItem>
                    <SelectItem value="patna">Patna District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="school-type" className="text-sm font-medium">School Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Schools</SelectItem>
                    <SelectItem value="secondary">Secondary Schools</SelectItem>
                    <SelectItem value="all">All Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Assignment Criteria</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="proximity" defaultChecked />
                  <Label htmlFor="proximity" className="text-sm">Prioritize by proximity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="availability" defaultChecked />
                  <Label htmlFor="availability" className="text-sm">Consider seat availability</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-group" />
                  <Label htmlFor="age-group" className="text-sm">Match by age group</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gender-balance" />
                  <Label htmlFor="gender-balance" className="text-sm">Maintain gender balance</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Assignment Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Unassigned Children:</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Schools:</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Matches:</span>
                  <span className="font-medium text-success">142</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Unassigned:</span>
                  <span className="font-medium text-destructive">14</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="bulk-notes" className="text-sm font-medium">Assignment Notes</Label>
              <Textarea 
                id="bulk-notes" 
                placeholder="Add any notes about the bulk assignment process..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkAssignmentModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-volunteer hover:bg-volunteer/90">
              <School className="w-4 h-4 mr-2" />
              Execute Bulk Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Find Nearby Schools Modal */}
      <Dialog open={nearbySchoolsModalOpen} onOpenChange={setNearbySchoolsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-child-care" />
              Find Nearby Schools
            </DialogTitle>
            <DialogDescription>
              Search for schools near a specific location with filtering options.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-sm font-medium">Search Location</Label>
                <Input id="location" placeholder="Enter address, pincode, or coordinates" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="radius" className="text-sm font-medium">Search Radius</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="school-type-filter" className="text-sm font-medium">School Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="higher">Higher Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="availability-filter" className="text-sm font-medium">Availability</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Any availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available Seats</SelectItem>
                    <SelectItem value="moderate">Moderate Capacity</SelectItem>
                    <SelectItem value="full">Nearly Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sort-by" className="text-sm font-medium">Sort By</Label>
                <Select defaultValue="distance">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-3">Nearby Schools Found</h4>
              <div className="space-y-3">
                {[
                  { name: "Government Primary School, Bandra", distance: "0.8 km", available: 45, rating: 4.2 },
                  { name: "St. Mary's Convent School", distance: "1.2 km", available: 12, rating: 4.5 },
                  { name: "Delhi Public School", distance: "2.1 km", available: 78, rating: 4.8 },
                  { name: "Kendriya Vidyalaya", distance: "3.5 km", available: 23, rating: 4.0 }
                ].map((school, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                    <div>
                      <h5 className="font-medium">{school.name}</h5>
                      <p className="text-sm text-muted-foreground">{school.distance} • {school.available} seats available</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{school.rating} ⭐</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNearbySchoolsModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View School Details Modal */}
      <Dialog open={schoolDetailsModalOpen} onOpenChange={setSchoolDetailsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-secondary" />
              School Details
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about the selected school.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSchool && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <School className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedSchool.name}</h3>
                  <p className="text-muted-foreground">{selectedSchool.district}, {selectedSchool.state}</p>
                  <p className="text-sm text-muted-foreground">Pincode: {selectedSchool.pincode}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Capacity Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Capacity:</span>
                      <span className="font-medium">{selectedSchool.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Currently Enrolled:</span>
                      <span className="font-medium">{selectedSchool.enrolled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Seats:</span>
                      <span className="font-medium text-success">{selectedSchool.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilization:</span>
                      <span className="font-medium">{Math.round((selectedSchool.enrolled / selectedSchool.capacity) * 100)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Program Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Children Assigned:</span>
                      <span className="font-medium">{selectedSchool.childrenAssigned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Assignment:</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium text-success">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>School Rating:</span>
                      <span className="font-medium">4.2 ⭐</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Recent Activities</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserPlus className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">3 children assigned</p>
                      <p className="text-xs text-muted-foreground">March 18, 2024 - 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Edit className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Capacity updated</p>
                      <p className="text-xs text-muted-foreground">March 15, 2024 - 2:15 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-volunteer/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-volunteer" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Annual inspection completed</p>
                      <p className="text-xs text-muted-foreground">March 10, 2024 - 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Principal:</span> Mrs. Sunita Sharma</p>
                  <p><span className="font-medium">Phone:</span> +91 98765 43210</p>
                  <p><span className="font-medium">Email:</span> principal@govschool.edu.in</p>
                  <p><span className="font-medium">Address:</span> Near Central Park, {selectedSchool.district}, {selectedSchool.state}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSchoolDetailsModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}