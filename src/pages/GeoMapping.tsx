import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  MapPin, 
  Layers, 
  Download,
  ZoomIn,
  Filter,
  Users,
  Baby,
  School
} from "lucide-react";

export default function GeoMapping() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Geo Mapping</h1>
          <p className="text-muted-foreground">Regional Density & Locations</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
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
              <Button variant="outline" size="sm">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </Button>
              <Button variant="outline" size="sm">
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
              <Button className="w-full justify-start h-12 sm:h-14" variant="outline">
                <ZoomIn className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate text-sm sm:text-base">Zoom to Specific Region</span>
              </Button>
              <Button className="w-full justify-start h-12 sm:h-14" variant="outline">
                <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate text-sm sm:text-base">Export Current Map View</span>
              </Button>
              <Button className="w-full justify-start h-12 sm:h-14" variant="outline">
                <Filter className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate text-sm sm:text-base">Advanced Filtering Options</span>
              </Button>
              <Button className="w-full justify-start h-12 sm:h-14" variant="outline">
                <Layers className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate text-sm sm:text-base">Toggle Map Layers</span>
              </Button>
              <Button className="w-full justify-start h-12 sm:h-14" variant="outline">
                <School className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate text-sm sm:text-base">Show Nearby Schools</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}