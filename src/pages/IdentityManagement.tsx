import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  IdCard, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Search,
  Edit,
  Eye,
  AlertCircle,
  PieChart,
  BarChart3,
  Save,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  UserCheck
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState } from "react";

// Sample data
const identityData = [
  { 
    id: 'CH-001', 
    name: 'Priya Sharma', 
    age: 8, 
    state: 'Uttar Pradesh', 
    district: 'Lucknow',
    aadhaar: 'verified',
    rationCard: 'verified',
    birthCertificate: 'pending',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'CH-002', 
    name: 'Rahul Kumar', 
    age: 10, 
    state: 'Maharashtra', 
    district: 'Mumbai',
    aadhaar: 'pending',
    rationCard: 'missing',
    birthCertificate: 'verified',
    lastUpdated: '2024-02-10'
  },
  { 
    id: 'CH-003', 
    name: 'Anjali Singh', 
    age: 7, 
    state: 'Bihar', 
    district: 'Patna',
    aadhaar: 'verified',
    rationCard: 'verified',
    birthCertificate: 'verified',
    lastUpdated: '2024-01-20'
  }
];

const idStatusData = [
  { name: 'Aadhaar', percentage: 78, fill: 'hsl(var(--primary))' },
  { name: 'Ration Card', percentage: 65, fill: 'hsl(var(--child-care))' },
  { name: 'Birth Certificate', percentage: 85, fill: 'hsl(var(--volunteer))' }
];

const regionalStatusData = [
  { region: 'North', aadhaar: 75, rationCard: 60, birthCert: 80 },
  { region: 'South', aadhaar: 85, rationCard: 70, birthCert: 90 },
  { region: 'East', aadhaar: 70, rationCard: 55, birthCert: 75 },
  { region: 'West', aadhaar: 80, rationCard: 75, birthCert: 85 }
];

