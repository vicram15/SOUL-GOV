import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Baby, 
  MapPin, 
  TrendingUp, 
  Heart,
  IdCard,
  School,
  AlertTriangle,
  Download,
  Filter
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import heroDashboard from "@/assets/hero-dashboard.jpg";

// Sample data for charts
const stateData = [
  { name: 'Uttar Pradesh', children: 4200 },
  { name: 'Maharashtra', children: 3800 },
  { name: 'Bihar', children: 3200 },
  { name: 'West Bengal', children: 2800 },
  { name: 'Rajasthan', children: 2400 },
  { name: 'Others', children: 8400 }
];

const genderData = [
  { name: 'Male', value: 52, fill: 'hsl(var(--primary))' },
  { name: 'Female', value: 48, fill: 'hsl(var(--child-care))' }
];

const verificationData = [
  { name: 'Verified', value: 78, fill: 'hsl(var(--success))' },
  { name: 'Pending', value: 15, fill: 'hsl(var(--secondary))' },
  { name: 'Incomplete', value: 7, fill: 'hsl(var(--destructive))' }
];

const monthlyGrowthData = [
  { month: 'Jan', children: 1200 },
  { month: 'Feb', children: 1450 },
  { month: 'Mar', children: 1600 },
  { month: 'Apr', children: 1750 },
  { month: 'May', children: 1900 },
  { month: 'Jun', children: 2100 }
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img 
          src={heroDashboard} 
          alt="Child Impact Dashboard" 
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50 flex items-center">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground px-4 md:px-6">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Child Impact Hub</h1>
            <p className="text-sm md:text-xl opacity-90 mb-4 md:mb-6">
              Comprehensive platform for child welfare management across India
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button variant="secondary" size="sm" className="md:size-lg">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" size="sm" className="md:size-lg bg-white/20 border-white/30 text-white hover:bg-white/30">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Regional Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
        <div className="flex-1">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="up">Uttar Pradesh</SelectItem>
              <SelectItem value="mh">Maharashtra</SelectItem>
              <SelectItem value="br">Bihar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
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
        <Button variant="outline" className="flex-shrink-0">
          <Download className="w-4 h-4 mr-2" />
          Download Summary
        </Button>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Children Onboarded"
          value="24,847"
          subtitle="Total registered"
          icon={Baby}
          trend={{ value: 8.2, isPositive: true }}
          variant="child-care"
        />
        <StatsCard
          title="Verified Children"
          value="19,381"
          subtitle="ID & documents complete"
          icon={IdCard}
          trend={{ value: 12.5, isPositive: true }}
          variant="success"
        />
        <StatsCard
          title="School Assigned"
          value="18,234"
          subtitle="Successfully matched"
          icon={School}
          trend={{ value: 4.1, isPositive: true }}
          variant="volunteer"
        />
        <StatsCard
          title="ID Obtained"
          value="21,456"
          subtitle="Aadhaar & documents"
          icon={Heart}
          trend={{ value: 18.7, isPositive: true }}
          variant="default"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Children by State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Children by State/District
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="children" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="w-5 h-5" />
              Verification & ID Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {verificationData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Growth in Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="children" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 md:h-20 flex-col gap-2 p-2">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs md:text-sm">View Reports</span>
              </Button>
              <Button variant="outline" className="h-16 md:h-20 flex-col gap-2 p-2">
                <Filter className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs md:text-sm">Filter by Region</span>
              </Button>
              <Button variant="outline" className="h-16 md:h-20 flex-col gap-2 p-2">
                <Download className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs md:text-sm">Download Summary</span>
              </Button>
              <Button variant="outline" className="h-16 md:h-20 flex-col gap-2 p-2">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-xs md:text-sm">Regional Map</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Priority Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-secondary" />
              Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border border-secondary/20 bg-secondary-soft">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">ID Verification Pending</p>
                  <p className="text-xs text-muted-foreground">147 children missing Aadhaar</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border border-volunteer/20 bg-success-soft">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-volunteer rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">KYC Incomplete</p>
                  <p className="text-xs text-muted-foreground">23 volunteers require verification</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">School Assignment</p>
                  <p className="text-xs text-muted-foreground">89 children need school placement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}