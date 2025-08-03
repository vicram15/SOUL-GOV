import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Map, 
  MapPin, 
  Layers, 
  Download,
  ZoomIn,
  Filter,
  Users,
  Baby,
  School,
  Search,
  Save,
  AlertTriangle,
  Calendar,
  BarChart3,
  Eye,
  Globe,
  FileText
} from "lucide-react";
import { useState } from "react";

export default function GeoMapping() {
  const [zoomRegionModalOpen, setZoomRegionModalOpen] = useState(false);
  const [exportMapModalOpen, setExportMapModalOpen] = useState(false);
  const [filterOptionsModalOpen, setFilterOptionsModalOpen] = useState(false);
  const [toggleLayersModalOpen, setToggleLayersModalOpen] = useState(false);
  const [nearbySchoolsModalOpen, setNearbySchoolsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  const handleZoomRegion = () => {
    setSelectedRegion({ name: 'Mumbai District', coordinates: '19.0760° N, 72.8777° E', childrenCount: 2847 });
    setZoomRegionModalOpen(true);
  };

  const handleExportMap = () => {
    setExportMapModalOpen(true);
  };

  const handleFilterOptions = () => {
    setFilterOptionsModalOpen(true);
  };

  const handleToggleLayers = () => {
    setToggleLayersModalOpen(true);
  };

  const handleNearbySchools = () => {
    setNearbySchoolsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Geo Mapping</h1>
            <p className="text-muted-foreground">Regional Density & Locations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline"
              className="h-10 sm:h-11 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Export map data"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Map
            </Button>
          </div>
        </div>

        {/* Map Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Schooling Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Children</SelectItem>
                    <SelectItem value="enrolled">School Enrolled</SelectItem>
                    <SelectItem value="pending">Pending Assignment</SelectItem>
                    <SelectItem value="none">No School</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="ID Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">ID Verified</SelectItem>
                    <SelectItem value="pending">ID Pending</SelectItem>
                    <SelectItem value="missing">No ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 sm:h-9 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                  aria-label="Toggle map layers"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Layers
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 sm:h-9 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                  aria-label="Zoom to specific region"
                >
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom to Region
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">487</p>
                  <p className="text-sm text-muted-foreground">Districts Covered</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-child-care/10 rounded-lg flex items-center justify-center">
                  <Baby className="w-6 h-6 text-child-care" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24,847</p>
                  <p className="text-sm text-muted-foreground">Children Mapped</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-volunteer/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-volunteer" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,256</p>
                  <p className="text-sm text-muted-foreground">Volunteer Locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              Interactive Regional Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Placeholder for actual map implementation */}
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground mb-4">
                    This would display a real map with child density heatmaps,<br />
                    volunteer locations, and clickable markers using Leaflet/Google Maps
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Badge variant="outline">Markers for each child location</Badge>
                    <Badge variant="outline">Heatmap showing density by region</Badge>
                    <Badge variant="outline">Filter by various parameters</Badge>
                  </div>
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="absolute top-4 left-4 bg-background border rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-sm">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-child-care rounded-full"></div>
                    <span>High Density (100+ children)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-volunteer rounded-full"></div>
                    <span>Medium Density (50-99 children)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>Low Density (1-49 children)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Volunteer Locations</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Region Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Districts by Child Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { district: 'Mumbai, Maharashtra', count: 2847, percentage: 85 },
                  { district: 'Delhi NCR', count: 2156, percentage: 72 },
                  { district: 'Kolkata, West Bengal', count: 1923, percentage: 68 },
                  { district: 'Chennai, Tamil Nadu', count: 1789, percentage: 64 },
                  { district: 'Bangalore, Karnataka', count: 1654, percentage: 58 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.district}</p>
                      <p className="text-sm text-muted-foreground">{item.count} children</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{item.percentage}% verified</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <Button 
                  className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                  variant="outline"
                  onClick={handleZoomRegion}
                  aria-label="Zoom to specific region"
                >
                  <ZoomIn className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                  <span className="truncate text-sm sm:text-base">Zoom to Specific Region</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                  variant="outline"
                  onClick={handleExportMap}
                  aria-label="Export current map view"
                >
                  <Download className="w-4 h-4 mr-2 flex-shrink-0 text-success" />
                  <span className="truncate text-sm sm:text-base">Export Current Map View</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                  variant="outline"
                  onClick={handleFilterOptions}
                  aria-label="Advanced filtering options"
                >
                  <Filter className="w-4 h-4 mr-2 flex-shrink-0 text-volunteer" />
                  <span className="truncate text-sm sm:text-base">Advanced Filtering Options</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                  variant="outline"
                  onClick={handleToggleLayers}
                  aria-label="Toggle map layers"
                >
                  <Layers className="w-4 h-4 mr-2 flex-shrink-0 text-child-care" />
                  <span className="truncate text-sm sm:text-base">Toggle Map Layers</span>
                </Button>
                <Button 
                  className="w-full justify-start h-12 sm:h-14 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation" 
                  variant="outline"
                  onClick={handleNearbySchools}
                  aria-label="Show nearby schools"
                >
                  <School className="w-4 h-4 mr-2 flex-shrink-0 text-secondary" />
                  <span className="truncate text-sm sm:text-base">Show Nearby Schools</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zoom to Specific Region Modal */}
      <Dialog open={zoomRegionModalOpen} onOpenChange={setZoomRegionModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ZoomIn className="w-5 h-5 text-primary" />
              Zoom to Specific Region
            </DialogTitle>
            <DialogDescription>
              Select a specific region to zoom in and focus on the map.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="region-select" className="text-sm font-medium">Select Region</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a region to zoom to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai District</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="kolkata">Kolkata, West Bengal</SelectItem>
                  <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                  <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Zoom Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (District Level)</SelectItem>
                    <SelectItem value="medium">Medium (City Level)</SelectItem>
                    <SelectItem value="high">High (Neighborhood Level)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Map Type</Label>
                <Select defaultValue="satellite">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satellite">Satellite View</SelectItem>
                    <SelectItem value="street">Street View</SelectItem>
                    <SelectItem value="terrain">Terrain View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Display Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-children" defaultChecked />
                  <Label htmlFor="show-children" className="text-sm">Show child markers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-volunteers" defaultChecked />
                  <Label htmlFor="show-volunteers" className="text-sm">Show volunteer locations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-schools" />
                  <Label htmlFor="show-schools" className="text-sm">Show nearby schools</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-density" defaultChecked />
                  <Label htmlFor="show-density" className="text-sm">Show density heatmap</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="zoom-notes" className="text-sm font-medium">Zoom Notes</Label>
              <Textarea 
                id="zoom-notes" 
                placeholder="Add any notes about this region focus..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setZoomRegionModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <ZoomIn className="w-4 h-4 mr-2" />
              Zoom to Region
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Current Map View Modal */}
      <Dialog open={exportMapModalOpen} onOpenChange={setExportMapModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-success" />
              Export Current Map View
            </DialogTitle>
            <DialogDescription>
              Export the current map view with selected filters and data layers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="export-format" className="text-sm font-medium">Export Format</Label>
                <Select defaultValue="png">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG Image</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="svg">SVG Vector</SelectItem>
                    <SelectItem value="geojson">GeoJSON Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="export-resolution" className="text-sm font-medium">Resolution</Label>
                <Select defaultValue="high">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (1024x768)</SelectItem>
                    <SelectItem value="medium">Medium (1920x1080)</SelectItem>
                    <SelectItem value="high">High (3840x2160)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Include in Export</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-legend" defaultChecked />
                  <Label htmlFor="include-legend" className="text-sm">Map legend</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-stats" defaultChecked />
                  <Label htmlFor="include-stats" className="text-sm">Statistics panel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-filters" />
                  <Label htmlFor="include-filters" className="text-sm">Applied filters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-metadata" defaultChecked />
                  <Label htmlFor="include-metadata" className="text-sm">Export metadata</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="export-filename" className="text-sm font-medium">File Name</Label>
              <input 
                id="export-filename" 
                type="text" 
                defaultValue="map-export-2024-03-15"
                className="mt-1 w-full px-3 py-2 border border-input rounded-md text-sm"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportMapModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <Download className="w-4 h-4 mr-2" />
              Export Map
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filtering Options Modal */}
      <Dialog open={filterOptionsModalOpen} onOpenChange={setFilterOptionsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-volunteer" />
              Advanced Filtering Options
            </DialogTitle>
            <DialogDescription>
              Configure advanced filters to customize the map view and data display.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age-range" className="text-sm font-medium">Age Range</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="0-5">0-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gender-filter" className="text-sm font-medium">Gender</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="verification-status" className="text-sm font-medium">Verification Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="school-status" className="text-sm font-medium">School Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="enrolled">Enrolled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="none">No School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Additional Filters</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-high-density" defaultChecked />
                  <Label htmlFor="show-high-density" className="text-sm">Show high density areas only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-volunteer-areas" />
                  <Label htmlFor="show-volunteer-areas" className="text-sm">Show areas with active volunteers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-school-zones" />
                  <Label htmlFor="show-school-zones" className="text-sm">Show school catchment zones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-transport-routes" />
                  <Label htmlFor="show-transport-routes" className="text-sm">Show transport routes</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="filter-notes" className="text-sm font-medium">Filter Notes</Label>
              <Textarea 
                id="filter-notes" 
                placeholder="Add any notes about the applied filters..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterOptionsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-volunteer hover:bg-volunteer/90">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toggle Map Layers Modal */}
      <Dialog open={toggleLayersModalOpen} onOpenChange={setToggleLayersModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-child-care" />
              Toggle Map Layers
            </DialogTitle>
            <DialogDescription>
              Control which map layers and overlays are visible on the map.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Base Layers</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="satellite-layer" defaultChecked />
                  <Label htmlFor="satellite-layer" className="text-sm">Satellite imagery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="street-layer" />
                  <Label htmlFor="street-layer" className="text-sm">Street map</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terrain-layer" />
                  <Label htmlFor="terrain-layer" className="text-sm">Terrain view</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Data Layers</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="children-markers" defaultChecked />
                  <Label htmlFor="children-markers" className="text-sm">Child location markers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="volunteer-markers" defaultChecked />
                  <Label htmlFor="volunteer-markers" className="text-sm">Volunteer locations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="school-markers" />
                  <Label htmlFor="school-markers" className="text-sm">School locations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="density-heatmap" defaultChecked />
                  <Label htmlFor="density-heatmap" className="text-sm">Density heatmap</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Overlay Layers</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="district-boundaries" />
                  <Label htmlFor="district-boundaries" className="text-sm">District boundaries</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="transport-routes" />
                  <Label htmlFor="transport-routes" className="text-sm">Transport routes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="water-bodies" />
                  <Label htmlFor="water-bodies" className="text-sm">Water bodies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="landmarks" />
                  <Label htmlFor="landmarks" className="text-sm">Landmarks</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Layer Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-refresh" defaultChecked />
                  <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh data layers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-labels" defaultChecked />
                  <Label htmlFor="show-labels" className="text-sm">Show layer labels</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setToggleLayersModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-child-care hover:bg-child-care/90">
              <Layers className="w-4 h-4 mr-2" />
              Apply Layer Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Show Nearby Schools Modal */}
      <Dialog open={nearbySchoolsModalOpen} onOpenChange={setNearbySchoolsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-secondary" />
              Show Nearby Schools
            </DialogTitle>
            <DialogDescription>
              Display schools within a specified radius of the selected location.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search-radius" className="text-sm font-medium">Search Radius</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 km</SelectItem>
                    <SelectItem value="3">3 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="15">15 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="school-type" className="text-sm font-medium">School Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="government">Government Schools</SelectItem>
                    <SelectItem value="private">Private Schools</SelectItem>
                    <SelectItem value="aided">Aided Schools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Display Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-distance" defaultChecked />
                  <Label htmlFor="show-distance" className="text-sm">Show distance from center</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-capacity" defaultChecked />
                  <Label htmlFor="show-capacity" className="text-sm">Show available capacity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-rating" />
                  <Label htmlFor="show-rating" className="text-sm">Show school ratings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-transport" />
                  <Label htmlFor="show-transport" className="text-sm">Show transport options</Label>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Nearby Schools Preview</h4>
              <div className="space-y-3">
                {[
                  { name: 'Government Primary School', distance: '0.8 km', capacity: '45/60', rating: '4.2' },
                  { name: 'St. Mary\'s Convent', distance: '1.2 km', capacity: '12/40', rating: '4.5' },
                  { name: 'Delhi Public School', distance: '2.1 km', capacity: '8/35', rating: '4.8' },
                  { name: 'Kendriya Vidyalaya', distance: '3.5 km', capacity: '23/50', rating: '4.0' }
                ].map((school, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                    <div>
                      <h5 className="font-medium text-sm">{school.name}</h5>
                      <p className="text-xs text-muted-foreground">{school.distance} • {school.capacity} available</p>
                    </div>
                    <Badge variant="outline">{school.rating}★</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="school-notes" className="text-sm font-medium">Search Notes</Label>
              <Textarea 
                id="school-notes" 
                placeholder="Add any notes about the school search..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNearbySchoolsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90">
              <School className="w-4 h-4 mr-2" />
              Show Schools on Map
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}