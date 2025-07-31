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
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  UserCheck,
  Eye,
  UserX,
  BarChart3,
  FileText,
  Save,
  AlertTriangle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";

// Sample data
const volunteers = [
  { id: 'V-001', name: 'Rajesh Kumar', state: 'Maharashtra', district: 'Mumbai', kycStatus: 'verified', childrenAdded: 15, joinDate: '2024-01-15' },
  { id: 'V-002', name: 'Priya Sharma', state: 'Uttar Pradesh', district: 'Lucknow', kycStatus: 'pending', childrenAdded: 8, joinDate: '2024-02-10' },
  { id: 'V-003', name: 'Amit Singh', state: 'Bihar', district: 'Patna', kycStatus: 'verified', childrenAdded: 22, joinDate: '2024-01-20' },
  { id: 'V-004', name: 'Sunita Devi', state: 'West Bengal', district: 'Kolkata', kycStatus: 'incomplete', childrenAdded: 5, joinDate: '2024-03-05' }
];

const volunteerActivityData = [
  { name: 'Rajesh Kumar', children: 15 },
  { name: 'Amit Singh', children: 22 },
  { name: 'Priya Sharma', children: 8 },
  { name: 'Sunita Devi', children: 5 },
  { name: 'Others', children: 35 }
];

export default function VolunteerManagement() {
  const [approveKycModalOpen, setApproveKycModalOpen] = useState(false);
  const [viewChildrenModalOpen, setViewChildrenModalOpen] = useState(false);
  const [suspendVolunteerModalOpen, setSuspendVolunteerModalOpen] = useState(false);
  const [bulkKycModalOpen, setBulkKycModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'incomplete':
        return <Badge variant="destructive">Incomplete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApproveKyc = () => {
    setSelectedVolunteer(volunteers[1]); // For demo, using pending volunteer
    setApproveKycModalOpen(true);
  };

  const handleViewChildren = () => {
    setSelectedVolunteer(volunteers[0]); // For demo, using verified volunteer
    setViewChildrenModalOpen(true);
  };

  const handleSuspendVolunteer = () => {
    setSelectedVolunteer(volunteers[3]); // For demo, using incomplete volunteer
    setSuspendVolunteerModalOpen(true);
  };

  const handleBulkKyc = () => {
    setBulkKycModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Volunteer Management</h1>
          <p className="text-muted-foreground">KYC, Profiles & Activity Management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Add Volunteer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Verified Volunteers</p>
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
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Pending KYC</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Incomplete Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">304</p>
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search volunteers..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="KYC Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Listing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Volunteer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">State</TableHead>
                  <TableHead className="hidden lg:table-cell">District</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Children Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">{volunteer.id}</TableCell>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{volunteer.state}</TableCell>
                    <TableCell className="hidden lg:table-cell">{volunteer.district}</TableCell>
                    <TableCell>{getStatusBadge(volunteer.kycStatus)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{volunteer.childrenAdded}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserX className="w-4 h-4" />
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

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Child Entries per Volunteer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volunteerActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="children" fill="hsl(var(--volunteer))" />
              </BarChart>
            </ResponsiveContainer>
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
                onClick={handleApproveKyc}
                aria-label="Approve KYC applications"
              >
                <UserCheck className="w-4 h-4 mr-2 flex-shrink-0 text-success" />
                <span className="truncate text-sm sm:text-base">Approve KYC Applications</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleViewChildren}
                aria-label="View added children"
              >
                <Eye className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                <span className="truncate text-sm sm:text-base">View Added Children</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleSuspendVolunteer}
                aria-label="Suspend volunteer"
              >
                <UserX className="w-4 h-4 mr-2 flex-shrink-0 text-destructive" />
                <span className="truncate text-sm sm:text-base">Suspend Volunteer</span>
              </Button>
              <Button 
                className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                variant="outline"
                onClick={handleBulkKyc}
                aria-label="Bulk KYC update"
              >
                <Users className="w-4 h-4 mr-2 flex-shrink-0 text-volunteer" />
                <span className="truncate text-sm sm:text-base">Bulk KYC Update</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approve KYC Applications Modal */}
      <Dialog open={approveKycModalOpen} onOpenChange={setApproveKycModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-success" />
              Approve KYC Application
            </DialogTitle>
            <DialogDescription>
              Review and approve the volunteer's KYC application and documents.
            </DialogDescription>
          </DialogHeader>
          
          {selectedVolunteer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedVolunteer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVolunteer.id} • {selectedVolunteer.district}, {selectedVolunteer.state}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">priya.sharma@email.com</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Document Verification Checklist</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="aadhaar" />
                      <Label htmlFor="aadhaar" className="text-sm">Aadhaar Card Verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pan" />
                      <Label htmlFor="pan" className="text-sm">PAN Card Verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="address-proof" />
                      <Label htmlFor="address-proof" className="text-sm">Address Proof Verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="photo" />
                      <Label htmlFor="photo" className="text-sm">Recent Photo Uploaded</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="background-check" />
                      <Label htmlFor="background-check" className="text-sm">Background Check Completed</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="approval-notes" className="text-sm font-medium">Approval Notes</Label>
                  <Textarea 
                    id="approval-notes" 
                    placeholder="Add any notes about the approval process..."
                    className="mt-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Verification Actions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-approval-email" defaultChecked />
                      <Label htmlFor="send-approval-email" className="text-sm">Send approval email notification</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activate-account" defaultChecked />
                      <Label htmlFor="activate-account" className="text-sm">Activate volunteer account</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="assign-training" />
                      <Label htmlFor="assign-training" className="text-sm">Assign mandatory training modules</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveKycModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <UserCheck className="w-4 h-4 mr-2" />
              Approve KYC
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Added Children Modal */}
      <Dialog open={viewChildrenModalOpen} onOpenChange={setViewChildrenModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Children Added by Volunteer
            </DialogTitle>
            <DialogDescription>
              View all children registered by this volunteer with their current status.
            </DialogDescription>
          </DialogHeader>
          
          {selectedVolunteer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedVolunteer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVolunteer.id} • {selectedVolunteer.childrenAdded} children added</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Children List</h4>
                  <Badge variant="outline">{selectedVolunteer.childrenAdded} Total</Badge>
                </div>
                
                <div className="space-y-3">
                  {[
                    { id: 'CH-001', name: 'Priya Sharma', age: 8, status: 'verified', school: 'Government Primary School', addedDate: '2024-01-20' },
                    { id: 'CH-002', name: 'Rahul Kumar', age: 10, status: 'pending', school: 'Pending Assignment', addedDate: '2024-01-25' },
                    { id: 'CH-003', name: 'Anjali Singh', age: 7, status: 'verified', school: 'St. Mary\'s School', addedDate: '2024-02-01' },
                    { id: 'CH-004', name: 'Vikram Patel', age: 9, status: 'verified', school: 'Delhi Public School', addedDate: '2024-02-05' },
                    { id: 'CH-005', name: 'Meera Devi', age: 6, status: 'incomplete', school: 'Documents Pending', addedDate: '2024-02-10' }
                  ].map((child, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-child-care/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-child-care">{child.age}</span>
                        </div>
                        <div>
                          <h5 className="font-medium">{child.name}</h5>
                          <p className="text-sm text-muted-foreground">{child.id} • {child.school}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {child.status === 'verified' && <Badge className="bg-success text-success-foreground">Verified</Badge>}
                        {child.status === 'pending' && <Badge variant="secondary">Pending</Badge>}
                        {child.status === 'incomplete' && <Badge variant="destructive">Incomplete</Badge>}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">12</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">2</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">1</p>
                  <p className="text-sm text-muted-foreground">Incomplete</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewChildrenModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Volunteer Modal */}
      <Dialog open={suspendVolunteerModalOpen} onOpenChange={setSuspendVolunteerModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="w-5 h-5 text-destructive" />
              Suspend Volunteer
            </DialogTitle>
            <DialogDescription>
              Temporarily suspend a volunteer's account with reason and duration.
            </DialogDescription>
          </DialogHeader>
          
          {selectedVolunteer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedVolunteer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVolunteer.id} • {selectedVolunteer.district}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="suspension-reason" className="text-sm font-medium">Suspension Reason</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select reason for suspension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incomplete-docs">Incomplete Documentation</SelectItem>
                      <SelectItem value="policy-violation">Policy Violation</SelectItem>
                      <SelectItem value="inactive">Inactive for Extended Period</SelectItem>
                      <SelectItem value="quality-issues">Quality Issues with Entries</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="suspension-duration" className="text-sm font-medium">Suspension Duration</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="suspension-notes" className="text-sm font-medium">Suspension Notes</Label>
                  <Textarea 
                    id="suspension-notes" 
                    placeholder="Provide detailed reason for suspension..."
                    className="mt-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Suspension Actions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disable-login" defaultChecked />
                      <Label htmlFor="disable-login" className="text-sm">Disable login access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="freeze-children" defaultChecked />
                      <Label htmlFor="freeze-children" className="text-sm">Freeze children data access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-notification" defaultChecked />
                      <Label htmlFor="send-notification" className="text-sm">Send suspension notification</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-admin" />
                      <Label htmlFor="notify-admin" className="text-sm">Notify district admin</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendVolunteerModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              <UserX className="w-4 h-4 mr-2" />
              Suspend Volunteer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk KYC Update Modal */}
      <Dialog open={bulkKycModalOpen} onOpenChange={setBulkKycModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-volunteer" />
              Bulk KYC Update
            </DialogTitle>
            <DialogDescription>
              Update KYC status for multiple volunteers based on criteria and filters.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kyc-status" className="text-sm font-medium">Target KYC Status</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status to update" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Mark as Verified</SelectItem>
                    <SelectItem value="pending">Mark as Pending</SelectItem>
                    <SelectItem value="incomplete">Mark as Incomplete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="region" className="text-sm font-medium">Target Region</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai District</SelectItem>
                    <SelectItem value="lucknow">Lucknow District</SelectItem>
                    <SelectItem value="patna">Patna District</SelectItem>
                    <SelectItem value="all">All Regions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Selection Criteria</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending-kyc" defaultChecked />
                  <Label htmlFor="pending-kyc" className="text-sm">Pending KYC applications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="incomplete-docs" />
                  <Label htmlFor="incomplete-docs" className="text-sm">Incomplete documentation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recent-joiners" />
                  <Label htmlFor="recent-joiners" className="text-sm">Joined in last 30 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="no-activity" />
                  <Label htmlFor="no-activity" className="text-sm">No activity in 7 days</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Update Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Volunteers Selected:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Status:</span>
                  <span className="font-medium">Pending KYC</span>
                </div>
                <div className="flex justify-between">
                  <span>New Status:</span>
                  <span className="font-medium text-success">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span className="font-medium">2-3 minutes</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Bulk Actions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="send-notifications" defaultChecked />
                  <Label htmlFor="send-notifications" className="text-sm">Send email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-status" defaultChecked />
                  <Label htmlFor="update-status" className="text-sm">Update status immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="generate-report" />
                  <Label htmlFor="generate-report" className="text-sm">Generate update report</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="bulk-notes" className="text-sm font-medium">Update Notes</Label>
              <Textarea 
                id="bulk-notes" 
                placeholder="Add any notes about the bulk update process..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkKycModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-volunteer hover:bg-volunteer/90">
              <Users className="w-4 h-4 mr-2" />
              Execute Bulk Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}