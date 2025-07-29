import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Download, ZoomIn } from "lucide-react";

// Sample data for map regions
const mapRegions = [
  { id: 1, name: "Mumbai Metropolitan", children: 5847, density: "high", coordinates: { lat: 19.0760, lng: 72.8777 } },
  { id: 2, name: "Bangalore Urban", children: 4231, density: "high", coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: 3, name: "Delhi NCR", children: 6124, density: "very-high", coordinates: { lat: 28.7041, lng: 77.1025 } },
  { id: 4, name: "Chennai Metro", children: 3456, density: "medium", coordinates: { lat: 13.0827, lng: 80.2707 } },
  { id: 5, name: "Pune District", children: 2890, density: "medium", coordinates: { lat: 18.5204, lng: 73.8567 } },
  { id: 6, name: "Ahmedabad Urban", children: 3245, density: "medium", coordinates: { lat: 23.0225, lng: 72.5714 } },
  { id: 7, name: "Kolkata Metro", children: 4567, density: "high", coordinates: { lat: 22.5726, lng: 88.3639 } },
  { id: 8, name: "Hyderabad Urban", children: 3123, density: "medium", coordinates: { lat: 17.3850, lng: 78.4867 } }
];

const volunteers = [
  { id: "V-001", name: "Rajesh Kumar", location: "Mumbai", children: 12, coordinates: { lat: 19.0760, lng: 72.8777 } },
  { id: "V-002", name: "Priya Sharma", location: "Bangalore", children: 8, coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: "V-003", name: "Amit Singh", location: "Delhi", children: 15, coordinates: { lat: 28.7041, lng: 77.1025 } },
  { id: "V-004", name: "Sunita Devi", location: "Chennai", children: 6, coordinates: { lat: 13.0827, lng: 80.2707 } }
];

const districtStats = [
  { district: "Mumbai", children: 5847, volunteers: 234, schools: 187, coverage: "Complete" },
  { district: "Bangalore", children: 4231, volunteers: 189, schools: 145, coverage: "High" },
  { district: "Delhi", children: 6124, volunteers: 267, schools: 203, coverage: "Complete" },
  { district: "Chennai", children: 3456, volunteers: 156, schools: 124, coverage: "Medium" },
  { district: "Pune", children: 2890, volunteers: 134, schools: 98, coverage: "High" }
];

export default function GeoMapping() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mapView, setMapView] = useState("children");
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  const getDensityColor = (density: string) => {
    switch (density) {
      case "very-high": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-secondary text-secondary-foreground";
      case "medium": return "bg-child-care text-child-care-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case "Complete": return "bg-success text-success-foreground";
      case "High": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      case "Low": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Geo-Spatial Mapping</h1>
          <p className="text-muted-foreground">Regional density, locations, and coverage mapping</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Map
          </Button>
          <Button>
            <ZoomIn className="w-4 h-4 mr-2" />
            Full Screen
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Map Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={mapView} onValueChange={setMapView}>
              <SelectTrigger>
                <Layers className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Map View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="children">Children Density</SelectItem>
                <SelectItem value="volunteers">Volunteer Locations</SelectItem>
                <SelectItem value="schools">School Coverage</SelectItem>
                <SelectItem value="heatmap">Combined Heatmap</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="pending">Pending Verification</SelectItem>
                <SelectItem value="schooled">In School</SelectItem>
                <SelectItem value="unschooled">Not in School</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Reset View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mock Map Area */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Map - {mapView === "children" ? "Children Density" : mapView === "volunteers" ? "Volunteer Locations" : mapView === "schools" ? "School Coverage" : "Combined Heatmap"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border-2 border-dashed border-border p-8 min-h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold">Interactive Map Integration</h3>
                  <p className="text-muted-foreground max-w-md">
                    This area would integrate with mapping services like Google Maps, Mapbox, or OpenStreetMap
                    to display real-time regional data, heatmaps, and location markers.
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Badge variant="outline">Children: 24,847</Badge>
                  <Badge variant="outline">Volunteers: 1,256</Badge>
                  <Badge variant="outline">Districts: 487</Badge>
                </div>
              </div>
            </div>
            
            {/* Mock Region Cards scattered on map */}
            <div className="absolute top-8 left-8">
              <div className="bg-white dark:bg-card rounded-lg p-3 border shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Delhi NCR</p>
                    <p className="text-xs text-muted-foreground">6,124 children</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-32 right-16">
              <div className="bg-white dark:bg-card rounded-lg p-3 border shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Mumbai</p>
                    <p className="text-xs text-muted-foreground">5,847 children</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-16 left-24">
              <div className="bg-white dark:bg-card rounded-lg p-3 border shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">Bangalore</p>
                    <p className="text-xs text-muted-foreground">4,231 children</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Density Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mapRegions.map((region) => (
                <div key={region.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{region.name}</p>
                      <p className="text-sm text-muted-foreground">{region.children.toLocaleString()} children</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDensityColor(region.density)}>
                      {region.density.replace('-', ' ')} density
                    </Badge>
                    <Button size="sm" variant="outline">
                      <ZoomIn className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>District Coverage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {districtStats.map((district, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{district.district}</h4>
                    <Badge className={getCoverageColor(district.coverage)}>
                      {district.coverage}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Children</p>
                      <p className="font-medium">{district.children.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volunteers</p>
                      <p className="font-medium">{district.volunteers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Schools</p>
                      <p className="font-medium">{district.schools}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Map Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Density Levels</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <span className="text-sm">Very High (5000+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  <span className="text-sm">High (3000-5000)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-child-care rounded-full"></div>
                  <span className="text-sm">Medium (1000-3000)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success rounded-full"></div>
                  <span className="text-sm">Low (&lt;1000)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Coverage Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success rounded"></div>
                  <span className="text-sm">Complete Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span className="text-sm">High Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-secondary rounded"></div>
                  <span className="text-sm">Medium Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-destructive rounded"></div>
                  <span className="text-sm">Low Coverage</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <MapPin className="w-3 h-3 mr-2" />
                  Zoom to Region
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Filter className="w-3 h-3 mr-2" />
                  Filter by Status
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Download className="w-3 h-3 mr-2" />
                  Export View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}