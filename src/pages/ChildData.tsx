import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  PieChart,
  Calendar,
  FileText,
  UserCheck,
  AlertCircle,
  Save,
  X
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";

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
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);
  const [assignSchoolModalOpen, setAssignSchoolModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);

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

  const handleVerifyEntry = () => {
    setSelectedChild(children[0]); // For demo, using first child
    setVerifyModalOpen(true);
  };

  const handleEditDetails = () => {
    setSelectedChild(children[0]); // For demo, using first child
    setEditModalOpen(true);
  };

  const handleViewTimeline = () => {
    setSelectedChild(children[0]); // For demo, using first child
    setTimelineModalOpen(true);
  };

  const handleAssignSchool = () => {
    setSelectedChild(children[0]); // For demo, using first child
    setAssignSchoolModalOpen(true);
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
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              className="h-14 xs:h-16 sm:h-20 flex-col gap-1 xs:gap-2 p-2 min-h-[56px] xs:min-h-[64px] sm:min-h-[80px] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Verify child entry"
              onClick={handleVerifyEntry}
            >
              <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0 text-success" />
              <span className="text-xs xs:text-sm text-center font-medium leading-tight px-1">Verify Entry</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 xs:h-16 sm:h-20 flex-col gap-1 xs:gap-2 p-2 min-h-[56px] xs:min-h-[64px] sm:min-h-[80px] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Edit child details"
              onClick={handleEditDetails}
            >
              <Edit className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0 text-primary" />
              <span className="text-xs xs:text-sm text-center font-medium leading-tight px-1">Edit Details</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 xs:h-16 sm:h-20 flex-col gap-1 xs:gap-2 p-2 min-h-[56px] xs:min-h-[64px] sm:min-h-[80px] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="View child timeline"
              onClick={handleViewTimeline}
            >
              <Eye className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0 text-volunteer" />
              <span className="text-xs xs:text-sm text-center font-medium leading-tight px-1">View Timeline</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 xs:h-16 sm:h-20 flex-col gap-1 xs:gap-2 p-2 min-h-[56px] xs:min-h-[64px] sm:min-h-[80px] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Assign child to school"
              onClick={handleAssignSchool}
            >
              <School className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0 text-child-care" />
              <span className="text-xs xs:text-sm text-center font-medium leading-tight px-1">Assign School</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verify Entry Modal */}
      <Dialog open={verifyModalOpen} onOpenChange={setVerifyModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-success" />
              Verify Child Entry
            </DialogTitle>
            <DialogDescription>
              Review and verify the child's information and documents.
            </DialogDescription>
          </DialogHeader>
          
          {selectedChild && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Child Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedChild.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Child ID</Label>
                  <p className="text-sm text-muted-foreground">{selectedChild.id}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Verification Checklist</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="aadhaar" />
                    <Label htmlFor="aadhaar" className="text-sm">Aadhaar Card Verified</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="birth-cert" />
                    <Label htmlFor="birth-cert" className="text-sm">Birth Certificate Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="photo" />
                    <Label htmlFor="photo" className="text-sm">Recent Photo Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="address" />
                    <Label htmlFor="address" className="text-sm">Address Verification Complete</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Verification Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any verification notes or observations..."
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setVerifyModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Verified
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Details Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Edit Child Details
            </DialogTitle>
            <DialogDescription>
              Update the child's personal information and details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedChild && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input id="name" defaultValue={selectedChild.name} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                  <Input id="age" type="number" defaultValue={selectedChild.age} className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
                  <Select defaultValue={selectedChild.gender.toLowerCase()}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-medium">State</Label>
                  <Select defaultValue={selectedChild.state.toLowerCase().replace(' ', '-')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="district" className="text-sm font-medium">District</Label>
                <Input id="district" defaultValue={selectedChild.district} className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any additional notes or special requirements..."
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Timeline Modal */}
      <Dialog open={timelineModalOpen} onOpenChange={setTimelineModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-volunteer" />
              Child Timeline
            </DialogTitle>
            <DialogDescription>
              View the complete timeline of events and activities for this child.
            </DialogDescription>
          </DialogHeader>
          
          {selectedChild && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChild.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedChild.id}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-medium">Child Registered</h4>
                        <p className="text-sm text-muted-foreground">Child profile created in the system</p>
                        <p className="text-xs text-muted-foreground mt-1">March 15, 2024 - 10:30 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-medium">Documents Uploaded</h4>
                        <p className="text-sm text-muted-foreground">Birth certificate and Aadhaar card uploaded</p>
                        <p className="text-xs text-muted-foreground mt-1">March 16, 2024 - 2:15 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-volunteer/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-4 h-4 text-volunteer" />
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-medium">Verification Initiated</h4>
                        <p className="text-sm text-muted-foreground">Documents sent for verification</p>
                        <p className="text-xs text-muted-foreground mt-1">March 17, 2024 - 9:00 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-child-care/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <School className="w-4 h-4 text-child-care" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">School Assignment Pending</h4>
                        <p className="text-sm text-muted-foreground">Awaiting school assignment</p>
                        <p className="text-xs text-muted-foreground mt-1">Current Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTimelineModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Timeline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign School Modal */}
      <Dialog open={assignSchoolModalOpen} onOpenChange={setAssignSchoolModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-child-care" />
              Assign School
            </DialogTitle>
            <DialogDescription>
              Select a school for the child and complete the enrollment process.
            </DialogDescription>
          </DialogHeader>
          
          {selectedChild && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-child-care/10 rounded-full flex items-center justify-center">
                  <Baby className="w-5 h-5 text-child-care" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChild.name}</h3>
                  <p className="text-sm text-muted-foreground">Age: {selectedChild.age} years | {selectedChild.district}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="school" className="text-sm font-medium">Select School</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a school" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school-1">Government Primary School, Lucknow</SelectItem>
                      <SelectItem value="school-2">St. Mary's Convent School</SelectItem>
                      <SelectItem value="school-3">Delhi Public School</SelectItem>
                      <SelectItem value="school-4">Kendriya Vidyalaya</SelectItem>
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
                  <Label className="text-sm font-medium">Enrollment Requirements</Label>
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
            <Button variant="outline" onClick={() => setAssignSchoolModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-child-care hover:bg-child-care/90">
              <School className="w-4 h-4 mr-2" />
              Complete Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}