export default function IdentityManagement() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [generateFormModalOpen, setGenerateFormModalOpen] = useState(false);
  const [alertPendingModalOpen, setAlertPendingModalOpen] = useState(false);
  const [bulkUpdateModalOpen, setBulkUpdateModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'missing':
        return <Badge variant="destructive">Missing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleMarkEnrolled = () => {
    setSelectedChild(identityData[0]); // For demo, using first child
    setEnrollModalOpen(true);
  };

  const handleGenerateForm = () => {
    setSelectedChild(identityData[1]); // For demo, using second child
    setGenerateFormModalOpen(true);
  };

  const handleAlertPending = () => {
    setAlertPendingModalOpen(true);
  };

  const handleBulkUpdate = () => {
    setBulkUpdateModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Identity Management</h1>
            <p className="text-muted-foreground">Aadhaar & ID Tracking</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate ID Form
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <IdCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">19,381</p>
                  <p className="text-sm text-muted-foreground">Aadhaar Verified</p>
                  <Progress value={78} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-child-care/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-child-care" />
                </div>
                <div>
                  <p className="text-2xl font-bold">16,150</p>
                  <p className="text-sm text-muted-foreground">Ration Card</p>
                  <Progress value={65} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-volunteer/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-volunteer" />
                </div>
                <div>
                  <p className="text-2xl font-bold">21,120</p>
                  <p className="text-sm text-muted-foreground">Birth Certificate</p>
                  <Progress value={85} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5,466</p>
                  <p className="text-sm text-muted-foreground">Pending Documents</p>
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
                  <Input placeholder="Search by child ID or name..." className="pl-10" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Documents</SelectItem>
                    <SelectItem value="aadhaar">Aadhaar</SelectItem>
                    <SelectItem value="ration">Ration Card</SelectItem>
                    <SelectItem value="birth">Birth Certificate</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="missing">Missing</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="up">Uttar Pradesh</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="br">Bihar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identity Status Table */}
        <Card>
          <CardHeader>
            <CardTitle>Identity Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Age</TableHead>
                    <TableHead className="hidden lg:table-cell">District</TableHead>
                    <TableHead>Aadhaar</TableHead>
                    <TableHead className="hidden sm:table-cell">Ration Card</TableHead>
                    <TableHead className="hidden lg:table-cell">Birth Certificate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {identityData.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell className="font-medium">{child.id}</TableCell>
                      <TableCell>{child.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{child.age}</TableCell>
                      <TableCell className="hidden lg:table-cell">{child.district}</TableCell>
                      <TableCell>{getStatusBadge(child.aadhaar)}</TableCell>
                      <TableCell className="hidden sm:table-cell">{getStatusBadge(child.rationCard)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{getStatusBadge(child.birthCertificate)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <AlertCircle className="w-4 h-4" />
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ID Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Document Completion Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={idStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {idStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {idStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span>{item.name}: {item.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Region-wise Identity Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionalStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="aadhaar" fill="hsl(var(--primary))" name="Aadhaar" />
                  <Bar dataKey="rationCard" fill="hsl(var(--child-care))" name="Ration Card" />
                  <Bar dataKey="birthCert" fill="hsl(var(--volunteer))" name="Birth Certificate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleMarkEnrolled}
                aria-label="Mark as enrolled"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-success" />
                <span className="text-xs sm:text-sm text-center">Mark as Enrolled</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleGenerateForm}
                aria-label="Generate ID form"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-primary" />
                <span className="text-xs sm:text-sm text-center">Generate ID Form</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleAlertPending}
                aria-label="Alert for pending"
              >
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-destructive" />
                <span className="text-xs sm:text-sm text-center">Alert for Pending</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex-col gap-2 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                onClick={handleBulkUpdate}
                aria-label="Bulk update"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-volunteer" />
                <span className="text-xs sm:text-sm text-center">Bulk Update</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mark as Enrolled Modal */}
      <Dialog open={enrollModalOpen} onOpenChange={setEnrollModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Mark Child as Enrolled
            </DialogTitle>
            <DialogDescription>
              Complete the enrollment process and update identity verification status.
            </DialogDescription>
          </DialogHeader>
          
          {selectedChild && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <IdCard className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChild.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedChild.id} • Age: {selectedChild.age} years</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Aadhaar Status</Label>
                    {getStatusBadge(selectedChild.aadhaar)}
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Ration Card Status</Label>
                    {getStatusBadge(selectedChild.rationCard)}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Birth Certificate Status</Label>
                  {getStatusBadge(selectedChild.birthCertificate)}
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Enrollment Requirements</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="documents-complete" defaultChecked={selectedChild.aadhaar === 'verified' && selectedChild.rationCard === 'verified'} />
                      <Label htmlFor="documents-complete" className="text-sm">All required documents verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="school-assigned" />
                      <Label htmlFor="school-assigned" className="text-sm">School assignment completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transport-arranged" />
                      <Label htmlFor="transport-arranged" className="text-sm">Transport arrangements made</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="uniform-supplied" />
                      <Label htmlFor="uniform-supplied" className="text-sm">School uniform and supplies provided</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="enrollment-date" className="text-sm font-medium">Enrollment Date</Label>
                  <Input id="enrollment-date" type="date" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="enrollment-notes" className="text-sm font-medium">Enrollment Notes</Label>
                  <Textarea 
                    id="enrollment-notes" 
                    placeholder="Add any notes about the enrollment process..."
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEnrollModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate ID Form Modal */}
      <Dialog open={generateFormModalOpen} onOpenChange={setGenerateFormModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Generate ID Form
            </DialogTitle>
            <DialogDescription>
              Generate and customize identity forms for children requiring documentation.
            </DialogDescription>
          </DialogHeader>
          
          {selectedChild && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <IdCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChild.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedChild.id} • {selectedChild.district}, {selectedChild.state}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Forms to Generate</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="aadhaar-form" defaultChecked={selectedChild.aadhaar === 'missing'} />
                      <Label htmlFor="aadhaar-form" className="text-sm">Aadhaar Card Application Form</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ration-form" defaultChecked={selectedChild.rationCard === 'missing'} />
                      <Label htmlFor="ration-form" className="text-sm">Ration Card Application Form</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="birth-form" defaultChecked={selectedChild.birthCertificate === 'missing'} />
                      <Label htmlFor="birth-form" className="text-sm">Birth Certificate Application Form</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="school-form" />
                      <Label htmlFor="school-form" className="text-sm">School Enrollment Form</Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="form-language" className="text-sm font-medium">Form Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="form-format" className="text-sm font-medium">Output Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">Word Document</SelectItem>
                        <SelectItem value="print">Print Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="parent-details" className="text-sm font-medium">Include Parent Details</Label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="father-name" defaultChecked />
                      <Label htmlFor="father-name" className="text-sm">Father's Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mother-name" defaultChecked />
                      <Label htmlFor="mother-name" className="text-sm">Mother's Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="contact-info" defaultChecked />
                      <Label htmlFor="contact-info" className="text-sm">Contact Information</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="address" defaultChecked />
                      <Label htmlFor="address" className="text-sm">Address Details</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="form-notes" className="text-sm font-medium">Form Notes</Label>
                  <Textarea 
                    id="form-notes" 
                    placeholder="Add any special instructions or notes for the forms..."
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateFormModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate Forms
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert for Pending Modal */}
      <Dialog open={alertPendingModalOpen} onOpenChange={setAlertPendingModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Pending Documents Alert
            </DialogTitle>
            <DialogDescription>
              Review and manage alerts for children with pending identity documents.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="alert-type" className="text-sm font-medium">Alert Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pending</SelectItem>
                    <SelectItem value="aadhaar">Aadhaar Missing</SelectItem>
                    <SelectItem value="ration">Ration Card Missing</SelectItem>
                    <SelectItem value="birth">Birth Certificate Missing</SelectItem>
                    <SelectItem value="urgent">Urgent (30+ days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="region-filter" className="text-sm font-medium">Region</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority" className="text-sm font-medium">Priority Level</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <h4 className="font-medium mb-3 text-destructive">Pending Documents Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Total Pending</p>
                  <p className="text-2xl font-bold text-destructive">5,466</p>
                </div>
                <div>
                  <p className="font-medium">Aadhaar Missing</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <div>
                  <p className="font-medium">Ration Card Missing</p>
                  <p className="text-2xl font-bold">1,923</p>
                </div>
                <div>
                  <p className="font-medium">Birth Certificate Missing</p>
                  <p className="text-2xl font-bold">696</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Children Requiring Attention</h4>
                <Badge variant="destructive">156 High Priority</Badge>
              </div>
              
              <div className="space-y-3">
                {[
                  { id: 'CH-001', name: 'Priya Sharma', age: 8, missing: 'Aadhaar', days: 45, priority: 'high' },
                  { id: 'CH-002', name: 'Rahul Kumar', age: 10, missing: 'Ration Card', days: 32, priority: 'medium' },
                  { id: 'CH-003', name: 'Anjali Singh', age: 7, missing: 'Birth Certificate', days: 28, priority: 'medium' },
                  { id: 'CH-004', name: 'Vikram Patel', age: 9, missing: 'Aadhaar, Ration Card', days: 60, priority: 'high' }
                ].map((child, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <h5 className="font-medium">{child.name}</h5>
                        <p className="text-sm text-muted-foreground">{child.id} • {child.missing} • {child.days} days pending</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {child.priority === 'high' && <Badge variant="destructive">High</Badge>}
                      {child.priority === 'medium' && <Badge variant="secondary">Medium</Badge>}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Alert Actions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="send-notifications" defaultChecked />
                  <Label htmlFor="send-notifications" className="text-sm">Send notifications to volunteers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="escalate-admin" />
                  <Label htmlFor="escalate-admin" className="text-sm">Escalate to district admin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="generate-report" />
                  <Label htmlFor="generate-report" className="text-sm">Generate pending documents report</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertPendingModalOpen(false)}>
              Close
            </Button>
            <Button variant="destructive">
              <AlertCircle className="w-4 h-4 mr-2" />
              Send Alerts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Update Modal */}
      <Dialog open={bulkUpdateModalOpen} onOpenChange={setBulkUpdateModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-volunteer" />
              Bulk Identity Update
            </DialogTitle>
            <DialogDescription>
              Update identity document status for multiple children based on criteria.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document-type" className="text-sm font-medium">Document Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="ration">Ration Card</SelectItem>
                    <SelectItem value="birth">Birth Certificate</SelectItem>
                    <SelectItem value="all">All Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new-status" className="text-sm font-medium">New Status</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Mark as Verified</SelectItem>
                    <SelectItem value="pending">Mark as Pending</SelectItem>
                    <SelectItem value="missing">Mark as Missing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Selection Criteria</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending-docs" defaultChecked />
                  <Label htmlFor="pending-docs" className="text-sm">Children with pending documents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="missing-docs" />
                  <Label htmlFor="missing-docs" className="text-sm">Children with missing documents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recent-updates" />
                  <Label htmlFor="recent-updates" className="text-sm">Recently updated profiles</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="specific-region" />
                  <Label htmlFor="specific-region" className="text-sm">Specific region/district</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Update Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Children Selected:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Status:</span>
                  <span className="font-medium">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span>New Status:</span>
                  <span className="font-medium text-success">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span className="font-medium">3-5 minutes</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Update Actions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-status" defaultChecked />
                  <Label htmlFor="update-status" className="text-sm">Update document status</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="send-notifications" defaultChecked />
                  <Label htmlFor="send-notifications" className="text-sm">Send update notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-timeline" defaultChecked />
                  <Label htmlFor="update-timeline" className="text-sm">Update activity timeline</Label>
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
            <Button variant="outline" onClick={() => setBulkUpdateModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-volunteer hover:bg-volunteer/90">
              <Edit className="w-4 h-4 mr-2" />
              Execute Bulk Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}